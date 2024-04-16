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
import { SelectedNodes, SelectedColumnList, SelectedColumnIndex_DBName, SelectedColumnIndex, HSectionDB, SelectedDBIndex, BasePlateName,
  HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr, BasePlateWidth, BasePlateHeight, Node_BP_Data, MinMaxCoordinates, PlateThickness, BasePlateMaterial,
  ConcreteMaterial, BPName, PlanviewBPNameCheck, PlanviewColumnNameCheck, PlanviewNodeCheck
} from '../variables';
import PlanViewDrawing from '../Components/PlanViewDrawing';
import TypoGraphyDropList from '../NewComponents/TypoGraphyDropList';
import Pedestal from './Pedestal';




function Member() {

  const [tabName, setTabName] = React.useState('Column');  
  const [selectedColumnIndex, setSelectedColumnIndex] = useRecoilState(SelectedColumnIndex);
  const [hSectionDB, setHSectionDB] = useRecoilState(HSectionDB);
  const [selectedDBIndex, setSelectedDBIndex] = useRecoilState(SelectedDBIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [selectedColumnList, setSelectedColumnList] = useRecoilState(SelectedColumnList);
  const [basePlateName, setBasePlateName] = useRecoilState(BasePlateName);
  const [planViewNodeCheck, setPlanViewNodeCheck] = useRecoilState(PlanviewNodeCheck);
  const [planViewColumnNameCheck, setPlanViewColumnNameCheck] = useRecoilState(PlanviewColumnNameCheck);
  const [planViewBPNameCheck, setPlanViewBPNameCheck] = useRecoilState(PlanviewBPNameCheck);


  const node_BP_Data = useRecoilValue(Node_BP_Data);
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
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabName(newValue);
  };


  let newBPName = 'BP1'

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
        const BPList:any = basePlateName
        for (let key in BPList){
          if(key = e.target.value){
            newBPName = BPList[key]
          }
        }
        setBPName(newBPName)


      }
    }
  }
  const handleBPNameChange = (e:any) => {
    setBPName(e.target.value)
    let BPList:any = {}
    BPList = JSON.parse(JSON.stringify(basePlateName))
    for(let key in BPList){
      if(Number(key) == selectedColumnIndex){
        console.log('key', key)
        BPList[Number(key)] = e.target.value
      }
    }
    setBasePlateName(BPList)
  }
  return (
    <GuideBox row spacing={1}>
      <Panel height={550}>
        <GuideBox marginTop={1}>
          
          <GuideBox spacing={1}>
            <TypoGraphyDropList
              title = "Column :"
              width = {350}
              dropListwidth = {200}
              items = {selectedColumnList}
              defaultValue = {selectedColumnIndex}
              value = {selectedColumnIndex}
              onChange = {ColumnSelected}
            >

            </TypoGraphyDropList>
            <TypoGraphyTextField 
              title = "Base Plate Name :"
              defaultValue = "BP1"
              value = {bPName}
              width = {350}
              textFieldWidth = {200}
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
          <Tab value = "Pedestal" label='Pedestal'/>
          <Tab value = "Anchor" label = "Anchor"/>
        </TabGroup>
        {tabName === 'Column' && <Column/>}
        {tabName === 'Baseplate' && <BasePlate/>}
        {tabName === 'Pedestal' && <Pedestal/>}
          
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
    </GuideBox>
  );
}

export default Member;