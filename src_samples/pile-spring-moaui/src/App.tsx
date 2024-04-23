import React from 'react';
import {GuideBox, 
	TemplatesDualComponentsTypographyTextFieldSpaceBetween,
	Button,
	
} from '@midasit-dev/moaui';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'; 
import MainWindow from './Components/MainWindow';
import {ProjectName} from './Components/variables'
import {Icon, Panel, TabGroup, Tab} from '@midasit-dev/moaui';

const App = () => {
	
	const [projectName, setProjectName] = useRecoilState(ProjectName);
	const drawingSize = 350;
	return (
		<GuideBox width='auto' row spacing={1}>
			<MainWindow/>
		</GuideBox>
	);
}

export default App;