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
import { GuideBox, Panel, Button } from "@midasit-dev/moaui";

//Components
import CompTimeHistory from './Components/TimeHistory';
import CompTHfunction from './Components/TimeHistoryFunction';
import CompStaticLoad from './Components/StaticLoad';
import CompAngleTable from './Components/AngleTable';

//Variables
import { 
	VarTHloadcase, 
	VarSTloadcase, 
	VarTHfunction,
	VarScaleFactor,
	VarScaleError,
	VarAngleHor,
	VarAngleError,
	VarRowData
} from './Components/variables';

import { checkPyScriptReady } from './pyscript_utils';
import { useSnackbar } from 'notistack';

const App = () => {
	const visible = false;

	//UI Values
	const TimeHistoryLC = useRecoilValue(VarTHloadcase);
	const StaticLoadLC = useRecoilValue(VarSTloadcase);
	const THfunction = useRecoilValue(VarTHfunction);
	const ScaleFactor = useRecoilValue(VarScaleFactor);
	const ScaleError = useRecoilValue(VarScaleError);
	const AngleHor = useRecoilValue(VarAngleHor);
	const AngleError = useRecoilValue(VarAngleError);
	const RowData = useRecoilValue(VarRowData);
	
	function CreateLoads() {
		const jsoninput = {
			"TimeHistoryLC": TimeHistoryLC,
			"StaticLoadLC": StaticLoadLC,
			"THfunction": THfunction,
			"ScaleFactor": ScaleFactor,
			"ScaleError": ScaleError,
			"AngleHor": AngleHor,
			"AngleError": AngleError,
			"RowData": RowData
		};
		checkPyScriptReady(()=>{
			const main_func = pyscript.interpreter.globals.get("main");	
			const results = main_func(JSON.stringify(jsoninput));
			const paringResults = JSON.parse(results);
			if (paringResults.hasOwnProperty("error")) {
				enqueueSnackbar(paringResults["error"], { variant: "error" });
				return;
			} else if (paringResults.hasOwnProperty("success")) {
				enqueueSnackbar(paringResults["success"], { variant: "success" });
			}
		})
	}

	const { enqueueSnackbar } = useSnackbar();

	return (
	<GuideBox show={visible} width={320} padding={1} spacing={1}>
	   {/** Top Panels */}
		<Panel variant="shadow2" width="100%" height="100%">
			<CompTimeHistory />
			<CompStaticLoad />
			<CompTHfunction />
			<CompAngleTable />
		</Panel>
		<GuideBox show={visible} horRight>
			<Button color='negative' onClick={CreateLoads}>Create</Button>
		</GuideBox>
	</GuideBox>
	);
};

export default App;