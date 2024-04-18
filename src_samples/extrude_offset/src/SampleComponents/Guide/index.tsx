/*
 *
 *  ██████╗ ██╗   ██╗██╗██████╗ ███████╗    ███████╗ █████╗ ███╗   ███╗██████╗ ██╗     ███████╗
 * ██╔════╝ ██║   ██║██║██╔══██╗██╔════╝    ██╔════╝██╔══██╗████╗ ████║██╔══██╗██║     ██╔════╝
 * ██║  ███╗██║   ██║██║██║  ██║█████╗      ███████╗███████║██╔████╔██║██████╔╝██║     █████╗  
 * ██║   ██║██║   ██║██║██║  ██║██╔══╝      ╚════██║██╔══██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝  
 * ╚██████╔╝╚██████╔╝██║██████╔╝███████╗    ███████║██║  ██║██║ ╚═╝ ██║██║     ███████╗███████╗
 *  ╚═════╝  ╚═════╝ ╚═╝╚═════╝ ╚══════╝    ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝
 *
 */

import React from 'react';
import { GuideBox, Panel, Typography, Color } from '@midasit-dev/moaui';
import LogoSvg from './LogoSvg';
import ButtonSnackbar from './ButtonSnackbar';
import ButtonAlertMessage from './ButtonAlertMessage';
import ButtonApiGet from './ButtonApiGet';
import CodeBlockComponent from './CodeBlock';
import LearnMoreComponent from './LearnMore';
import PythonFetchingPost from './PythonFetchingPost';
import PythonFetchingGet from './PythonFetchingGet';
import PythonFetchingPut from './PythonFetchingPut';
import PythonFetchingDelete from './PythonFetchingDelete';

/**
 * This is a sample code.
 * for more information, please visit https://midasit-dev.github.io/moaui
 */
const AppGuide = () => {
	return (
		//You can modify the code here and test.
		<GuideBox show width='100%' fill='2' center paddingY={10}>
			<GuideBox spacing={5} center>

				<LogoSvg />
				<Typography color={Color.text.secondary} size='large'>Enjoy, moaui components</Typography>

				<Panel variant='shadow2' width={600} padding={5}>
					<GuideBox spacing={3.5} width='100%'>
						<Typography color={Color.text.secondary} size='medium'>Snackbar Example</Typography>
						<ButtonSnackbar />
					</GuideBox>
				</Panel>

				<Panel variant='shadow2' width={600} padding={5}>
					<GuideBox spacing={3.5} width='auto'>
						<Typography color={Color.text.secondary} size='medium'>Javascript Fetching Examples</Typography>
						<ButtonAlertMessage />
						<ButtonApiGet />
					</GuideBox>
				</Panel>

				<Panel variant='shadow2' width={600} padding={5}>
					<GuideBox spacing={3.5} width='auto'>
						<Typography color={Color.text.secondary} size='medium'>Python Fetching Examples (POST)</Typography>
						<PythonFetchingPost />
					</GuideBox>
				</Panel>

				<Panel variant='shadow2' width={600} padding={5}>
					<GuideBox spacing={3.5} width='auto'>
						<Typography color={Color.text.secondary} size='medium'>Python Fetching Examples (GET)</Typography>
						<PythonFetchingGet />
					</GuideBox>
				</Panel>

				<Panel variant='shadow2' width={600} padding={5}>
					<GuideBox spacing={3.5} width='auto'>
						<Typography color={Color.text.secondary} size='medium'>Python Fetching Examples (PUT)</Typography>
						<PythonFetchingPut />
					</GuideBox>
				</Panel>

				<Panel variant='shadow2' width={600} padding={5}>
					<GuideBox spacing={3.5} width='auto'>
						<Typography color={Color.text.secondary} size='medium'>Python Fetching Examples (DELETE)</Typography>
						<PythonFetchingDelete />
					</GuideBox>
				</Panel>

				<Panel variant='shadow2' width={600} padding={5}>
					<GuideBox spacing={5} width="auto">
						<GuideBox spacing={2} width="100%">
							<Typography color={Color.text.primary} size="medium">
								❄️ React Render Testing
							</Typography>
							<Typography color={Color.text.secondary}>
								Copy and paste to src/App.tsx and save reload this page.
							</Typography>
						</GuideBox>
						<CodeBlockComponent />
					</GuideBox>
				</Panel>

				<LearnMoreComponent />

			</GuideBox>
		</GuideBox>
	);
}

export default AppGuide;