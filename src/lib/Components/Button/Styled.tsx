import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../../Style/MoaStyled';
import MuiButton from '@mui/material/Button';
import Color from "../../Style/Color";
import Font from "../../Style/Font";
import React from 'react';

export type StyledProps = {
	/**
	 * The content of the button.
	 * @defaultValue "Button"
	 * @optional
	 * @type string
	 */
	children: string,
	/**
	 * The callback function that is fired when the button is clicked.
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The event source of the callback.
	 * @defaultValue undefined
	 * @optional
	 * @type React.MouseEventHandler<HTMLButtonElement>
	 * @example
	 * onClick={(event) => {}}
	 * onClick={handleClick}
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
	/**
	 * The variant to use.
	 * @default "contained"
	 * @optional
	 * @type "contained" | "outlined" | "text"
	 */
	variant?: "contained" | "outlined" | "text",
	/**
	 * If the value is true, The state of the button is disabled.
	 * @defaultValue false
	 * @optional
	 * @type boolean
	 * @example
	 * disabled={true}
	 * disabled={false}
	 * disabled
	 * !disabled
	 */
	disabled?: boolean
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
	 * The color of the button.
	 * @defaultValue "normal"
	 * @optional
	 * @type "normal" | "negative"
	 * @example
	 * color="normal"
	 * color="negative"
	 */
	color?: "normal" | "negative"
}


const StyledComponent = styled((props:StyledProps) => {
	const commonButtonProps = React.useMemo(() => ({
		disableFocusRipple:true,
		disableRipple:true,
		disableElevation : true,
	}), []);

	const commonButtonStyle = React.useMemo(() => ({
		width:`${props?.width}`,
		display: "inline-flex",
		height: "1.75rem",
		padding: "0.625rem 1.25rem",
		justifyContent: "center",
		alignItems: "center",
		gap: "0.25rem",
		flexShrink: 0,
		borderRadius: "0.25rem",
		//text
		textAlign: "center",
		fontFeatureSettings: Font.fontFeatureSettings,
		fontFamily: Font.fontFamily,
		fontSize: "0.75rem",
		fontStyle: "normal",
		fontWeight: 500,
		lineHeight: "0.875rem",
		textTransform: "none",
	}), [props?.width]);

	const CustomButtonStyleByVariant = React.useCallback(({ variant, color }: { variant:StyledProps["variant"], color: StyledProps["color"] }) => {
		const borderConfig = variant !== "text" ? `1px solid` : "none";
		const primaryColorConfig = color === "negative" ? "primaryNegative" : "primary";
		const textColorConfig = color === "negative" ? "textNegative" : "text";
		
		if(variant === "contained") {
			return ({
				border: `${borderConfig} ${Color[primaryColorConfig].enable_strock}`,
				background: Color[primaryColorConfig].enable,
				color: Color[textColorConfig].primary,
				"&:hover": {
					background: Color[primaryColorConfig].hover,
					color: Color[primaryColorConfig].white,
					border : `${borderConfig} ${Color[primaryColorConfig].hover}`
				},
				":active":{
					background: Color[primaryColorConfig].focus,
					color: Color[primaryColorConfig].white,
					border : `${borderConfig} ${Color[primaryColorConfig].focus}`
				},
				":disabled":{
					background: Color[primaryColorConfig].enable,
					color: Color[textColorConfig].disable,
					border : `${borderConfig} ${Color[primaryColorConfig].enable}`
				},
			})
		}
		if(variant === "outlined") {
			return ({
				border: `${borderConfig} ${Color[primaryColorConfig].enable_strock}`,
				background: "none",
				color: Color[textColorConfig].primary,
				"&:hover": {
					background: "none",
					color: Color[textColorConfig].primary,
					border : `${borderConfig} ${Color[primaryColorConfig].hover}`
				},
				":active":{
					background: "none",
					color: Color[textColorConfig].primary,
					border : `${borderConfig} ${Color[primaryColorConfig].focus}`
				},
				":disabled":{
					background: "none",
					color: Color[textColorConfig].disable,
					border : `${borderConfig} ${Color[primaryColorConfig].enable}`
				},
			})
		} 
		if(variant === "text") {
			return ({
				border: "none",
				background: "none",
				color: Color.secondary.main,
				"&:hover": {
					background: "none",
					color: Color[primaryColorConfig].hover,
					border : `${borderConfig} ${Color[primaryColorConfig].hover}`
				},
				":active":{
					background: "none",
					color: Color[primaryColorConfig].focus,
					border : `${borderConfig} ${Color[primaryColorConfig].focus}`
				},
				":disabled":{
					background: "none",
					color: Color[textColorConfig].disable,
					border : `${borderConfig} ${Color[primaryColorConfig].enable_strock}`
				},
			})
		}
		return (
			<></>
		)
	}, []);

	return (
		<MuiButton
			{...commonButtonProps}
			variant={props?.variant}
			disabled={props?.disabled}
			fullWidth={props?.width === "100%" ? true : false}
			onClick={props?.onClick}
			sx={{
				...commonButtonStyle,
				...CustomButtonStyleByVariant({ variant: props?.variant, color: props?.color })
			}}
		>
			{props?.children}
		</MuiButton>
	)
})
(({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;