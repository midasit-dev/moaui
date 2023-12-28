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
import { useRecoilState, useSetRecoilState } from "recoil";
import { VarForceCalcStress, VarZone } from "./variables";
import { GuideBox, Typography, DropList } from "@midasit-dev/moaui";

const Zone = () => {
	const [value, setValue] = useRecoilState(VarZone);

	const itemsMap = new Map<string, number>([
		["ZONE1", 1],
		["ZONE2", 2],
		["ZONE3", 3],
		["ZONE4", 4],
	]);

	//계산 실행 여부를 저장합니다.
	const setForceCalcStress = useSetRecoilState(VarForceCalcStress);

  return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography flexItem textAlign="center" height={30}>Zone</Typography>
				<DropList
					width={100}
					itemList={itemsMap}
					defaultValue={value}
					value={value}
					onChange={(e: any) => {
						setValue(e.target.value);
						setForceCalcStress(true);
					}}
				/>
			</GuideBox>
			<GuideBox width={43} height={30} />
		</GuideBox>
	);
};

export default Zone;
