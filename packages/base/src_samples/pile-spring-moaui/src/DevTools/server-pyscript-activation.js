const active_wrapper_tsx = `
/**
* 
* ██████╗       ██╗    ██╗██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ 
* ╚════██╗      ██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
*  █████╔╝█████╗██║ █╗ ██║██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝
* ██╔═══╝ ╚════╝██║███╗██║██╔══██╗██╔══██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗
* ███████╗      ╚███╔███╔╝██║  ██║██║  ██║██║     ██║     ███████╗██║  ██║
* ╚══════╝       ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
* 
* @description Wrapper for Pyscript
* @next ./src/App.tsx
*/

import React from 'react';
import { RecoilRoot } from 'recoil';
import App from './App';
import {
	GuideBox,
	Panel,
	Typography,
	VerifyDialog,
	VerifyUtil,
	IconButton,
	Icon,
} from '@midasit-dev/moaui';
import {
	SnackbarProvider,
	closeSnackbar
} from 'notistack';
import {
	setGlobalVariable,
	getGlobalVariable
} from './utils_pyscript';
import Signature from './Signature';
import { Signature as SignatureMoaui } from '@midasit-dev/moaui';
import devTools from "./DevTools"

// PY Terminal 삭제하는 코드
//// py-terminal 태그를 가진 모든 요소 가져오기
//const pyTerminals = document.querySelectorAll('py-terminal');
//
//// 가져온 모든 py-terminal 요소를 제거
//pyTerminals.forEach(pyTerminal => {
//	pyTerminal.remove();
//});

const ValidWrapper = (props: any) => {
	const { isIntalledPyscript } = props;

	const [isInitialized, setIsInitialized] = React.useState(false);
	const [isValid, setIsValid] = React.useState(false);
	const [checkUri, setCheckUri] = React.useState(false);
	const [checkMapiKey, setCheckMapiKey] = React.useState(false);
	const [checkMapiKeyMsg, setCheckMapiKeyMsg] = React.useState("");

	React.useEffect(() => {
		const callback = async () => {
			//redirectTo와 mapi-key 유효성 검사
			let _checkUri = true;
			let _checkMapiKey = true;

			const url = VerifyUtil.getProtocolDomainPort();
			const resUrl = await fetch(\`\${url}/health\`);
			if (resUrl.status !== 200) {
				_checkUri = false;
			}
			setCheckUri(_checkUri);

			const mapiKey = VerifyUtil.getMapiKey();
			const verifyMapiKey = await VerifyUtil.getVerifyInfoAsync(mapiKey);
			if ('error' in verifyMapiKey && 'message' in verifyMapiKey.error) {
				_checkMapiKey = false;
				setCheckMapiKeyMsg(verifyMapiKey.error.message);
			}
			if ('keyVerified' in verifyMapiKey) {
				if (!verifyMapiKey["keyVerified"]) {
					_checkMapiKey = false;
					setCheckMapiKeyMsg('keyVerified');
				}
			}
			if ('status' in verifyMapiKey) {
				if (verifyMapiKey["status"] !== "connected") {
					_checkMapiKey = false;
					setCheckMapiKeyMsg(verifyMapiKey['status']);
				}
			}
			setCheckMapiKey(_checkMapiKey);

			//최종 결과 Set
			if (!_checkUri || !_checkMapiKey) {
				setIsValid(false);
			} else {
				setIsValid(true);
			}

			setIsInitialized(true);
		};

		callback();
	}, []);

	const ValidationComponent = ({
		title = 'undefiend',
		checkIf = false,
		strValid = 'Valid',
		strInvalid = 'Invalid',
	}: any) => {
		return (
			<GuideBox row horSpaceBetween width={350}>
				<Typography variant="body1">{title}: </Typography>
				{checkIf ? (
					<Typography variant="h1" color="#1f78b4">{strValid}</Typography>
				) : (
					<Typography variant="h1" color="#D32F2F">{strInvalid}</Typography>
				)}
			</GuideBox>
		);
	}

	const [bgColor, setBgColor] = React.useState('#eee');
	React.useEffect(() => {
		fetch(\`\${process.env.PUBLIC_URL}/manifest.json\`)
			.then(response => response.json())
			.then(data => data.name ? setBgColor(data.background_color) : null)
			.catch(error => console.error('Error fetching manifest.json:', error));
	}, []);

	React.useEffect(() => {
		if (isInitialized && isValid) {
			Signature.log();
			SignatureMoaui.log();
		}
	}, [isInitialized, isValid]);

	return (
		<>
			{isInitialized && isValid && (
				<RecoilRoot>
					<SnackbarProvider
						maxSnack={3}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						action={(key) => (
							<IconButton transparent transparentColor="white" onClick={() => closeSnackbar(key)}>
								<Icon iconName="Close" />
							</IconButton>
						)}
					>
						{/** Production Mode */}
						{!devTools.IsDevEnv() &&
							<GuideBox tag="AppBackground" show center fill={bgColor} width="100%">
								<App />
							</GuideBox>
						}

						{/** Development Mode */}
						{devTools.IsDevEnv() &&
							<devTools.Kit bgColorState={[bgColor, setBgColor]}>
								<GuideBox tag="AppBackground" show center fill={bgColor} borderRadius='0 0 4px 4px' spacing={3}>
									<App />
								</GuideBox>
							</devTools.Kit>
						}
					</SnackbarProvider>
				</RecoilRoot>
			)}

			{isInitialized && !isValid && (
				<GuideBox width="100%" height="100vh" center>
					<Panel variant="shadow2" padding={3} margin={3}>
						<GuideBox opacity={0.9} spacing={2}>
							<Typography variant="h1">Validation Check</Typography>
							<GuideBox spacing={2}>
								<ValidationComponent title="pyscript" checkIf={isIntalledPyscript} strValid="Installed" strInvalid={\`Not Installed\`} />
								<ValidationComponent title="Base URI" checkIf={checkUri} strValid="Valid" strInvalid="Invalid" />
								<ValidationComponent title="MAPI-Key" checkIf={checkMapiKey} strValid="Valid" strInvalid={\`Invalid (\${checkMapiKeyMsg})\`} />
							</GuideBox>
						</GuideBox>
					</Panel>
				</GuideBox>
			)}
		</>
	);
};

const PyscriptWrapper = () => {
	const [installed, setInstalled] = React.useState(false);

	//fill in global variables
	React.useEffect(() => {
		function checkPyScriptReady(callback: any) {
			// if pyscript is ready, call callback function
			if (pyscript && pyscript.interpreter) {
				setGlobalVariable();
				getGlobalVariable();
				setInstalled(true);
			} else {
				// if not, wait 100ms and try again
				setTimeout(() => checkPyScriptReady(callback), 100);
			}
		}

		checkPyScriptReady(() => { });
	}, []);

	return (
		<>
			<VerifyDialog loading={!installed} />
			{installed && VerifyUtil.isExistQueryStrings('mapiKey') &&
				<ValidWrapper isIntalledPyscript={installed} />
			}
		</>
	)
}

export default PyscriptWrapper;`;

const inactive_wrapper_tsx = `
/**
* 
* ██████╗       ██╗    ██╗██████╗  █████╗ ██████╗ ██████╗ ███████╗██████╗ 
* ╚════██╗      ██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
*  █████╔╝█████╗██║ █╗ ██║██████╔╝███████║██████╔╝██████╔╝█████╗  ██████╔╝
* ██╔═══╝ ╚════╝██║███╗██║██╔══██╗██╔══██║██╔═══╝ ██╔═══╝ ██╔══╝  ██╔══██╗
* ███████╗      ╚███╔███╔╝██║  ██║██║  ██║██║     ██║     ███████╗██║  ██║
* ╚══════╝       ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝
* 
* @description Wrapper for Pyscript
* @next ./src/App.tsx
*/

import React from 'react';
import { RecoilRoot } from 'recoil';
import App from './App';
import { 
 GuideBox, 
 Panel, 
 Typography, 
 IconButton, 
 Icon,
} from '@midasit-dev/moaui';
import { 
 SnackbarProvider, 
 closeSnackbar 
} from 'notistack';
import devTools from "./DevTools"

const ValidWrapper = (props: any) => {
 const { isIntalledPyscript } = props;

 //변경
 const [isInitialized, setIsInitialized] = React.useState(true);
 //변경
 const [isValid, setIsValid] = React.useState(true);
 const [checkUri, setCheckUri] = React.useState(false);
 const [checkMapiKey, setCheckMapiKey] = React.useState(false);
 const [checkMapiKeyMsg, setCheckMapiKeyMsg] = React.useState("");

 const ValidationComponent = ({
	 title = 'undefiend',
	 checkIf = false,
	 strValid = 'Valid',
	 strInvalid = 'Invalid',
 }: any) => {
	 return (
		 <GuideBox row horSpaceBetween width={350}>
			 <Typography variant="body1">{title}: </Typography>
			 {checkIf ? ( 
				 <Typography variant="h1" color="#1f78b4">{strValid}</Typography>
			 ) : (
				 <Typography variant="h1" color="#D32F2F">{strInvalid}</Typography>
			 )}
		 </GuideBox>
	 );
 }

 const [bgColor, setBgColor] = React.useState('#eee');
 React.useEffect(() => {
	 fetch(\`\${process.env.PUBLIC_URL}/manifest.json\`)
		 .then(response => response.json())
		 .then(data => data.name ? setBgColor(data.background_color) : null)
		 .catch(error => console.error('Error fetching manifest.json:', error));
 }, []);

 React.useEffect(() => {
	if (isInitialized && isValid) {
		Signature.log();
		SignatureMoaui.log();
	}
}, [isInitialized, isValid]);

 return (
	 <>
		 {isInitialized && isValid && (
			 <RecoilRoot>
				 <SnackbarProvider 
					 maxSnack={3} 
					 anchorOrigin={{
						 vertical: 'bottom',
						 horizontal: 'center',
					 }}
					 action={(key) => (
						 <IconButton transparent transparentColor="white" onClick={() => closeSnackbar(key)}>
							 <Icon iconName="Close" />
						 </IconButton>
					 )}
				 >
					 {/** Production Mode */}
					 {!devTools.IsDevEnv() &&
						 <GuideBox tag="AppBackground" show center fill={bgColor} width="100%">
							 <App />
						 </GuideBox>
					 }

					 {/** Development Mode */}
					 {devTools.IsDevEnv() && 
						 <devTools.Kit bgColorState={[bgColor, setBgColor]}>
							 <GuideBox tag="AppBackground" show center fill={bgColor} borderRadius='0 0 4px 4px' spacing={3}>
								 <App />
							 </GuideBox>
						 </devTools.Kit>
					 }
				 </SnackbarProvider>
			 </RecoilRoot>
		 )}
			 
		 {isInitialized && !isValid && (
			 <GuideBox width="100%" height="100vh" center>
				 <Panel variant="shadow2" padding={3} margin={3}>
					 <GuideBox opacity={0.9} spacing={2}>
						 <Typography variant="h1">Validation Check</Typography>
						 <GuideBox spacing={2}>
							 <ValidationComponent title="pyscript" checkIf={isIntalledPyscript} strValid="Installed" strInvalid={\`Not Installed\`} />
							 <ValidationComponent title="Base URI" checkIf={checkUri} strValid="Valid" strInvalid="Invalid" />
							 <ValidationComponent title="MAPI-Key" checkIf={checkMapiKey} strValid="Valid" strInvalid={\`Invalid (\${checkMapiKeyMsg})\`} />
						 </GuideBox>
					 </GuideBox>
				 </Panel>
			 </GuideBox>
		 )}
	 </>
 );
};

//변경
export default ValidWrapper;`;

const active_index_html = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
	<meta name="description" content="Web site created using cra-template-moaui" />
	<link rel="icon" href="./favicon.ico">
	<link rel="stylesheet" href="./index.css" />

	<!-- PYSCRIPT Configuration -->
	<script defer src="https://pyscript.net/latest/pyscript.js"></script>
	<py-config type="json" src="./pyscript_config.json"></py-config>

	<script>
    fetch('./manifest.json').then(response => response.json()).then(data => {
        document.title = data.name;
				document.bgColor = data.background_color;
      }).catch(error => console.error('Error fetching manifest.json:', error));
  </script>
</head>

<body>
	<!-- The <noscript> HTML element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser. -->
	<noscript>You need to enable JavaScript to run this app.</noscript>

	<!-- Plug-in Item Title Bar Region -->
	<div id="midas-controller"></div>

	<div id="root"></div>
	<py-script src="./pyscript_main.py"></py-script>
</body>

</html>`;

const inactive_index_html = `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
	<meta name="description" content="Web site created using cra-template-moaui" />
	<link rel="icon" href="./favicon.ico">
	<link rel="stylesheet" href="./index.css" />

	<!-- PYSCRIPT Configuration -->
	<!-- <script defer src="https://pyscript.net/latest/pyscript.js"></script> -->
	<!-- <py-config type="json" src="./pyscript_config.json"></py-config> -->

	<script>
    fetch('./manifest.json').then(response => response.json()).then(data => {
        document.title = data.name;
				document.bgColor = data.background_color;
      }).catch(error => console.error('Error fetching manifest.json:', error));
  </script>
</head>

<body>
	<!-- The <noscript> HTML element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser. -->
	<noscript>You need to enable JavaScript to run this app.</noscript>

	<!-- Plug-in Item Title Bar Region -->
	<div id="midas-controller"></div>

	<div id="root"></div>
	<!-- <py-script src="./pyscript_main.py"></py-script> -->
</body>

</html>`;

module.exports = {
	active_wrapper_tsx,
	inactive_wrapper_tsx,
	active_index_html,
	inactive_index_html,
};