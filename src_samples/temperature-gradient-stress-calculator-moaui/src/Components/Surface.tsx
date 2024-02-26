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
import { VarForceCalcStress, VarSurface } from "./variables";
import { GuideBox, Typography, DropList } from "@midasit-dev/moaui";

const CompSurface = () => {
	const [value, setValue] = useRecoilState(VarSurface);

	const itemsMap = new Map<string, number>([
		['PLAIN', 1],
		['ASPHALT', 2]
	]);
	
	//계산 실행 여부를 저장합니다.
	const setForceCalcStress = useSetRecoilState(VarForceCalcStress);

  return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography center height={30}>Surface</Typography>
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

export default CompSurface;
