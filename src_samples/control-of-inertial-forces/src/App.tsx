/**
 *	                        __                                                   
 *	  ___ ___       __     /\_\     ___                 __      _____    _____   
 *	/' __` __`\   /'__`\   \/\ \  /' _ `\             /'__`\   /\ '__`\ /\ '__`\ 
 *	/\ \/\ \/\ \ /\ \L\.\_  \ \ \ /\ \/\ \           /\ \L\.\_ \ \ \L\ \\ \ \L\ \
 *	\ \_\ \_\ \_\\ \__/.\_\  \ \_\\ \_\ \_\          \ \__/.\_\ \ \ ,__/ \ \ ,__/
 *	 \/_/\/_/\/_/ \/__/\/_/   \/_/ \/_/\/_/  _______  \/__/\/_/  \ \ \/   \ \ \/ 
 *	                                        /\______\             \ \_\    \ \_\ 
 *	                                        \/______/              \/_/     \/_/ 
 */

import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

 //@midasit-dev/moaui
import { GuideBox, Panel, Typography, ComponentsIconButtonWithName } from "@midasit-dev/moaui";

 //Components
//  import CompApplyT3 from './Components/ApplyT3';
//  import CompAssignLoadButton from './Components/AssignLoadButton';
//  import CompTemperatureGradientChart from './Components/TemperatureGradientChart';
//  import CompGirderMaterial from './Components/GirderMaterial';
//  import CompImportSectionButton from './Components/ImportSectionButton';
//  import CompSelfEqStressesCharts from './Components/SelfEqStressesCharts';
//  import CompZone from './Components/Zone';
import CompTimeHistory from './Components/TimeHistory';
//  import CompSurface from './Components/Surface';
//  import CompUnitNotation from './Components/UnitNotation';

//  import CompTableMaterialStress from './Components/MaterialStressTables';

 //Variables
//  import { 
// 	 VarApplyT3, 
// 	 VarApplyT3C, 
// 	 VarApplyT3H, 
// 	 VarImportSectionButton, 
// 	 VarCalculationParseResult,
// 	 VarGirderMaterial,
// 	 VarZone,
// 	 VarSurface,
// 	 VarTemperatureGradientChart,
// 	 VarSelfEqStressesTempHeatingChart,
// 	 VarSelfEqStressesTempCoolingChart,
//  } from './Components/variables';
//  import { parseId } from './utils';
import { checkPyScriptReady } from './pyscript_utils';
import { useSnackbar } from 'notistack';

const App = () => {
	const visible = true;

	 //UI Values
	//  const importSectionValue = useRecoilValue(VarImportSectionButton);
	//  const zoneValue = useRecoilValue(VarZone);
	//  const surfaceValue = useRecoilValue(VarSurface);
	//  const girderMatlValue = useRecoilValue(VarGirderMaterial);
	//  const applyT3 = useRecoilValue(VarApplyT3);
	//  const applyT3H = useRecoilValue(VarApplyT3H);
	//  const applyT3C = useRecoilValue(VarApplyT3C);

	//  //Setters
	//  const setCalcValue = useSetRecoilState(VarCalculationParseResult);
	//  const setTempGradientChartValue = useSetRecoilState(VarTemperatureGradientChart);
	//  const setSelfEqStressLeftValue = useSetRecoilState(VarSelfEqStressesTempHeatingChart);
	//  const setSelfEqStressRightValue = useSetRecoilState(VarSelfEqStressesTempCoolingChart);

	const { enqueueSnackbar } = useSnackbar();

	return (
	<GuideBox show={visible} fill="1" width={300} padding={1} spacing={1}>
	   {/** Top Panels */}
		<Panel variant="shadow2" width="100%" height="100%">
			<GuideBox show={visible} width="100%" height={200}>
				<CompTimeHistory />
				<Typography variant="h1">Time History Load Cases Name</Typography>
			</GuideBox>
			<GuideBox show={visible} width="100%" height={100}>
				<Typography variant="h1">Static Load</Typography>
			</GuideBox>
			<GuideBox show={visible} width="100%" height={100}>
				<Typography variant="h1">Function</Typography>
			</GuideBox>
		</Panel>
		<GuideBox show={visible} fill="1" height={50}>

		</GuideBox>
	</GuideBox>
	);
};

export default App;