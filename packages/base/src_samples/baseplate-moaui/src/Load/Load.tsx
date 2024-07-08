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
import { SelectedNodes, SelectedColumnList, SelectedColumnIndex_DBName, SelectedColumnIndex, HSectionDB, SelectedDBIndex,
  HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr, BasePlateWidth, BasePlateHeight, Node_BP_Data, MinMaxCoordinates, ReactionResult,
  ENVLoad, BP_List, SelectedBPList, BP_Node, DesignResult, MDResult
} from '../variables';
import PlanViewDrawing from '../Components/PlanViewDrawing';
import TypoGraphyDropList from '../NewComponents/TypoGraphyDropList';
import {dbReadItem }from '../utils_pyscript'
import { set } from 'lodash';
import {postNewProject, CreateBasePlateOutlines, AutoMeshing, Applyloads, Analysis, GetResult, calculate_baseplate, covertMarkdown, }from '../utils_pyscript'
import { useSnackbar } from 'notistack';
import TreeView from '../SimpleTreeView';


function Load() {
  const { enqueueSnackbar } = useSnackbar();
  const [tabName, setTabName] = React.useState('Column');  
  const [selectedColumnIndex, setSelectedColumnIndex] = useRecoilState(SelectedColumnIndex);
  const [hSectionDB, setHSectionDB] = useRecoilState(HSectionDB);
  const [selectedDBIndex, setSelectedDBIndex] = useRecoilState(SelectedDBIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [selectedColumnList, setSelectedColumnList] = useRecoilState(SelectedColumnList);
  const [bpList, setBPList] = useRecoilState(BP_List);
  const node_BP_Data = useRecoilValue(Node_BP_Data);
  const [hBeamH, setHBeamH] = useRecoilState(HBeamH);
	const [hBeamB, setHBeamB] = useRecoilState(HBeamB);
	const [hBeamtf, setHBeamtf] = useRecoilState(HBeamtf);
	const [hBeamtw, setHBeamtw] = useRecoilState(HBeamtw);
	const [hBeamr, setHBeamr] = useRecoilState(HBeamr);
  const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
  const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);
  const [selectedBPList, setSelectedBPList] = useRecoilState(SelectedBPList);
  const [minMaxCoordinates, setMinMaxCoordinates] = useRecoilState(MinMaxCoordinates);
  const [reactionResult, setReactionResult] = useRecoilState(ReactionResult);
  const [bpNode, setBPNode] = useRecoilState(BP_Node);
  const [designResult, setDesignResult] = useRecoilState(DesignResult);
  const [mDResult, setMDResult] = useRecoilState(MDResult);
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

  const BPListSelected = (e:any) => {
    setSelectedBPList(e.target.value)
    let selectedBPName = e.target.value
    let newBP_Node = JSON.parse(JSON.stringify(bpNode))
    let Node_List = newBP_Node[selectedBPName]['NODE']
    console.log(Node_List)
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
    let selectedBPName = bpList[0][0]
    let newBP_Node = JSON.parse(JSON.stringify(bpNode))
    let Node_List = newBP_Node[selectedBPName]['NODE']
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
    <GuideBox row spacing={1} >
      <Panel height={550} width={807}>
        <GuideBox spacing={1}>
          <GuideBox marginTop={1} spacing={1}>
            <TypoGraphyDropList
              title = "Baseplate :"
              width = {350}
              dropListwidth = {200}
              items = {bpList}
              defaultValue = {bpList[0][0]}
              value = {selectedBPList}
              onChange = {BPListSelected}
            />
          </GuideBox>
          <Typography variant='h1'>LoadCase(ADD)</Typography>
          <div style={{height: 470, width: '100%'}}>
            <DataGrid
              columnHeaderHeight={60}
              rowHeight={80}
              hideFooter
              columns={columns}
              rows = {rows_ADD}
              checkboxSelection
            ></DataGrid>
          </div>
        </GuideBox>
      </Panel>
      <Panel width={200 } height={550} overflow='scroll' textOverflow= 'ellipsis'>
        <Typography>BasePlate Info.</Typography>
        <TreeView />
      </Panel>
      
    </GuideBox> 
  );
}

export default Load;