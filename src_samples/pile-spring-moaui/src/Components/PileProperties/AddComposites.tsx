import React from 'react';
import { useState } from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {GuideBox, 
    Typography,
    Panel,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesDualComponentsTypographyDropListSpaceBetween,
    Check,
    TextFieldV2,
} from '@midasit-dev/moaui';
import TypoGraphyDropList from '../NewComponents/TrypoGraphyDropList';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';
import { FoundationWidth, SideLength,
    PileName, PileType, PileLength, ConstructionMethod, HeadCondition, BottomCondition, Steel_Dia_Title, Steel_Cor_Title, Steel_Title, ConcreteModulus_Title,
    CompositeTypeCheck, CompPileType, CompStartLength,
    Concrete_Diameter,Concrete_Thickness, Concrete_Modulus, Steel_Diameter, Steel_Thickness, Steel_Modulus, Steel_Cor_Thickness,
    CompConcrete_Diameter, CompConcrete_Thickness, CompConcrete_Modulus, CompSteel_Diameter, CompSteel_Thickness, CompSteel_Modulus, CompSteel_Cor_Thickness,
    ReinforcedMethod, ReinforcedStartLength, ReinforcedEndLength, OuterThickness, OuterModulus, InnerThickness, InnerModulus, InnerInputState,
    Major_Start_Point, Minor_Start_Point, Major_Space, Major_Degree, Minor_Degree,
    PileTableData, PileDataSelector, SelectedRow, TopLevel, PileLocationData, PileDegreeData, 
    CompSteel_Dia_Title, CompSteel_Cor_Title, CompSteel_Title, CompConcreteModulus_Title,
} from '../variables';
import PileInitialSettings from './PileInitialSettings';
import PileSections from './PileSections';


function AddComposites(){
    const CompListPileType = [
        ['현장타설말뚝', '현장타설말뚝'],
        ['PHC말뚝', 'PHC말뚝'],
        ['SC말뚝', 'SC말뚝'],
        ['강관말뚝', '강관말뚝'],
        ['소일시멘트말뚝', '소일시멘트말뚝']
    ]

    // 복합말뚝설정 변수
    const compositePileTypeCheck = useRecoilValue(CompositeTypeCheck);
    
    
    const [compPileType, setCompPileType] = useRecoilState(CompPileType)

    const [compSteelDiaTitle, setCompSteelDiaTitle] = useRecoilState(CompSteel_Dia_Title)
    const [compSteelCorThickness, setCompSteelCorThickness] = useRecoilState(CompSteel_Cor_Thickness)
    const [compSteelCorTitle, setCompSteelCorTitle] = useRecoilState(CompSteel_Cor_Title)
    const [compSteelTitle, setCompSteelTitle] = useRecoilState(CompSteel_Title)
    const [compConcreteModulusTitle, setCompConcreteModulusTitle] = useRecoilState(CompConcreteModulus_Title)

    const [compStartLength, setCompStartLength] = useRecoilState(CompStartLength)

    const ResetCompConcreteDiameter = useResetRecoilState(CompConcrete_Diameter)
    const ResetCompConcreteThickness = useResetRecoilState(CompConcrete_Thickness)
    const ResetCompConcreteModulus = useResetRecoilState(CompConcrete_Modulus)
    const ResetCompSteelDiameter = useResetRecoilState(CompSteel_Diameter)
    const ResetCompSteelThickness = useResetRecoilState(CompSteel_Thickness)
    const ResetCompSteelModulus = useResetRecoilState(CompSteel_Modulus)
    const ResetCompSteelCorThickness = useResetRecoilState(CompSteel_Cor_Thickness)

    // 말뚝 종류에 따른 Title 수정
    const handleCompPileTypeChange = (e:any) => {
        setCompPileType(e.target.value);
        if (e.target.value === '현장타설말뚝' || e.target.value === 'PHC말뚝'){
            setCompSteelDiaTitle('단면적 (cm²)')
        }
        else{
            setCompSteelDiaTitle('직경 (mm)')
        }

        if (e.target.value === 'PHC말뚝'){
            setCompSteelCorTitle('배치반경 (mm)')
        }
        else{
            setCompSteelCorTitle('부식대 (mm)')
        }

        if (e.target.value === '현장타설말뚝'){
            setCompSteelTitle('철근')
        }
        else if (e.target.value === 'PHC말뚝'){
            setCompSteelTitle('PC 강재')
        }
        else {
            setCompSteelTitle('강관')
        }

        if (e.target.value === '소일시멘트말뚝'){
            setCompConcreteModulusTitle('변형계수 (N/mm²)')
        }
        else{
            setCompConcreteModulusTitle('탄성계수 (N/mm²)')
        }
        
        ResetCompConcreteDiameter()
        ResetCompConcreteThickness()
        ResetCompConcreteModulus()
        ResetCompSteelDiameter()
        ResetCompSteelThickness()
        ResetCompSteelModulus()
        ResetCompSteelCorThickness()
    }

    const handleCompStartLengthChange = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setCompStartLength(e.target.value);
        }
        else{
            setCompStartLength(0);
        }
        
    }

    return(
        <GuideBox>
            <TypoGraphyDropList 
                title = "말뚝 종류"
                width = {300}
                dropListWidth = {180}
                items = {CompListPileType}
                value = {compPileType}
                disabled = {compositePileTypeCheck}
                onChange = {handleCompPileTypeChange}
            />
            <TypoGraphyTextField 
                title = '말뚝 위치(m)'
                placeholder = '말뚝머리 상대거리'
                disabled = {!compositePileTypeCheck}
                value = {compStartLength.toString()}
                onChange = {handleCompStartLengthChange}
                width = {300}
                textFieldWidth = {180}
            />
            <GuideBox width={300} horRight>
                <Typography> *말뚝머리부터 상대거리 </Typography>
            </GuideBox>
        </GuideBox>

    );
}

export default AddComposites