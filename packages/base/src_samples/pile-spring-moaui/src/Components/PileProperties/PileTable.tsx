import React, { useEffect } from 'react';
import { useState } from 'react';
import {GuideBox, 
    TabGroup,
    Tab,
    Typography,
    Panel,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesDualComponentsTypographyDropListSpaceBetween,
    TextFieldV2,
    DropList,
    DataGrid
} from '@midasit-dev/moaui';
import {TableCell, TableRow, Table, TableHead, TableBody } from '@mui/material';
import {useRecoilState, useRecoilValue, useRecoilValueLoadable} from 'recoil';
import {FoundationWidth, SideLength,
    PileName, PileType, PileLength, ConstructionMethod, HeadCondition, BottomCondition,
    CompositeTypeCheck, CompPileType, CompStartLength, 
    Concrete_Diameter,Concrete_Thickness, Concrete_Modulus, Steel_Diameter, Steel_Thickness, Steel_Modulus, Steel_Cor_Thickness,
    CompConcrete_Diameter, CompConcrete_Thickness, CompConcrete_Modulus, CompSteel_Diameter, CompSteel_Thickness, CompSteel_Modulus, CompSteel_Cor_Thickness,
    ReinforcedStartLength, ReinforcedEndLength, OuterThickness, OuterModulus, InnerThickness, InnerModulus, InnerInputState,
    Major_Ref_Value, Minor_Ref_Value, Major_Start_Point, Minor_Start_Point, Major_Space, Major_Degree, Minor_Degree,
    PileTableData, PileDataSelector, SelectedRow, TopLevel, PileLocationData, PileDegreeData, ReinforcedMethod, 

} from '../variables';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';



function PileTable(){

    const [pileName, setpileName] = useRecoilState(PileName)
    const [pileLength, setpileLength] = useRecoilState(PileLength)
    const [pileType, setpileType] = useRecoilState(PileType)
    const [constructionMethod, setconstructionMethod] = useRecoilState(ConstructionMethod)
    const [headCondition, setheadCondition] = useRecoilState(HeadCondition)
    const [bottomCondition, setbottomCondition] = useRecoilState(BottomCondition)
    
    const [concrete_Diameter, setConcrete_Diameter] = useRecoilState(Concrete_Diameter)
    const [concrete_Modulus, setConcrete_Modulus] = useRecoilState(Concrete_Modulus)
    const [concrete_Thickness, setConcrete_Thickness] = useRecoilState(Concrete_Thickness)
    const [steel_Diameter, setSteel_Diameter] = useRecoilState(Steel_Diameter)
    const [steel_Modulus, setSteel_Modulus] = useRecoilState(Steel_Modulus)
    const [steel_Thickness, setSteel_Thickness] = useRecoilState(Steel_Thickness)
    const [steelCor_Thickness, setSteelCor_Thickness] = useRecoilState(Steel_Cor_Thickness)

    const [compositeTypeCheck, setCompositeTypeCheck] = useRecoilState(CompositeTypeCheck)
    const [compStartLength, setCompStartLength] = useRecoilState(CompStartLength)

    const [compPileType, setCompPileType] = useRecoilState(CompPileType)
    const [compConcrete_Diameter, setCompConcrete_Diameter] = useRecoilState(CompConcrete_Diameter)
    const [compConcrete_Modulus, setCompConcrete_Modulus] = useRecoilState(CompConcrete_Modulus)
    const [compConcrete_Thickness, setCompConcrete_Thickness] = useRecoilState(CompConcrete_Thickness)
    const [compSteel_Diameter, setCompSteel_Diameter] = useRecoilState(CompSteel_Diameter)
    const [compSteel_Modulus, setCompSteel_Modulus] = useRecoilState(CompSteel_Modulus)
    const [compSteel_Thickness, setCompSteel_Thickness] = useRecoilState(CompSteel_Thickness)
    const [compSteelCor_Thickness, setCompSteelCor_Thickness] = useRecoilState(CompSteel_Cor_Thickness)

    const [reinforcedMethod, setReinforcedMethod] = useRecoilState(ReinforcedMethod)
    const [reinforcedStartLength, setReinforcedStartLength] = useRecoilState(ReinforcedStartLength)
    const [reinforcedEndLength, setReinforcedEndLength] = useRecoilState(ReinforcedEndLength)
    const [outerThickness, setOuterThickness] = useRecoilState(OuterThickness)
    const [outerModulus, setOuterModulus] = useRecoilState(OuterModulus)
    const [innerThickness, setInnerThickness] = useRecoilState(InnerThickness)
    const [innerModulus, setInnerModulus] = useRecoilState(InnerModulus)

    const [major_Ref_Value, setMajor_Ref_Value] = useRecoilState(Major_Ref_Value)
    const [minor_Ref_Value, setMinor_Ref_Value] = useRecoilState(Minor_Ref_Value)
    const [major_Start_Point, setMajor_Start_Point] = useRecoilState(Major_Start_Point)
    const [minor_Start_Point, setMinor_Start_Point] = useRecoilState(Minor_Start_Point)
    const [major_Space, setMajor_Space] = useRecoilState(Major_Space)
    const [major_Degree, setMajor_Degree] = useRecoilState(Major_Degree)
    const [minor_Degree, setMinor_Degree] = useRecoilState(Minor_Degree)

    const [selectedRow, setSelectedRow] = useRecoilState(SelectedRow)

    interface RowType {
        Typeno: number;
        pileName : string;
        pileType : string;
        constructionMethod : string;
        PileNums : number;
    }
    

    const columns = [
        {field : 'Typeno', headerName : 'No', width : 50, sortable :false},
        {field : 'pileName', headerName : '명칭', width : 200, sortable :false},
        {field : 'pileType', headerName : '말뚝 종류', width : 200, sortable :false},
        {field : 'constructionMethod', headerName : '시공 방법', width : 200, sortable :false},
        {field : 'PileNums', headerName : '말뚝 개수', width : 150, sortable :false},
    ]
    
    const [pileTableData, setPileTableData] = useRecoilState(PileTableData)

    const rows:RowType[] = pileTableData.map((item: typeof pileTableData[0], index: number) => ({
        id : index,
        Typeno : index+1,
        pileName : item.pileName,
        pileType : item.pileType,
        constructionMethod : item.constructionMethod,
        PileNums : item.PileNums
    }))

    const handleRowClick = (params:any) => {
        const SelectedTableRow = pileTableData[params.row.id]

        setpileName(SelectedTableRow.pileName)
        setpileLength(SelectedTableRow.pileLength)
        setpileType(SelectedTableRow.pileType)
        setconstructionMethod(SelectedTableRow.constructionMethod)
        setheadCondition(SelectedTableRow.headCondition)
        setbottomCondition(SelectedTableRow.bottomCondition)
        
        setConcrete_Diameter(SelectedTableRow.concreteDiameter)
        setConcrete_Modulus(SelectedTableRow.concreteModulus)
        setConcrete_Thickness(SelectedTableRow.concreteThickness)
        setSteel_Diameter(SelectedTableRow.steelDiameter)
        setSteel_Modulus(SelectedTableRow.steelModulus)
        setSteel_Thickness(SelectedTableRow.steelThickness)
        setSteelCor_Thickness(SelectedTableRow.steelCorThickness)
        
        setCompositeTypeCheck(SelectedTableRow.compositeTypeCheck)
        setCompStartLength(SelectedTableRow.compStartLength)
        
        setCompPileType(SelectedTableRow.compPileType)
        setCompConcrete_Diameter(SelectedTableRow.compConcreteDiameter)
        setCompConcrete_Modulus(SelectedTableRow.compConcreteModulus)
        setCompConcrete_Thickness(SelectedTableRow.compConcreteThickness)
        setCompSteel_Diameter(SelectedTableRow.compSteelDiameter)
        setCompSteel_Modulus(SelectedTableRow.compSteelModulus)
        setCompSteel_Thickness(SelectedTableRow.compSteelThickness)
        setCompSteelCor_Thickness(SelectedTableRow.compSteelCorThickness)
        
        setReinforcedMethod(SelectedTableRow.reinforcedMethod)
        setReinforcedStartLength(SelectedTableRow.reinforcedStartLength)
        setReinforcedEndLength(SelectedTableRow.reinforcedEndLength)
        setOuterThickness(SelectedTableRow.outerThickness)
        setOuterModulus(SelectedTableRow.outerModulus)
        setInnerThickness(SelectedTableRow.innerThickness)
        setInnerModulus(SelectedTableRow.innerModulus)

        setMajor_Ref_Value(SelectedTableRow.majorRefValue)
        setMinor_Ref_Value(SelectedTableRow.minorRefValue)
        setMajor_Start_Point(SelectedTableRow.majorStartPoint)
        setMinor_Start_Point(SelectedTableRow.minorStartPoint)
        setMajor_Space(SelectedTableRow.majorSpace)
        setMajor_Degree(SelectedTableRow.majorDegree)
        setMinor_Degree(SelectedTableRow.minorDegree)
        setSelectedRow(params.row.id)
    }
    return(
        <GuideBox>
            <GuideBox>
                <div style = {{height : 150, width : '100%'}}>
                    <DataGrid
                        columnHeaderHeight={40}
                        rowHeight={40}
                        disableColumnMenu
                        disableColumnFilter
                        hideFooter
                        columns={columns}
                        rows={rows}
                        onRowClick={handleRowClick}
                        ></DataGrid>    
                </div>
            </GuideBox>
        </GuideBox>
    )
}

export default PileTable;