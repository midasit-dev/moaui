/**
 * 
 * ██████╗        █████╗ ██████╗ ██████╗ 
 * ╚════██╗      ██╔══██╗██╔══██╗██╔══██╗
 *  █████╔╝█████╗███████║██████╔╝██████╔╝
 *  ╚═══██╗╚════╝██╔══██║██╔═══╝ ██╔═══╝ 
 * ██████╔╝      ██║  ██║██║     ██║     
 * ╚═════╝       ╚═╝  ╚═╝╚═╝     ╚═╝     
 * 
 * @description Entry point for the application after Wrapper
 * @next last entry point
 */

import React from 'react';
import { 
	GuideBox, 
	Panel,
} from '@midasit-dev/moaui';
import { default as WelcomeDevTools } from './DevTools/Welcome';
const opacity = 0.5;
//If you want to test, try using the GuideApp component.
//import GuideApp from './SampleComponents/GuideApp';

/**
 * You can modify the code here and test.
 * 
 * @description You can start from the Panel Component below.
 * 							You can add the Component you want.
 *							You can check the version of the library you are currently using by opening the developer tool.
 * 
 * For more information about the library, please refer to the link below.
 * @see https://midasit-dev.github.io/moaui
 */
const App = () => {
	return (
		<GuideBox width={550} spacing={2} padding={2}>
			<WelcomeDevTools />
			<GuideBox row width='100%' spacing={2} opacity={opacity}>
				<Panel variant="shadow2" width='50%' height={100}/>
				<Panel variant="shadow2" width='50%' height={100}/>
				<Panel variant="shadow2" width='50%' height={100}/>
			</GuideBox>
			<GuideBox width='100%' spacing={2} opacity={opacity}>
				<Panel variant="shadow2" width='100%' height={50}/>
				<Panel variant="shadow2" width='100%' height={50}/>
				<Panel variant="shadow2" width='100%' height={50}/>
			</GuideBox>
		</GuideBox>
	);
}

export default App;