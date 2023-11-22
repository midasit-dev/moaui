import React from 'react';
import MoaTypography from "@midasit-dev/moaui/Typography";
import MoaStack from '@midasit-dev/moaui/Stack';

ListLoading.defaultProps = {
	height: "auto",
};

export default function ListLoading(props) {
	const { height } = props;

	return (
		<MoaStack direction="column" alignItems="center" justifyContent="center" height={height} position="absolute" width="100%" bgcolor="#ffffffbb" zIndex={50}>
			<MoaTypography variant="h1">Now Loading...</MoaTypography>
		</MoaStack>
	)
}