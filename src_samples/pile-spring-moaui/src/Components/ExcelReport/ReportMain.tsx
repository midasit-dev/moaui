import { prototype } from 'events';
import * as xlsx from 'xlsx-js-style'
import {ProjectName, SoilData} from '../variables'
import React from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'; 
import PileTable from '../PileProperties/PileTable';
import {CalculateBeta, CalculateKv, CalculateKvalue, CalculateProperties, CalculateMatrix, CalAlphaHTheta} from '../../utils_pyscript'


function ExcelReport(
    projectName: string, piletableData: any, soilData : any,
    topLevel : any, GroundLevel : any, Waterlevel : any,
    GroupEffectValue : any, SlopeEffectState : any, foundationwidth : any, sidelength : any
    ){
    
    const BaseSheetFilePath = 'BaseSheet.xlsx'
    
    fetch(BaseSheetFilePath)
    .then((response) => {
        return response.arrayBuffer();
    })
    .then((arrayBuffer) => {
        const workbook = xlsx.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // 병합된 셀의 정보를 가져옴
        const mergeLoc: xlsx.Range[]| undefined = sheet['!merges'] ;
        let InsertPoint = 0;
        // 복사할 새로운 workbook 생성
        const newWorkbook = xlsx.utils.book_new();
        const newSheetName = 'CopiedSheet';

        // 새 시트 생성
        let newSheet: Record<string, any> = {};
        
         // 각 열의 너비를 2로 설정
        const cols = [];
         for (let i = 0; i < 50; i++) { // 예시로 100개 열을 설정
             cols.push({ wpx: 16}); // 너비 2를 설정 (기본 픽셀 단위인 wpx 사용)
        }
        
        //환경 세팅
        let i = 0
        newSheet['!cols'] = cols;
        newSheet['!ref'] = 'A1:AL500'; 
        newSheet['!merges'] = [];

        // 프로젝트 명
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 0, 5,mergeLoc, [[2,5,projectName]], true);
        // 1.1 일반
        for (i = 0; i < piletableData.length; i++) {
            // Test
            let Data = [ 
                [6,2,'('+(i+1)+') 말뚝 타입 '+ (i+1) + ' : ' + piletableData[i].pileName],
                [7,10,topLevel], 
                [8,10, GroundLevel],
                [9,10, piletableData[i].constructionMethod],
                [10,10, piletableData[i].headCondition],
                [11,10, piletableData[i].bottomCondition],
            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 6, 11, mergeLoc, Data);
            //복합 말뚝인경우
            if (piletableData[i].compositeTypeCheck === true){
                const TopProperty = CalculateProperties(piletableData[i], 'top', 'unreinforced')
                const BotProperty = CalculateProperties(piletableData[i], 'bottom', 'reinforced')
                Data = [
                    [31,10,piletableData[i].pileType], 
                    [32,10,TopProperty[3]],
                    [33,10,piletableData[i].compStartLength],

                    [36,10,TopProperty[0]],
                    [37,10,TopProperty[1]],
                    [38,10,TopProperty[2]],

                    [42,10,TopProperty[5]],
                    [43,10,TopProperty[7]],
                    [44,10,TopProperty[9]],

                    [42,26,TopProperty[4]],
                    [43,26,TopProperty[6]],
                    [44,26,TopProperty[8]],

                    [48,10,piletableData[i].compPileType], 
                    [49,10,BotProperty[3]],
                    [50,10,Number(piletableData[i].pileLength)-Number(piletableData[i].compStartLength)],

                    [53,10,BotProperty[0]],
                    [54,10,BotProperty[1]],
                    [55,10,BotProperty[2]],

                    [59,10,BotProperty[5]],
                    [60,10,BotProperty[7]],
                    [61,10,BotProperty[9]],

                    [59,26,BotProperty[4]],
                    [60,26,BotProperty[6]],
                    [61,26,BotProperty[8]],

                    [64,10,piletableData[i].pileLength],
                ];
                [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 29, 65, mergeLoc, Data);

            // 단일 말뚝인경우
            }
            else{
                const Property = CalculateProperties(piletableData[i], 'top', 'unreinforced')
                Data = [
                    [14,10,piletableData[i].pileType], 
                    [15,10,Property[3]],
                    [16,10,piletableData[i].pileLength],

                    [19,10,Property[0]],
                    [20,10,Property[1]],
                    [21,10,Property[2]],

                    [25,10,Property[5]],
                    [26,10,Property[7]],
                    [27,10,Property[9]],

                    [25,26,Property[4]],
                    [26,26,Property[6]],
                    [27,26,Property[8]],
                ];
                [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 13, 28, mergeLoc, Data);
            }
        }
        
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 34, 34, mergeLoc, [], true);
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 108, 108 ,mergeLoc, [],true);
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 109, 110 ,mergeLoc, [[109,9,GroundLevel],[110,9,Waterlevel]]);
        [newSheet, InsertPoint] = InsertTableHead(newSheet, sheet, InsertPoint, 111, 113 ,mergeLoc,2,33);
        let Level = Number(GroundLevel)
        for (i =0; i<soilData.length; i++){
            let Data = [
                [114,2, soilData[i].LayerNo],
                [114,4, soilData[i].LayerType],
                [114,7, Level.toFixed(3)],
                [114,10, soilData[i].Depth],
                [114,13, soilData[i].AvgNValue],
                [114,15, soilData[i].gamma],
                [114,18, soilData[i].aE0],
                [114,21, soilData[i].aE0_Seis],
                [114,24, soilData[i].vd],
                [114,26, (soilData[i].Vsi).toFixed(2)],
                [114,29, (soilData[i].ED).toFixed(2)],
                [114,32, soilData[i].DE],
            ];
            Level = Level - soilData[i].Depth;
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 114, 114 ,mergeLoc, Data);
        }
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 117, 117 ,mergeLoc);
        //지반반력계수
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 119, 120 ,mergeLoc, [],true);
        const CalBetaResult = CalculateBeta(soilData, piletableData, 'normal', SlopeEffectState, GroupEffectValue)
        const CalBetaResult_Seismic = CalculateBeta(soilData, piletableData, 'seismic', SlopeEffectState, GroupEffectValue)
        const CalBetaResult_Period = CalculateBeta(soilData, piletableData, 'period', SlopeEffectState, GroupEffectValue)
        for (i = 0; i < piletableData.length; i++) {
            let Data =[
                [154,2,'('+(i+1)+') 말뚝 타입 '+ (i+1) + ' : ' + piletableData[i].pileName],
                [156,16, (CalBetaResult[0][i]).toFixed(6)],
                [157,16, (1/Number(CalBetaResult[0][i])).toFixed(6)],
                [158,16, (CalBetaResult[1][i]).toFixed(3)],
                [159,16, (CalBetaResult[2][i]).toFixed(3)],
                [160,16, (CalBetaResult[3][i]).toFixed(3)],
                [161,16, (CalBetaResult[4][i]).toFixed(3)],
                [162,16, GroupEffectValue],

                [165,16, ((CalBetaResult[0][i])).toFixed(6)],
                [166,16, (1/Number(CalBetaResult[0][i])).toFixed(6)],
                [167,16, (CalBetaResult[1][i]).toFixed(3)],
                [168,16, (CalBetaResult[2][i]).toFixed(3)],
                [169,16, (CalBetaResult[3][i]).toFixed(3)],
                [170,16, (CalBetaResult[4][i]).toFixed(3)],
                [171,16, GroupEffectValue],

            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 153, 172 ,mergeLoc, Data);
            [newSheet, InsertPoint] = InsertTableHead(newSheet, sheet, InsertPoint, 173, 175 ,mergeLoc,3,37);
            const Alpha_HTheta = CalAlphaHTheta(soilData, SlopeEffectState, piletableData)
            let Level = Number(GroundLevel)
            for (let j = 0; j < soilData.length; j++){
                //지진시 BH 는 상시의 BH 로 계산
                let KH0 =soilData[j].aE0 / 0.3*Alpha_HTheta[j]
                let KH = (KH0)*Math.pow((CalBetaResult[2][i]/0.3),(-3/4))
                let KH0_Seis = soilData[j].aE0_Seis / 0.3*Alpha_HTheta[j]
                let KH_Seis = (KH0_Seis)*Math.pow((CalBetaResult[2][i]/0.3),(-3/4))
                let Data = [
                    [176,3,soilData[j].LayerNo],
                    [176,5,(Level).toFixed(3)],
                    [176,8,soilData[j].Depth],
                    [176,11,soilData[j].DE],
                    [176,14,Alpha_HTheta[j].toFixed(3)],
                    [176,17,(soilData[j].aE0*Alpha_HTheta[j]).toFixed(0)],
                    [176,20,(soilData[j].aE0_Seis*Alpha_HTheta[j]).toFixed(0)],
                    [176,23,(KH0).toFixed(0)],
                    [176,26,(KH0_Seis).toFixed(0)],
                    [176,29,(KH).toFixed(0)],
                    [176,32,(KH_Seis).toFixed(0)],
                    [176,35,(KH_Seis*soilData[j].DE).toFixed(0)],
                ];
                Level = Level - soilData[j].Depth;
                [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 176, 176 ,mergeLoc, Data);
            }
            Data = [
                [181,16, ((CalBetaResult_Period[0][i])).toFixed(6)],
                [182,16, (1/Number(CalBetaResult_Period[0][i])).toFixed(6)],
                [183,16, (CalBetaResult_Period[1][i]).toFixed(3)],
                [184,16, (CalBetaResult_Period[2][i]).toFixed(3)],
                [185,16, (CalBetaResult_Period[3][i]).toFixed(3)],
                [186,16, (CalBetaResult_Period[4][i]).toFixed(3)],
                [187,16, GroupEffectValue],
            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 179, 188 ,mergeLoc, Data);
            [newSheet, InsertPoint] = InsertTableHead(newSheet, sheet, InsertPoint, 189, 190 ,mergeLoc,3,25);
            Level = Number(GroundLevel)
            for (let j = 0; j < soilData.length; j++){
                let KH0_Period = soilData[j].ED / 0.3*Alpha_HTheta[j]
                let KH_Period =  (KH0_Period)*Math.pow((CalBetaResult_Period[2][i]/0.3),(-3/4))
                let Data = [
                    [191,3,soilData[j].LayerNo],
                    [191,5,(Level).toFixed(3)],
                    [191,8,soilData[j].Depth],
                    [191,11,soilData[j].DE],
                    [191,14,Alpha_HTheta[j].toFixed(3)],
                    [191,17,(soilData[j].ED*Alpha_HTheta[j]).toFixed(0)],
                    [191,20,(KH0_Period).toFixed(0)],
                    [191,23,(KH_Period).toFixed(0)],
                ];
                Level = Level - soilData[j].Depth;
                [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 191, 191 ,mergeLoc, Data);
            }
        }
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 194, 194 ,mergeLoc, );

        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 196, 197 ,mergeLoc, [],true);

        
        const CalKvResult = CalculateKv(piletableData)
        for (i = 0; i < piletableData.length; i++) {
            let Data = [
                [198,3,'('+(i+1)+') 말뚝 타입 '+ (i+1) + ' : ' + piletableData[i].pileName],
                [200,6,CalKvResult[1][i]],
                [200,12,CalKvResult[2][i]],

                [202,8,CalKvResult[3][i]],
                [203,8,CalKvResult[4][i]],
                [206,8,CalKvResult[5][i]],
                [207,8,CalKvResult[6][i]],
                [209,8,CalKvResult[0][i]],
            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 198, 210 ,mergeLoc, Data);
        }

        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 223, 223 ,mergeLoc, [],true);
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 224, 232 ,mergeLoc, [],true);
        const CalKValueResult = CalculateKvalue(piletableData, GroundLevel, topLevel, soilData, 'normal', SlopeEffectState, GroupEffectValue)
        const CalKValueResult_Seismic = CalculateKvalue(piletableData, GroundLevel, topLevel, soilData, 'seismic', SlopeEffectState, GroupEffectValue)
        const CalKValueResult_Period = CalculateKvalue(piletableData, GroundLevel, topLevel, soilData, 'period', SlopeEffectState, GroupEffectValue)

        for (i = 0; i < piletableData.length; i++) {
            let Data = [[234,2,'('+(i+1)+') 말뚝 타입 '+ (i+1) + ' : ' + piletableData[i].pileName]];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 234, 234 ,mergeLoc, Data);
            // 상시 축방향 스프링 정수
            [newSheet, InsertPoint] = InsertTableHead(newSheet, sheet, InsertPoint, 235, 236 ,mergeLoc,2,19);
            Data = [
                [237,5,CalKValueResult[i][0].toFixed(0)],
                [237,8,CalKValueResult[i][1].toFixed(0)],
                [237,11,CalKValueResult[i][2].toFixed(0)],
                [237,14,CalKValueResult[i][3].toFixed(0)],
            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 237, 237 ,mergeLoc, Data);
            
            // 지진시 축방향 스프링 정수
            Data = [
                [238,5,CalKValueResult_Seismic[i][0].toFixed(0)],
                [238,8,CalKValueResult_Seismic[i][1].toFixed(0)],
                [238,11,CalKValueResult_Seismic[i][2].toFixed(0)],
                [238,14,CalKValueResult_Seismic[i][3].toFixed(0)],
            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 238, 238 ,mergeLoc, Data);
            
            // 지진시 액상화 축방향 스프링 정수
            Data = [
                [239,5,CalKValueResult_Seismic[i][0].toFixed(0)],
                [239,8,CalKValueResult_Seismic[i][1].toFixed(0)],
                [239,11,CalKValueResult_Seismic[i][2].toFixed(0)],
                [239,14,CalKValueResult_Seismic[i][3].toFixed(0)],
            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 239, 239 ,mergeLoc, Data);

            // 고유주기 축방향 스프링 정수
            Data = [
                [240,5,CalKValueResult_Period[i][0].toFixed(0)],
                [240,8,CalKValueResult_Period[i][1].toFixed(0)],
                [240,11,CalKValueResult_Period[i][2].toFixed(0)],
                [240,14,CalKValueResult_Period[i][3].toFixed(0)],
            ];
            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 240, 240 ,mergeLoc, Data);

            [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 241, 241 ,mergeLoc, Data);
        }
        // 매트릭스
        
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 243, 243 ,mergeLoc, [],true);
        
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 284, 286 ,mergeLoc, [],);
        const NormalXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'normal', 'X', GroupEffectValue)
        let Data = [
            [287,13, NormalXResult[0].toFixed(3)],
            [287,18, NormalXResult[1].toFixed(3)],
            [287,23, NormalXResult[2].toFixed(3)],
            [289,13, NormalXResult[1].toFixed(3)],
            [289,18, NormalXResult[3].toFixed(3)],
            [289,23, NormalXResult[4].toFixed(3)],
            [291,13, NormalXResult[2].toFixed(3)],
            [291,18, NormalXResult[4].toFixed(3)],
            [291,23, NormalXResult[5].toFixed(3)],
        ];
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 287, 292 ,mergeLoc, Data);

        const SeismicXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'seismic', 'X', GroupEffectValue)
        Data = [
            [294,13, SeismicXResult[0].toFixed(3)],
            [294,18, SeismicXResult[1].toFixed(3)],
            [294,23, SeismicXResult[2].toFixed(3)],
            [296,13, SeismicXResult[1].toFixed(3)],
            [296,18, SeismicXResult[3].toFixed(3)],
            [296,23, SeismicXResult[4].toFixed(3)],
            [298,13, SeismicXResult[2].toFixed(3)],
            [298,18, SeismicXResult[4].toFixed(3)],
            [298,23, SeismicXResult[5].toFixed(3)],
        ];
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 293, 299 ,mergeLoc, Data);

        const PeriodXResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'period', 'X', GroupEffectValue)
        Data = [
            [301,13, PeriodXResult[0].toFixed(3)],
            [301,18, PeriodXResult[1].toFixed(3)],
            [301,23, PeriodXResult[2].toFixed(3)],
            [303,13, PeriodXResult[1].toFixed(3)],
            [303,18, PeriodXResult[3].toFixed(3)],
            [303,23, PeriodXResult[4].toFixed(3)],
            [305,13, PeriodXResult[2].toFixed(3)],
            [305,18, PeriodXResult[4].toFixed(3)],
            [305,23, PeriodXResult[5].toFixed(3)],
        ];
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 300, 306 ,mergeLoc, Data);

        const NormalZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'normal', 'Z', GroupEffectValue)
        Data = [
            [309,13, NormalZResult[0].toFixed(3)],
            [309,18, NormalZResult[1].toFixed(3)],
            [309,23, NormalZResult[2].toFixed(3)],
            [311,13, NormalZResult[1].toFixed(3)],
            [311,18, NormalZResult[3].toFixed(3)],
            [311,23, NormalZResult[4].toFixed(3)],
            [313,13, NormalZResult[2].toFixed(3)],
            [313,18, NormalZResult[4].toFixed(3)],
            [313,23, NormalZResult[5].toFixed(3)],
        ];
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 307, 314 ,mergeLoc, Data);

        const SeismicZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'seismic', 'Z', GroupEffectValue)
        Data = [
            [316,13, SeismicZResult[0].toFixed(3)],
            [316,18, SeismicZResult[1].toFixed(3)],
            [316,23, SeismicZResult[2].toFixed(3)],
            [318,13, SeismicZResult[1].toFixed(3)],
            [318,18, SeismicZResult[3].toFixed(3)],
            [318,23, SeismicZResult[4].toFixed(3)],
            [320,13, SeismicZResult[2].toFixed(3)],
            [320,18, SeismicZResult[4].toFixed(3)],
            [320,23, SeismicZResult[5].toFixed(3)],
        ];
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 315, 321 ,mergeLoc, Data);
        const PeriodZResult = CalculateMatrix(piletableData, foundationwidth, sidelength, GroundLevel, topLevel, soilData, SlopeEffectState, 'period', 'Z', GroupEffectValue)
        Data = [
            [323,13, PeriodZResult[0].toFixed(3)],
            [323,18, PeriodZResult[1].toFixed(3)],
            [323,23, PeriodZResult[2].toFixed(3)],
            [325,13, PeriodZResult[1].toFixed(3)],
            [325,18, PeriodZResult[3].toFixed(3)],
            [325,23, PeriodZResult[4].toFixed(3)],
            [327,13, PeriodZResult[2].toFixed(3)],
            [327,18, PeriodZResult[4].toFixed(3)],
            [327,23, PeriodZResult[5].toFixed(3)],
        ];
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 322, 328 ,mergeLoc, Data);
        
        Data = [
            [331,3, NormalXResult[0]],
            [331,8, 0],
            [331,13, NormalXResult[1]],
            [331,18, 0],
            [331,23, NormalXResult[2]],
            [331,28, 0],

            [333,3, 0],
            [333,8, NormalZResult[0]],
            [333,13, NormalZResult[0]],
            [333,18, -NormalZResult[2]],
            [333,23, 0],
            [333,28, 0],

            [335,3, NormalXResult[1]],
            [335,8, NormalZResult[1]],
            [335,13, NormalXResult[3]],
            [335,18, NormalZResult[4]],
            [335,23, -NormalXResult[4]],
            [335,28, 0],

            [337,3, 0],
            [337,8, -NormalZResult[2]],
            [337,13, NormalZResult[4]],
            [337,18, NormalZResult[5]],
            [337,23, 0],
            [337,28, 0],

            [339,3, NormalXResult[2]],
            [339,8, 0],
            [339,13, -NormalXResult[4]],
            [339,18, 0],
            [339,23, NormalXResult[5]],
            [339,28, 0],

            [341,3, 0],
            [341,8, 0],
            [341,13, 0],
            [341,18, 0],
            [341,23, 0],
            [341,28, 1000000000000],
            
        ];
        [newSheet, InsertPoint] = InsertPartWithValues(newSheet, sheet, InsertPoint, 329, 341 ,mergeLoc, Data);
        
        
        xlsx.utils.book_append_sheet(newWorkbook, newSheet, newSheetName);
        xlsx.writeFile(newWorkbook, 'NewWorkbook.xlsx');
        
    })
}

export default ExcelReport



function InsertPartWithValues(newSheet: Record<string, any>, 
    sheet: Record<string, any>, 
    InsertPoint : number, 
    OrgStartRow: number, // BaseSheet에서 복사할 시작 행
    OrgEndRow: number, // BaseSheet에서 복사할 끝 행
    mergeLoc?: xlsx.Range[] | undefined,
    Data? : any,// 삽입할 값이 있는 경우 
    OrgBorder? : boolean,
    ValueBorder? : boolean
    ):[Record<string, any>, number]{
    // range를 복사하여 새로운 시트에 추가
    
    for (let i = OrgStartRow; i <= OrgEndRow; i++) {
        for (let j = 0; j < 38; j++) { 
            const OrgCellAddress = xlsx.utils.encode_cell({ c: j, r: i });
            const newCellAddress = xlsx.utils.encode_cell({ c: j, r: (i-OrgStartRow+InsertPoint) });
            newSheet[newCellAddress] = sheet[OrgCellAddress];
            if (OrgBorder) {
                newSheet[newCellAddress] = {...newSheet[newCellAddress], s: {font: { bold : true, name: "Malgun Gothic", sz: 10 }, alignment : {vertical : 'center'}}};
            }
            else{
                newSheet[newCellAddress] = {...newSheet[newCellAddress], s: {font: { name: "Malgun Gothic", sz: 10 }, alignment : {vertical : 'center'}}};
            }
        }
    }

    // 병합된 셀의 정보를 가져옴
    if (mergeLoc) {
        mergeLoc.forEach((range) => {        
            if (range.s.r >= OrgStartRow && range.e.r <= OrgEndRow) {
                const newRange = {
                    s: { c: range.s.c, r: range.s.r + InsertPoint- OrgStartRow},
                    e: { c: range.e.c, r: range.e.r + InsertPoint- OrgStartRow},
                };
                newSheet['!merges'].push(newRange);
            }
        });
    }

    // 특정 셀에 값을 추가
    if (Data) {
        for (let i = 0; i < Data.length; i++) {
            // Data[i] 의 첫번째 값은 BaseSheet 행번호, 두번째 값은 BaseSheet 열번호, 세번째 값은 삽입할 값
            const newCellAddress = xlsx.utils.encode_cell({ c: Data[i][1], r: InsertPoint + Data[i][0] - OrgStartRow });
            newSheet[newCellAddress] = {v : Data[i][2], t: 's'}
            if (ValueBorder) {
                newSheet[newCellAddress] = {...newSheet[newCellAddress], s: {font: { bold : true, name: "Malgun Gothic", sz: 10 }, alignment : {vertical : 'center'}}};
            }
            newSheet[newCellAddress] = {...newSheet[newCellAddress], s: {font: { name: "Malgun Gothic", sz: 10 }}};
        }
    }
    InsertPoint = InsertPoint + OrgEndRow - OrgStartRow + 1;
    return [newSheet, InsertPoint]
}

function InsertTableHead(newSheet: Record<string, any>, 
    sheet: Record<string, any>, 
    InsertPoint : number, 
    OrgStartRow: number, // BaseSheet에서 복사할 시작 행
    OrgEndRow: number, // BaseSheet에서 복사할 끝 행
    mergeLoc: xlsx.Range[] | undefined,
    TableStartCol : number,
    TableEndCol : number,
    ):[Record<string, any>, number]{
    // range를 복사하여 새로운 시트에 추가
    
    for (let i = OrgStartRow; i <= OrgEndRow; i++) {
        for (let j = 0; j < 38; j++) { 
            const OrgCellAddress = xlsx.utils.encode_cell({ c: j, r: i });
            const newCellAddress = xlsx.utils.encode_cell({ c: j, r: (i-OrgStartRow+InsertPoint) });
            newSheet[newCellAddress] = sheet[OrgCellAddress];
            newSheet[newCellAddress] = {...newSheet[newCellAddress], 
                s: {
                font: { name: "Malgun Gothic", sz: 10 }, 
                alignment : {vertical : 'center'}
            }};
        }
    }
    
    for(let i = OrgStartRow; i <= OrgEndRow; i++){
        for (let j= TableStartCol; j <= TableEndCol; j++){
            const newCellAddress = xlsx.utils.encode_cell({ c: j, r: (i-OrgStartRow+InsertPoint) });
            newSheet[newCellAddress] = {...newSheet[newCellAddress], 
                s: {
                    font: {bold : true, name: "Malgun Gothic", sz: 8 }, 
                    alignment : {vertical : 'center', horizontal :'center'}, 
                    fill : {fgColor : {rgb : "E9E9E9"}},
                    
                }};
        }
    }

    // 병합된 셀의 정보를 가져옴
    if (mergeLoc) {
        mergeLoc.forEach((range) => {        
            if (range.s.r >= OrgStartRow && range.e.r <= OrgEndRow) {
                const newRange = {
                    s: { c: range.s.c, r: range.s.r + InsertPoint- OrgStartRow},
                    e: { c: range.e.c, r: range.e.r + InsertPoint- OrgStartRow},
                };
                newSheet['!merges'].push(newRange);
            }
        });
    }

    InsertPoint = InsertPoint + OrgEndRow - OrgStartRow + 1;
    return [newSheet, InsertPoint]
}

