import React, {useRef, useCallback} from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {GuideBox, 
    Typography,
    Panel,
    Check,
    Button,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesSamplesEditContinuePopup,
    Icon,
    TextField, DataGrid,
    TemplatesFunctionalComponentsDownloadButton as DownloadButton,
    TemplatesFunctionalComponentsUploadButton as UploadButton,

} from '@midasit-dev/moaui';
import { SimpleTreeView } from '@mui/x-tree-view';
import {TreeItem} from '@mui/x-tree-view'
import { ExcelData, ReportJsonResult } from '../variables';
import { rootCertificates } from 'tls';


function ExcelConnect() {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [reportJsonResult, setReportJsonResult] = useRecoilState(ReportJsonResult)
  const [excelFileUrl, setExcelFileUrl] = useState("")

  const [sheetName, setSheetName] = useState("Sheet1")
  const [areaName, setAreaName] = useState("AreaName")
  const [cellName, setCellName] = useState("CellName")  

  const [excelData, setExcelData] = useRecoilState(ExcelData)
  


  const columns: any = [
    {field : 'SheetName', headerName : 'Sheet', width : 80, editable : true, sortable : false},
    {field : 'AreaName', headerName : 'Area', width : 80, editable : true, sortable : false},
    {field : 'CellName', headerName : 'Cell', width : 80, editable : true, sortable : false},
    {field : "LinkedData", headerName : "Linked to", width : 150, editable : true, sortable : false},
    {field : "Value", headerName : "Value", width : 100, editable : true, sortable : false}
  ]
  
  interface ExcelTableRow {
    id : number;
    SheetName: string;
    AreaName: string;
    CellName: string;
    LinkedData : string;
    Value : any;
  }



  let currentPath:any = []
  let itemvalue:any = ''
  function handleItemClick(path:any, value:any) {
    currentPath = path;
    itemvalue = value;
  }
  
  function renderJsonTree(data:any, path: string[] = []) {
    let elements = [];
  
    for (const key in data) {
      const value = data[key];
      let currentPath = path.concat(key);
      if (Array.isArray(value)) {
        if (value.every(item => typeof item === 'object' && !Array.isArray(item))) {
          // 객체를 포함하는 배열 처리
          const childItems = value.map((item:any, index:any) => {
            const subItemId = `${key}-${index}`;
            const itemPath = currentPath.concat(index);
            return (
              <TreeItem key={subItemId} itemId={subItemId} label={`Case ${index}`}>
                {Object.entries(item).map(([itemKey, itemValue]) => (
                  <TreeItem
                    key={`${itemKey}-${index}`}
                    itemId={`${itemKey}-${index}`}
                    label={itemKey + ': ' + itemValue}
                    onClick={() => handleItemClick(itemPath.concat(itemKey), itemValue)}
                  />
                ))}
            </TreeItem>
            ) 
          });
          
          elements.push(
            <TreeItem key={key} itemId={key}label={key}>
              {childItems}
            </TreeItem>
          );
        } else {
          // 기본 배열 처리
          
          elements.push(
            <TreeItem
              key={key}
              itemId={key}
              label={key}
              onClick={() => handleItemClick(currentPath, value)}
            />
          );
        }
      } 
      else if (typeof value === 'object') {
        // 객체 처리
        const childItems = renderJsonTree(value, currentPath);
        
        elements.push(
          <TreeItem key={key} itemId={key} label={key}>
            {childItems}
          </TreeItem>
        );
      } 
      else {
        // 기본 타입 처리
        
        elements.push(
          <TreeItem
            key={key}
            itemId={key}
            label={`${key}: ${value}`}
            onClick={() => handleItemClick(currentPath, value)}
          />
        );
      }
    }
  
    return elements.length === 1 ? elements[0] : elements;
  }
  const handleAddClick = () => {
    const id = excelData.length + 1;
    setExcelData(currentRows => [...currentRows, 
      {id : id, 
      SheetName : sheetName, 
      AreaName : areaName, 
      CellName : cellName,
      LinkedData : currentPath.toString(),
      Value : itemvalue
    }])
  }

  const handleDeleteClick = () => {
    setExcelData(currentRows => currentRows.filter(row => row.id !== currentRows.length))
  }

  const handleRefreshClick = () => {
    let orgin_reportjson:any = JSON.parse(JSON.stringify(reportJsonResult))
    let newexcelData:any = JSON.parse(JSON.stringify(excelData))
    for (let i = 0; i < newexcelData.length; i++) {
      let row = JSON.parse(JSON.stringify(newexcelData[i]))
      let path = row.LinkedData.split(',')
      console.log(path)
      let newvalue = null
      try{
        //path 를 통해 reportjson 에 접근하여 value를 가져옴
        let copy_reportjson = JSON.parse(JSON.stringify(orgin_reportjson))
        for (let j = 0; j < path.length; j++){
          newvalue = copy_reportjson[path[j]]
          copy_reportjson = newvalue
        }
        row.Value = newvalue
      }
      catch(e){
        row.Value = 0
      }
      newexcelData[i] = row
    }
    setExcelData(newexcelData)
  }

  const transformExcelDataToJson = (excelData: ExcelTableRow[]) => {
    interface Result {
      [key: string]: any;
    }
    const result: Result = {};

    excelData.forEach(({ SheetName, AreaName, CellName, Value }) => {
      if (!result[SheetName]) {
        result[SheetName] = {};
      }
  
      if (!result[SheetName][AreaName]) {
        result[SheetName][AreaName] = {};
      }
  
      result[SheetName][AreaName][CellName] = Value;
    });
  
    return result;
  };

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0]; // 사용자가 선택한 파일
    
    if (!file) return;


    const jsonData = transformExcelDataToJson(excelData); // ExcelData를 JSON으로 변환
    console.log(JSON.stringify(jsonData))
    const formData = new FormData();
    formData.append("file", file);
    formData.append("parameter", JSON.stringify(jsonData));

    fetch('https://moa.rpm.kr-dv-midasit.com/backend/function-executor/plugin-execute', {
      method: 'POST',
      body: formData, // 필요에 따라 적절한 formData를 설정해주세요.
    })
    .then(response => response.blob()) // 응답을 blob 형태로 변환
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dfile.xlsx'; // 다운로드할 파일이름 지정
      document.body.appendChild(a); // 이건 UI에 보이지 않게 하기 위함
      a.click(); // 클릭 이벤트 발생
      window.URL.revokeObjectURL(url); // 사용이 끝난 URL 해제
      document.body.removeChild(a); // 추가했던 `<a>` 태그 제거
    })
    .catch(error => console.error('Download error:', error));
    };
  
  const handleImportAndSend = () => {
    fileInputRef.current?.click();
  }
  
  const uploadData = useCallback((data:any)=>{
  
    console.log(data)
    setExcelData(data)
  }, [])

  return(
      <GuideBox width="auto" marginRight={1} marginBottom={1}>
        <Typography margin={1} variant="h1">Report Output</Typography>
        <Panel variant='shadow' width={820} paddingLeft={2} paddingTop={0.5}>
          <GuideBox row spacing={1}>
            <GuideBox>
              <Typography variant='h1'>Variables</Typography>
              <Panel>
                <div style = {{height: 670, width: 250, overflowY: 'scroll', fontSize : 12}}>
                  <SimpleTreeView
                    multiSelect
                  >
                    {renderJsonTree(reportJsonResult)}
                  </SimpleTreeView>
                </div>
              </Panel>
            </GuideBox>
            <Panel>
              <Typography variant='h1'>
                Cell Location (Excel)
              </Typography>
              
              <GuideBox row horSpaceBetween verCenter margin={1} >
                <GuideBox horCenter width={100}>
                  <Typography> Sheet Name </Typography>
                </GuideBox>
                <GuideBox horCenter width={100}>
                <Typography> Area Name </Typography>
                </GuideBox>
                <GuideBox horCenter width={100}> 
                <Typography> Cell Name </Typography>
                </GuideBox>
              </GuideBox>
              <GuideBox row horSpaceBetween verCenter margin={1}>
                <GuideBox horCenter width={100}>
                  <TextField 
                  value = {sheetName}
                  onChange = {(e) => setSheetName(e.target.value)}
                  width={100}/>
                </GuideBox>
                <GuideBox horCenter width={100}>
                  <TextField 
                  value = {areaName}
                  onChange = {(e) => setAreaName(e.target.value)}
                  width={100}/>
                </GuideBox>
                <GuideBox horCenter width={100}> 
                  <TextField 
                  value = {cellName}
                  onChange = {(e) => setCellName(e.target.value)}
                  width={100}/>
                </GuideBox>
              </GuideBox>
              <GuideBox row width={485} horRight spacing={1} marginTop={2}>
                <Button 
                variant='outlined' 
                width="100px"
                onClick={handleAddClick}
                > Add</Button>
                <Button 
                variant='outlined' 
                width="100px"
                onClick={handleDeleteClick}
                > Delete</Button>
                <Button 
                variant='outlined' 
                width="100px"
                onClick={handleRefreshClick}
                > Refresh</Button>
              </GuideBox>
              <Typography margin={1} variant="h1">Linked Data</Typography>
              <div style={{ height: 500, width: '100%'}}>
                <DataGrid
                  rows={excelData}
                  columns={columns}
                  disableColumnMenu
                  disableColumnFilter
                  hideFooter
                  columnHeaderHeight={40}
                  rowHeight={40}
                />
              </div>
              <GuideBox marginTop={1} row>
                <DownloadButton 
                  valueToDownload={excelData}
                  buttonProps={{
                      color : 'normal'
                  }}            
                  buttonName='다운로드'
                  />
                  <UploadButton
                      onAfterUpload={uploadData}
                      buttonProps={{
                          color : 'normal'
                      }}
                      buttonName='업로드'
                  />
                  <input type = 'file' ref = {fileInputRef} style={{display : "None"}} onChange={handleFileChange}></input>
                  <Button
                    variant = 'contained'
                    width = '150px'
                    onClick = {handleImportAndSend}
                  >Import & Download</Button>
              </GuideBox>
            </Panel>
          </GuideBox>
        </Panel>
      </GuideBox>
      
  );
};

export default ExcelConnect;
