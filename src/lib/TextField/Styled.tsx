import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Color from '../Color';
import Font from '../Font';


export type MoaTextFieldProps = {
	/**
	 * This is the placeholder attached to the textfield.
	 * @defaultValue ""
	 */
	placeholder?:string,
	/**
	 * This is the title attached to the textfield. 
	 * @defaultValue ""
	 */
	title ?:string,
	/**
	 * Sets where the title will be located outside of the Textfield.
	 * @defaultValue "left"
	 */
	titlePosition ?: "left" | "label" | "right",
	/**
	 * The value to display by default in the textfield.
	 * @defaultValue ""
	 */
	defaultValue?:string,
		/**
	 * If the value is true, The Textfield border is displayed in red.
	 * @defaultValue false
	 */
	error?: boolean,
			/**
	 * If the value is true, The state of the textfield is disabled.
	 * @defaultValue false
	 */
	disabled?: boolean
	/**
	 * The callback function that is fired when the textfield's value changes.
	 * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value` (string).
	 * @defaultValue undefined
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MoaTextField = styled((props:MoaTextFieldProps) => {
	return(
		<TextField
			onChange={props?.onChange}
			defaultValue={props?.defaultValue}
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
			placeholder={props?.placeholder}
		/>
	)
})(({theme}) => ({
	display:"flex",
	fullWidth: true,
}))

export default MoaTextField;