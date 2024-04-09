import React, { useEffect, useState } from 'react';
import { 
	GuideBox, 
	Panel,
	Check,
	Typography,
	TabGroup,
	Tab,
  Button,
  DataGrid
} from '@midasit-dev/moaui';
import { useRecoilState, useRecoilValue } from 'recoil';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';
import {selectNodeList, setColumnInfo } from '.././utils_pyscript';
import { SelectedNodes, SelectedColumnList, SelectedColumnIndex_DBName, SelectedColumnIndex, HSectionDB, SelectedDBIndex, BasePlateName,
  HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr, BasePlateWidth, BasePlateHeight, Node_BP_Data, MinMaxCoordinates, ReactionResult
} from '../variables';
import PlanViewDrawing from '../Components/PlanViewDrawing';
import TypoGraphyDropList from '../NewComponents/TypoGraphyDropList';
import {dbReadItem }from '../utils_pyscript'
import { set } from 'lodash';




function Load() {

  const [tabName, setTabName] = React.useState('Column');  
  const [selectedColumnIndex, setSelectedColumnIndex] = useRecoilState(SelectedColumnIndex);
  const [hSectionDB, setHSectionDB] = useRecoilState(HSectionDB);
  const [selectedDBIndex, setSelectedDBIndex] = useRecoilState(SelectedDBIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [selectedColumnList, setSelectedColumnList] = useRecoilState(SelectedColumnList);
  const [basePlateName, setBasePlateName] = useRecoilState(BasePlateName);

  const node_BP_Data = useRecoilValue(Node_BP_Data);
  const [hBeamH, setHBeamH] = useRecoilState(HBeamH);
	const [hBeamB, setHBeamB] = useRecoilState(HBeamB);
	const [hBeamtf, setHBeamtf] = useRecoilState(HBeamtf);
	const [hBeamtw, setHBeamtw] = useRecoilState(HBeamtw);
	const [hBeamr, setHBeamr] = useRecoilState(HBeamr);
  const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
  const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);

  const [minMaxCoordinates, setMinMaxCoordinates] = useRecoilState(MinMaxCoordinates);
  const [reactionResult, setReactionResult] = useRecoilState(ReactionResult);
  
  const columns : any = [
    {field : 'NodeIndex', headerName : 'Node No.', width : 80, editable : true, sortable : false},
    {field : 'LoadComb', headerName : 'sLC', width : 100, editable : true, sortable : false},
    {field : 'Axial', headerName : 'Pu', width : 100, editable : true, sortable : false},
    {field : 'Momentx', headerName : 'Mux', width : 100, editable : true, sortable : false},
    {field : 'Momenty', headerName : 'Muy', width : 100, editable : true, sortable : false},
    {field : 'Shearx', headerName : 'Vux', width : 100, editable : true, sortable : false},
    {field : 'Sheary', headerName : 'Vuy', width : 100, editable : true, sortable : false},
  ]
  
  let rows_ENV :any= [];

  const [rows_ADD, setRows_ADD] = useState<any>([]);

  const ColumnSelected = (e:any) => {
    setSelectedColumnIndex(e.target.value)
    const DBSection_Name = columnIndex_DBName[e.target.value]
    let Node_List = []
    for (let key in node_BP_Data){
      if (node_BP_Data[key].BASEPLATE.COLUMN.DB === DBSection_Name){
        Node_List.push(key)
      }
    }
    let id_index = 0
    let new_rows_ADD = []
    for (let i=0; i<Node_List.length; i++){
      for (let j in reactionResult){
        if (j == Node_List[i]){
          for (let k in reactionResult[j]){
            new_rows_ADD.push({
              id : id_index,
              NodeIndex : j,
              LoadComb : k,
              Axial : reactionResult[j][k][2],
              Momentx : reactionResult[j][k][4],
              Momenty : reactionResult[j][k][3],
              Shearx : reactionResult[j][k][0],
              Sheary : reactionResult[j][k][1],
            })
            id_index += 1
          }
        }
      }
    }
    setRows_ADD(new_rows_ADD)
  }
  
  return (
    <GuideBox row >
      <Panel height={550}>
        <GuideBox spacing={1}>
          <GuideBox marginTop={1} spacing={1}>
            <TypoGraphyDropList
              title = "Column :"
              width = {350}
              dropListwidth = {200}
              items = {selectedColumnList}
              defaultValue = {selectedColumnIndex}
              value = {selectedColumnIndex}
              onChange = {ColumnSelected}
            />

          </GuideBox>

          <Typography variant='h1'>LoadCase(ENV)</Typography>

          <div style={{height: 200, width: '100%'}}>
            <DataGrid
              columnHeaderHeight={60}
              rowHeight={80}
              hideFooter
              columns={columns}
              rows = {rows_ENV}
            ></DataGrid>
          </div>

          <Typography variant='h1'>LoadCase(ADD)</Typography>

          <div style={{height: 200, width: '100%'}}>
            <DataGrid
              columnHeaderHeight={60}
              rowHeight={80}
              hideFooter
              columns={columns}
              rows = {rows_ADD}
            ></DataGrid>
          </div>
        </GuideBox>
      </Panel>
    </GuideBox>
  );
}

export default Load;