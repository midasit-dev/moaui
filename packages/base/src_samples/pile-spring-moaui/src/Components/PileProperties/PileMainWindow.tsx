import React from 'react';
import { useState } from 'react';
import {GuideBox, 
    Typography,
    Panel,
    Check,
    Button,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesSamplesEditContinuePopup,
    Icon
} from '@midasit-dev/moaui';
import PopupButtonComponent from '../NewComponents/PopupButtonComponent';
import PileInitialSettings from './PileInitialSettings';
import PileSections from './PileSections';
import AddComposites from './AddComposites';
import PileChart from '../Chart/PileChart';
import PileLocation from './PileLocation';
import PileTable from './PileTable'
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import { useSnackbar } from 'notistack';
import {  FoundationWidth, SideLength,
    PileName, PileType, PileLength, ConstructionMethod, HeadCondition, BottomCondition, Steel_Dia_Title, Steel_Cor_Title, Steel_Title, ConcreteModulus_Title,
    CompositeTypeCheck, CompPileType, CompStartLength,
    Concrete_Diameter,Concrete_Thickness, Concrete_Modulus, Steel_Diameter, Steel_Thickness, Steel_Modulus, Steel_Cor_Thickness,
    CompConcrete_Diameter, CompConcrete_Thickness, CompConcrete_Modulus, CompSteel_Diameter, CompSteel_Thickness, CompSteel_Modulus, CompSteel_Cor_Thickness,
    ReinforcedMethod, ReinforcedStartLength, ReinforcedEndLength, OuterThickness, OuterModulus, InnerThickness, InnerModulus, InnerInputState,
    Major_Start_Point, Minor_Start_Point, Major_Space, Major_Degree, Minor_Degree,
    PileTableData, PileDataSelector, SelectedRow, TopLevel, PileLocationData, PileDegreeData, 

} from '../variables';
import { CalculatePileCenterCoordinates, CalculatePileDegree, ExtractNumbers} from '../../utils_pyscript';


function PileProperties(){

    const { enqueueSnackbar } = useSnackbar();

    const pileName = useRecoilValue(PileName)
    const pileLength = useRecoilValue(PileLength)
    const pileType = useRecoilValue(PileType)

    const compPileType = useRecoilValue(CompPileType)
    const compStartLength = useRecoilValue(CompStartLength)

    const concreteDiameter = useRecoilValue(Concrete_Diameter)
    const concreteThickness = useRecoilValue(Concrete_Thickness)
    const concreteModulus = useRecoilValue(Concrete_Modulus)
    const steelDiameter = useRecoilValue(Steel_Diameter)
    const steelThickness = useRecoilValue(Steel_Thickness)
    const steelModulus = useRecoilValue(Steel_Modulus)
    const steelCorThickness = useRecoilValue(Steel_Cor_Thickness)

    const compConcreteDiameter = useRecoilValue(CompConcrete_Diameter)
    const compConcreteThickness = useRecoilValue(CompConcrete_Thickness)
    const compConcreteModulus = useRecoilValue(CompConcrete_Modulus)
    const compSteelDiameter = useRecoilValue(CompSteel_Diameter)
    const compSteelThickness = useRecoilValue(CompSteel_Thickness)
    const compSteelModulus = useRecoilValue(CompSteel_Modulus)
    const compSteelCorThickness = useRecoilValue(CompSteel_Cor_Thickness)

    const reinforcedStartLength = useRecoilValue(ReinforcedStartLength)
    const reinforcedEndLength = useRecoilValue(ReinforcedEndLength)
    const outerThickness = useRecoilValue(OuterThickness)
    const outerMoudlus = useRecoilValue(OuterModulus)
    const innerThickness = useRecoilValue(InnerThickness)
    const innerMoudlus = useRecoilValue(InnerModulus)
    const innerInputState = useRecoilValue(InnerInputState)

    const majorStartPoint = useRecoilValue(Major_Start_Point)
    const minorStartPoint = useRecoilValue(Minor_Start_Point)
    const majorSpace = useRecoilValue(Major_Space)
    const majorDegree = useRecoilValue(Major_Degree)
    const minorDegree = useRecoilValue(Minor_Degree)


    
    const ResetPileName = useResetRecoilState(PileName)
    const ResetPileLength = useResetRecoilState(PileLength)
    const ResetPileType = useResetRecoilState(PileType)
    const ResetConstructionMethod = useResetRecoilState(ConstructionMethod)
    const ResetHeadCondition = useResetRecoilState(HeadCondition)
    const ResetBottomCondition = useResetRecoilState(BottomCondition)
    const ResetSteelDiaTitle = useResetRecoilState(Steel_Dia_Title)
    const ResetSteelCorTitle = useResetRecoilState(Steel_Cor_Title)
    const ResetSteelTitle = useResetRecoilState(Steel_Title)
    const ResetConcreteModulusTitle = useResetRecoilState(ConcreteModulus_Title)

    const ResetConcreteDiameter = useResetRecoilState(Concrete_Diameter)
    const ResetConcreteThickness = useResetRecoilState(Concrete_Thickness)
    const ResetConcreteModulus = useResetRecoilState(Concrete_Modulus)
    const ResetSteelDiameter = useResetRecoilState(Steel_Diameter)
    const ResetSteelThickness = useResetRecoilState(Steel_Thickness)
    const ResetSteelModulus = useResetRecoilState(Steel_Modulus)
    const ResetSteelCorThickness = useResetRecoilState(Steel_Cor_Thickness)

    const ResetCompositeTypeCheck = useResetRecoilState(CompositeTypeCheck)
    const ResetCompPileType = useResetRecoilState(CompPileType)
    const ResetCompStartLength = useResetRecoilState(CompStartLength)

    const ResetCompConcreteDiameter = useResetRecoilState(CompConcrete_Diameter)
    const ResetCompConcreteThickness = useResetRecoilState(CompConcrete_Thickness)
    const ResetCompConcreteModulus = useResetRecoilState(CompConcrete_Modulus)
    const ResetCompSteelDiameter = useResetRecoilState(CompSteel_Diameter)
    const ResetCompSteelThickness = useResetRecoilState(CompSteel_Thickness)
    const ResetCompSteelModulus = useResetRecoilState(CompSteel_Modulus)
    const ResetCompSteelCorThickness = useResetRecoilState(CompSteel_Cor_Thickness)

    const ResetReinforcedMethod = useResetRecoilState(ReinforcedMethod)
    const ResetReinforcedStartLength = useResetRecoilState(ReinforcedStartLength)
    const ResetReinforcedEndLength = useResetRecoilState(ReinforcedEndLength)
    const ResetOuterThickness = useResetRecoilState(OuterThickness)
    const ResetOuterModulus = useResetRecoilState(OuterModulus)
    const ResetInnerThickness = useResetRecoilState(InnerThickness)
    const ResetInnerModulus = useResetRecoilState(InnerModulus)
    const ResetInnerInputState = useResetRecoilState(InnerInputState)

    const ResetMajorStartPoint = useResetRecoilState(Major_Start_Point)
    const ResetMinorStartPoint = useResetRecoilState(Minor_Start_Point)
    const ResetMajorSpace = useResetRecoilState(Major_Space)
    const ResetMajorDegree = useResetRecoilState(Major_Degree)
    const ResetMinorDegree = useResetRecoilState(Minor_Degree)

    // 말뚝정보 변수
    const [foundationWidth, setFoundationWidth] = useRecoilState(FoundationWidth)
    const [sideLength, setSideLength] = useRecoilState(SideLength)
    const [toplevel, setTopLevel] = useRecoilState(TopLevel)

    // 하부말뚝설정 변수
    const [compositeTypeCheck, setCopositeTypeCheck] = useRecoilState(CompositeTypeCheck);
    const handleCompositePileType = (e:any) => {
        setCopositeTypeCheck(e.target.checked);
        if (e.target.checked === false){
            ResetCompPileType()
            ResetCompStartLength()
            ResetCompConcreteDiameter()
            ResetCompConcreteThickness()
            ResetCompConcreteModulus()
            ResetCompSteelDiameter()
            ResetCompSteelThickness()
            ResetCompSteelModulus()
            ResetCompSteelCorThickness()
        }
    }

    // Chart 관련 변수
    const [pileLocationData, setPileLocationData] = useRecoilState(PileLocationData)
    const [pileDegreeData, setPileDegreeData] = useRecoilState(PileDegreeData)

    // PileTable 변수
    const [selectedRow, setSelectedRow] = useRecoilState(SelectedRow)
    const [pileTableData, setPileTableData] = useRecoilState(PileTableData)
    
    // 입력된 모든 값들을 Selector로 가져옴, pileTableData에 저장함
    const pileData = useRecoilValue(PileDataSelector)
    
    const [openRight, setOpenRight] = useState(false);
    
    //ErrorCheck
    const ErrorCheck = () => {
        
        // 말둑 기본설정
        if (pileName === ''){
            enqueueSnackbar('말뚝 이름을 입력해주세요.', {variant: 'error',autoHideDuration: 3000})
            return true
        }

        if (pileLength <= 0 ){
            enqueueSnackbar('말뚝 길이는 0이상의 정수이어야 합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }
        // 하부 말뚝 설정
        if (compositeTypeCheck == true){
            if (Number(compStartLength) < 0){
                enqueueSnackbar('하부말뚝 시작 위치는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(compStartLength) > Number(pileLength)){
                enqueueSnackbar('하부말뚝 시작 위치는 말뚝 길이보다 작아야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
        }

        //기본 말뚝 단면
        if (pileType === '현장타설말뚝'){
            if (Number(concreteDiameter) <= 0){
                enqueueSnackbar('콘크리트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(concreteModulus) <= 0){
                enqueueSnackbar('콘크리트 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelDiameter) <= 0){
                enqueueSnackbar('철근 단면적은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelModulus) <= 0){
                enqueueSnackbar('철근 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
        }
        
        if (pileType === 'PHC말뚝'){
            if (Number(concreteDiameter) <= 0){
                enqueueSnackbar('콘크리트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(concreteThickness) <= 0){
                enqueueSnackbar('콘크리트 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(concreteModulus) <= 0){
                enqueueSnackbar('콘크리트 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelDiameter) <= 0){
                enqueueSnackbar('PC강재 단면적은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelModulus )<= 0){
                enqueueSnackbar('PC강재 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelCorThickness) <= 0){
                enqueueSnackbar('PC강재 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
        }

        if (pileType === 'SC말뚝'){
            if (Number(concreteDiameter) <= 0){
                enqueueSnackbar('콘크리트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(concreteThickness) <= 0){
                enqueueSnackbar('콘크리트 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(concreteModulus) <= 0){
                enqueueSnackbar('콘크리트 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelThickness) <= 0){
                enqueueSnackbar('강관 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelModulus) <= 0){
                enqueueSnackbar('강관 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelCorThickness) <= 0){
                enqueueSnackbar('강관 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
        }

        if (pileType === '강관말뚝'){
            if (Number(steelDiameter) <= 0){
                enqueueSnackbar('강관 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelThickness) <= 0){
                enqueueSnackbar('강관 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelModulus) <= 0){
                enqueueSnackbar('강관 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelCorThickness) <= 0){
                enqueueSnackbar('강관 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
        }

        if (pileType === '소일시멘트말뚝'){
            if (Number(concreteDiameter) <= 0){
                enqueueSnackbar('소일시멘트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(concreteModulus) <= 0){
                enqueueSnackbar('소일시멘트 변형계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelDiameter) <= 0){
                enqueueSnackbar('강관 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelThickness) <= 0){
                enqueueSnackbar('강관 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelModulus) <= 0){
                enqueueSnackbar('강관 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(steelCorThickness) <= 0){
                enqueueSnackbar('강관 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
        }
        
        if (isNaN(concreteModulus)){
            enqueueSnackbar('콘크리트 탄성계수는 숫자여야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }

        if (isNaN(steelModulus)){
            enqueueSnackbar('철근 또는 강관의 탄성계수는 숫자여야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }

        if (compositeTypeCheck == true){
            if (compPileType === '현장타설말뚝'){
                if (Number(compConcreteDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compConcreteModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 철근 단면적은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 철근 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
            }

            if (compPileType === 'PHC말뚝'){
                if (Number(compConcreteDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compConcreteThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compConcreteModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 PC강재 단면적은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 PC강재 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelCorThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 PC강재 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
            }

            if (compPileType === 'SC말뚝'){
                if (Number(compConcreteDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compConcreteThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compConcreteModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 콘크리트 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelCorThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
            }

            if (compPileType === '강관말뚝'){
                if (Number(compSteelDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelCorThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
            }

            if (compPileType === '소일시멘트말뚝'){
                if (Number(compConcreteDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 소일시멘트 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compConcreteModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 소일시멘트 변형계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelDiameter) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 직경은 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelModulus) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(compSteelCorThickness) <= 0){
                    enqueueSnackbar('하부 말뚝 강관 부식 깊이는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
            }
        }

        if (isNaN(compConcreteModulus)){
            enqueueSnackbar('하부 말뚝 콘크리트 탄성계수는 숫자여야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }

        if (isNaN(compSteelModulus)){
            enqueueSnackbar('하부 말뚝 철근 또는 강관의 탄성계수는 숫자여야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }

        // 보강 단면
        if (!(Number(reinforcedStartLength) == 0 && Number(reinforcedEndLength) == 0)){
            if (Number(reinforcedStartLength) < 0){
                enqueueSnackbar('보강 시작 위치는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(reinforcedEndLength) < 0){
                enqueueSnackbar('보강 끝 위치는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(reinforcedStartLength) >= Number(reinforcedEndLength)){
                enqueueSnackbar('보강 시작 위치는 끝 위치보다 작아야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(reinforcedEndLength) > pileLength){
                enqueueSnackbar('보강 끝 위치는 말뚝 길이보다 작아야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(outerThickness) <= 0){
                enqueueSnackbar('피복부 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (Number(outerMoudlus) <= 0){
                enqueueSnackbar('피복부 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                return true
            }
            if (innerInputState === true){
                if (Number(innerThickness) <= 0){
                    enqueueSnackbar('충진부 두께는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
                if (Number(innerMoudlus) <= 0){
                    enqueueSnackbar('충진부 탄성계수는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
                    return true
                }
            }
        }
        

        // 말뚝 배치
        if (Number(majorStartPoint) < 0){
            enqueueSnackbar('재하방향 말뚝 배치 위치는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }
        else if (Number(majorStartPoint) > Number(sideLength)){
            enqueueSnackbar('재하방향 말뚝 배치 위치는 측면 길이보다 작아야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }

        if (Number(minorStartPoint) < 0){
            enqueueSnackbar('재하직각방향 말뚝 배치 위치는 0보다 커야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }
        else if (Number(minorStartPoint) > Number(foundationWidth)){
            enqueueSnackbar('재하직각방향 말뚝 배치 위치는 재하방향 폭보다 작아야합니다.', {variant: 'error', autoHideDuration: 3000})
            return true
        }

        let majorSpaceNumbers = 0
        if (majorSpace !== '' ){
            majorSpaceNumbers = (ExtractNumbers(majorSpace)).length+1
        }
        const majorDegreeNumbers = (ExtractNumbers(majorDegree)).length
        const minorDegreeNumbers = (ExtractNumbers(minorDegree)).length

        if (majorSpaceNumbers !== majorDegreeNumbers || majorSpaceNumbers !== minorDegreeNumbers || majorDegreeNumbers !== minorDegreeNumbers){
            enqueueSnackbar('간격과 각도 입력에 따른 말뚝 개수가 불일치합니다.', {variant: 'error', autoHideDuration: 3000})
            enqueueSnackbar('재하방향 간격 말뚝 개수 :' + majorSpaceNumbers, {variant: 'error', autoHideDuration: 5000})
            enqueueSnackbar('재하방향 각도 말뚝 개수 :' + majorDegreeNumbers, {variant: 'error', autoHideDuration: 5000})
            enqueueSnackbar('재하직각방향 각도 말뚝 개수 :' + minorDegreeNumbers, {variant: 'error', autoHideDuration: 5000})
            return true
        }
        
        
    }
    const Reset = () => {
        ResetPileName()
        ResetPileLength()
        ResetPileType()
        ResetConstructionMethod()
        ResetHeadCondition()
        ResetBottomCondition()
        ResetSteelDiaTitle()
        ResetSteelCorTitle()
        ResetSteelTitle()
        ResetConcreteModulusTitle()

        ResetConcreteDiameter()
        ResetConcreteThickness()
        ResetConcreteModulus()
        ResetSteelDiameter()
        ResetSteelThickness()
        ResetSteelModulus()
        ResetSteelCorThickness()

        ResetCompositeTypeCheck()
        ResetCompPileType()
        ResetCompStartLength()

       
        ResetCompConcreteDiameter()
        ResetCompConcreteThickness()
        ResetCompConcreteModulus()
        ResetCompSteelDiameter()
        ResetCompSteelThickness()
        ResetCompSteelModulus()
        ResetCompSteelCorThickness()

        ResetReinforcedMethod()
        ResetReinforcedStartLength()
        ResetReinforcedEndLength()
        ResetOuterThickness()
        ResetOuterModulus()
        ResetInnerThickness()
        ResetInnerModulus()
        ResetInnerInputState()

        ResetMajorStartPoint()
        ResetMinorStartPoint()
        ResetMajorSpace()
        ResetMajorDegree()
        ResetMinorDegree()


    }

    // PiletableData, PileLocationData 추가, 수정, 삭제
    const AddDataButtonClick = (e:any) => {

        if (ErrorCheck()){
            return
        }
        setPileTableData([...pileTableData, pileData])

        const CenterCoordinates = CalculatePileCenterCoordinates(pileData,foundationWidth,sideLength)
        setPileLocationData([...pileLocationData, CenterCoordinates])

        const DegreeData = CalculatePileDegree(JSON.stringify(pileData))
        setPileDegreeData([...pileDegreeData, DegreeData])

        enqueueSnackbar('Pile 추가 완료', {variant: 'success', autoHideDuration: 3000})
    }
    const DeleteDataButtonClick = (e:any) => {
        const indexToRemove = selectedRow
        const updatedPileTableData = pileTableData.filter((_, index) => index !== indexToRemove)
        setPileTableData(updatedPileTableData)

        const updatedPileLocationData = pileLocationData.filter((_, index) => index !== indexToRemove)
        setPileLocationData(updatedPileLocationData)

        const updatedPileDegreeData = pileDegreeData.filter((_, index) => index !== indexToRemove)
        setPileDegreeData(updatedPileDegreeData)

        Reset()

        enqueueSnackbar('Pile 삭제 완료', {variant: 'success', autoHideDuration: 3000})
    }

    const UpdateDataButtonClick = (e:any) => {
        const indexToUpdate = selectedRow
        const updatedPileTableData = pileTableData.map((data, index) => {
            if (index === indexToUpdate) {
                return pileData
            }
            return data
        })
        setPileTableData(updatedPileTableData)
        const updatedPileLocationData = pileLocationData.map((data, index) => {
            if (index === indexToUpdate) {
                return CalculatePileCenterCoordinates(pileData,foundationWidth,sideLength)
            }
            return data
        })
        setPileLocationData(updatedPileLocationData)
        const updatedPileDegreeData = pileDegreeData.map((data, index) => {
            if (index === indexToUpdate) {
                return CalculatePileDegree(JSON.stringify(pileData))
            }
            return data
        })
        setPileDegreeData(updatedPileDegreeData)
        setSelectedRow(pileTableData.length-1)
        enqueueSnackbar('Pile 수정 완료', {variant: 'success', autoHideDuration: 3000})
    }
    
    const popupRightProps = {
        show: true,
        fill: '1',
        x: 350,
        y: 0,
        width: 250,
        height: 500,
    }

    return(
        <GuideBox width="auto" marginRight={1} marginBottom={1}>
            <Typography variant='h1' margin={1}>
                말뚝 정보
            </Typography>
                <Panel variant='shadow' width={820} paddingLeft={2} paddingTop={0.5}>
                    <Typography variant='h1'>Footing 제원</Typography>
                    <GuideBox row width='100' verCenter>
                        <GuideBox row width='100'>
                            <TypoGraphyTextField
                            title = "재하방향 폭(m)" 
                            height = {30}
                            width = {180}
                            textFieldWidth = {100}
                            value = {foundationWidth}
                            onChange = {(e:any) => {setFoundationWidth(e.target.value);}}
                            placeholder = '재하방향 폭' />
                        </GuideBox>
                        <GuideBox row padding={1} width='100'>
                            <TypoGraphyTextField
                                title = "측면 길이(m)"
                                height = {30}
                                width = {180}
                                textFieldWidth = {100}
                                value = {sideLength}
                                onChange = {(e:any) => {setSideLength(e.target.value);}}
                                placeholder = '측면 길이' />
                        </GuideBox>
                        <GuideBox row padding={1 }>
                            <TypoGraphyTextField
                                title = "저면 포고(m)"
                                height = {30}
                                width = {180}
                                textFieldWidth = {100}
                                value = {toplevel}
                                onChange = {(e:any) => {setTopLevel(e.target.value);}}
                                placeholder = '저면 표고' />
                        </GuideBox>
                    </GuideBox>
            </Panel>

            <Typography variant='h1' padding={1}>
                말뚝 설정
            </Typography>
            <GuideBox row>
                <Panel padding ={1} variant='shadow' width = {820} height = {415}>
                    <GuideBox row spacing = {1} padding={1} width='100'>
                        <GuideBox>
                            <GuideBox>
                                <Typography variant='h1'>기본 설정</Typography>
                                <Panel width={320} height={210}>
                                    <PileInitialSettings />
                                </Panel>
                            </GuideBox>
                            <GuideBox marginTop={1}>
                                <GuideBox row horLeft verCenter>
                                    <Check checked={compositeTypeCheck} onChange={handleCompositePileType}/>
                                    <Typography variant='h1' verCenter>하부 말뚝 설정</Typography>
                                </GuideBox>
                            </GuideBox>
                            <Panel width={320} height={100}>
                                <AddComposites />
                            </Panel>
                        </GuideBox>
                        <GuideBox >
                            <GuideBox >
                                <Typography variant='h1'>단면 설정</Typography>
                                    <Panel padding={1} variant='shadow' width={460} height={210}>
                                        <PileSections />
                                    </Panel>
                                <GuideBox marginTop={2}>
                                        <GuideBox row verCenter>
                                            <GuideBox width={100}>
                                                <Typography variant='h1'>말뚝 배치</Typography> 
                                            </GuideBox>
                                            <GuideBox width={360} row horRight>
                                                <Typography variant='h1'>말뚝 배치도</Typography> 
                                                <PopupButtonComponent direction = 'Right' open={openRight} setOpen={setOpenRight}/>
                                            </GuideBox>
                                        </GuideBox>
                                    <Panel padding={1} variant='shadow' width={460} height={100}>  
                                        <PileLocation/>
                                    </Panel>
                                </GuideBox>
                            </GuideBox>
                        </GuideBox>
                        
                    </GuideBox>
                    <GuideBox row marginLeft={1} horRight  width={790}height={50} spacing={1}>
                        <Button variant='outlined'
                            onClick={AddDataButtonClick}>
                            추가
                        </Button>
                        <Button variant='outlined'
                        onClick={UpdateDataButtonClick}>
                            수정
                        </Button>
                        <Button variant='outlined'
                        onClick={DeleteDataButtonClick}>
                            삭제
                        </Button>
                    </GuideBox>
                </Panel>

                {openRight && <PileChart {...popupRightProps} closeHandler={() => setOpenRight(false)} />}

            </GuideBox>
            <Typography variant='h1' padding={1}>
                배치 정보
            </Typography>
            <Panel padding={1} variant='shadow' width={820} height={170}>
                <PileTable />
            </Panel>
        </GuideBox>
    );
};

export default PileProperties

