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

import React from 'react';
import { useRecoilValue } from 'recoil';
import { 
	VarSelfEqStressesTempHeatingChart, 
	VarSelfEqStressesTempCoolingChart, 
	VarTemperatureGradientChartHeatingCheck,
	VarTemperatureGradientChartCoolingCheck,
} from './variables';
import { ChartLine } from '@midasit-dev/moaui';
import { GuideBox } from '@midasit-dev/moaui';

const CompSelfEqStressesCharts = () => {
	const heatingChart = useRecoilValue(VarSelfEqStressesTempHeatingChart);
	const coolingChart = useRecoilValue(VarSelfEqStressesTempCoolingChart);

	const heatingCheck = useRecoilValue(VarTemperatureGradientChartHeatingCheck);
	const coolingCheck = useRecoilValue(VarTemperatureGradientChartCoolingCheck);

	return (
		<GuideBox row>
			<GuideBox opacity={heatingCheck ? 1 : 0.3}>
				<TempHeatingChart data={heatingChart} />
			</GuideBox>
			<GuideBox opacity={coolingCheck ? 1 : 0.3}>
				<TempCoolingChart data={coolingChart} />
			</GuideBox>
		</GuideBox>
	)
}

export default CompSelfEqStressesCharts;

const TempHeatingChart = ({
	data
}: any) => {
	return (
		<ChartLine 
			data={data}
			axisTop
			axisTopTickValues={4}
			axisTopTickRotation={-30}
			axisTopDecimals={2}
			axisRight
			axisRightTickValues={4}
			axisRightTickRotation={-30}
			axisRightDecimals={2}
			width={200}
			height={400}
			pointSize={0}
			marginTop={60}
			marginRight={70}
			marginLeft={10}
			marginBottom={10}
		/>
	);
}

const TempCoolingChart = ({
	data
}: any) => {
	return (
		<ChartLine 
			data={data}
			axisTop
			axisTopTickValues={4}
			axisTopTickRotation={-30}
			axisTopDecimals={2}
			axisRight
			axisRightTickValues={4}
			axisRightTickRotation={-30}
			axisRightDecimals={2}
			width={200}
			height={400}
			pointSize={0}
			marginTop={60}
			marginRight={70}
			marginLeft={10}
			marginBottom={10}
		/>
	);
}
