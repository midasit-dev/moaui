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
  SelectedColumnIndex_DBName } from '../variables';
function Pedestal() {

	const [pedestalCheck, setPedestalCheck] = useRecoilState(PedestalCheck);
	const [pedestalHeight, setPedestalHeight] = useRecoilState(PedestalHeight);
	const [pedestalWidth, setPedestalWidth] = useRecoilState(PedestalWidth);

  const selectedColumnIndex = useRecoilValue(SelectedColumnIndex);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
  const [node_BP_Data, setNode_BP_Data] = useRecoilState(Node_BP_Data);


  const handlePedestalWidth = (e:any) => {
    setPedestalWidth(e.target.value)
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]

    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      console.log(newNode_BP_Data[key].BASEPLATE.COLUMN.DB)
      if (newNode_BP_Data[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        newNode_BP_Data[key].PEDESTAL.WIDTH = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }

  const handlePedestalHeight = (e:any) => {
    setPedestalHeight(e.target.value)
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]

    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      console.log(newNode_BP_Data[key].BASEPLATE.COLUMN.DB)
      if (newNode_BP_Data[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        newNode_BP_Data[key].PEDESTAL.HEIGHT = Number(e.target.value)
      }
    }
    setNode_BP_Data(newNode_BP_Data)
  }

  
  return (
    <GuideBox >
      <GuideBox  width ={350} horCenter>
        <SectionDrawing/>
      </GuideBox>
      <GuideBox width = {350}>
      <Separator />
      </GuideBox>
      
      
			<GuideBox row verCenter>
				<Check checked={pedestalCheck} onChange={
					(e:any)=>setPedestalCheck(e.target.checked)
				}/>
				<Typography >Pedestal</Typography>
			</GuideBox>

			<TypoGraphyTextField
				width = {300}
				height = {30}
				title = 'Pedestal Width'
				textFieldWidth = {150}
				placeholder = 'Enter Pedestal Width'
				defaultValue = '1000'
				value = {pedestalWidth}
				onChange = {handlePedestalWidth}
			/>

			<TypoGraphyTextField
				width = {300}
				height = {30}
				title = 'Pedestal Height'
				textFieldWidth = {150}
				placeholder = 'Enter Pedestal Height'
				defaultValue = '1000'
				value = {pedestalHeight}
				onChange = {handlePedestalHeight}
			/>

    </GuideBox>
  );
}

export default Pedestal;