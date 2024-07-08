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
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChartLine, GuideBox, Check } from '@midasit-dev/moaui';
import { 
	VarTemperatureGradientChart, 
	VarTemperatureGradientChartLocal,
	VarTemperatureGradientChartHeatingCheck,
	VarTemperatureGradientChartCoolingCheck,
} from './variables';

const CompTemperatureGradientChart = () => {
	const value = useRecoilValue(VarTemperatureGradientChart);
	
	const [chartValue, setChartValue] = useRecoilState(VarTemperatureGradientChartLocal);
	const [heatingCheck, setHeatingCheck] = useRecoilState(VarTemperatureGradientChartHeatingCheck);
	const [coolingCheck, setCoolingCheck] = useRecoilState(VarTemperatureGradientChartCoolingCheck);

	React.useEffect(() => {
		setChartValue(value);
		if (value.find((item: any) => item.id === 'TempHeating')) {
			setHeatingCheck(true);
		} else {
			setHeatingCheck(false);
		}
		if (value.find((item: any) => item.id === 'TempCooling')) {
			setCoolingCheck(true);
		} else {
			setCoolingCheck(false);
		}
	}, [setChartValue, setCoolingCheck, setHeatingCheck, value]);

  return (
    <GuideBox width="100%" center spacing={2}>
      <GuideBox>
				<ChartLine 
					data={chartValue}
					axisTop
					axisTopTickValues={5}
					axisTopDecimals={2}
					axisTopTickRotation={-30}
					axisRight
					axisRightTickValues={5}
					axisRightDecimals={2}
					axisRightTickRotation={-30}
					width={300}
					marginTop={50}
					marginRight={50}
					marginLeft={16}
					marginBottom={16}
				/>
      </GuideBox>
      <GuideBox row spacing={2} center>
        <Check 
					name="Heating"
					checked={heatingCheck}
					onChange={(e: any, checked: boolean) => {
						const tempHeatingFind = value.find((item: any) => item.id === 'TempHeating');
						if (tempHeatingFind) {
							if (value.length === 0) return;
							setHeatingCheck(checked);
							if (checked) setChartValue([...chartValue, tempHeatingFind]);
							if (!checked) setChartValue(chartValue.filter((item: any) => item.id !== 'TempHeating'));
						}
					}}
				/>
        <Check 
					name="Cooling" 
					checked={coolingCheck} 
					onChange={(e: any, checked: boolean) => {
						const tempCoolingFind = value.find((item: any) => item.id === 'TempCooling');
						if (tempCoolingFind) {
							if (value.length === 0) return;
							setCoolingCheck(checked);
							if (checked) setChartValue([...chartValue, tempCoolingFind]);
							if (!checked) setChartValue(chartValue.filter((item: any) => item.id !== 'TempCooling'));
						}
					}}
				/>
      </GuideBox>
    </GuideBox>
  );
};

export default CompTemperatureGradientChart
