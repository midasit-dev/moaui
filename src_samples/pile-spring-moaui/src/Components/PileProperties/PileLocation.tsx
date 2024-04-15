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
    DropList
} from '@midasit-dev/moaui';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Major_Ref_Value, Minor_Ref_Value, Major_Start_Point, Minor_Start_Point, Major_Space, Major_Degree, Minor_Degree} from '../variables';


function PileLocation(){

    const Major_Ref_Point =new Map<string, number>([ ['우측', 1], ['좌측', 2], ]);
    const Minor_Ref_Point =new Map<string, number>([ ['상단', 1], ['하단', 2], ]);

    const [majorRefValue, setMajorRefValue] = useRecoilState(Major_Ref_Value);
    const [minorRefValue, setMinorRefValue] = useRecoilState(Minor_Ref_Value);

    const [majorStartPoint, setMajorStartPoint] = useRecoilState(Major_Start_Point);
    const [minorStartPoint, setMinorStartPoint] = useRecoilState(Minor_Start_Point);

    const [majorSpace, setMajorSpace] = useRecoilState(Major_Space);

    const [majorDegree, setMajorDegree] = useRecoilState(Major_Degree);
    const [minorDegree, setMinorDegree] = useRecoilState(Minor_Degree);
    
    const handleMajorStartPointChange = (e:any) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setMajorStartPoint(0); 
        }
        else if (!Number.isNaN(Number(inputValue))){
            setMajorStartPoint(e.target.value);
        }
        else{
            setMajorStartPoint(0);
        }
    }

    const handleMinorStartPointChange = (e:any) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setMinorStartPoint(0); 
        }
        if (!Number.isNaN(Number(inputValue))){
            setMinorStartPoint(e.target.value);
        }
        else{
            setMinorStartPoint(0);
        }
    }

    const handleMajorSpaceChange = (e:any) => {
        const inputValue = e.target.value;
        if (/^[0-9@,. ]*$/.test(inputValue)) {
            setMajorSpace(inputValue);
        }
        else{
            setMajorSpace('');
        }
    }

    const handleMajorDegreeChange = (e:any) => {
        const inputValue = e.target.value;
        if (/^[0-9@,-. ]*$/.test(inputValue)) {
            setMajorDegree(inputValue);
        }
        else{
            setMajorDegree('');
        }
    }

    const handleMinorDegreeChange = (e:any) => {
        const inputValue = e.target.value;
        if (/^[0-9@,-. ]*$/.test(inputValue)) {
            setMinorDegree(inputValue);
        }
        else{
            setMinorDegree('');
        }
    }
    return(
        <GuideBox width='100%' verCenter>
            <GuideBox  horSpaceBetween width={450}>
                <GuideBox row spacing={1}>
                    <GuideBox width={80} horCenter>
                        <Typography variant='body1'></Typography>
                    </GuideBox>
                    <GuideBox width={80} horCenter>
                        <Typography variant='body1'>참조기준</Typography>
                    </GuideBox>
                    <GuideBox width={80} horCenter>
                        <Typography variant='body1'>위치</Typography>
                    </GuideBox>
                    <GuideBox width={80} horCenter>
                        <Typography variant='body1'>간격</Typography>
                    </GuideBox>
                    <GuideBox width={80} horCenter>
                        <Typography variant='body1'>각도</Typography>
                    </GuideBox>
                    
                </GuideBox>
            </GuideBox>
            <GuideBox horSpaceBetween>
                <GuideBox row spacing={1}>
                    <GuideBox height={30} width={80} horLeft verCenter>
                        <Typography variant='body1'>재하방향</Typography>
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                        <DropList itemList={Major_Ref_Point} value={majorRefValue} onChange= {(e:any) => {setMajorRefValue(e.target.value);}} width={80} />
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                        <TextFieldV2 height={30} width={80} value={majorStartPoint.toString()} onChange= {handleMajorStartPointChange} placeholder='위치' />
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                    <   TextFieldV2 height={30} width={80} value = {majorSpace.toString()} onChange = {handleMajorSpaceChange} placeholder='간격' />
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                        <TextFieldV2 height={30} width={80} value = {majorDegree.toString()} onChange = {handleMajorDegreeChange} placeholder='각도' />
                    </GuideBox>
                </GuideBox>
            </GuideBox>
            <GuideBox horSpaceBetween>
                <GuideBox row spacing={1}>
                    <GuideBox height={30} width={80} horLeft verCenter>
                        <Typography variant='body1'>재하직각방향</Typography>
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                        <DropList itemList={Minor_Ref_Point} value={minorRefValue} onChange= {(e:any) => {setMinorRefValue(e.target.value);}} width={80}/>
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                        <TextFieldV2 height={30} width={80} value = {minorStartPoint.toString()} onChange = {handleMinorStartPointChange}placeholder='위치' />
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                        <TextFieldV2 height={30} width={80} placeholder='간격' disabled />
                    </GuideBox>
                    <GuideBox height={30} width={80} horCenter verCenter>
                        <TextFieldV2 height={30} width={80} value = {minorDegree.toString()} onChange = {handleMinorDegreeChange} placeholder='각도' />
                    </GuideBox>
                </GuideBox>
            </GuideBox>
        </GuideBox>
    );
}

export default PileLocation;