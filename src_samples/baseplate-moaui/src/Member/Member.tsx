import React, { useEffect } from 'react';
import { 
	GuideBox, 
	Panel,
	Check,
	Typography,
	TabGroup,
	Tab,
  Button
} from '@midasit-dev/moaui';
import { useRecoilState, useRecoilValue } from 'recoil';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';
import Column from './Column';
import BasePlate from './BasePlate';
import {selectNodeList, setColumnInfo } from '.././utils_pyscript';
import { SelectedNodes, SelectedColumnList, SelectedColumnIndex_DBName, SelectedColumnIndex, HSectionDB, SelectedDBIndex,
  HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr, BasePlateWidth, BasePlateHeight, Node_BP_Data, MinMaxCoordinates, PlateThickness, BasePlateMaterial,
  ConcreteMaterial, BPName, PlanviewBPNameCheck, PlanviewColumnNameCheck, PlanviewNodeCheck, PlanViewSelectedNode, BP_Node, BP_List,
  SelectedBPList
} from '../variables';
import PlanViewDrawing from '../Components/PlanViewDrawing';
import TypoGraphyDropList from '../NewComponents/TypoGraphyDropList';
import { SimpleTreeView } from '@mui/x-tree-view';
import {TreeItem} from '@mui/x-tree-view'
import { useSnackbar } from 'notistack';
import { set } from 'lodash';


function Member() {
  const { enqueueSnackbar } = useSnackbar();
  const [tabName, setTabName] = React.useState('Column');  
  const [selectedColumnIndex, setSelectedColumnIndex] = useRecoilState(SelectedColumnIndex);
  const [hSectionDB, setHSectionDB] = useRecoilState(HSectionDB);
  const [selectedDBIndex, setSelectedDBIndex] = useRecoilState(SelectedDBIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [selectedColumnList, setSelectedColumnList] = useRecoilState(SelectedColumnList);
  const [planViewNodeCheck, setPlanViewNodeCheck] = useRecoilState(PlanviewNodeCheck);
  const [planViewColumnNameCheck, setPlanViewColumnNameCheck] = useRecoilState(PlanviewColumnNameCheck);
  const [planViewBPNameCheck, setPlanViewBPNameCheck] = useRecoilState(PlanviewBPNameCheck);
  const [planViewSelectedNode, setPlanViewSelectedNode] = useRecoilState(PlanViewSelectedNode);
  const [bp_Node, setBP_Node] = useRecoilState(BP_Node);
  const [node_BP_Data, setNode_BP_Data] = useRecoilState(Node_BP_Data);
  const [hBeamH, setHBeamH] = useRecoilState(HBeamH);
	const [hBeamB, setHBeamB] = useRecoilState(HBeamB);
	const [hBeamtf, setHBeamtf] = useRecoilState(HBeamtf);
	const [hBeamtw, setHBeamtw] = useRecoilState(HBeamtw);
	const [hBeamr, setHBeamr] = useRecoilState(HBeamr);
  const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
  const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);
  const [plateThickness, setPlateThickness] = useRecoilState(PlateThickness);
  const [basePlateMaterial, setBasePlateMaterial] = useRecoilState(BasePlateMaterial);
  const [concreteMaterial, setConcreteMaterial] = useRecoilState(ConcreteMaterial);
  const [bPName, setBPName] = useRecoilState(BPName);
  const [minMaxCoordinates, setMinMaxCoordinates] = useRecoilState(MinMaxCoordinates);
  const [bpList, setBPList] = useRecoilState(BP_List);
  const [selectedBPList, setSelectedBPList] = useRecoilState(SelectedBPList);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabName(newValue);
  };


  const ColumnSelected = (e:any) => {
    setSelectedColumnIndex(e.target.value)
    const DBSection_Name = columnIndex_DBName[e.target.value]
    for(let i=0; i< hSectionDB.length; i++){
      if (hSectionDB[i][0] === DBSection_Name){
        setSelectedDBIndex(i)
      }
    }
    for(let key in node_BP_Data){
      if(node_BP_Data[key].BASEPLATE.COLUMN.DB === DBSection_Name){
        
        const sectionDB = node_BP_Data[key].BASEPLATE.COLUMN.DB
        const splitdim = sectionDB.split(' ')[1].split('x')
        const HSectionDim = [Number(splitdim[0]), Number(splitdim[1]), Number(splitdim[2].split('/')[0]), Number(splitdim[2].split('/')[1])]
        setHBeamH(HSectionDim[0]);
				setHBeamB(HSectionDim[1]);
				setHBeamtf(HSectionDim[2]);
				setHBeamtw(HSectionDim[3]);
				setHBeamr(0);
        setBasePlateWidth(node_BP_Data[key].BASEPLATE.PLATE.WIDTH);
        setBasePlateHeight(node_BP_Data[key].BASEPLATE.PLATE.HEIGHT);
        setPlateThickness(node_BP_Data[key].BASEPLATE.PLATE.THIK);
        setBasePlateMaterial(node_BP_Data[key].BASEPLATE.PLATE.MATL);
        setConcreteMaterial(node_BP_Data[key].BASEPLATE.COLUMN.MATL);
      


      }
    }
  }
  const handleBPNameChange = (e:any) => {
    setBPName(e.target.value)
  }

  useEffect(() => {
    // esc 키를 누를 때 호출될 이벤트 핸들러입니다.
    const handleKeyDown = (event:any) => {
      if (event.key === 'Escape') {
        setPlanViewSelectedNode([]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBPUpdate = () => {

    if (bPName in bp_Node){
      enqueueSnackbar('Baseplate 이름이 존재합니다', {variant: 'error', autoHideDuration: 3000})
      return
    }
    if (bPName == '' || bPName == undefined){
      enqueueSnackbar('Baseplate 이름을 입력해주세요', {variant: 'error', autoHideDuration: 3000})
      return
    }
    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (planViewSelectedNode.includes(key)){
        newNode_BP_Data[key].BASEPLATE.COLUMN.MATL = concreteMaterial
        newNode_BP_Data[key].BASEPLATE.PLATE.NAME = bPName
        newNode_BP_Data[key].BASEPLATE.PLATE.WIDTH = basePlateWidth
        newNode_BP_Data[key].BASEPLATE.PLATE.HEIGHT = basePlateHeight
        newNode_BP_Data[key].BASEPLATE.PLATE.THIK = plateThickness
        newNode_BP_Data[key].BASEPLATE.PLATE.MATL = basePlateMaterial
      }
    }
    console.log(newNode_BP_Data)
    setNode_BP_Data(newNode_BP_Data)
    let sectionName = columnIndex_DBName[selectedColumnIndex]
    let newBP_Node = JSON.parse(JSON.stringify(bp_Node))
    newBP_Node[bPName] = {
      NODE : planViewSelectedNode,
      COLUMN : sectionName,
      Conc_Material : concreteMaterial + 'MPa',
      BP_Material : basePlateMaterial,
    }
    setBP_Node(newBP_Node)

    setPlanViewSelectedNode([])

    let newBPList = JSON.parse(JSON.stringify(bpList))
    newBPList.push([bPName, bPName])
    setBPList(newBPList)
    console.log(newBPList[0][0])
    setSelectedBPList(newBPList[0][0])
  }

  const renderTreeItems = (data:any, nodeIdPrefix = '') =>
  Object.entries(data).map(([key, value], index) => {
    const nodeId = `${nodeIdPrefix}${key}-${index}`;

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      // 객체의 경우: 하위 TreeItem을 가짐
      return (
        <TreeItem key={nodeId} itemId={nodeId} label={key}>
          {renderTreeItems(value, `${nodeId}-`)}
        </TreeItem>
      );
    } else {
      // 기본형(문자열 등)의 경우: 단일 TreeItem
      return (
        <TreeItem key={nodeId} itemId={nodeId} label={`${key}: ${value}`} />
      );
    }
  });
  
  const getAllNodeIds = (node:any, ids = ['root']) => {
    if (Array.isArray(node.children)) {
      node.children.forEach((child:any) => {
        ids.push(child.id);
        getAllNodeIds(child, ids);
      });
    }
    return ids; // 모든 노드 ID가 포함된 배열 반환
  };
  
  const allNodeIds = getAllNodeIds(bp_Node); // 모든 노드 ID를 수집

  return (
    <GuideBox row spacing={1}>
      <Panel height={550}>
        <GuideBox marginTop={1}>
          
          <GuideBox spacing={1}>
            <TypoGraphyDropList
              title = "Baseplate :"
              width = {350}
              dropListwidth = {200}
              items = {selectedColumnList}
              defaultValue = {selectedColumnIndex}
              value = {selectedColumnIndex}
              onChange = {ColumnSelected}
            />
            <TypoGraphyTextField 
              title = "Node No. : "
              width = {350}
              textFieldWidth = {200}
              value = {planViewSelectedNode}
              placeholder = "Select nodes in the Plan View"
            />
            <TypoGraphyTextField 
              title = "Base Plate Name :"
              value = {bPName}
              width = {350}
              textFieldWidth = {200}
              placeholder = "Enter Base Plate Name"
              onChange = {handleBPNameChange}
            />
          </GuideBox>
          
        </GuideBox>
        <TabGroup
          orientation = 'horizontal'
          value = {tabName}
          onChange={handleTabChange}
        >
          <Tab value = "Column" label='Column'/>
          <Tab value = "Baseplate"label='Baseplate'/>
          <Tab value = "Anchor" label = "Anchor"/>
        </TabGroup>
        {tabName === 'Column' && <Column/>}
        {tabName === 'Baseplate' && <BasePlate/>}
        <Button
        onClick={handleBPUpdate}
        >
          Apply
        </Button>
      </Panel>
      <GuideBox show width = {500} height={500}>
        <Panel>
          <Typography variant='h1'>Plan View</Typography>
          <GuideBox row verCenter spacing={2}>
            <GuideBox row verCenter>
              <Check 
                  checked = {planViewNodeCheck}
                  onChange={() => setPlanViewNodeCheck(!planViewNodeCheck)}
              />
              <Typography>Node No.</Typography>              
            </GuideBox>
            <GuideBox row verCenter>
              <Check 
                  checked = {planViewColumnNameCheck}
                  onChange={() => setPlanViewColumnNameCheck(!planViewColumnNameCheck)}
              />
              <Typography>Column Name</Typography>              
            </GuideBox>
            <GuideBox row verCenter>
              <Check 
                  checked = {planViewBPNameCheck}
                  onChange={() => setPlanViewBPNameCheck(!planViewBPNameCheck)}
              />
              <Typography>Base Plate Name</Typography>              
            </GuideBox>
          </GuideBox>
          <PlanViewDrawing 
          panelSize = {500}
          MinMaxCord = {minMaxCoordinates}
          />
        </Panel>
      </GuideBox>
      <GuideBox>
        <Panel width={250} height={550}>
        <Typography>BasePlate Info.</Typography>
        <SimpleTreeView
        defaultExpandedItems = {allNodeIds}
        >
          {renderTreeItems(bp_Node)}
        </SimpleTreeView>
        </Panel>
        

      </GuideBox>
    </GuideBox>
  );
}

export default Member;