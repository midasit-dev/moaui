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
import { useRecoilState } from "recoil";
import { VarTabGroupMain } from "./variables";
import { TabGroup, Tab, GuideBox } from "@midasit-dev/moaui";
import ConcreteBasic from "./ConcreteBasic";
import TimeDependentBasic from "./TimeDependentBasic";

const ComponentsTabGroup = () => {
	const [value, setValue] = useRecoilState(VarTabGroupMain);

	return (
		<GuideBox show={false} width='100%'>
			<TabGroup
				value={value}
				onChange={(event: React.SyntheticEvent, newValue: string) => setValue(newValue)}
			>
				<Tab value="Material" label="Concrete" />
				<Tab value="TimeDependent" label="Time-Dependent" />
			</TabGroup>
			{value === "Material" && <ConcreteBasic />}
			{value === "TimeDependent" && <TimeDependentBasic />}
		</GuideBox>
	);
};

export default ComponentsTabGroup;
