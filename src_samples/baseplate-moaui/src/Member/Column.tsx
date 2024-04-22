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
import {HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr,UserDefineState, DBList, HSectionDB, 
  SelectedDBIndex, SelectedColumnIndex, Node_BP_Data, ConcreteMaterial, SelectedColumnIndex_DBName,} from '../variables';

function Column() {

  const [hBeamH, setHBeamH] = useRecoilState(HBeamH);
	const [hBeamB, setHBeamB] = useRecoilState(HBeamB);
	const [hBeamtf, setHBeamtf] = useRecoilState(HBeamtf);
	const [hBeamtw, setHBeamtw] = useRecoilState(HBeamtw);
	const [hBeamr, setHBeamr] = useRecoilState(HBeamr);
  const [userDefineState, setUserDefineState] = useRecoilState(UserDefineState);
  const [dbList, setDBList] = useRecoilState(DBList);
  const [hSectionDB, setHSectionDB] = useRecoilState(HSectionDB);
  const selectedDBIndex = useRecoilValue(SelectedDBIndex);
  const selectedColumnIndex = useRecoilValue(SelectedColumnIndex);
  const [node_BP_Data, setNode_BP_Data] = useRecoilState(Node_BP_Data);
  const [concreteMaterial, setConcreteMaterial] = useRecoilState(ConcreteMaterial);
  const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);

  const concreteMaterialList = [
    ['24', '24'],
    ['27', '27'],
    ['30', '30'],
  ]

  const handleConcreteMaterial = (e:any) => {
    setConcreteMaterial(e.target.value)
    const DBSection_Name = columnIndex_DBName[selectedColumnIndex]
    let newNode_BP_Data:any = {}
    newNode_BP_Data = JSON.parse(JSON.stringify(node_BP_Data))
    for (let key in newNode_BP_Data){
      if (newNode_BP_Data[key].BASEPLATE.COLUMN.DB == DBSection_Name){
        newNode_BP_Data[key].BASEPLATE.COLUMN.MATL = e.target.value
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
      <GuideBox  marginTop={1}>
        <TypoGraphyDropList 
          title = "DB"
          width = {350}
          dropListwidth = {150}
          items = {dbList}
          droplistDisabled = {true}
        />

        <TypoGraphyDropList
          title = "H Section DB"
          width = {350}
          dropListwidth = {150}
          items = {hSectionDB}
          value = {selectedDBIndex} 
          droplistDisabled = {true}
        />
        <TypoGraphyDropList
          title = "Concrete Material"
          width = {350}
          dropListwidth = {150}
          items = {concreteMaterialList}
          value = {concreteMaterial}
          onChange = {handleConcreteMaterial}
        />
      </GuideBox>
    </GuideBox>
  );
}

export default Column;