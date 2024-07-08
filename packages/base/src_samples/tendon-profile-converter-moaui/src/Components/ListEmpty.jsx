import React from 'react';
import MoaTypography from "@midasit-dev/moaui/Components/Typography";
import MoaStack from '@midasit-dev/moaui/Components/Stack';

ListEmpty.defaultProps = {
	height: "auto",
};

export default function ListEmpty(props) {
	const { height } = props;

	return (
		<MoaStack direction="column" alignItems="center" justifyContent="center" height={height}>
			<MoaTypography variant="h1">No Convertable Tendon Profile</MoaTypography>
			<MoaTypography variant="body1">Please import tendon profile list</MoaTypography>
		</MoaStack>
	)
}