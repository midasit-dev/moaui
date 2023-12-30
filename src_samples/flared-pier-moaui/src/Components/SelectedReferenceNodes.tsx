import { 
	GuideBox, 
	Typography,
	TextField,
} from '@midasit-dev/moaui';
import React from 'react';

import { useQuery } from 'react-query';
import { selectNodeList } from '../pyscript_utils';

const NodeFetching = () => {
	const res = selectNodeList();
	if (res.hasOwnProperty('error')) {
		console.error(res['error']);
	}
	if (!res) return [];
	return res;
}

const CompSelectedReferenceNodes = () => {
	const [loading, setLoading] = React.useState(false);
	// const [sel_node_list, setSel_node_list] = React.useState([]);

	const { data, error, isLoading } = useQuery('selectedReferenceNodesKey', NodeFetching, {
		initialData: [],
		onSuccess: () => {
			setLoading(false);
		},
	});

	if (isLoading) {
		setLoading(true);
	}

	if (error) {
		console.error(error);
	}

	return (
			<GuideBox width="100%" row horSpaceBetween loading={loading}>
				<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
					<Typography flexItem textAlign="center" height={30}>Selected Reference Nodes</Typography>
					<TextField
						width={200}
						height={30}
						placeholder='Select Nodes ...'
						value={data.join(', ')}
						disabled
					/>
				</GuideBox>
			</GuideBox>
	);
}

export default CompSelectedReferenceNodes;