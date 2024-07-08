/**
* @title 2-wrapper
* @description Wrapper for Pyscript
* @next ./src/App.tsx
* ┬┌┐┌   ┌─┐┌─┐┌┬┐┬┬  ┬┌─┐
* ││││───├─┤│   │ │└┐┌┘├┤ 	🌑🌑🌑🌑🌑
* ┴┘└┘   ┴ ┴└─┘ ┴ ┴ └┘ └─┘
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
 Signature as SignatureMoaui,
} from '@midasit-dev/moaui';
import Signature from './Signature';
import { 
 SnackbarProvider, 
 closeSnackbar 
} from 'notistack';
import { isDevServerListening } from './DevTools/ServerListening';
import DevKit from './DevTools/Kit';

import { useTranslation } from "react-i18next";

const ValidWrapper = (props: any) => {
 const { isIntalledPyscript } = props;

 const [isInitialized, ] = React.useState(true);
 const [isValid, ] = React.useState(true);
 const [checkUri, ] = React.useState(false);
 const [checkMapiKey, ] = React.useState(false);
 const [checkMapiKeyMsg, ] = React.useState("");
 const { i18n } = useTranslation();

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
	 fetch(`${process.env.PUBLIC_URL}/manifest.json`)
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

React.useEffect(() => {
	if (window.location.pathname === "/") window.location.pathname = "/en";
	i18n.changeLanguage(window.location.pathname.split("/")[1]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [window.location.pathname]);

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
				 {process.env.NODE_ENV === 'development' && isDevServerListening() ?
					<DevKit bgColorState={[bgColor, setBgColor]}>
						<GuideBox tag="AppBackground" show center fill={bgColor} borderRadius='0 0 4px 4px' spacing={3}>
							<App />
						</GuideBox>
					</DevKit>
					:
					<GuideBox tag="AppBackground" show center fill={bgColor} width="100%">
						<App />
					</GuideBox>
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
							 <ValidationComponent title="pyscript" checkIf={isIntalledPyscript} strValid="Installed" strInvalid={`Not Installed`} />
							 <ValidationComponent title="Base URI" checkIf={checkUri} strValid="Valid" strInvalid="Invalid" />
							 <ValidationComponent title="MAPI-Key" checkIf={checkMapiKey} strValid="Valid" strInvalid={`Invalid (${checkMapiKeyMsg})`} />
						 </GuideBox>
					 </GuideBox>
				 </Panel>
			 </GuideBox>
		 )}
	 </>
 );
};

//변경
export default ValidWrapper;