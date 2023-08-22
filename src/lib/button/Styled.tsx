import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Color from "../Color";
import Font from "../Font";

export type MoabuttonProps = {
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


const MoaButton = styled((props:MoabuttonProps) => {
	return(
		<Button
			variant={props?.variant}
			disableFocusRipple
			disableRipple
			disabled={props?.disabled}
			disableElevation
			fullWidth={props?.width === "100%" ? true : false}
			sx={{
				width:`${props?.width}`,
				display: "inline-flex",
				height: "1.75rem",
				padding: "0.625rem 1.25rem",
				justifyContent: "center",
				alignItems: "center",
				gap: "0.25rem",
				flexShrink: 0,
				borderRadius: "0.25rem",
				border: props?.variant !== "text" ? `1px solid ${Color.primary.enable_strock}` : "none",
				background: props?.variant === "contained" ? Color.primary.enable: "none",
				"&:hover": {
					background: props?.variant === "contained" ? Color.primary.hover : "none",
					color: props?.variant !== "text" ? Color.primary.white : Color.primary.hover,
					border : props?.variant !== "text" ? `1px solid ${Color.primary.hover}` : "none"
				},
				":active":{
					background: props?.variant === "contained" ? Color.primary.focus : "none",
					color: props?.variant !== "text" ? Color.primary.white : Color.primary.focus,
					border : props?.variant !== "text" ? `1px solid ${Color.primary.focus}` : "none"
				},
				":disabled":{
					background: props?.variant === "contained" ? Color.primary.enable : "none",
					color: Color.text.disable,
					border : props?.variant !== "text" ? `1px solid ${Color.primary.enable_strock}` : "none"
				},
				//text
				color: props?.variant !== "text" ? Color.text.primary : Color.secondary.main,
				textAlign: "center",
				fontFeatureSettings: Font.fontFeatureSettings,
				fontFamily: Font.fontFamily,
				fontSize: "0.75rem",
				fontStyle: "normal",
				fontWeight: 500,
				lineHeight: "0.875rem",
				textTransform: "none",
			}}
			onClick={props?.onClick}>{props.children}</Button>
	)
})
(({theme}) => ({}))

export default MoaButton;