import React from 'react';
import { useQuery } from 'react-query';
import { getUnitNotation } from '../pyscript_utils';
import { Typography } from '@mui/material';

const CompUnitNotation = () => {
	const { data, isLoading, error } = useQuery('unitNotationKey', () => getUnitNotation(), {
		initialData: '',
	});

	if (isLoading) return <Typography variant="body1">...</Typography>;
	if (error) return <Typography variant="body1" color="red">error</Typography>;

	return (
		<Typography variant="body1">{data}</Typography>
	)
}

export default CompUnitNotation;