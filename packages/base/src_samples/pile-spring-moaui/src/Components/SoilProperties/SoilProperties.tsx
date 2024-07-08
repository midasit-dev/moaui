import React from 'react';
import { useState } from 'react';
import {GuideBox, 
    Typography,
    Panel,

} from '@midasit-dev/moaui';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField'
import SoilSettings from './SoilSettings';
import SoilOptions from './SoilOptions';
import SoilTable from './SoilTable';
import {useRecoilState, useRecoilValue,RecoilState} from 'recoil';
import {GroundLevel, Waterlevel} from '../variables';
function SoilProperties(){

    const [groundLevel, setGroundLevel] = useRecoilState(GroundLevel)
    const [waterlevel, setWaterlevel] = useRecoilState(Waterlevel)
    
    const handleGroundLevelChange = (e:any) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setGroundLevel(0); 
        }
        if (!Number.isNaN(Number(inputValue))){
            setGroundLevel(e.target.value);
        }
        else{
            setGroundLevel(0);
        }
    }
    return(
        <GuideBox width = 'auto' marginRight={1} marginBottom={1}>
            <Typography variant='h1' margin={1}>
                지반 정보
            </Typography>
            <Panel paddingLeft={2} paddingTop={0.5} width={820}>
                <GuideBox row padding={1} width='100' verCenter spacing={1}>
                    <TypoGraphyTextField
                    title = "설계 지반면 표고(m)" 
                    width = {250}
                    textFieldWidth = {100}
                    value = {groundLevel}
                    onChange = {handleGroundLevelChange}
                    placeholder = '지반면 표고'/>
                    <TypoGraphyTextField
                    title = "지하 수위면 표고(m)"
                    width = {250}
                    textFieldWidth = {100}
                    value = {waterlevel}
                    onChange = {(e:any) => {setWaterlevel(e.target.value);}}
                    placeholder = '지하수위' />
                    
                </GuideBox>
            </Panel>
            <GuideBox padding={1}>
                <Typography variant='h1'>지층 설정</Typography>
            </GuideBox>
            <GuideBox>
                <Panel width={820}>
                    <GuideBox  row>
                        <SoilSettings />
                        <SoilOptions />
                    </GuideBox>
                </Panel>
            </GuideBox>
            <GuideBox padding={1}>
                <Typography variant='h1'>지층 테이블</Typography>
            </GuideBox>
            <GuideBox>
                <Panel width={820}>
                    <SoilTable />
                </Panel>
            </GuideBox>
        </GuideBox>
    );
};

export default SoilProperties
