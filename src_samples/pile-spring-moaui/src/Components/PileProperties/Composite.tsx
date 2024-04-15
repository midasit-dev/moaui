import React, { useEffect } from 'react';
import { useState } from 'react';
import {GuideBox, 
    TabGroup,
    Tab,
    Typography,
    Panel,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesDualComponentsTypographyDropListSpaceBetween
} from '@midasit-dev/moaui';
import {useRecoilState, useRecoilValue} from 'recoil';
import {CompPileType, Concrete_Diameter, CompConcrete_Diameter, CompConcrete_Modulus, CompConcrete_Thickness, CompSteel_Title,
    CompSteel_Diameter, CompSteel_Modulus, CompSteel_Thickness, CompSteel_Dia_Title, CompSteel_Cor_Title, CompSteel_Cor_Thickness, CompConcreteModulus_Title} from '../variables';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';

function Composite(){
    
    const compPileType = useRecoilValue(CompPileType);
    const compSteelDiaTitle = useRecoilValue(CompSteel_Dia_Title);
    const compSteelCorTitle = useRecoilValue(CompSteel_Cor_Title);
    const compSteelTitle = useRecoilValue(CompSteel_Title)
    const compConcreteModulusTitle = useRecoilValue(CompConcreteModulus_Title);

    const [compConcreteDiameter, setConcreteDiameter] = useRecoilState(CompConcrete_Diameter);
    const [compConcreteModulus, setCompConcreteModulus] = useRecoilState(CompConcrete_Modulus);
    const [compConcreteThickness, setCompConcreteThickness] = useRecoilState(CompConcrete_Thickness);

    const [compSteelDiameter, setCompSteelDiameter] = useRecoilState(CompSteel_Diameter);
    const [compSteelThickness, setCompSteelThickness] = useRecoilState(CompSteel_Thickness);
    const [compSteelModulus, setCompSteelModulus] = useRecoilState(CompSteel_Modulus);
    const [compSteelCorThickness, setCompSteelCorThickness] = useRecoilState(CompSteel_Cor_Thickness);

    const handleChangeConcreteDiameter = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setConcreteDiameter(e.target.value);
        }
        else{
            setConcreteDiameter(0);
        }
    }

    const handleChangeConcreteThickness = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setCompConcreteThickness(e.target.value);
        }
        else{
            setCompConcreteThickness(0);
        }
    }

    const handleChangeConcreteModulus = (e:any) => {
        const inputValue = e.target.value;
        setCompConcreteModulus(inputValue);
    }

    const handleChangeSteelDiameter = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setCompSteelDiameter(e.target.value);
        }
        else{
            setCompSteelDiameter(0);
        }
    }

    const handleChangeSteelThickness = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setCompSteelThickness(e.target.value);
        }
        else{
            setCompSteelThickness(0);
        }
    }

    const handleChangeSteelModulus = (e:any) => {
        const inputValue = e.target.value;
        setCompSteelModulus(e.target.value);
    }

    const handleChangeSteelCorThickness = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setCompSteelCorThickness(e.target.value);
        }
        else{
            setCompSteelCorThickness(0);
        }
    }


    return(
        <GuideBox width='100%'>
            <GuideBox row spacing={1}>
                <GuideBox>
                    <Typography variant='h1' paddingTop={1} paddingLeft={1}>
                    콘크리트
                    </Typography>
                    <Panel padding={1} variant='shadow' width={210}>
                        <TypoGraphyTextField
                            title = "직경 (mm)"
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = "직경 (mm)"
                            disabled = {(compPileType === '강관말뚝') ? true : false}
                            value = {compConcreteDiameter}
                            onChange = {handleChangeConcreteDiameter}
                        />
                        <TypoGraphyTextField
                            title = "두께 (mm)"
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = "두께 (mm)"
                            disabled = {(compPileType === '현장타설말뚝' ||compPileType === '강관말뚝' || compPileType === '소일시멘트말뚝') ? true : false}
                            value = {compConcreteThickness}
                            onChange = {handleChangeConcreteThickness}
                        />
                        <TypoGraphyTextField
                            title = {compConcreteModulusTitle}
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = {compConcreteModulusTitle}
                            disabled = {(compPileType === '강관말뚝') ? true : false}
                            value = {compConcreteModulus}
                            onChange = {handleChangeConcreteModulus}
                        />
                    </Panel>
                </GuideBox>
                <GuideBox>
                    <Typography variant='h1' paddingTop={1} paddingLeft={1}>
                        {compSteelTitle}
                    </Typography>
                    <Panel padding={1} variant='shadow' width={210}>
                        <TypoGraphyTextField
                            title = {compSteelDiaTitle}
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = {compSteelDiaTitle}
                            disabled = {(compPileType === 'SC말뚝') ? true : false}
                            value = {compSteelDiameter}
                            onChange = {handleChangeSteelDiameter}
                        />
                        <TypoGraphyTextField
                            title = "두께 (mm)"
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = "두께 (mm)"
                            disabled = {(compPileType === '현장타설말뚝') || (compPileType ==='PHC말뚝') ? true : false}
                            value = {compSteelThickness}
                            onChange = {handleChangeSteelThickness}
                        />
                        <TypoGraphyTextField
                            title = "탄성계수 (N/mm²)"
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = "탄성계수 (N/mm²)"
                            value = {compSteelModulus}
                            onChange = {handleChangeSteelModulus}
                        />
                        <TypoGraphyTextField 
                            title = {compSteelCorTitle}
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = {compSteelCorTitle}
                            disabled = {(compPileType === '현장타설말뚝') ? true : false}
                            value = {compSteelCorThickness}
                            onChange = {handleChangeSteelCorThickness}
                        />
                        </Panel>
                </GuideBox>   
            </GuideBox>
        </GuideBox>
    );
}

export default Composite;