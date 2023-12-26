import { styled } from '@mui/material/styles';
import { useCallback, cloneElement } from 'react';
import MoaStyledComponent from "../../Style/MoaStyled";
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Color from '../../Style/Color';
import { MarginTypes, MarginProps } from '../../Style/Margin';
import { PaddingTypes, PaddingProps } from '../../Style/Padding';

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
	 * If border is `true`, `primary` color applied.
	 * 
	 * @default false
	 */
	border?: boolean;

	sx?: never,
}

const StyledComponent = styled((props: StyledProps) => {
	const { sx, children, color, transparent, border, ...rest } = props;
	const CustomBackgroundColor = useCallback(({color, transparent, border} : { 
			color: StyledProps["color"];
			transparent: StyledProps["transparent"];
			border: StyledProps["border"];
		}) => {
			const primaryColorConfig = color === "negative" ? "primaryNegative" : "primary";
			const textColorConfig = color === "negative" ? "textNegative" : "text";
			const transparency = (192).toString(16);

			let borderStyle = `1px solid ${Color[primaryColorConfig].enable_strock}`;
			if (transparent) borderStyle = 'none';
			if (border) borderStyle = `1px solid ${Color.primaryNegative.enable_strock}`;

			return {
				border: borderStyle,
				background: transparent ? 'transparent' : Color[primaryColorConfig].enable,
				color: Color[textColorConfig].primary,
				"&:hover": {
					background: Color[primaryColorConfig].hover,
					color: Color[primaryColorConfig].white,
				},
				":active": {
					background: Color[primaryColorConfig].focus,
					color: Color[primaryColorConfig].white,
				},
				":disabled": {
					background: `${Color[primaryColorConfig].enable}${transparency}`,
					color: `${Color[textColorConfig].disable}${transparency}`,
					border: `1px solid ${Color[primaryColorConfig].enable_strock}${transparency}`,
				},
			};
	}, []);

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
			{children && cloneElement(children as React.ReactElement, {width: "16px", height: "16px"})}
		 </IconButton>
	);
})(({theme}) => ({}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;