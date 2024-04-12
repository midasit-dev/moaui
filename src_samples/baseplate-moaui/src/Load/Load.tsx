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
  HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr, BasePlateWidth, BasePlateHeight, Node_BP_Data, MinMaxCoordinates, ReactionResult,
  ENVLoad
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
  const [envLoad, setEnvLoad] = useRecoilState(ENVLoad);
  
  const columns : any = [
    {field : 'NodeIndex', headerName : 'Node No.', width : 80, editable : true, sortable : false},
    {field : 'LoadComb', headerName : 'sLC', width : 100, editable : true, sortable : false},
    {field : 'Axial', headerName : 'Pu', width : 100, editable : true, sortable : false},
    {field : 'Momentx', headerName : 'Mux', width : 100, editable : true, sortable : false},
    {field : 'Momenty', headerName : 'Muy', width : 100, editable : true, sortable : false},
    {field : 'Shearx', headerName : 'Vux', width : 100, editable : true, sortable : false},
    {field : 'Sheary', headerName : 'Vuy', width : 100, editable : true, sortable : false},
  ]
  


  const [rows_ADD, setRows_ADD] = useState<any>([]);
  const [rows_ENV, setRows_ENV] = useState<any>([]);

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
              Axial : Number(reactionResult[j][k][2]).toFixed(2),
              Momentx : Math.abs(reactionResult[j][k][4]).toFixed(2),
              Momenty : Math.abs(reactionResult[j][k][3]).toFixed(2),
              Shearx : Math.abs(reactionResult[j][k][0]).toFixed(2),
              Sheary : Math.abs(reactionResult[j][k][1]).toFixed(2),
            })
            id_index += 1
          }
        }
      }
    }

    setRows_ADD(new_rows_ADD)
  }
  
  useEffect(() => {
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]
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
              Axial : Number(reactionResult[j][k][2]).toFixed(2),
              Momentx : Math.abs(reactionResult[j][k][4]).toFixed(2),
              Momenty : Math.abs(reactionResult[j][k][3]).toFixed(2),
              Shearx : Math.abs(reactionResult[j][k][0]).toFixed(2),
              Sheary : Math.abs(reactionResult[j][k][1]).toFixed(2),
            })
            id_index += 1
          }
        }
      }
    }
    setRows_ADD(new_rows_ADD)
  }, [])

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

          <Typography variant='h1'>LoadCase(ADD)</Typography>

          <div style={{height: 350, width: '100%'}}>
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