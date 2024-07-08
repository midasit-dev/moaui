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
	Button,
} from '@midasit-dev/moaui';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { default as WelcomeDevTools } from './DevTools/Welcome';
import { useSnackbar } from 'notistack';
import { checkPyScriptReady } from './utils_pyscript';
import { RgbColorPicker } from "react-colorful";

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

	const [text, setText] = React.useState('');
	const { enqueueSnackbar } = useSnackbar();
	const [color, setColor] = React.useState({ r: 50, g: 100, b: 150 });
	const [insertValue, setInsertValue] = React.useState('0,0,0');
	const [height, setHeight] = React.useState("1");

	const [loading, setLoading] = React.useState(false);

	const InsertHandleChange = (e:any) => {
		setInsertValue(e.target.value);
	};

	const HeightHandleChange = (e:any) => {
		setHeight(e.target.value);
	}

	const InsertValidation=()=>{
		const patterns = [
			/^\d+,\d+,\d+$/,  // 숫자, 콤마, 숫자, 콤마, 숫자
			/^\d+,\d+,$/,     // 숫자, 콤마, 숫자, 콤마
			/^\d+,\d+$/,      // 숫자, 콤마, 숫자
			/^\d+,$/,         // 숫자, 콤마
			/^\d+$/           // 숫자
		];
		for (let pattern of patterns) {
			if (pattern.test(insertValue)) {
				return false;
			}
		}
		return true;
	}

	const HeightValidation=()=>{
		const pattern = /^\d+$/
		return !pattern.test(height);
	}
	
	function Create(){

		if (InsertValidation()) {
			enqueueSnackbar("Invalid Insert points", { variant: "error" });
			return;
		}
		if (HeightValidation()) {
			enqueueSnackbar("Invalid Height", { variant: "error" });
			return;
		}
		if (text === '') {
			enqueueSnackbar("Input any text", { variant: "error" });
			return;
		}
		if (color.r === 255 && color.g === 255 && color.b === 255) {
			enqueueSnackbar("Invalid color", { variant: "error" });
			return;
		}
		let input_json = {
			"text": text,
			"color": color,
			"insert": insertValue,
			"height": height
		}

		setLoading(true);

		setTimeout(() => {
			const py_func = pyscript.interpreter.globals.get("create_text");
			const results = py_func(JSON.stringify(input_json));
			const paringResults = JSON.parse(results);

			if (paringResults.hasOwnProperty("error")) {
				enqueueSnackbar(paringResults["error"], { variant: "error" });
				setLoading(false);
				return;
			} else if (paringResults.hasOwnProperty("success")) {
				enqueueSnackbar(paringResults["success"], { variant: "success" });
				setLoading(false);
			}
		}, 500);
	}

	return (
		<GuideBox width={400} spacing={2} padding={2}>
			<GuideBox row width='100%' spacing={2} opacity={opacity}>
				<Panel variant="shadow2" width='100%' height="100%">
					<GuideBox column width='100%' spacing={2} opacity={opacity}>
						<GuideBox row width='100%' spacing={2} opacity={opacity}>
							<TextField width={252} placeholder="Input any text" value={text} onChange={(e)=>setText(e.target.value)} />
							<Button width="25%" color="negative" onClick={Create} loading={loading}>Create</Button>
						</GuideBox>
						<GuideBox row width='100%' spacing={2} opacity={opacity}>
							<RgbColorPicker color={color} onChange={setColor} />
							<GuideBox column spacing={1} opacity={opacity}>
								<TextField title="Height" width={80} wrappedWidth={148} value={height} onChange={HeightHandleChange} error={HeightValidation()}/>
								<TextField title="Insert" width={80} wrappedWidth={148} value={insertValue} onChange={InsertHandleChange} error={InsertValidation()} />
								<TextField title="Red" width={80} wrappedWidth={148} value={JSON.stringify(color.r)} disabled/>
								<TextField title="Green" width={80} wrappedWidth={148} value={JSON.stringify(color.g)} disabled/>
								<TextField title="Blue" width={80} wrappedWidth={148} value={JSON.stringify(color.b)} disabled/>
							</GuideBox>
						</GuideBox>
					</GuideBox>
				</Panel>
			</GuideBox>
		</GuideBox>
	);
}

export default App;