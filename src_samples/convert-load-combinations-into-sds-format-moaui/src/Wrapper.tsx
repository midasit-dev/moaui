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
import { GuideBox, Panel, Typography, VerifyDialog, VerifyUtil } from '@midasit-dev/moaui';
import { setGlobalVariable, getGlobalVariable } from './pyscript_utils';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import Signature from './Signature';
import { Signature as SignatureMoaui, IconButton, Icon } from '@midasit-dev/moaui';

const MidasControllerSample = () => {
	if (process.env.NODE_ENV === 'production') return null;
	return (
		<div style={{ paddingBottom: '2rem' }}>
			<span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '2rem', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
				<div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#21272A', paddingTop: '0.5rem', paddingBottom: '0.5rem', width: '100%', fontFamily: 'Pretendard', color: '#BDC2C8' }}>
					<div style={{ display: 'flex', paddingLeft: '20px', alignItems: 'center' }}>
						<img src={`${process.env.PUBLIC_URL}/favicon.ico`} width="12px" alt="midas-control-icon" />
					</div>
					<span style={{ paddingLeft: '0.75rem', userSelect: 'none', fontSize: '0.75rem' }}>
						Convert Load Combinations into SDS Format
					</span>
				</div>
				<div style={{ width: '3rem', userSelect: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#21272A', color: '#BDC2C8' }}>
					<svg width="1rem" viewBox="0 0 24 24">
						<path fill="#BDC2C8" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
						</path>
					</svg>										
				</div>									
			</span>
		</div>
	)
}

const ValidWrapper = () => {
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
			const resUrl = await fetch(`${url}/health`);
			if (resUrl.status !== 200) {
				_checkUri = false;
			}
			setCheckUri(_checkUri);

			const mapiKey = VerifyUtil.getMapiKey();
			const verifyMapiKey = await VerifyUtil.getVerifyInfoAsync(mapiKey);
			if (verifyMapiKey.hasOwnProperty("error")) {
				_checkMapiKey = false;
				setCheckMapiKeyMsg('error');
			}
			if (verifyMapiKey.hasOwnProperty("keyVerified")) {
				if (!verifyMapiKey["keyVerified"]) {
					_checkMapiKey = false;
					setCheckMapiKeyMsg('keyVerified');
				}
			}
			if (verifyMapiKey.hasOwnProperty("status")) {
				if (verifyMapiKey["status"] === "disconnected") {
					_checkMapiKey = false;
					setCheckMapiKeyMsg('disconnected');
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
						<MidasControllerSample />
						<App />
					</SnackbarProvider>
				</RecoilRoot>
			)}

			{isInitialized && !isValid && (
				<Panel variant="shadow2" padding={3} margin={3}>
					<GuideBox opacity={0.9} spacing={2}>
						<Typography variant="h1">Validation Check</Typography>
						<GuideBox spacing={2}>
							<GuideBox row horSpaceBetween width={300}>
								<Typography variant="body1">Base URI: </Typography>
								{checkUri ? (
									<Typography variant="h1" color="#1f78b4">
										Valid
									</Typography>
								) : (
									<Typography variant="h1" color="#D32F2F">
										Invalid
									</Typography>
								)}
							</GuideBox>
							<GuideBox row horSpaceBetween width={300}>
								<Typography variant="body1">MAPI-Key: </Typography>
								{checkMapiKey ? (
									<Typography variant="h1" color="#1f78b4">
										Valid
									</Typography>
								) : (
									<Typography variant="h1" color="#D32F2F">
										{`Invalid (${checkMapiKeyMsg})`}
									</Typography>
								)}
							</GuideBox>
						</GuideBox>
					</GuideBox>
				</Panel>
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
				Signature.log();
				SignatureMoaui.log();
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
				<ValidWrapper />
			}
		</>
	)
}

export default PyscriptWrapper;