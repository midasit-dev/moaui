import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { VarRebarCode, VarGetCodeList,VarBeforeRebar1,VarBeforeRebar2, VarAfterRebar1, VarAfterRebar2, SelectedRebarList,  BeforeSpacing, AfterSpacing, RebarListData, VarOutputType} from './variables';
import { GuideBox, TextFieldV2, DropList, Button, Typography,Color } from '@midasit-dev/moaui';



const RebarConverter = () => {
  const SelectedCode = useRecoilValue(VarRebarCode);
  const rebarCodeList = useRecoilValue(VarGetCodeList);
  const [varBeforeRebar1, setVarBeforeRebar1] = useRecoilState(VarBeforeRebar1);
  const [varBeforeRebar2, setVarBeforeRebar2] = useRecoilState(VarBeforeRebar2);
  const [varAfterRebar1, setVarAfterRebar1] = useRecoilState(VarAfterRebar1);
  const [varAfterRebar2, setVarAfterRebar2] = useRecoilState(VarAfterRebar2);
  const [selectedRebarList, setSelectedRebarList] = useRecoilState(SelectedRebarList);
  const [beforeSpacing, setBeforeSpacing] = useRecoilState(BeforeSpacing);
  const [afterSpacing, setAfterSpacing] = useRecoilState(AfterSpacing);
  const [rebarListData, setRebarListData] = useRecoilState(RebarListData);
  const outputType = useRecoilValue(VarOutputType);

  const rebarDatabases: any = {
    ASTM: {
      "#3": { area: 70.9676 },
      "#4": { area: 129.032 },
      "#5": { area: 199.9996 },
      "#6": { area: 283.8704 },
      "#7": { area: 387.096 },
      "#8": { area: 509.6764 },
      "#9": { area: 645.16 },
      "#10": { area: 819.3532 },
      "#11": { area: 1006.4496 },
      "#14": { area: 1451.61 },
      "#18": { area: 2580.64 },
    },
    KS: {
      "D6": { area: 31.67 },
      "D10": { area: 71.33 },
      "D13": { area: 126.7 },
      "D16": { area: 198.6 },
      "D19": { area: 286.5 },
      "D22": { area: 387.1 },
      "D25": { area: 506.7 },
      "D29": { area: 642.4 },
      "D32": { area: 794.2 },
      "D35": { area: 956.6 },
      "D38": { area: 1140 },
      "D41": { area: 1340 },
      "D43": { area: 1452 },
      "D51": { area: 2027 },
      "D57": { area: 2579 },
    },
    EN: {
      "P5": { area: 19.63 },
      "P6": { area: 28.27 },
      "P7": { area: 38.50 },
      "P8": { area: 50.27 },
      "P9": { area: 63.60 },
      "P10": { area: 78.54 },
      "P11": { area: 95.00 },
      "P12": { area: 113.10 },
      "P13": { area: 132.70 },
      "P16": { area: 201.06 },
      "P20": { area: 314.16 },
      "P25": { area: 490.87 },
      "P32": { area: 804.25 },
      "P40": { area: 1256.64 },
    },
    GB:{
      "d4": { area: 12.60 },
      "d5": { area: 19.60 },
      "d6": { area: 28.30 },
      "d8": { area: 50.30 },
      "d10": { area: 78.50 },
      "d12": { area: 113.10 },
      "d14": { area: 153.90 },
      "d16": { area: 201.10 },
      "d18": { area: 254.50 },
      "d20": { area: 314.20 },
      "d22": { area: 380.10 },
      "d25": { area: 490.90 },
      "d28": { area: 615.30 },
      "d32": { area: 804.30 },
      "d36": { area: 1017.90 },
      "d40": { area: 1256.10 },
    },
    IS:{
      "P6": { area: 28.30 },
      "P8": { area: 50.30 },
      "P10": { area: 78.60 },
      "P12": { area: 113.10 },
      "P16": { area: 201.10 },
      "P18": { area: 254.50 },
      "P20": { area: 314.20 },
      "P22": { area: 380.10 },
      "P25": { area: 490.90 },
      "P28": { area: 615.70 },
      "P32": { area: 804.20 },
      "P36": { area: 1017.90 },
      "P40": { area: 1256.60 },
    },
    JIS:{
      "D6": { area: 31.67 },
      "D10": { area: 71.33 },
      "D13": { area: 126.7 },
      "D16": { area: 198.6 },
      "D19": { area: 286.5 },
      "D22": { area: 387.1 },
      "D25": { area: 506.7 },
      "D29": { area: 642.4 },
      "D32": { area: 794.2 },
      "D35": { area: 956.6 },
      "D38": { area: 1140 },
      "D41": { area: 1340 },
      "D51": { area: 2027 },
    },
   UNI:{
      "P4" : { area: 13.00 },
      "P5" : { area: 20.00 },
      "P6" : { area: 28.00 },
      "P8" : { area: 50.00 },
      "P10": { area: 79.00 },
      "P12": { area: 113.00 },
      "P14": { area: 154.00 },
      "P16": { area: 201.00 },
      "P18": { area: 254.00 },
      "P20": { area: 314.00 },
      "P22": { area: 380.00 },
      "P24": { area: 452.00 },
      "P26": { area: 531.00 },
      "P30": { area: 707.00 },
      "P32": { area: 804.00 },
      "P36": { area: 1018.00 },
      "P40": { area: 1257.00 },
    },
    AS:{
      "D6": { area: 28.30 },
      "D8":{ area: 50.30 },
      "D10": { area: 78.50 },
      "D12": { area: 113.10 },
      "D16": { area: 201.10 },
      "D20": { area: 314.20 },
      "D22": { area: 380.10 },
      "D25": { area: 490.90 },
      "D28": { area: 615.30 },
      "D32": { area: 804.20 },
      "D36": { area: 1017.90 },
      "D40": { area: 1256.60 },
    }
  };

  let newselectedRebarList:any = [];
  newselectedRebarList.push(['None', 'None']);
  for (let i =0; i<selectedRebarList.length; i++){
    newselectedRebarList.push(selectedRebarList[i]);
  }

  

  let SelectedRebarDatabase:any = [];

  useEffect(() => {
    // Code 선택에 따른 철근 직경 list 업데이트
    let SelectedCodeName = '';
    for (let i = 0; i < rebarCodeList.length; i++) {
      if (rebarCodeList[i][1] === SelectedCode) {
        console.log(rebarCodeList[i][0])
        SelectedCodeName =rebarCodeList[i][0];
        break;
      }
    }
    let selectedRebarData = rebarDatabases[SelectedCodeName];
    for (let key in selectedRebarData) {
      SelectedRebarDatabase.push([key, key]);
    }
    setSelectedRebarList(SelectedRebarDatabase);
    setVarBeforeRebar1(Object.keys(rebarDatabases[SelectedCodeName])[0])
    setVarBeforeRebar2('None')
    setVarAfterRebar1(Object.keys(rebarDatabases[SelectedCodeName])[0])
    setVarAfterRebar2('None')
    setBeforeSpacing('0')
    setAfterSpacing('0')
    // 철근 직경에 따라 Droplist 의 value 변경
  }, [SelectedCode]);

  useEffect(() => {
    if (outputType === 1){
      setVarBeforeRebar2('None')
      setVarAfterRebar2('None')
    }
    else if (outputType === 2){
      setVarAfterRebar2('None')
    }
    else if(outputType ===3){
      setVarBeforeRebar2('None')
    }
  }, [outputType])

  useEffect(() => {
    
    let beforeArea = 0;
    let afterArea = 0;
    let SelectedCodeName = '';
    for (let i = 0; i < rebarCodeList.length; i++) {
      if (rebarCodeList[i][1] === SelectedCode) {
        SelectedCodeName =rebarCodeList[i][0];
        break;
      }
    }
    let selectedRebarData = rebarDatabases[SelectedCodeName];
    if (varBeforeRebar2 === "None"){
      for(let key in selectedRebarData){
        if(key === varBeforeRebar1){
          beforeArea = selectedRebarData[key].area;
        }
      }
    }
    else{
      for(let key in selectedRebarData){
        if(key === varBeforeRebar1){
          beforeArea += selectedRebarData[key].area/2;
        }
        if (key === varBeforeRebar2){
          beforeArea += selectedRebarData[key].area/2;
        }
      }
      
    }

    if (varAfterRebar2 === "None"){
      for(let key in selectedRebarData){
        if(key === varAfterRebar1){
          afterArea = selectedRebarData[key].area;
        }
      }
    }
    else{
      for(let key in selectedRebarData){
        if(key === varAfterRebar1){
          afterArea += selectedRebarData[key].area/2;
        }
        if (key === varAfterRebar2){
          afterArea += selectedRebarData[key].area/2;
        }
      }
    }
    
  
    
    let beforeSpacingValue = Number(beforeSpacing);
    let afterSpacingValue = (beforeSpacingValue * afterArea/beforeArea ).toFixed(2);
    setAfterSpacing(afterSpacingValue);
    // 철근 직경에 따라 Spacing 값 변경 
  }, [varAfterRebar1,varAfterRebar2, beforeSpacing, varBeforeRebar1,varBeforeRebar2])

  const handleAddToList = () => {
    const id = rebarListData.length + 1;
    let beforeRebarSize = varBeforeRebar1;
    let afterRebarSize = varAfterRebar1;
    if (varBeforeRebar2 !== 'None' && varBeforeRebar2!==varBeforeRebar1){
      beforeRebarSize += ' + ' + varBeforeRebar2;
    }
    if (varAfterRebar2 !== 'None' && varAfterRebar2 !== varAfterRebar1){
      afterRebarSize += ' + ' + varAfterRebar2;
    }
  
    let data = {
      id: id,
      BeforeRebarSize: beforeRebarSize,
      BeforeRebarSpacing: beforeSpacing,
      AfterRebarSize: afterRebarSize,
      AfterRebarSpacing: afterSpacing,
    };
    setRebarListData([...rebarListData, data]);
    // Table 에 data 추가
  }

  console.log('initial state', varAfterRebar2)
  return (
    <GuideBox>
    <GuideBox width="100%" row horSpaceBetween spacing = {1} verCenter>   
      <DropList 
        itemList={selectedRebarList}
        width={65}
        value = {varBeforeRebar1}
        onChange={(e: any) => setVarBeforeRebar1(e.target.value)}
      />
      <DropList 
        itemList={newselectedRebarList}
        width={65}
        value = {varBeforeRebar2}
        disabled={outputType ===1 || outputType === 3}
        onChange={(e: any) => setVarBeforeRebar2(e.target.value)}
      />
      <Typography> @ </Typography>
      <TextFieldV2
        value={beforeSpacing}
        width={80}
        type="number"
        numberOptions={{
          min: 0,
          onlyInteger: true,
        }}
        onChange={(e: any) => setBeforeSpacing(e.target.value)}
      />
      <Typography> == </Typography>
      <DropList 
        itemList={selectedRebarList}
        width={65}
        value = {varAfterRebar1}
        onChange={(e: any) => setVarAfterRebar1(e.target.value)}
      />
      <DropList 
        itemList={newselectedRebarList}
        width={65}
        value = {varAfterRebar2}
        disabled={outputType === 1 || outputType === 2} 
        onChange={(e: any) => setVarAfterRebar2(e.target.value)}
      />
      <Typography> @ </Typography>
      <TextFieldV2
        value={afterSpacing}
        width={80}
        onChange={(e: any) => setAfterSpacing(e.target.value)}
        disabled
      />
    </GuideBox> 
    <GuideBox padding={1} height={30} horCenter>
      <Button 
        variant="contained" 
        onClick={handleAddToList}
      >ADD TO BELOW LIST </Button>  
    </GuideBox>
  </GuideBox>
  );
};

export default RebarConverter;