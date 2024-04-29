import React from 'react';
import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Typography } from "../../";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps & { arrowBorder?: boolean } ) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme, arrowBorder }: { theme: any, arrowBorder?: boolean }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
	width: "1rem",
	"&::before": {
		border: arrowBorder ? "0.5px solid rgba(0, 0, 0, .1)" : undefined,
	  }
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
   * current element id
   * @defaultValue ""
   * @optional
   * @type string
   */
  id?: React.HtmlHTMLAttributes<HTMLDivElement>["id"];
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
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  /**
   * Tooltip open state.
   * @default undefined
   */
  open?: boolean;
  /**
   * Draw border around the arrow.
   * @default false
   */
  arrowBorder?: boolean;
};

const StyledComponent = styled((props: StyledProps) => {
	const {
		id,
		children,
		title,
		placement,
		arrowBorder,
	} = props;

	return (
		<BootstrapTooltip
			title={typeof title === 'string' ? <Typography>{title}</Typography> : title || undefined}
			placement={placement || 'bottom'}
			open={props?.open}
			arrowBorder={arrowBorder}
		>
			<div id={id}>
				{children}
			</div>
		</BootstrapTooltip>
	)
})(() => ({}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;