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
import { GuideBox, Panel, Button, Typography, ComponentsIconButtonWithName } from "@midasit-dev/moaui";

//Components
import CompTimeHistory from './Components/TimeHistory';
import CompTHfunction from './Components/TimeHistoryFunction';
import CompStaticLoad from './Components/StaticLoad';

//Variables
import { 
	VarTHloadcase, 
	VarSTloadcase, 
	VarTHfunction,
	VarScaleFactor,
	VarScaleError,
	VarAngleHor,
	VarAngleError
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
	
	function CreateLoads() {
		
	}

	const { enqueueSnackbar } = useSnackbar();
	function messageHandler(message: string) {
		enqueueSnackbar(message);
	}

	return (
	<GuideBox show={visible} width={350} padding={1} spacing={1}>
	   {/** Top Panels */}
		<Panel variant="shadow2" width="100%" height="100%">
				<CompTimeHistory />
				<CompStaticLoad />
				<CompTHfunction />
		</Panel>
		<GuideBox show={visible} horRight>
			<Button color='negative' onClick={CreateLoads}>Create</Button>
		</GuideBox>
	</GuideBox>
	);
};

export default App;