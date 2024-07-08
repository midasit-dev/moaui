import React from 'react';

import {GuideBox, 
    Typography,
    Panel,
    Check,
    Button,
    TemplatesDualComponentsTypographyTextFieldSpaceBetween,
    TemplatesDualComponentsTypographyDropListSpaceBetween,
} from '@midasit-dev/moaui';
import TypoGraphyTextField from '../NewComponents/TypoGraphyTextField'
import PileInitialSettings from '../PileProperties/PileInitialSettings';
import PileSections from '../PileProperties/PileSections';
import AddComposites from '../PileProperties/AddComposites';
import PileChart from '../Chart/PileChart';
import PileLocation from '../PileProperties/PileLocation';
import PileTable from '../PileProperties/PileTable';
import {useRecoilState, useRecoilValue} from 'recoil';
import {CalVsiState, SoilData, LiquefactionState, SlopeEffectState, GroupEffectState, GroupEffectValue} from '../variables';
import { FoundationWidth, SideLength, CompositeTypeCheck, PileTableData, PileDataSelector, SelectedRow} from '../variables';

function SoilSettings(){

    const [calVsiState, setCalVsiState] = useRecoilState(CalVsiState)
    const [liqufactionState, setLiqufactionState] = useRecoilState(LiquefactionState)
    const [slopeEffectState, setSlopeEffectState] = useRecoilState(SlopeEffectState)
    const [groupEffectState, setGroupEffectState] = useRecoilState(GroupEffectState)
    const [groupEffectValue, setGroupEffectValue] = useRecoilState(GroupEffectValue)
    
    const [soilData, setSoilData] = useRecoilState(SoilData)
    const handleVsiState = (e:any) => {
        setCalVsiState(prevState => !prevState)
        if (calVsiState === false){  
            setSoilData(prevSoilData => prevSoilData.map((row: any) => {
                
                //Vsi, ED 자동 계산
                let newVsi = 0
                let newVsd = 0
                let newED = 0
                if (row.LayerType === '점성토') {
                    newVsi = Number((100* Math.pow(Math.min(row.AvgNValue, 25),(1/3))))
                    if (newVsi < 300){
                        newVsd = 0.8*newVsi
                    }
                    else {
                        newVsd = newVsi
                    }
                    let Gd = row.gamma/9.8 * Math.pow(newVsd,2)
                    newED = 2*(1+Number(row.vd))*Gd
                    return { ...row, Vsi: newVsi, ED: newED }; 
                } 
                else if (row.LayerType === '사질토' || row.LayerType === '사력토') {
                    newVsi = Number((80* Math.pow(Math.min(row.AvgNValue, 50),(1/3))))
                    if (newVsi < 300){
                        newVsd = 0.8*newVsi
                    }
                    else {
                        newVsd = newVsi
                    }
                    let Gd = row.gamma/9.8 * Math.pow(newVsd,2)
                    newED = 2*(1+Number(row.vd))*Gd
                    return { ...row, Vsi: newVsi , ED: newED}; 
                }
                else { 
                    return row;
                }

                
            }));
        }
    }
    
    const handleLiqufactionState = (e:any) => {
        setLiqufactionState(prevState => !prevState)
        if (liqufactionState === true){
            setSoilData(soilData.map((data) => {
                return {...data, DE : 1}
            }))
        }
    }

    const handleSlopeEffectState = (e:any) => {
        setSlopeEffectState(prevState => !prevState)
        if (slopeEffectState === true){
            setSoilData(soilData.map((data) => {
                return {...data, Length : 1}
            }))
        }
    }
    
    const handleGroupEffectState = (e:any) => {
        setGroupEffectState(prevState => !prevState)
        if (groupEffectState === true){
            setGroupEffectValue(1.0)
        }
    }
    return(
        <GuideBox>
            <GuideBox row verCenter>
                <Check onChange={handleVsiState} checked = {calVsiState}/>
                <Typography>Vsi의 자동 계산(도시V)</Typography>
            </GuideBox>
            <Typography variant='h1' padding={1}>수평지반 반력계수 kH의 저감</Typography>
            <GuideBox>
                <Panel width={400}>
                    <GuideBox row verCenter>
                        <Check onChange = {handleLiqufactionState} checked = {liqufactionState}/>
                        <Typography>액상화 층에 대한 저감(DE)</Typography>
                    </GuideBox>
                    <GuideBox row verCenter>
                        <Check onChange={handleSlopeEffectState} checked = {slopeEffectState}/>
                        <Typography>사면효과에 의한 저감</Typography >
                    </GuideBox>
                    <GuideBox row verCenter>
                        <Check onChange={handleGroupEffectState} checked = {groupEffectState}/>
                        <Typography>군말뚝 효과에 의한 저감</Typography>
                        <GuideBox marginLeft={1}>
                            <TypoGraphyTextField 
                                title='μ' 
                                value={groupEffectValue}
                                onChange={(e:any) => setGroupEffectValue(e.target.value)} 
                                width={100}
                                textFieldWidth={80}
                                disabled={!groupEffectState}
                                />
                        </GuideBox>
                        
                    </GuideBox>
                    
                </Panel>
            </GuideBox>
        </GuideBox>
    );
};

export default SoilSettings
