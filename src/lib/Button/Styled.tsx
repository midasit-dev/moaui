import { styled } from '@mui/material/styles';
import MoaStyledComponent from '../MoaStyled';
import Button from '@mui/material/Button';
import Color from "../Color";
import Font from "../Font";
import React from 'react';

export type StyledProps = {
	children: string,
	onClick?: () => void,
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
}


const StyledComponent = styled((props:StyledProps) => {
	const commonButtonProps = {
		disableFocusRipple:true,
		disableRipple:true,
		disableElevation : true,
	}

	const commonButtonStyle = {
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
		fontWeight: 500,
		textTransform: "none",
	}

	function CustomButtonStyleByVariant (props:StyledProps) : React.ReactElement {
		if(props?.variant === "contained") {
			return (
				<Button
					{...commonButtonProps}
					variant = {props?.variant}
					disabled = {props?.disabled}
					fullWidth = {props?.width === "100%" ? true : false}
					onClick={props?.onClick}
					sx={{
						...commonButtonStyle,
						border: `1px solid ${Color.primary.enable_strock}`,
						background: Color.primary.enable,
						color: Color.text.primary,
						"&:hover": {
							background: Color.primary.hover,
							color: Color.primary.white,
							border : `1px solid ${Color.primary.hover}`
						},
						":active":{
							background: Color.primary.focus,
							color: Color.primary.white,
							border : `1px solid ${Color.primary.focus}`
						},
						":disabled":{
							background: Color.primary.enable,
							color: Color.text.disable,
							border : `1px solid ${Color.primary.enable_strock}`
						},
					}}>
					{props.children}
				</Button>
			)
		}
		if(props?.variant === "outlined") {
			return (
				<Button
					{...commonButtonProps}
					variant = {props?.variant}
					disabled = {props?.disabled}
					fullWidth = {props?.width === "100%" ? true : false}
					onClick={props?.onClick}
					sx={{
						...commonButtonStyle,
						border: `1px solid ${Color.primary.enable_strock}`,
						background: "none",
						color: Color.text.primary,
						"&:hover": {
							background: "none",
							color: Color.text.primary,
							border : `1px solid ${Color.primary.hover}`
						},
						":active":{
							background: "none",
							color: Color.text.primary,
							border : `1px solid ${Color.primary.focus}`
						},
						":disabled":{
							background: "none",
							color: Color.text.disable,
							border : `1px solid ${Color.primary.enable_strock}`
						},
					}}
				>
					{props.children}
				</Button>
			)
		} 
		if(props?.variant === "text") {
			return (
				<Button
					{...commonButtonProps}
					variant = {props?.variant}
					disabled = {props?.disabled}
					fullWidth = {props?.width === "100%" ? true : false}
					onClick={props?.onClick}
					sx={{
						...commonButtonStyle,
						border: "none",
						background: "none",
						color: Color.secondary.main,
						"&:hover": {
							background: "none",
							color: Color.primary.hover,
							border : "none"
						},
						":active":{
							background: "none",
							color: Color.primary.focus,
							border : "none"
						},
						":disabled":{
							background: "none",
							color: Color.text.disable,
							border : "none"
						},
					}}
				>
					{props.children}
				</Button>
			)
		}
		return (
			<></>
		)
	}

	return (
		<CustomButtonStyleByVariant {...props} />
	)
})
(({theme}) => ({}))


const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;