import { 
	GuideBox, 
	Typography,
	TextField,
	Color,
} from '@midasit-dev/moaui';
import React from 'react';

const CompTypographyAndTextField = (props: any) => {
	const {
		title,
		state,
		setState,
		error,
		disabled,
		blueTitle = false,
		placeholder = 'Input value ...',
	} = props;

	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography 
					verCenter
					variant="h1" 
					height={30} 
					color={blueTitle ? Color.secondary.main : Color.text.primary}
				>
					{title}
				</Typography>
				<TextField
					error={error}
					width={200}
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