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
	VarRowData
} from './Components/variables';

import { checkPyScriptReady } from './pyscript_utils';
import { useSnackbar } from 'notistack';

const App = () => {
	const visible = false;

	// py-terminal 태그를 가진 모든 요소 가져오기
	const pyTerminals = document.querySelectorAll('py-terminal');

	// 가져온 모든 py-terminal 요소를 제거
	pyTerminals.forEach(pyTerminal => {
		pyTerminal.remove();
	});

	//UI Values
	const TimeHistoryLC = useRecoilValue(VarTHloadcase);
	const StaticLoadLC = useRecoilValue(VarSTloadcase);
	const THfunction = useRecoilValue(VarTHfunction);
	const ScaleFactor = useRecoilValue(VarScaleFactor);
	const RowData = useRecoilValue(VarRowData);
	
	function CreateLoads() {
		const jsoninput = {
			"TimeHistoryLC": TimeHistoryLC,
			"StaticLoadLC": StaticLoadLC,
			"THfunction": THfunction,
			"ScaleFactor": ScaleFactor,
			"RowData": RowData
		};

		// Time History Load Case가 선택되지 않았을 경우
		if (jsoninput["TimeHistoryLC"] === 0) {
			enqueueSnackbar("No selected Time History Load Case", { variant: "error" });
			return;
		}
		// Static Load Case가 선택되지 않았을 경우
		if (jsoninput["StaticLoadLC"] === 0) {
			enqueueSnackbar("No selected Static Load Case", { variant: "error" });
			return;
		}
		// Scale Factor가 입력되지 않았을 경우
		if (jsoninput["ScaleFactor"] === "" || jsoninput["ScaleFactor"] === undefined || jsoninput["ScaleFactor"] === null || isNaN(+jsoninput["ScaleFactor"]) || +jsoninput["ScaleFactor"] <= 0) {
			enqueueSnackbar("Scale factor should be larger than 0", { variant: "error" });
			return;
		}
		// Angle data가 입력되지 않았거나, 중복된 경우
		const rows = jsoninput["RowData"];
		const isDuplicate = (value: number) => rows.filter((row) => row.angle === value).length > 1;
		if (rows.length === 0) {
			enqueueSnackbar("No angle values", { variant: "error" });
			return;
		}
		for (const row of rows) {
			if (isDuplicate(row.angle)) {
				enqueueSnackbar("Angle values should be unique", { variant: "error" });
				return;
			}
		}
		
		checkPyScriptReady(()=>{
			const main_func = pyscript.interpreter.globals.get("main");	
			const results = main_func(JSON.stringify(jsoninput));
			const paringResults = JSON.parse(results);
			console.log(paringResults)
			if (paringResults.hasOwnProperty("error")) {
				enqueueSnackbar(paringResults["error"], { variant: "error" });
				return;
			} else if (paringResults.hasOwnProperty("success")) {
				enqueueSnackbar(paringResults["success"], { variant: "success" });
				return;
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