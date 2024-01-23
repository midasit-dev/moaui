import {
	GuideBox,
	Typography,
	TextFieldV2,
	Button,
} from '@midasit-dev/moaui';
import React from 'react';
import { dbRead } from '../utils_pyscript';
import { useSnackbar } from 'notistack';

const Comp = (props: any) => {
	const {
		title,
		state,
		setState,
		error,
		disabled,
	} = props;

	const { enqueueSnackbar } = useSnackbar();

	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography center height={30}>{title}</Typography>
				<GuideBox row horSpaceBetween spacing={1}>
					<TextFieldV2
						error={error}
						width={122}
						height={30}
						placeholder='Input value ...'
						onChange={(e: any) => setState(e.target.value)}
						value={state}
						disabled={disabled}
						type='number'
						numberOptions={{
							min: 1,
							max: 999999,
						}}
					/>
					<Button
						disabled={disabled}
						width='70px'
						onClick={() => {
							const res = dbRead("NODE");
							if (res.hasOwnProperty('error')) {
								enqueueSnackbar(res['error'], { variant: 'error' });
								return;
							}

							const nodeIDs = Object.keys(res);
							const lastNodeID = nodeIDs[nodeIDs.length - 1];
							setState((parseInt(lastNodeID) + 1).toString());
							enqueueSnackbar("It's filled with the last value of NODE.", { variant: 'info' });
						}}
					>
						Auto
					</Button>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
}

export default Comp;