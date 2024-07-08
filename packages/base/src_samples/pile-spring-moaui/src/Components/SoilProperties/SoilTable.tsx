import React, { useEffect } from 'react';
import { useState, useCallback} from 'react';
import {GuideBox, 
Typography,
IconButton, Icon, Button, DataGrid
} from '@midasit-dev/moaui';
import {} from '@mui/material';

import {useRecoilState, useRecoilValue,RecoilState} from 'recoil';
import {SoilData, CalVsiState, SoilDataSelector, LiquefactionState, SlopeEffectState, GroundLevel} from '../variables';

function SoilTable(){

    //Table 배열 형식
    interface Row {
        id: number;
        LayerNo : number;
        LayerType : string;
        LayerDepth : number;
        Depth : number;
        AvgNValue : number;
        c : number;
        pi : number;
        gamma : number;
        aE0 : number;
        aE0_Seis : number;
        vd : number;
        Vsi : number;
        ED : number;
        DE : number;
        Length : number;
    }

    //Vsi Editable 상태
    const VsiEditable = useRecoilValue(CalVsiState)
    //Liquirefaction 상태
    const DEEditable = useRecoilValue(LiquefactionState)

    //SlopeEffect 상태
    const SlopeEffect = useRecoilValue(SlopeEffectState)

    const [soilData, setSoilData] = useRecoilState(SoilData)
    
    const groundLevel = useRecoilValue(GroundLevel)
    const columns: any = [
        {field : 'LayerNo', headerName : '층 No', width : 50, editable : true, sortable : false},
        {field : 'LayerType',  headerName : '층 종류',width : 100, editable : true, sortable : false, 
        type : 'singleSelect', valueOptions : [{value : '점성토', label : "점성토"}, {value : "사질토", label : "사질토"},{value : "사력토", label : "사력토"}]
        },
        {field : 'LayerDepth', headerName : '층 상면 표고(m)', width : 100, editable : false, sortable : false},
        {field : 'Depth', headerName : '층 두께(m)', width : 80, editable : true, sortable : false},
        {field : 'AvgNValue', headerName : '평균 N값', width : 80, editable : true, sortable : false},
        {field : 'c', 
        width : 70, 
        editable : true, 
        sortable : false,
        renderHeader: (params: any) => (
            <div style={{lineHeight:'1', textAlign: 'center'}}>
                c<br/>(kN/m²)
            </div>
        )
        },
        {field : 'pi',  headerName : '\u03C6(°)',width : 50, editable : true, sortable : false},
        {field : 'gamma',  
        headerName : '\u03B3\u209C(kN/m³)',
        width : 70, 
        editable : true, 
        sortable : false,
        renderHeader: (params: any) => (
            <div style={{lineHeight:'1', textAlign: 'center'}}>
                γ<br/>(kN/m³)
            </div>
        )
        },
        {field : 'aE0',  
        headerName : '\u03B1E\u2080(kN/m²)(상시)',
        width : 80, 
        editable : true, 
        sortable : false,
        renderHeader: (params: any) => (
            <div style={{lineHeight:'1', textAlign: 'center'}}>
                αE₀(상시)<br/>(kN/m²)
            </div>
        )
        },
        {field : 'aE0_Seis',  
        headerName : '\u03B1E\u2080(kN/m²) (지진시)',
        width : 80, 
        editable : true, 
        sortable : false,
        renderHeader: (params: any) => (
            <div style={{lineHeight:'1', textAlign: 'center'}}>
                αE₀(지진시)<br/>(kN/m²)
            </div>
        )
        },
        {field : 'vd',  
        width : 50, 
        editable : true, 
        sortable : false,
        renderHeader: (params: any) => (
            <>ν<span style={{verticalAlign: "sub", fontSize: "smaller"}}>d</span></>
        )
        },
        {field : 'Vsi', 
        headerName : 'Vₛᵢ(m/s)', 
        width : 80, 
        editable : !VsiEditable, 
        sortable : false,
        renderHeader: (params: any) => (
            <div style={{lineHeight:'1', textAlign: 'center'}}>
                Vₛᵢ<br/>(m/s)
            </div>
        )
        },
        
        {field : 'ED',
        width : 80, 
        editable : true, 
        sortable : false,
        renderHeader: (params: any) => (
            <div style={{lineHeight:'1', textAlign: 'center'}}>
                E<span style={{verticalAlign: "sub", fontSize: "smaller"}}>D</span><br/>(kN/m²)
            </div>
        )
        },
        {field : 'DE',  
        headerName : 'D\u2091',
        width : 50, 
        editable : DEEditable, 
        sortable : false,
        renderHeader: (params: any) => (
            <>D<span style={{verticalAlign: "sub", fontSize: "smaller"}}>E</span></>
        )
        },
        {field : 'Length', 
        headerName : '전면길이(m)',
        width : 80, 
        editable : SlopeEffect, 
        sortable : false,
        renderHeader: (params: any) => (
            <div style={{lineHeight:'1', textAlign: 'center'}}>
                전면길이<br/>(m)
            </div>
        )
        }
    ]

    // DataGrid에 행 추가
    const handleAddClick = () => {
        const newRowIndex = soilData.length + 1;
        let gamma = 18
        let newVsi = 0
        if (VsiEditable == true){
            newVsi = (100* Math.pow(10,(1/3)))
        }
        let Gd = gamma/9.8 * Math.pow(0.8*newVsi,2)
        let Ed = 2*(1+0.5)*Gd

        const lastRow = soilData.length > 0 ? soilData[soilData.length - 1] : null;
        const newLayerDepth = lastRow ? lastRow.LayerDepth - lastRow.Depth : 0;   

        const newRow = { 
            id: newRowIndex, 
            LayerNo: newRowIndex,
            LayerType: '점성토', 
            LayerDepth : newLayerDepth,
            Depth : 10,
            AvgNValue : 10,
            c : 0,
            pi : 0,
            gamma : gamma,
            aE0 : 14000,
            aE0_Seis : 28000,
            vd : 0.5,
            Vsi : Number(newVsi),
            ED : Number(Ed),
            DE : 1,
            Length : 1,
        };
        setSoilData(prevRows => [...prevRows, newRow]);
    };
    // DataGrid 행 삭제
    const handelRemoveClick = () => {
        setSoilData((prevRows: Row[]) => prevRows.slice(0, prevRows.length - 1));
    }

    // DataGird 값 변경 시 SoilData 업데이트
    const processRowUpdateHandler = React.useCallback((newRow: any) => {
        
        // Vsi 값 자동 계산, false일 경우 입력했던 값이 반환됨
        if (VsiEditable == true){
            let newVsi
            if (newRow.LayerType === '점성토'){
                newVsi = 100* Math.pow(Math.min(newRow.AvgNValue, 25),(1/3))
                newRow.Vsi = Number(newVsi)
            }
            else if (newRow.LayerType === '사질토' || newRow.LayerType === '사력토'){
                newVsi = 80* Math.pow(Math.min(newRow.AvgNValue, 50),(1/3))
                newRow.Vsi = Number(newVsi)
            }
        }
        
        //ED 값 자동 계산
        let Vsd = 0
        if (newRow.Vsi < 300){
            Vsd = 0.8*newRow.Vsi
        }
        else {
            Vsd = newRow.Vsi
        }
        let Gd = newRow.gamma/9.8 * Math.pow(Vsd,2)
        newRow.ED = Number((2*(1+Number(newRow.vd))*Gd))

        let updatedRow:any = []
        let TopLevel = groundLevel || 0
        setSoilData((prev) => {
            const newRows = prev.map((row) => {
            if (row.id === newRow.id) {
                updatedRow = { ...newRow, LayerDepth : Number(Number(TopLevel)) }; // newRow를 복사하여 새로운 객체 생성
                TopLevel = TopLevel - newRow.Depth;
                return updatedRow;
            } else {
                const newRow = { ...row, LayerDepth: Number(Number(TopLevel)) }; // 기존 행을 복사하고, LayerDepth 업데이트
                TopLevel = TopLevel - row.Depth;
                return newRow;
            }
            });

            return newRows;
        });

        return updatedRow;
	}, [setSoilData, VsiEditable]);

    // LayerDepth 값 자동 계산
    useEffect(() => {
        let TopLevel = groundLevel
        console.log(TopLevel)
        let newData = []
        for (let i = 0; i < soilData.length; i++) {
            let updatedItem = { ...soilData[i] };
            updatedItem.LayerDepth = Number(Number(TopLevel))
            TopLevel = TopLevel - updatedItem.Depth;
            newData.push(updatedItem);
        }
        setSoilData(newData)
    },[groundLevel])

    return(
        <GuideBox>
            <GuideBox width = {800} row horRight spacing={1}>
                <IconButton transparent
                onClick={handleAddClick}>
                    <Icon iconName = "Add" />
                </IconButton>
                <IconButton transparent
                onClick = {handelRemoveClick}>
                    <Icon iconName = "Remove" />
                </IconButton>
            </GuideBox>
            <div style={{ height: 290, width: '100%'}}>
                <DataGrid
                    columnHeaderHeight={60}
                    rowHeight={80}  
                    disableColumnMenu
                    disableColumnFilter
                    hideFooter
                    processRowUpdate={processRowUpdateHandler}
                    columns={columns}
                    rows = {soilData}
                    onProcessRowUpdateError={(error) => {
                        console.error('Error while updating row:', error);
                        // 추가적인 예외 처리 로직을 추가할 수 있습니다.
                    }}
                ></DataGrid>
            </div>
        </GuideBox>
    )
}

export default SoilTable