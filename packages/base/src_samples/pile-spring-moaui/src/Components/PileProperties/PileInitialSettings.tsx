import {GuideBox, 
    Panel,
    Check,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesDualComponentsTypographyDropListSpaceBetween,
    Typography,
} from '@midasit-dev/moaui';
import TypoGraphyDropList from '../NewComponents/TrypoGraphyDropList';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import { FoundationWidth, SideLength,
    PileName, PileType, PileLength, ConstructionMethod, HeadCondition, BottomCondition, Steel_Dia_Title, Steel_Cor_Title, Steel_Title, ConcreteModulus_Title,
    CompositeTypeCheck, CompPileType, CompStartLength,
    Concrete_Diameter,Concrete_Thickness, Concrete_Modulus, Steel_Diameter, Steel_Thickness, Steel_Modulus, Steel_Cor_Thickness,
    CompConcrete_Diameter, CompConcrete_Thickness, CompConcrete_Modulus, CompSteel_Diameter, CompSteel_Thickness, CompSteel_Modulus, CompSteel_Cor_Thickness,
    ReinforcedMethod, ReinforcedStartLength, ReinforcedEndLength, OuterThickness, OuterModulus, InnerThickness, InnerModulus, InnerInputState,
    Major_Start_Point, Minor_Start_Point, Major_Space, Major_Degree, Minor_Degree,
    PileTableData, PileDataSelector, SelectedRow, TopLevel, PileLocationData, PileDegreeData, 
} from '../variables';
import { useEffect, useState } from 'react';
function PileInitialSettings(){
    
    const ListPileType = [
        ['현장타설말뚝', '현장타설말뚝'],
        ['PHC말뚝', 'PHC말뚝'],
        ['SC말뚝', 'SC말뚝'],
        ['강관말뚝', '강관말뚝'],
        ['소일시멘트말뚝', '소일시멘트말뚝']
    ]

    const ListConstructionMethod = [
        ['타격말뚝(타격 공법)', '타격말뚝(타격 공법)'],
        ['타격말뚝(바이브러 해머공법)', '타격말뚝(바이브러 해머공법)'],
        ['현장타설말뚝', '현장타설말뚝'],
        ['중굴착 말뚝', '중굴착 말뚝'],
        ['preboring 말뚝', 'preboring 말뚝'],
        ['강관 소일시멘트 말뚝', '강관 소일시멘트 말뚝'],
        ['회전말뚝', '회전말뚝']
    ]

    const ListHeadCondition = [
        ['강결', '강결'],
        ['힌지', '힌지']
    ]

    const ListBottomCondition = [
        ['자유', '자유'],
        ['힌지', '힌지'],
        ['고정', '고정']
    ]
    
    const [pileName, setpileName] = useRecoilState(PileName);
    const [pileLengh, setpileLength] = useRecoilState(PileLength);
    const [steelDiaNames, setsteelDiaNames] = useRecoilState(Steel_Dia_Title);
    const [pileType, setpileType] = useRecoilState(PileType);
    const [constructionMethod, setconstructionMethod] = useRecoilState(ConstructionMethod);
    const [headCondition, setheadCondition] = useRecoilState(HeadCondition);
    const [bottomCondition, setbottomCondition] = useRecoilState(BottomCondition);
    const [steelCorTitle, setSteelCorTitle] = useRecoilState(Steel_Cor_Title);
    const [steelTitle, setSteelTitle] = useRecoilState(Steel_Title);
    const [concreteModulusTitle, setConcreteModulusTitle] = useRecoilState(ConcreteModulus_Title);
    

    const ResetConcreteDiameter = useResetRecoilState(Concrete_Diameter)
    const ResetConcreteThickness = useResetRecoilState(Concrete_Thickness)
    const ResetConcreteModulus = useResetRecoilState(Concrete_Modulus)
    const ResetSteelDiameter = useResetRecoilState(Steel_Diameter)
    const ResetSteelThickness = useResetRecoilState(Steel_Thickness)
    const ResetSteelModulus = useResetRecoilState(Steel_Modulus)
    const ResetSteelCorThickness = useResetRecoilState(Steel_Cor_Thickness)


    
    const handlePileLengthChange = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setpileLength(e.target.value);
        }
        else{
            setpileLength(0);
        }
    }
    
    const handlepileTypeChange = (e:any) => {
        setpileType(e.target.value);
        
        if (e.target.value === '현장타설말뚝' || e.target.value === 'PHC말뚝'){
            setsteelDiaNames('단면적 (cm²)')
        }
        else{
            setsteelDiaNames('직경 (mm)')
        }

        if (e.target.value === 'PHC말뚝'){
            setSteelCorTitle('배치반경 (mm)')
        }
        else{
            setSteelCorTitle('부식대 (mm)')
        }

        if (e.target.value === '현장타설말뚝'){
            setSteelTitle('철근')
        }
        else if (e.target.value === 'PHC말뚝'){
            setSteelTitle('PC 강재')
        }
        else {
            setSteelTitle('강관')
        }

        if (e.target.value === '소일시멘트말뚝'){
            setConcreteModulusTitle('변형계수 (N/mm²)')
        }
        else{
            setConcreteModulusTitle('탄성계수 (N/mm²)')
        }

        ResetConcreteDiameter()
        ResetConcreteThickness()
        ResetConcreteModulus()
        ResetSteelDiameter()
        ResetSteelThickness()
        ResetSteelModulus()
        ResetSteelCorThickness()

    }

        return(
            <GuideBox>
                <TemplatesDualComponentsTypographyTextFieldSpaceBetween
                    title = "말뚝 명칭"
                    width = {300}
                    textFieldWidth = {180}
                    placeholder = 'Pile Name'
                    value = {pileName}
                    onChange = {(e:any) => {setpileName(e.target.value);}}/>
                <TemplatesDualComponentsTypographyTextFieldSpaceBetween
                title = "말뚝 길이 (m)"
                width = {300}
                textFieldWidth = {180}
                placeholder = 'Pile Length' 
                value = {pileLengh}
                onChange = {handlePileLengthChange}/>
                <TypoGraphyDropList
                    title = "말뚝 종류"
                    width = {300}
                    dropListWidth = {180}
                    items = {ListPileType}
                    value = {pileType}
                    onChange = {handlepileTypeChange}/>       
                <TypoGraphyDropList
                    padding = {1}
                    title = "시공 방법"
                    width = {300}
                    dropListWidth = {180}
                    items = {ListConstructionMethod}
                    value = {constructionMethod}
                    onChange = {(e:any) => {setconstructionMethod(e.target.value);}}/>
                <TypoGraphyDropList
                    padding = {1}
                    title = "말뚝머리 접합조건"
                    width = {300}
                    dropListWidth = {180}
                    items = {ListHeadCondition}
                    value = {headCondition}
                    onChange = {(e:any) => {setheadCondition(e.target.value);}}/>
                <TypoGraphyDropList
                    padding = {1}
                    title = "말뚝 선단조건"
                    width = {300}
                    dropListWidth = {180}
                    items = {ListBottomCondition}
                    value = {bottomCondition}
                    onChange = {(e:any) => {setbottomCondition(e.target.value);}}/>
            </GuideBox>
        );
    };
    
    export default PileInitialSettings
    