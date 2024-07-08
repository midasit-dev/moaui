import React from 'react';
import {
	GuideBox,
} from '@midasit-dev/moaui';
import SideBarButton from '../Shared/SideBarButton';
import Layers from './Layers';
import Componentized from './Componentized';

function useStateApp() {
	const [menu, setMenu] = React.useState<'Layers' | 'Componentized'>('Layers');
	return { menu, setMenu };
}

const App = () => {
	const {
		menu, setMenu,
	} = useStateApp();

	React.useEffect(() => {

	}, []);

	return (
		<GuideBox width="100%" height='inherit'>
			<GuideBox width="100%" row height="inherit" spacing={3}>
				{/** Sidebar Buttons */}
				<GuideBox height='inherit' spacing={2}>
					<SideBarButton currentMenuState={[menu, setMenu]} iconName='Dashboard' menuName='Layers' />
					<SideBarButton currentMenuState={[menu, setMenu]} iconName='Adjust' menuName='Componentized' />
				</GuideBox>

				{menu === 'Layers' && <Layers />}
				{menu === 'Componentized' && <Componentized />}
			</GuideBox>
		</GuideBox>
	)
}

export default App;