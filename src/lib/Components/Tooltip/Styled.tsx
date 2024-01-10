import React from 'react';
import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Typography } from "../../";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }: { theme: any }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
		padding: "0.625rem 0.625rem",
		gap: '0.625rem',
		borderRadius: '0.25rem',
		boxSizing: 'border-box',
		backgroundColor: 'var(--color-bg, #ffffff)',
		display: 'flex',
		boxShadow: 'var(--elevation-200-canvas, 0px 0px .5px rgba(0, 0, 0, .18), 0px 3px 8px rgba(0, 0, 0, .1), 0px 1px 3px rgba(0, 0, 0, .1))',
  },
}));

export type StyledProps = {
  /**
	 * children of the component
	 */
  children?: React.ReactNode;
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: React.ReactNode;
	/**
   * Tooltip placement.
   * @default 'bottom'
   */
	placement?:
	| 'bottom-end'
	| 'bottom-start'
	| 'bottom'
	| 'left-end'
	| 'left-start'
	| 'left'
	| 'right-end'
	| 'right-start'
	| 'right'
	| 'top-end'
	| 'top-start'
	| 'top';
};

const StyledComponent = styled((props: StyledProps) => {
	const {
		children,
		title,
		placement,
		...rest
	} = props;

	return (
		<BootstrapTooltip
			title={typeof title === 'string' ? <Typography>{title}</Typography> : title || undefined}
			placement={placement || 'bottom'}
		>
			<div>
				{children}
			</div>
		</BootstrapTooltip>
	)
})(({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;