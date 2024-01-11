/**
 *		                                                                         __      
 *		                                                                        /\ \__   
 *		  ___     ___     ___ ___     _____     ___     ___       __     ___    \ \ ,_\  
 *		 /'___\  / __`\ /' __` __`\  /\ '__`\  / __`\ /' _ `\   /'__`\ /' _ `\   \ \ \/  
 *		/\ \__/ /\ \L\ \/\ \/\ \/\ \ \ \ \L\ \/\ \L\ \/\ \/\ \ /\  __/ /\ \/\ \   \ \ \_ 
 *		\ \____\\ \____/\ \_\ \_\ \_\ \ \ ,__/\ \____/\ \_\ \_\\ \____\\ \_\ \_\   \ \__\
 *		 \/____/ \/___/  \/_/\/_/\/_/  \ \ \/  \/___/  \/_/\/_/ \/____/ \/_/\/_/    \/__/
 *		                                \ \_\                                            
 *		                                 \/_/                                            
 */

import React from "react"; 
import { TabGroup, Tab, GuideBox, Panel } from "@midasit-dev/moaui"; 
import ConcreteBasic from "./ConcreteBasic";
import ConcreteGraph from "./ConcreteGraph";
import TimeDependentBasic from "./TimeDependentBasic";
import TimeDependentGraph from "./TimeDependentGraph";

const ComponentsConcrete = () => {
    return(
        <GuideBox row width='100%' spacing={1}>
            <ConcreteBasic/>
            <ConcreteGraph/>
        </GuideBox>
    );
};

const ComponentsTimeDependent = () => {
    return(
        <GuideBox row width='100%' spacing={1}>
            <TimeDependentBasic/>
            <TimeDependentGraph/>
        </GuideBox>
    );
}

const ComponentsTabGroup = () => {
    const [value, setValue] = React.useState("one");

    return (
        <GuideBox show={false} width='100%' >
            <TabGroup
                value={value}
                onChange={(event: React.SyntheticEvent, newValue: string) => setValue(newValue)}
            >
                <Tab value="one" label="Concrete" />
                <Tab value="two" label="Time-Dependent" />
            </TabGroup>
            {value === "one" && ComponentsConcrete()}
            {value === "two" && ComponentsTimeDependent()}
        </GuideBox>
    );
}; 

export default ComponentsTabGroup;
