import React, { useEffect } from 'react';
import { useState } from 'react';
import {GuideBox, 
    TabGroup,
    Tab,
    Typography,
    Panel,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween
} from '@midasit-dev/moaui';
import {useRecoilState, useRecoilValue} from 'recoil';
import {PileType, Concrete_Diameter, Concrete_Modulus, Concrete_Thickness, ConcreteModulus_Title,
    Steel_Diameter, Steel_Modulus, Steel_Thickness, Steel_Dia_Title, Steel_Cor_Title, Steel_Cor_Thickness, Steel_Title} from '../variables';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField';

function BasicSection(){
    
    const pileType = useRecoilValue(PileType);
    const steelDiaTitle = useRecoilValue(Steel_Dia_Title);
    const concreteModulusTitle = useRecoilValue(ConcreteModulus_Title);
    const steelCorTitle = useRecoilValue(Steel_Cor_Title);
    const steelTitle = useRecoilValue(Steel_Title)
    const [concreteDiameter, setConcreteDiameter] = useRecoilState(Concrete_Diameter);
    const [concreteThickness, setConcreteThickness] = useRecoilState(Concrete_Thickness);
    const [concreteModulus, setConcreteModulus] = useRecoilState(Concrete_Modulus);

    const [steelCaseDiameter, setSteelCaseDiameter] = useRecoilState(Steel_Diameter);
    const [steelCaseThickness, setSteelCaseThickness] = useRecoilState(Steel_Thickness);
    const [steelCaseModulus, setSteelCaseModulus] = useRecoilState(Steel_Modulus);
    const [steelCorthickness, setSteelCorthickness] = useRecoilState(Steel_Cor_Thickness);

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
            setConcreteThickness(e.target.value);
        }
        else{
            setConcreteThickness(0);
        }
    }

    const handleChangeConcreteModulus = (e:any) => {
        const inputValue = e.target.value;
        setConcreteModulus(inputValue);
    }

    const handleChangeSteelDiameter = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setSteelCaseDiameter(e.target.value);
        }
        else{
            setSteelCaseDiameter(0);
        }
    }

    const handleChangeSteelThickness = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setSteelCaseThickness(e.target.value);
        }
        else{
            setSteelCaseThickness(0);
        }
    }
    const handleChangeSteelModulus = (e:any) => {
        const inputValue = e.target.value;
        setSteelCaseModulus(e.target.value);
    }

    const handleChangeSteelCorThickness = (e:any) => {
        const inputValue = e.target.value;
        if (!Number.isNaN(Number(inputValue))){
            setSteelCorthickness(e.target.value);
        }
        else{
            setSteelCorthickness(0);
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
                                disabled = {(pileType === '강관말뚝') ? true : false}
                                value = {concreteDiameter}
                                onChange = {handleChangeConcreteDiameter}
                                placeholder = '직경 (mm)'
                                type = 'number'
                            />
                            <TypoGraphyTextField
                                title = "두께 (mm)"
                                width = {200}
                                textFieldWidth = {100}
                                placeholder = '두께 (mm)'
                                disabled = {(pileType === '현장타설말뚝' || pileType === '강관말뚝' || pileType === '소일시멘트말뚝') ? true : false}
                                value = {concreteThickness}
                                onChange = {handleChangeConcreteThickness}
                                type = 'number'
                                
                            />
                            <TypoGraphyTextField
                                title = {concreteModulusTitle}
                                width = {200}
                                textFieldWidth = {100}
                                placeholder = {concreteModulusTitle}
                                disabled = {(pileType === '강관말뚝') ? true : false}
                                value = {concreteModulus}
                                onChange = {handleChangeConcreteModulus}
                                type = 'number'
                            />
                        </Panel>

                </GuideBox>
                <GuideBox>
                    <Typography variant='h1' paddingTop={1} paddingLeft={1}>
                        {steelTitle}
                    </Typography>
                    <Panel padding={1} variant='shadow' width={210}>
                        <TypoGraphyTextField
                            title = {steelDiaTitle}
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = {steelDiaTitle}
                            disabled = {(pileType === 'SC말뚝') ? true : false}
                            value = {steelCaseDiameter}
                            onChange = {handleChangeSteelDiameter}
                            type = 'number'
                        />
                        <TypoGraphyTextField
                            title = "두께 (mm)"
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = "두께 (mm)"
                            disabled = {(pileType === '현장타설말뚝') || (pileType ==='PHC말뚝') ? true : false}
                            value = {steelCaseThickness}
                            onChange = {handleChangeSteelThickness}
                            type = 'number'
                        />
                        <TypoGraphyTextField
                            title = "탄성계수 (N/mm²)"
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = "탄성계수 (N/mm²)"
                            value = {steelCaseModulus}
                            onChange = {handleChangeSteelModulus}
                            type = 'number'
                        />
                        <TypoGraphyTextField
                            title = {steelCorTitle}
                            width = {200}
                            textFieldWidth = {100}
                            placeholder = {steelCorTitle}
                            disabled = {(pileType === '현장타설말뚝') ? true : false}
                            value = {steelCorthickness}
                            onChange = {handleChangeSteelCorThickness}
                            type = 'number'
                        />
                        
                    </Panel>
                    
                </GuideBox>
            </GuideBox>
        </GuideBox>
    );
}

export default BasicSection;