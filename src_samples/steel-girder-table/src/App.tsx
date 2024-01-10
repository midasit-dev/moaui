import React from 'react';
import { GuideBox, Panel, Typography, Color } from '@midasit-dev/moaui';
import LogoSvg from './SampleComponents/LogoSvg';
import DataGird from './SampleComponents/DataGridSet';

/**
 * This is a sample code.
 * for more information, please visit https://midasit-dev.github.io/moaui
 */
const App = () => {
	return (
		//You can modify the code here and test.
		<GuideBox show width='100%' fill='2' center paddingY={10}>
			<DataGird/>
		</GuideBox>
	);
}

export default App;