import React from 'react';
import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { Typography, GuideBox } from '../..';

export type StyledProps = {
	/**
	 * alert children.
	 */
	children?: React.ReactNode

	/**
	 * set a alert variant.
	 */
	variant?: "standard" | "outlined" | "filled"
	/**
	 * set a alert severity.
	 */
	severity?: "success" | "error" | "warning" | "info"
	/**
	 * set a alert title.
	 */
	title?: string | undefined,
}

const getSeverityColor = (variant: any, severity: any) => {
	if (variant === 'filled') return '#fff';

	switch (severity) {
		case 'success': return '#2e7d32';
		case 'error': return '#D32F2F';
		case 'warning': return '#ed6c02';
		case 'info': return '#0288d1';
		default: return '#2e7d32';
	}
}

const StyledComponent = styled((props: StyledProps) => {
	const {
		children,
		variant,
		severity,
		title,
		...rest
	} = props;

	return (
		<Stack sx={{ width: '100%' }}>
			<Alert 
				variant={variant}
				severity={severity}
				sx={{
					color: getSeverityColor(variant, severity),
				}}
				{...rest}
			>
				<GuideBox spacing={1.5} paddingBottom={0.7}>
					{/** TITLE */}
					<GuideBox height='1.375rem' verCenter>
						<Typography variant='h1' size="medium" color={getSeverityColor(variant, severity)}>{title}</Typography>
					</GuideBox>
					{/** CONTENTS */}
					<GuideBox spacing={2}>
						{children}
					</GuideBox>
				</GuideBox>
			</Alert>
		</Stack>
	)
}) (({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;