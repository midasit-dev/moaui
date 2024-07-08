import React, { useContext } from 'react';
import { useState } from 'react';
import {GuideBox, 
    TabGroup,
    Tab,
    Check,
    Typography,
} from '@midasit-dev/moaui';
import {useRecoilState, useRecoilValue} from 'recoil';
import { CompositeTypeCheck } from '../variables';
import BasicSection from './BasicSection';
import Composite from './Composite';
import Reinforced from './Reinforced';

function PileSections(){

    const [tabName,setTabName] = useState("Basic")

    const handelChange = (event:React.SyntheticEvent, newvalue: string)=>{
        setTabName(newvalue)
    }

    const compositePileTypeCheck = useRecoilValue(CompositeTypeCheck);
    
    return(
        <GuideBox>
            <GuideBox width='100%' height={290}>
                <TabGroup
                    value={tabName}
                    onChange={handelChange}
                    minWidth={50}
                    minHeight={12}
                    tabProps={{
                        minWidth: 80,
                        minHeight: 28,
                        fontSize: 'small'
                    }}
                >
                    <Tab value="Basic" label='기본 말뚝 단면' fontSize={'small'}/>
                    <Tab value="Double" label='하부 말뚝 단면' disabled={!compositePileTypeCheck} />
                    <Tab value="Composite" label='보강단면'/>
                    
                </TabGroup>
                {tabName === "Basic" && <BasicSection/>}
                {tabName === "Double" && <Composite/>}
                {tabName === "Composite" && <Reinforced />}
            </GuideBox>
            
        </GuideBox>
        
    );
}

export default PileSections;