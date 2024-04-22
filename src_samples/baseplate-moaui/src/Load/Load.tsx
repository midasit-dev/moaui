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

  const handleDesignClick = () => {
    postNewProject(); 
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]
    const BPData = JSON.parse(JSON.stringify(node_BP_Data));
    let PlateWidth = 0
    let PlateHeight = 0
    let SectionDim = ''
    let PlateMaterial = ''
    let PlateThickness = 0
    let keyindex = ''
    for(let key in BPData){
      if(BPData[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        keyindex = key
        PlateWidth = BPData[key].BASEPLATE.PLATE.WIDTH
        PlateHeight = BPData[key].BASEPLATE.PLATE.HEIGHT
        SectionDim = BPData[key].BASEPLATE.COLUMN.DB
        PlateMaterial = BPData[key].BASEPLATE.PLATE.MATL
        PlateThickness = BPData[key].BASEPLATE.PLATE.THIK
        break;
      }
    }

    const splitspace = SectionDim.split(' ')
    const splitdim = splitspace[1].split('x')
    const HBeamHeight = Number(splitdim[0])
    const HBeamWidth = Number(splitdim[1])
    CreateBasePlateOutlines(PlateWidth, PlateHeight, HBeamHeight, HBeamWidth)
    AutoMeshing(PlateWidth, PlateHeight, PlateMaterial, PlateThickness)
    
    let loaddata = []
    for(let key in BPData){
      if(BPData[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        for(let reaction_key in reactionResult){
          if(reaction_key == key){
            for(let load_key in reactionResult[reaction_key]){
              loaddata.push(reactionResult[reaction_key][load_key][2])
            }
          }
        }
      }
    }
    Applyloads(loaddata, PlateWidth, PlateHeight)
    Analysis(selectedColumnIndex)
    const Pu_Result = GetResult()
    let new_DesignResult = JSON.parse(JSON.stringify(designResult))
    new_DesignResult.Pu = 1
    new_DesignResult.Mux = Math.abs(Number(Pu_Result['min']))
    new_DesignResult.Muy = 1
    new_DesignResult.Vux = 1
    new_DesignResult.Vuy = 1
    new_DesignResult.Tu = 1
    new_DesignResult.Sigma_max = 1
    new_DesignResult.Sigma_min = 1
    new_DesignResult.fck = Number(BPData[keyindex].BASEPLATE.COLUMN.MATL)
    new_DesignResult.BP_Area = BPData[keyindex].BASEPLATE.PLATE.WIDTH * BPData[keyindex].BASEPLATE.PLATE.HEIGHT
    new_DesignResult.BP_thick = BPData[keyindex].BASEPLATE.PLATE.THIK
    new_DesignResult.BP_Fy = 1
    new_DesignResult.Bolt_Dia = 1
    new_DesignResult.Bolt_Length = 1
    new_DesignResult.Bolt_Num = 1
    setDesignResult(new_DesignResult)
    const calculate_result = calculate_baseplate(JSON.stringify(new_DesignResult))
    
    const markdown = covertMarkdown(JSON.stringify(calculate_result))
    setMDResult(markdown)
    enqueueSnackbar('Design Check Completet', {variant: 'success', autoHideDuration: 3000})
  }

  return (
    <GuideBox row >
      <Panel height={550}>
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
          <div style={{height: 350, width: '100%'}}>
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
        <GuideBox width={400} horRight>
          <Button 
            variant='outlined'
            onClick={handleDesignClick}
          >Design Check</Button>
        </GuideBox>
      </Panel>
    </GuideBox>
  );
}

export default Load;