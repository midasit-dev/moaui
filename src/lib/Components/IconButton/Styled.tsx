import { styled } from '@mui/material/styles';
import { useCallback, cloneElement } from 'react';
import MoaStyledComponent from "../../Style/MoaStyled";
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Color from '../../Style/Color';
import { MarginTypes, MarginProps } from '../../Style/Margin';
import { PaddingTypes, PaddingProps } from '../../Style/Padding';
import { Icon } from '../../';

export interface StyledProps extends MarginTypes, PaddingTypes {
	/**
	 * If the value is true, The state of the button is disabled.
	 * @defaultValue false
	 * @optional
	 * @type boolean
	 */
	disabled?: boolean,

	/**
	 * The icon to display.
	 * @defaultValue undefined
	 * @optional
	 * @type React.ReactNode
	 */
	children?: React.ReactNode,

	/**
	 * The name of the icon.
	 * @defaultValue "Apple"
	 * @optional
	 */
	iconName?: string;

	/**
	 * The color of the button.
	 * @defaultValue "normal"
	 * @optional
	 * @type "normal" | "negative"
	 * @example
	 * color="normal"
	 * color="negative"
	 */
	color?: "normal" | "negative"

	/**
	 * The width of the button.
	 * @defaultValue "auto"
	 * @optional
	 * @type string
	 * @example
	 * width="auto"
	 * width="100%"
	 * width="10rem"
	 * width="10vw"
	 * width="10vh"
	 * width="10ex"
	 * width="10px"
	 */
	width?: string

	/**
	 * The height of the button.
	 * @defaultValue "auto"
	 * @optional
	 * @type string
	 * @example
	 * height="auto"
	 * height="100%"
	 * height="10rem"
	 * height="10vw"
	 * height="10vh"
	 * height="10ex"
	 * height="10px"
	 */
	height?: string

	/**
	 * The callback function that is fired when the button is clicked.
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The event source of the callback.
	 * @defaultValue undefined
	 * @optional
	 * @type React.MouseEventHandler<HTMLButtonElement>
	 * @example
	 * onClick={(event) => {}}
	 */
	onClick?: IconButtonProps["onClick"],
	
	/**
	 * If transparent is `true`, border, background is transparent.
	 * 
	 * @default false
	 */
	transparent?: boolean;
	/**
	 * If transparent is `true`, transparentColor applied. set a main color of icon!
	 */
	transparentColor?: string;

	/**
	 * If border is `true`, `primary` color applied.
	 * 
	 * @default false
	 */
	border?: boolean;

	sx?: never,
}

const StyledComponent = styled((props: StyledProps) => {
	const { sx, children, iconName, color, transparent, transparentColor, border, ...rest } = props;
	if (sx) console.error('The sx prop is not used in StyledComponent');

	const CustomBackgroundColor = useCallback(({color, transparent} : { 
			color: StyledProps["color"];
			transparent: StyledProps["transparent"];
			border: StyledProps["border"];
		}) => {
			//color === "normal"
			const normalStyle = {
				border: `1px solid ${Color.primary.enable_strock}`,
				background: Color.primary.enable,
				color: Color.text.primary,
				"&:hover": {
					background: Color.primary.hover,
					color: Color.primary.white,
				},
				":active": {
					background: Color.primary.focus,
					color: Color.primary.white,
				},
				":disabled": {
					background: `${Color.primary.enable}c0`,
					color: `${Color.text.disable}c0`,
					border: `1px solid ${Color.primary.enable_strock}c0`,
				},
			};

			const negativeStyle = color === "negative" ? {
				border: `1px solid ${Color.primaryNegative.enable_strock}`,
				background: Color.primaryNegative.enable,
				color: Color.textNegative.primary,
				"&:hover": {
					background: Color.primaryNegative.hover,
					color: Color.primaryNegative.white,
				},
				":active": {
					background: Color.primaryNegative.focus,
					color: Color.primaryNegative.white,
				},
				":disabled": {
					background: `${Color.primaryNegative.enable}c0`,
					color: `${Color.textNegative.disable}c0`,
					border: `1px solid ${Color.primaryNegative.enable_strock}c0`,
				},
			} : {};

			const transparentStyle = transparent ? {
				border: 'none',
				background: "transparent",
				color: transparentColor ? transparentColor : Color.text.primary,
				"&:hover": {
					background: "transparent",
					opacity: 0.6,
				},
				":active": {
					background: "transparent",
					opacity: 0.4,
				},
				":disabled": {
					background: "transparent",
					opacity: 0.2,
					border: 'none',
				},
			} : {};

			return {
				...normalStyle,
				...negativeStyle,
				...transparentStyle,
			};
	}, [transparentColor]);

	return (
		<IconButton
			{...rest}
			disableRipple
			sx={{
				width: props?.width || "auto",
				height: props?.height || "1.75rem",
				...MarginProps(props),
        ...PaddingProps(props),
				justifyContent: "center",
				alignItems: "center",
				gap: "0.25rem",
				flexShrink: 0,
				borderRadius: "0.25rem",
				...CustomBackgroundColor({color, transparent, border}),
			}}
		 >
			{children ? 
				cloneElement(children as React.ReactElement, {width: "16px", height: "16px"}) : 
					iconName ? 
						<Icon iconName='Apple' /> : 
							null
			}
		 </IconButton>
	);
})(() => ({}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;