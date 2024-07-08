import React from 'react';
import { useState } from 'react';
import {GuideBox, 
    Typography,
    Panel,
    Check,
    Button,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesDualComponentsTypographyDropListSpaceBetween,
} from '@midasit-dev/moaui';

function SoilOptions(){

    return(
        <GuideBox>
            <GuideBox row verCenter>
                <Check />
                <Typography variant='h1'>저항강도 계산</Typography>
            </GuideBox>
            <GuideBox>
                <Panel width={400}>
                    <Typography variant='h1'>말뚝 축방향 저항 특성</Typography>
                        <GuideBox>
                            <Panel>
                                <TemplatesDualComponentsTypographyDropListSpaceBetween
                                    title = "점성토의 최대 주면 마찰력도 산출 방법"
                                    width = {360}
                                    dropListWidth = {200}
                                />
                                <TemplatesDualComponentsTypographyTextFieldSpaceBetween 
                                    title = "말뚝 선단의 단위 면적당 극한 지지력도"
                                    width = {360}
                                    textFieldWidth = {150}
                                /> 
                            </Panel>
                        </GuideBox> 
                        <Typography marginTop={1} variant='h1'>말뚝 축직각방향 저항 특성</Typography>
                        <GuideBox>
                            <Panel>
                            <TemplatesDualComponentsTypographyTextFieldSpaceBetween 
                                    title = "지표면과 수평면이 이루는 각"
                                    width = {360}
                                    textFieldWidth = {150}
                                /> 
                            <TemplatesDualComponentsTypographyTextFieldSpaceBetween 
                                title = "지표면 재하하중"
                                width = {360}
                                textFieldWidth = {150}
                            /> 
                        </Panel>
                    </GuideBox>
                </Panel>
            </GuideBox>
        </GuideBox>
    );
};

export default SoilOptions
