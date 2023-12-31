import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Color from '../Color';
import Font from '../Font';


export type MoaTextFieldProps = {
	/**
	 * This is the title attached to the textfield. 
	 * @default ""
	 */
	title?:string,
	/**
	 * Sets where the title will be located outside of the Textfield.
	 * @default "left"
	 */
	titlePosition?:"left" | "label" | "right",
	/**
	 * The value to display by default in the textfield.
	 * @default ""
	 */
	defaultValue:string,
		/**
	 * If the value is true, The Textfield border is displayed in red.
	 * @default false
	 */
	error?: boolean,
			/**
	 * If the value is true, The state of the textfield is disabled.
	 * @default false
	 */
	disabled?: boolean
}

const MoaTextField = styled((props:MoaTextFieldProps) => (
	<TextField defaultValue={props.defaultValue}
		error = {props.error}
		disabled = {props.disabled}
		sx={{
			'& .MuiOutlinedInput-root': {
				'& fieldset':{
					border: `1px solid ${Color.component.gray}`,
				},
				'&:hover fieldset': {
					border: `1px solid ${Color.component.gray_02}`,
				},
				'&.Mui-focused fieldset':{
					border: `1px solid ${Color.component.gray_dark}`,
				}
			},
			'& .MuiInputBase-input':{
				padding:0
			},
			borderRadius: "0.25rem",
			background: Color.primary.white
		}}
		InputProps={{ // input component의 스타일 변경
			sx:{
				width:"8.125rem",
				height:"1.75rem",
				padding: "0.375rem 0.375rem 0.375rem 0.625rem",
				alignItems: "center",
				flexShrink: 0,
				//text
				color: Color.text.secondary,
				fontFeatureSettings: Font.fontFeatureSettings,
				fontFamily: Font.fontFamily,
				fontSize: "0.75rem",
				fontStyle: "normal",
				fontWeight: 400,
				lineHeight: "0.875rem",
			}
		}} 
	/>
))(({theme}) => ({
	display:"flex",
	fullWidth: true,
}))

export default MoaTextField;