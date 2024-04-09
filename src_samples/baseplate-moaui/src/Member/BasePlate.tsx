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

import { BasePlateWidth, BasePlateHeight,PedestalCheck, PedestalHeight,PedestalWidth, SelectedColumnIndex, Node_BP_Data,
  SelectedColumnIndex_DBName, PlateThickness, BasePlateMaterial } from '../variables';
function BasePlate() {


  const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
	const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);

	const [pedestalCheck, setPedestalCheck] = useRecoilState(PedestalCheck);
	const [pedestalHeight, setPedestalHeight] = useRecoilState(PedestalHeight);
	const [pedestalWidth, setPedestalWidth] = useRecoilState(PedestalWidth);

  const selectedColumnIndex = useRecoilValue(SelectedColumnIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [node_BP_Data, setNode_BP_Data] = useRecoilState(Node_BP_Data);
  const [plateThickness, setPlateThickness] = useRecoilState(PlateThickness);
  const [basePlateMaterial, setBasePlateMaterial] = useRecoilState(BasePlateMaterial);
  const handleBasePlateWidth = (e:any) => {
    setBasePlateWidth(e.target.value)
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]

    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (newNode_BP_Data[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        newNode_BP_Data[key].BASEPLATE.PLATE.WIDTH = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }

  const handleBasePlateHeight = (e:any) => {
    setBasePlateHeight(e.target.value)
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]

    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (newNode_BP_Data[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        newNode_BP_Data[key].BASEPLATE.PLATE.HEIGHT = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }

  const handlePlateThickness = (e:any) => {
    setPlateThickness(e.target.value)
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]

    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (newNode_BP_Data[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        newNode_BP_Data[key].BASEPLATE.PLATE.THIK = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }

  const handleBasePlateMaterial = (e:any) => {
    setBasePlateMaterial(e.target.value)
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]
    let MaterialName:any = ''
    for (let i = 0; i<materialList.length; i++){
      if (materialList[i][1] == e.target.value){
        MaterialName = materialList[i][0]
      }
    }
    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      console.log(newNode_BP_Data[key].BASEPLATE.COLUMN.DB)
      if (newNode_BP_Data[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        newNode_BP_Data[key].BASEPLATE.PLATE.MATL = MaterialName
      }
    }
    console.log(newNode_BP_Data)
    setNode_BP_Data(newNode_BP_Data)
  }
  const shapeList = [
    ["Rec", 1],
    ["Round", 2],
  ]

  const materialList = [
    ["SS235", "SS235"],
    ["SS275", "SS275"],
  ]
  return (
    <GuideBox >
      <GuideBox  width ={350} horCenter>
        <SectionDrawing/>
      </GuideBox>
      <GuideBox width = {350}>
      <Separator />
      </GuideBox>
      <TypoGraphyDropList 
        title = "Shape"
        width = {300}
        dropListwidth = {150}
        items = {shapeList}
        value = {1}
      />
      <TypoGraphyDropList 
        title = "Material"
        width = {300}
        dropListwidth = {150}
        items = {materialList}
        value = {basePlateMaterial}
        onChange = {handleBasePlateMaterial}
      />
      <TypoGraphyTextField
				width = {300}
				height = {30}
				title = 'Base Plate Width'
				textFieldWidth = {150}
				placeholder = 'Enter Base Plate Width'
				defaultValue = '1000'
				value = {basePlateWidth}
				onChange = {handleBasePlateWidth}
			/>
			<TypoGraphyTextField
				width = {300}
				height = {30}
				title = 'Base Plate Height'
				textFieldWidth = {150}
				placeholder = 'Enter Base Plate Height'
				defaultValue = '1000'
        value = {basePlateHeight}
				onChange = {handleBasePlateHeight}
			/>
			
      <TypoGraphyTextField
				width = {300}
				height = {30}
				title = 'Plate Thickness'
				textFieldWidth = {150}
				placeholder = 'Enter Base Plate Height'
				defaultValue = '6'
        value = {plateThickness}
				onChange = {handlePlateThickness}
			/>
			

    </GuideBox>
  );
}

export default BasePlate;