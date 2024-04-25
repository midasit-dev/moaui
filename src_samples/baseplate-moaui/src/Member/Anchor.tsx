import React, { useEffect } from 'react';
import { 
	GuideBox, 
	Panel,
	Check,
	Typography,
	TabGroup,
	Tab,
  Separator,
  
} from '@midasit-dev/moaui';
import {Divider, Box} from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';
import TypoGraphyDropList from '../NewComponents/TypoGraphyDropList';
import SectionDrawing from '../Components/SectionDrawing';

import { BasePlateWidth, BasePlateHeight, SelectedColumnIndex, Node_BP_Data,
  SelectedColumnIndex_DBName, PlateThickness, BasePlateMaterial, PlanViewSelectedNode
  ,AnchorDiameter, AnchorXPitch, AnchorYPitch} from '../variables';
function Anchor() {


  const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
	const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);


  const [planViewSelectedNode, setPlanViewSelectedNode] = useRecoilState(PlanViewSelectedNode)
  const selectedColumnIndex = useRecoilValue(SelectedColumnIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [node_BP_Data, setNode_BP_Data] = useRecoilState(Node_BP_Data);
  const [plateThickness, setPlateThickness] = useRecoilState(PlateThickness);
  const [basePlateMaterial, setBasePlateMaterial] = useRecoilState(BasePlateMaterial);

  const [anchorDiameter, setAnchorDiameter] = useRecoilState(AnchorDiameter);
  const [anchorXPitch, setAnchorXPitch] = useRecoilState(AnchorXPitch);
  const [anchorYPitch, setAnchorYPitch] = useRecoilState(AnchorYPitch);
  
  const handleAnchorXPitch = (e:any) => {
    setAnchorXPitch(e.target.value)
    
    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (planViewSelectedNode.includes(key)){
        newNode_BP_Data[key].BASEPLATE.ANCHOR.XPOSITION = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }

  const handleAnchorYPitch = (e:any) => {
    setAnchorYPitch(e.target.value)

    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (planViewSelectedNode.includes(key)){
        newNode_BP_Data[key].BASEPLATE.ANCHOR.YPOSITION = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }

  const handleAnchorDiameter = (e:any) => {
    setAnchorDiameter(e.target.value)
    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (planViewSelectedNode.includes(key)){
        newNode_BP_Data[key].BASEPLATE.ANCHOR.DIAMETER = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }
  

  const AnchorType = [
    ["Cast In Place", 1],
    ["Post Installed", 2],
  ]

  const AnchorDiameterList = [
    ["6", 6],
    ["8", 7],
    ["10", 10],
    ["12", 12],
    ["16", 16],
    ["20", 20],
    ["22", 22],
    ["25", 25],
  ]
  return (
    <GuideBox >
      <GuideBox  width ={280} horCenter>
        <SectionDrawing/>
      </GuideBox>
      <GuideBox width = {280}>
      <Separator />
      </GuideBox>
      <TypoGraphyDropList 
        title = "Anchor Type"
        width = {280}
        dropListwidth = {150}
        items = {AnchorType}
        value = {1}
      />
      <TypoGraphyDropList 
        title = "Diameter"
        width = {280}
        dropListwidth = {150}
        items = {AnchorDiameterList}
        value = {anchorDiameter}
        onChange = {handleAnchorDiameter}
      />
      <TypoGraphyTextField
				width = {280}
				height = {30}
				title = 'Position(x) (mm)'
				textFieldWidth = {150}
				placeholder = 'Enter Anchor Position(x)'
				value = {anchorXPitch}
				onChange = {handleAnchorXPitch}
			/>
			<TypoGraphyTextField
				width = {280}
				height = {30}
				title = 'Position(y) (mm)'
				textFieldWidth = {150}
				placeholder = 'Enter Anchor Position(y)'
        value = {anchorYPitch}
				onChange = {handleAnchorYPitch}
			/>
			

    </GuideBox>
  );
}

export default Anchor;