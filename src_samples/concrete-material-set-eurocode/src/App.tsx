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
import { useRecoilValue, useRecoilState } from 'recoil';
import { GuideBox, Panel, Button } from '@midasit-dev/moaui';
import TabGroup from './Components/TabGroupMain';
import DialogButton from './Components/ButtonDialog';
import CreateButton from './Components/ButtonCreate';

const App = () => {
	// py-terminal 태그를 가진 모든 요소 가져오기
	const pyTerminals = document.querySelectorAll('py-terminal');

	// 가져온 모든 py-terminal 요소를 제거
	pyTerminals.forEach(pyTerminal => {
		pyTerminal.remove();
	});
	
	return (
		<GuideBox column padding={2.5} spacing={1}>
			<TabGroup/>
			<GuideBox row width="100%" paddingTop={1} horSpaceBetween>
				<DialogButton/>
				<CreateButton/>
			</GuideBox>
		</GuideBox>
	);
}

export default App;