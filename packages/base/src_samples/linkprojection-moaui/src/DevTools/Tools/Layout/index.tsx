import React, { useEffect } from 'react';
import {
	GuideBox, Typography,
} from '@midasit-dev/moaui';
import SideBarButton from '../Shared/SideBarButton';
import JsonOptions from './JsonOptions';
import Layers from './Layers';
import Componentized from './Componentized';
import GenerateCode from './GenerateCode';

function useStateApp() {
	const [menu, setMenu] = React.useState<'Layers' | 'Componentized'>('Layers');
	return { menu, setMenu };
}

const App = () => {
	const { menu, setMenu, } = useStateApp();

	//Toogle Menu Event 등록/삭제
	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === ']') setMenu((prev) => prev === 'Layers' ? 'Componentized' : 'Layers');
		});

		return () => window.removeEventListener('keydown', () => { });
	}, [setMenu]);

	return (
		<GuideBox width="100%" height='inherit' spacing={2}>
			<GuideBox row width="100%" verCenter horSpaceBetween>
				<GuideBox row verCenter spacing={2}>
					<JsonOptions />
					<GenerateCode />
				</GuideBox>
				{/** Sidebar Buttons */}
				<GuideBox height='inherit' row verCenter spacing={1}>
					<Typography color='#a5a5a7'>Ctrl + ]</Typography>
					<GuideBox row verCenter>
						<SideBarButton currentMenuState={[menu, setMenu]} iconName='Dashboard' menuName='Layers' />
						<SideBarButton currentMenuState={[menu, setMenu]} iconName='Adjust' menuName='Componentized' />
					</GuideBox>
				</GuideBox>
			</GuideBox>

			<GuideBox width="100%" row height="inherit" spacing={3}>
				{menu === 'Layers' && <Layers />}
				{menu === 'Componentized' && <Componentized />}
			</GuideBox>
		</GuideBox>
	)
}

export default App;