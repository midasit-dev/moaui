import { 
	GuideBox, 
	Typography,
	TextField,
} from '@midasit-dev/moaui';
import React from 'react';

const CompTypographyAndTextField = (props: any) => {
	const {
		title,
		state,
		setState,
		error,
	} = props;

	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography flexItem textAlign="center" height={30}>{title}</Typography>
				<TextField
					error={error}
					width={200}
					height={30}
					placeholder='Input value ...'
					onChange={(e: any) => setState(e.target.value)}
					value={state}
				/>
			</GuideBox>
		</GuideBox>
	);
}

export default CompTypographyAndTextField;