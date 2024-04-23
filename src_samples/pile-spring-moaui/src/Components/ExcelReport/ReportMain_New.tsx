import React, { useState } from "react";
import { GuideBox, Button } from "@midasit-dev/moaui";
import {CalculateBeta, CalculateKv, CalculateKvalue, CalculateProperties, CalculateMatrix, CalAlphaHTheta} from '../../utils_pyscript'
import { ReportJsonResult } from "../variables";
import { report } from "process";


async function ExcelReport_New(
  projectName : string,
  piletableData : any,
  soilData : any,
  topLevel : any,
  GroundLevel : any,
  WaterLevel : any,
  GroupEffectValue : any, 
  SlopeEffectState : any, 
  foundationwidth : any, 
  sidelength : any
){
  let reportjson_items:any = {};
  const sheetName = "report";
  //프로젝트 명
  reportjson_items["_Project"] = {
    "__ProjectName" : projectName
  }
  
  // 1.1 일반
  let ItemArray:any = [];
  for(let i=0; i<piletableData.length; i++){
    const TopProperty = CalculateProperties(piletableData[i], 'top', 'unreinforced')
    ItemArray.push({
      "__PileName" : '('+(i+1)+') '+ piletableData[i].pileName,
      "__TopLevel" : Number(topLevel),
      "__PileType" : piletableData[i].pileType,
      "__ConstructionMethod" : piletableData[i].constructionMethod,
      "__HeadCondition" : piletableData[i].headCondition,
      "__BottomCondition" : piletableData[i].bottomCondition,
      "__PileDia" : Number(TopProperty[3]),
      "__PileLength" : Number(piletableData[i].pileLength)
    })
  }
  reportjson_items["_General"] = ItemArray

  // 1.2 말뚝배치
  reportjson_items["_PileBatch"] = {
    
  }

  //1.3 말뚝 제원
  reportjson_items["_PilePropertyName"] = {
  }

  // (1) 말뚝 타입
  ItemArray = []
  for(let i =0; i<piletableData.length; i++){
    
    // [상부 말뚝 or 하부말뚝 or 단일말뚝]
    let pileType_Name = ''
    let pileType_Name2 = ''
    if (piletableData[i].compositeTypeCheck){
      pileType_Name = '상부 말뚝'
      pileType_Name2 = '하부 말뚝'
    }
    else{
      pileType_Name = '단일 말뚝'
      pileType_Name2 = '단일 말뚝'
    }

    const TopProperty = CalculateProperties(piletableData[i], 'top', 'unreinforced')
    const BottomProperty = CalculateProperties(piletableData[i], 'bottom', 'unreinforced')
    
    // 변수 정의
    let top_conc_E = 0;    let top_conc_Area = 0;    let top_conc_I = 0;
    let top_steel_E = 0;    let top_steel_Area = 0;    let top_steel_I = 0;

    let bot_conc_E = 0;    let bot_conc_Area = 0;    let bot_conc_I = 0;
    let bot_steel_E = 0;    let bot_steel_Area = 0;    let bot_steel_I = 0;

    if (piletableData[i].pileType == '소일시멘트말뚝'){
      top_steel_E = TopProperty[6];    top_steel_Area = TopProperty[4];    top_steel_I = TopProperty[8];
      top_conc_E = TopProperty[7];    top_conc_Area = TopProperty[5];    top_conc_I = TopProperty[9];
    }
    else{
      top_conc_E = TopProperty[1];    top_conc_Area = TopProperty[0];    top_conc_I = TopProperty[2];
    }
    if (piletableData[i].compositeTypeCheck){
      if (piletableData[i].compPileType == '소일시멘트말뚝'){
        bot_steel_E = BottomProperty[6];    bot_steel_Area = BottomProperty[4];    bot_steel_I = BottomProperty[8];
        bot_conc_E = BottomProperty[7];    bot_conc_Area = BottomProperty[5];    bot_conc_I = BottomProperty[9];
      }
      else{
        bot_conc_E = BottomProperty[1];    bot_conc_Area = BottomProperty[0];    bot_conc_I = BottomProperty[2];
      }
    }

    ItemArray.push({
      "__PilePropertyIndex" : '('+(i+1)+') '+ piletableData[i].pileName,
      "__PileProperty_TopName" : pileType_Name,
      "__PileProperty_BotName" : pileType_Name2,
      "__Top_Conc_E" : Number(top_conc_E),
      "__Top_Conc_Area" : Number(top_conc_Area),
      "__Top_Conc_I" : Number(top_conc_I),
      "__Top_Steel_E" : Number(top_steel_E),
      "__Top_Steel_Area" : Number(top_steel_Area),
      "__Top_Steel_I" : Number(top_steel_I),
      "__Bot_Conc_E" : Number(bot_conc_E),
      "__Bot_Conc_Area" : Number(bot_conc_Area),
      "__Bot_Conc_I" : Number(bot_conc_I),
      "__Bot_Steel_E" : Number(bot_steel_E),
      "__Bot_Steel_Area" : Number(bot_steel_Area),
      "__Bot_Steel_I" : Number(bot_steel_I),
    })
  }
  reportjson_items["_PileProperty_Main"] = ItemArray
    
  // 1.4 지반 조건
  let TableData:any = []
  let Level = Number(GroundLevel)
  for(let i=0; i<soilData.length; i++){
    let TableRowData: any = []
    TableRowData.push(soilData[i].LayerNo)
    TableRowData.push(soilData[i].LayerType)
    TableRowData.push(Number(Level.toFixed(3)))
    TableRowData.push(Number(soilData[i].Depth))
    TableRowData.push(Number(soilData[i].AvgNValue))
    TableRowData.push(Number(soilData[i].gamma))
    TableRowData.push(Number(soilData[i].aE0))
    TableRowData.push(Number(soilData[i].aE0_Seis))
    TableRowData.push(Number(soilData[i].vd))
    TableRowData.push(Number(soilData[i].Vsi.toFixed(2)))
    TableRowData.push(Number(soilData[i].ED.toFixed(2)))
    TableRowData.push(Number(soilData[i].DE))
    Level = Level-soilData[i].Depth
    TableData.push(TableRowData)
  }
  reportjson_items["_Soil_Condition"] = {
    "__GroundLevel" : Number(GroundLevel),
    "__WaterLevel" : Number(WaterLevel),
    "__SoilTableData": TableData
  }

  //2. 지반반력계수, 2.1 수평방향 지반반력계수
  reportjson_items["_Soil_R_Coef_Title"] = {}

  // (1) 말뚝 타입 별 특성치 및 표
  ItemArray = []
  

  const CalBetaResult = CalculateBeta(soilData, piletableData, 'normal', SlopeEffectState, GroupEffectValue)
  const CalBetaResult_Seismic = CalculateBeta(soilData, piletableData, 'seismic', SlopeEffectState, GroupEffectValue)
  const CalBetaResult_Period = CalculateBeta(soilData, piletableData, 'period', SlopeEffectState, GroupEffectValue)
  
  for(let i=0; i<piletableData.length; i++){
    //상시, 지진시
    const Alpha_HTheta = CalAlphaHTheta(soilData, SlopeEffectState, piletableData)
    let Level = Number(GroundLevel)
    let TableData_Normal:any = []
    for(let j = 0; j<soilData.length; j++){
      let TableRowData: any = []
      let KH0 =soilData[j].aE0 / 0.3*Alpha_HTheta[j]
      let KH = (KH0)*Math.pow((CalBetaResult[2][i]/0.3),(-3/4))
      let KH0_Seis = soilData[j].aE0_Seis / 0.3*Alpha_HTheta[j]
      let KH_Seis = (KH0_Seis)*Math.pow((CalBetaResult[2][i]/0.3),(-3/4))

      TableRowData.push(soilData[j].LayerNo)
      TableRowData.push(Number(Level).toFixed(3))
      TableRowData.push(Number(soilData[j].Depth))
      TableRowData.push(Number(soilData[j].DE))
      TableRowData.push(Number(Alpha_HTheta[j].toFixed(3)))
      TableRowData.push(Number(soilData[j].aE0*Alpha_HTheta[j].toFixed(0)))
      TableRowData.push(Number(soilData[j].aE0_Seis*Alpha_HTheta[j].toFixed(0)))
      TableRowData.push(Number(KH0.toFixed(0)))
      TableRowData.push(Number(KH0_Seis.toFixed(0)))
      TableRowData.push(Number(KH.toFixed(0)))
      TableRowData.push(Number(KH_Seis.toFixed(0)))
      Level = Level - soilData[j].Depth
      TableData_Normal.push(TableRowData)
    }
    
    

    //고유주기 산정시
    let TableData_Period:any = []
    Level = Number(GroundLevel)
    for(let j = 0; j<soilData.length; j++){
      let TableRowData: any = []
      let KH0_Period = soilData[j].ED / 0.3*Alpha_HTheta[j]
      let KH_Period =  (KH0_Period)*Math.pow((CalBetaResult_Period[2][i]/0.3),(-3/4))
      TableRowData.push(soilData[j].LayerNo)
      TableRowData.push(Number(Level.toFixed(3)))
      TableRowData.push(Number(soilData[j].Depth))
      TableRowData.push(Number(soilData[j].DE))
      TableRowData.push(Number(Alpha_HTheta[j].toFixed(3)))
      TableRowData.push(Number(soilData[j].ED*Alpha_HTheta[j].toFixed(0)))
      TableRowData.push(Number(KH0_Period.toFixed(0)))
      TableRowData.push(Number(KH_Period.toFixed(0)))
      Level = Level - soilData[j].Depth
      TableData_Period.push(TableRowData)
    }
    ItemArray.push({
      "__Soil_R_Coef_Index" : '('+(i+1)+') '+ piletableData[i].pileName,
      "__Normal_Beta" : Number(CalBetaResult[0][i].toFixed(6)) ,
      "__Normal_aE0" : Number(CalBetaResult[1][i].toFixed(3)) ,
      "__Normal_BH" : Number(CalBetaResult[2][i].toFixed(3)) ,
      "__Normal_KH0" : Number(CalBetaResult[3][i].toFixed(3)) ,
      "__Normal_KH" : Number(CalBetaResult[4][i].toFixed(3)) ,
      "__Normal_mu" : GroupEffectValue,
      "__Normal_Table" : TableData_Normal,
      "__Period_Beta" :Number(CalBetaResult_Period[0][i].toFixed(6)),
      "__Period_aE0" :Number(CalBetaResult_Period[1][i].toFixed(3)),
      "__Period_BH" :Number(CalBetaResult_Period[2][i].toFixed(3)),
      "__Period_KH0" :Number(CalBetaResult_Period[3][i].toFixed(3)),
      "__Period_KH" :Number(CalBetaResult_Period[4][i].toFixed(3)),
      "__Period_mu" :GroupEffectValue,
      "__Period_Table" : TableData_Period,
    })

  }
  reportjson_items["_Soil_R_Coef_Main"] = ItemArray

  //3. 말뚝 스프링 정수
  reportjson_items["_PileSpring"] = {}

  //3.2 말뚝 축 직각방향 스프링정수
  reportjson_items["_PileSpring_Title"] = {}

  // 말뚝 타입 별 K 표
  let TableData_Normal = []
  let TableData_Period = []
  const CalKvResult = CalculateKv(piletableData)
  const CalKValueResult = CalculateKvalue(piletableData, GroundLevel, topLevel, soilData, 'normal', SlopeEffectState, GroupEffectValue)
  const CalKValueResult_Seismic = CalculateKvalue(piletableData, GroundLevel, topLevel, soilData, 'seismic', SlopeEffectState, GroupEffectValue)
  const CalKValueResult_Period = CalculateKvalue(piletableData, GroundLevel, topLevel, soilData, 'period', SlopeEffectState, GroupEffectValue)
  for (let i = 0; i<piletableData.length; i++){
    let TableData_Normal_i = []
    let TableData_Period_i = []
    TableData_Normal_i.push(i+1)
    TableData_Normal_i.push(Number(CalKValueResult[i][0].toFixed(0)))
    TableData_Normal_i.push(Number(CalKValueResult[i][1].toFixed(0)))
    TableData_Normal_i.push(Number(CalKValueResult[i][2].toFixed(0)))
    TableData_Normal_i.push(Number(CalKValueResult[i][3].toFixed(0)))
    TableData_Normal_i.push(Number(CalKValueResult_Seismic[i][0].toFixed(0)))
    TableData_Normal_i.push(Number(CalKValueResult_Seismic[i][1].toFixed(0)))
    TableData_Normal_i.push(Number(CalKValueResult_Seismic[i][2].toFixed(0)))
    TableData_Normal_i.push(Number(CalKValueResult_Seismic[i][3].toFixed(0)))
    TableData_Normal_i.push(Number(CalKvResult[0][i]))
    TableData_Normal.push(TableData_Normal_i)

    TableData_Period_i.push(i+1)
    TableData_Period_i.push(Number(CalKValueResult_Period[i][0].toFixed(0)))
    TableData_Period_i.push(Number(CalKValueResult_Period[i][1].toFixed(0)))
    TableData_Period_i.push(Number(CalKValueResult_Period[i][2].toFixed(0)))
    TableData_Period_i.push(Number(CalKValueResult_Period[i][3].toFixed(0)))
    TableData_Period_i.push(Number(CalKvResult[0][i]))
    TableData_Period.push(TableData_Period_i)
  }
  reportjson_items["_PileSpring_Table"] = {
    "__PileSpring_Table_Normal" : TableData_Normal,
    "__PileSpring_Table_Period" : TableData_Period
  }

  // 3.3 말뚝 반력 및 변위 계산
  reportjson_items["_PileMatrix_Title"] = {}

  // 지반스프링정수
  const NormalXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'normal', 'X', GroupEffectValue)
  const SeismicXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'seismic', 'X', GroupEffectValue)
  const PeriodXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'period', 'X', GroupEffectValue)
  const NormalZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'normal', 'Z', GroupEffectValue)
  const SeismicZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'seismic', 'Z', GroupEffectValue)
  const PeriodZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'period', 'Z', GroupEffectValue)

  reportjson_items["_PileSpring_Matrix_Main"] = {
    "__X_Normal_Axx" : Number(NormalXResult[0].toFixed(3)),
    "__X_Normal_Axy" : Number(NormalXResult[1].toFixed(3)),
    "__X_Normal_Axa" : Number(NormalXResult[2].toFixed(3)),
    "__X_Normal_Ayx" : Number(NormalXResult[1].toFixed(3)),
    "__X_Normal_Ayy" : Number(NormalXResult[3].toFixed(3)),
    "__X_Normal_Aya" : Number(NormalXResult[4].toFixed(3)),
    "__X_Normal_Aax" : Number(NormalXResult[2].toFixed(3)),
    "__X_Normal_Aay" : Number(NormalXResult[4].toFixed(3)),
    "__X_Normal_Aaa" : Number(NormalXResult[5].toFixed(3)),

    "__X_Seis_Axx" : Number(SeismicXResult[0].toFixed(3)),
    "__X_Seis_Axy" : Number(SeismicXResult[1].toFixed(3)),
    "__X_Seis_Axa" : Number(SeismicXResult[2].toFixed(3)),
    "__X_Seis_Ayx" : Number(SeismicXResult[1].toFixed(3)),
    "__X_Seis_Ayy" : Number(SeismicXResult[3].toFixed(3)),
    "__X_Seis_Aya" : Number(SeismicXResult[4].toFixed(3)),
    "__X_Seis_Aax" : Number(SeismicXResult[2].toFixed(3)),
    "__X_Seis_Aay" : Number(SeismicXResult[4].toFixed(3)),
    "__X_Seis_Aaa" : Number(SeismicXResult[5].toFixed(3)),

    "__X_Period_Axx" : Number(PeriodXResult[0].toFixed(3)),
    "__X_Period_Axy" : Number(PeriodXResult[1].toFixed(3)),
    "__X_Period_Axa" : Number(PeriodXResult[2].toFixed(3)),
    "__X_Period_Ayx" : Number(PeriodXResult[1].toFixed(3)),
    "__X_Period_Ayy" : Number(PeriodXResult[3].toFixed(3)),
    "__X_Period_Aya" : Number(PeriodXResult[4].toFixed(3)),
    "__X_Period_Aax" : Number(PeriodXResult[2].toFixed(3)),
    "__X_Period_Aay" : Number(PeriodXResult[4].toFixed(3)),
    "__X_Period_Aaa" : Number(PeriodXResult[5].toFixed(3)),

    "__Z_Normal_Axx" : Number(NormalZResult[0].toFixed(3)),
    "__Z_Normal_Axy" : Number(NormalZResult[1].toFixed(3)),
    "__Z_Normal_Axa" : Number(NormalZResult[2].toFixed(3)),
    "__Z_Normal_Ayx" : Number(NormalZResult[1].toFixed(3)),
    "__Z_Normal_Ayy" : Number(NormalZResult[3].toFixed(3)),
    "__Z_Normal_Aya" : Number(NormalZResult[4].toFixed(3)),
    "__Z_Normal_Aax" : Number(NormalZResult[2].toFixed(3)),
    "__Z_Normal_Aay" : Number(NormalZResult[4].toFixed(3)),
    "__Z_Normal_Aaa" : Number(NormalZResult[5].toFixed(3)),

    "__Z_Seis_Axx" : Number(SeismicZResult[0].toFixed(3)),
    "__Z_Seis_Axy" : Number(SeismicZResult[1].toFixed(3)),
    "__Z_Seis_Axa" : Number(SeismicZResult[2].toFixed(3)),
    "__Z_Seis_Ayx" : Number(SeismicZResult[1].toFixed(3)),
    "__Z_Seis_Ayy" : Number(SeismicZResult[3].toFixed(3)),
    "__Z_Seis_Aya" : Number(SeismicZResult[4].toFixed(3)),
    "__Z_Seis_Aax" : Number(SeismicZResult[2].toFixed(3)),
    "__Z_Seis_Aay" : Number(SeismicZResult[4].toFixed(3)),
    "__Z_Seis_Aaa" : Number(SeismicZResult[5].toFixed(3)),

    "__Z_Period_Axx" : Number(PeriodZResult[0].toFixed(3)),
    "__Z_Period_Axy" : Number(PeriodZResult[1].toFixed(3)),
    "__Z_Period_Axa" : Number(PeriodZResult[2].toFixed(3)),
    "__Z_Period_Ayx" : Number(PeriodZResult[1].toFixed(3)),
    "__Z_Period_Ayy" : Number(PeriodZResult[3].toFixed(3)),
    "__Z_Period_Aya" : Number(PeriodZResult[4].toFixed(3)),
    "__Z_Period_Aax" : Number(PeriodZResult[2].toFixed(3)),
    "__Z_Period_Aay" : Number(PeriodZResult[4].toFixed(3)),
    "__Z_Period_Aaa" : Number(PeriodZResult[5].toFixed(3)),
  }

  // Rest
  reportjson_items["_Rest"] = {}



  const reportjson = {"report": reportjson_items}

  console.log(JSON.stringify(reportjson))
  const BaseSheetFilePath = "BaseSheet.xlsx"
  await fetch(BaseSheetFilePath)
  .then(response => response.blob())
  .then(async blob => {
    const formData = new FormData();
    formData.append("file", blob, "BaseSheet.xlsx");
    formData.append("parameter", JSON.stringify(reportjson));
    await fetch('https://moa.rpm.kr-dv-midasit.com/backend/function-executor/plugin-execute', {
      method: 'POST',
      body: formData, // 필요에 따라 적절한 formData를 설정해주세요.
    })
    .then(response => response.blob()) // 응답을 blob 형태로 변환
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; 
      a.download = 'pilespring.xlsx'; // 다운로드할 파일이름 지정
      document.body.appendChild(a); // 이건 UI에 보이지 않게 하기 위함
      a.click(); // 클릭 이벤트 발생
      window.URL.revokeObjectURL(url); // 사용이 끝난 URL 해제
      document.body.removeChild(a); // 추가했던 `<a>` 태그 제거
    })
    .catch(error => console.error('Download error:', error));
    
  })

  return reportjson

}

export default ExcelReport_New;
