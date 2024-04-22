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
	TextField,
	TextFieldV2,
	Typography,
	Button,
	DropList
} from '@midasit-dev/moaui';
import { default as WelcomeDevTools } from './DevTools/Welcome';
const opacity = 1.0;
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

	const [axisList, setAxisList]=React.useState(1);
	const [extrudeLength, setExtrudeLength]=React.useState("");
	const [matlID, setMatlID]=React.useState("1");
	const [sectID, setSectID]=React.useState("1");


	const validatePattern = (inputString:string)=> {
		const pattern = /^(\d+(\.\d+)?(@\d+(\.\d+)?)?,\s?)*\d+(\.\d+)?(@\d+(\.\d+)?)?$/;
		if (pattern.test(inputString)) {
			return false;
		}
		return true;
	}

	function Create(){
		console.log(axisList);
		console.log(extrudeLength);
		console.log(matlID);
		console.log(sectID);
		console.log(validatePattern(extrudeLength));
	}

	return (
		<GuideBox width={300} spacing={2} padding={2}>
			<GuideBox row width='100%' spacing={2} opacity={opacity}>
				<Panel variant="shadow2" width='100%' height="100%">
					<GuideBox column width='100%' spacing={2} opacity={opacity}>
						<GuideBox row verCenter horSpaceBetween width='100%' spacing={2} opacity={opacity}>
							<Typography variant="body1">Material ID</Typography>
							<TextFieldV2
								width={120}
								placeholder='1'
								value={matlID}
								type="number"
								onChange={(e:any)=>setMatlID(e.target.value)}
								numberOptions={{
									min: 1,
									max: 999999,
									step: 1,
									onlyInteger: true,
									condition:{
										min:"greaterEqual",
										max:"lessEqual"
									}
								}}
							/>
						</GuideBox>
						<GuideBox row verCenter horSpaceBetween width='100%' spacing={2} opacity={opacity}>
							<Typography variant="body1">Section ID</Typography>
							<TextFieldV2
								width={120}
								placeholder='1'
								value={sectID}
								type="number"
								onChange={(e:any)=>setSectID(e.target.value)}
								numberOptions={{
									min: 1,
									max: 999999,
									step: 1,
									onlyInteger: true,
									condition:{
										min:"greaterEqual",
										max:"lessEqual"
									}
								}}
							/>
						</GuideBox>
						<GuideBox row verCenter horSpaceBetween width='100%' spacing={2} opacity={opacity}>
							<Typography variant="body1">Local axis</Typography>
							<DropList
								backgroundColor='white'
								width={120}
								listWidth={120}
								value={axisList}
								itemList={[
									["+y",1],
									["-y",2],
									["+z",3],
									["-z",4]
								]}
								onChange={(e:any)=>setAxisList(e.target.value)}
							/>
						</GuideBox>
						<GuideBox row verCenter horSpaceBetween width='100%' spacing={2} opacity={opacity}>
							<Typography variant="body1">Extrude Length</Typography>
							<TextField
								width={120}
								placeholder='3@1.2, 1.0'
								value={extrudeLength}
								error ={validatePattern(extrudeLength)}
								onChange={(e:any)=>setExtrudeLength(e.target.value)}
							/>
						</GuideBox>
						<GuideBox row verCenter horRight width='100%' spacing={2} opacity={opacity}>
							<Button width="100%" color="negative" onClick={Create} >Create</Button>
						</GuideBox>
					</GuideBox>
				</Panel>
			</GuideBox>
		</GuideBox>
	);
}

export default App;