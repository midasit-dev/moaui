import {GuideBox, ChartLine, Typography} from '@midasit-dev/moaui';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {  FoundationWidth, SideLength
} from '../variables';
import { useEffect, useState } from 'react';
import {Line} from '@nivo/line'
import {} from '../../utils_pyscript';
import {ChartDrawing, ChartDrawingData, Concrete_Diameter, Major_Ref_Value, Minor_Ref_Value, Major_Start_Point, Minor_Start_Point, Major_Space} from '../variables';
import {Icon, Panel, TabGroup, Tab} from '@midasit-dev/moaui';
import PlanView from './PlanViewCanvas';
import FrontView from './FrontViewCanvas';
import SideView from './SideViewCanvas';
function PileChart(props: any){
    const {closeHandler, ...otherProps } = props;
    const Width = useRecoilValue(FoundationWidth);
    const Length = useRecoilValue(SideLength);

    const boxsize = Math.max(Number(Length*1.2), Number(Width*1.2))
    
    const xMinScale = boxsize/2 - Number(Length)/2
    const xMaxScale = boxsize-xMinScale
    const yMinScale = boxsize/2 - Number(Width)/2
    const yMaxScale = boxsize-yMinScale

    const [tabName,setTabName] = useState("PlanView")

    const handelTabChange = (event:React.SyntheticEvent, newvalue: string)=>{
        setTabName(newvalue)
    }
    return(
        
        <GuideBox show marginLeft={1} height={415} width ={370}>
            <Panel width={370} height={415}>
                <GuideBox row width ={350} horSpaceBetween>
                    <Typography variant='h1'>말뚝 배치도</Typography>
                    <Icon iconName='Close' toButton onClick={closeHandler}/>
                </GuideBox>
                <TabGroup
                    value = {tabName}
                    onChange = {handelTabChange}
                    minWidth={35}
                    minHeight={12}
                    tabProps={{
                        minWidth: 60,
                        minHeight: 28,
                        fontSize: 'small'
                    }}
                >
                    <Tab value = "PlanView" label = "평면도"/>
                    <Tab value = "FrontView" label = "정면도"/>
                    <Tab value = "SideView" label = "측면도"/>
                </TabGroup>
                <GuideBox height={350} width={350}>
                    {tabName === "PlanView" && <PlanView />}
                    {tabName === "FrontView" && <FrontView /> }
                    {tabName === "SideView" && <SideView />}
                </GuideBox>
                
            </Panel>
        </GuideBox>
        
    )
}

export default PileChart;