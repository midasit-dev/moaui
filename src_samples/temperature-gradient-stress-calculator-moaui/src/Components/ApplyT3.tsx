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
import { VarApplyT3, VarApplyT3H, VarApplyT3C, VarForceCalcStress } from "./variables";
import { GuideBox, Check, TextField, IconButton, Icon, Tooltip, Typography } from "@midasit-dev/moaui";

import { useSnackbar } from "notistack";

const CompApplyT3 = () => {
	const [applyT3, setApplyT3] = useRecoilState(VarApplyT3);
	const [applyT3H, setApplyT3H] = useRecoilState(VarApplyT3H);
	const [applyT3C, setApplyT3C] = useRecoilState(VarApplyT3C);

	//계산 실행 여부를 저장합니다.
	const setForceCalcStress = useSetRecoilState(VarForceCalcStress);

	const { enqueueSnackbar } = useSnackbar();
	
  return (
    <GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
					<Check
						name="Apply T3"
						namePlacement="start"
						checked={applyT3}
						onChange={() => setApplyT3(!applyT3)}
					/>
				<GuideBox verCenter paddingX={0.75} row spacing={1}>
					<Typography variant="body1">H: </Typography>
					<TextField
						width={50}
						height={30}
						placeholder="1.8"
						disabled={!applyT3}
						onChange={(e: any) => {
							const curValue = e.target.value;
							if (parseFloat(curValue) > 3.0) {
								enqueueSnackbar('T3 cannot excess 3.0 °C(5°F)', { variant: 'error' });
								return;
							}
							setApplyT3H(e.target.value);
						}}
						value={applyT3H}
					/>
				</GuideBox>
				<GuideBox verCenter paddingX={0.75} row spacing={1}>
					<Typography variant="body1">C: </Typography>
					<TextField
						width={50}
						height={30}
						placeholder="1.8"
						disabled={!applyT3}
						onChange={(e: any) => {
							const curValue = e.target.value;
							if (parseFloat(curValue) > 3.0) {
								enqueueSnackbar('T3 cannot excess 3.0 °C(5°F)', { variant: 'error' });
								return;
							}
							setApplyT3C(e.target.value)}
						}
						value={applyT3C}
					/>
				</GuideBox>
			</GuideBox>
			<Tooltip 
				title={
					<GuideBox spacing={1}>
						<GuideBox width="100%" height={60} center spacing={2}>
							<Typography variant="h1" size="medium">Loading Diagram</Typography>
							<Typography variant="body1">Reference for variables</Typography>
						</GuideBox>
						<GuideBox>
							<img src={process.env.PUBLIC_URL + '/svg/applyT3.svg'} width="100%" height="100%" alt="applyT3" />
						</GuideBox>
					</GuideBox>
				} 
				placement="right"
			>
				<IconButton transparent onClick={() => {
					if (applyT3) {
						setForceCalcStress(true);
					}
				}}>
					<Icon iconName="PlayArrow" opacity={!applyT3 ? 0.3 : 1} />
				</IconButton>
			</Tooltip>
    </GuideBox>
  );
};

export default CompApplyT3;
