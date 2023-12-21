import React from 'react';
import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import Chip from '@mui/material/Chip';

export type StyledProps = {
  /**
   * alert children.
   */
  children?: React.ReactNode;

  /**
   * set a alert severity.
   */
  severity?: "success" | "error" | "warning" | "info";
  /**
   * set a background color
   */
  bgColor?: string;
  /**
   * set a color
   */
  color?: string;
  /**
   * set a size
   */
  size?: "small" | "medium";
  /**
   * set a label
   */
  label?: string;
  /**
   * set a disabled
   */
  disabled?: boolean;
};

const getSeverityBgColor = (severity: any) => {
	switch (severity) {
		case 'success': return '#2e7d32';
		case 'error': return '#D32F2F';
		case 'warning': return '#ed6c02';
		case 'info': return '#0288d1';
		default: return 'rgba(0, 0, 0, 0.08)';
	}
}

const getSeverityColor = (severity: any) => {
	switch (severity) {
		case 'success': 
		case 'error':
		case 'warning':
		case 'info':
			return '#fff';
		default: return '#000';
	}
}

const StyledComponent = styled((props: StyledProps) => {
	const {
		children,
		severity,
		bgColor,
		color,
		size,
		label,
		disabled,
		...rest
	} = props;

	return (
		<Chip
			sx={{
				backgroundColor: bgColor || getSeverityBgColor(severity),
				color: color || getSeverityColor(severity),
			}}
			size={size}
			label={label}
			disabled={disabled}
			{...rest}
		/>
	)
}) (({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;