import { 
	GuideBox, 
	Typography,
	TextField,
	Button,
} from '@midasit-dev/moaui';
import React from 'react';
import { useRecoilState } from 'recoil';
import { VarStartNodeNb } from './variables';
import { useSnackbar } from 'notistack';
import { dbRead } from '../pyscript_utils';

const CompPileStartNodeNo = (props: any) => {
	const [start_node_nb, setStart_node_nb] = useRecoilState(VarStartNodeNb);
	const { enqueueSnackbar } = useSnackbar();

	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography center height={30}>Pile Start Node No.</Typography>
				<GuideBox width={200} row verCenter spacing={1} horSpaceBetween>
					<TextField
						width={115}
						height={30}
						placeholder='Input value ...'
						onChange={(e: any) => setStart_node_nb(e.target.value)}
						value={start_node_nb}
					/>
					<Button
						onClick={() => {
							const res = dbRead("NODE");
							if (res.hasOwnProperty('error')) {
								enqueueSnackbar(res['error'], { variant: 'error' });
								return;
							}
						
							const nodeIDs = Object.keys(res);
							const lastNodeID = nodeIDs[nodeIDs.length - 1];
							setStart_node_nb((parseInt(lastNodeID) + 1).toString());
							enqueueSnackbar("The Pile Start Node No. is filled with the last value of NODE.", { variant: 'info' });
						}}
					>
						Auto
					</Button>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
}

export default CompPileStartNodeNo;