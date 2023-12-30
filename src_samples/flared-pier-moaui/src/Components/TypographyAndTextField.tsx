import { 
	GuideBox, 
	Typography,
	TextField,
} from '@midasit-dev/moaui';
import React from 'react';

const CompTypographyAndTextField = (props: any) => {
	const {
		title,
		textFieldWidth = 200,
		state,
		setState,
		error,
		disabled,
		placeholder = 'Input value ...',
	} = props;

	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography flexItem textAlign="center" height={30}>{title}</Typography>
				<TextField
					error={error}
					width={textFieldWidth}
					height={30}
					placeholder={placeholder}
					onChange={(e: any) => setState(e.target.value)}
					value={state}
					disabled={disabled}
				/>
			</GuideBox>
		</GuideBox>
	);
}

export default CompTypographyAndTextField;