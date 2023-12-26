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
import { VarApplyT3, VarApplyT3H, VarApplyT3C } from "./variables";
import { GuideBox, Check, TextField, ComponentsIconButtonWithName } from "@midasit-dev/moaui";

const CompApplyT3 = () => {
	const [applyT3, setApplyT3] = useRecoilState(VarApplyT3);
	const [applyT3H, setApplyT3H] = useRecoilState(VarApplyT3H);
	const [applyT3C, setApplyT3C] = useRecoilState(VarApplyT3C);

  return (
    <GuideBox width="100%" row horSpaceBetween>
			<GuideBox row horSpaceBetween verCenter height={30}>
				<Check
					name="Apply T3"
					namePlacement="start"
					checked={applyT3}
					onChange={() => setApplyT3(!applyT3)}
				/>
				<GuideBox width={75} height={30} verCenter paddingX={0.75}>
					<TextField
						width="100%"
						height={30}
						title="H:"
						placeholder="1.8"
						disabled={!applyT3}
						onChange={(e: any) => setApplyT3H(e.target.value)}
						value={applyT3H}
					/>
				</GuideBox>
				<GuideBox width={75} height={30} verCenter>
					<TextField
						width="100%"
						height={30}
						title="C:"
						placeholder="1.8"
						disabled={!applyT3}
						onChange={(e: any) => setApplyT3C(e.target.value)}
						value={applyT3C}
					/>
				</GuideBox>
			</GuideBox>
			<ComponentsIconButtonWithName iconName="Help" />
    </GuideBox>
  );
};

export default CompApplyT3;
