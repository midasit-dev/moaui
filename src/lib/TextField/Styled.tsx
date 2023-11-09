import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../MoaStyled";
import TextField from '@mui/material/TextField';
import Color from '../Color';
import Font from '../Font';

export type StyledProps = {
	/**
	 * The id of the input element. Use this prop to make label and helperText accessible for screen readers.
	 * @defaultValue undefined
	 * @optional
	 * @type string
	 */
	id?: string,

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
	 * Type of the `input` element. It should be a valid HTML5 input type.
	 * @defaultValue "text"
	 * @optional
	 * @type string
	 * @example
	 */
	type?: typeof HTMLInputElement.prototype.type,
	/**
	 * The value to display by default in the textfield.
	 * @defaultValue undefined
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
	 * The value of the textfield.
	 * @defaultValue undefined
	*/
	value?:string,
	/**
	 * If `true`, the input will take up the full width of its container.
	 * @defaultValue false
	 * @optional
	 * @type boolean
	*/
	fullWidth?: boolean,

	/**
	 * The width of the textfield.
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
	width?: string,

	//Events
	/**
	 * The callback function that is fired when the textfield's value changes.
	 * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value` (string).
	 * @defaultValue undefined
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	
	/**
	 * The callback function that is fired when user presses a key on the keyboard in textfield.
	 * @param {React.KeyboardEvent<HTMLInputElement>} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value` (string).
	 * @defaultValue undefined
	 */
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const StyledComponent = styled((props:StyledProps) => {
	return(
		<TextField
			onChange={props?.onChange}
			onKeyDown={props?.onKeyDown}
			id={props?.id}
			type={props?.type}
			defaultValue={props?.defaultValue}
			error = {props?.error}
			disabled = {props?.disabled}
			value = {props?.value}
			sx={{
				width: props?.fullWidth ? "100%" : (props?.width || "auto"),
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
					width: props?.fullWidth ? "100%" : (props?.width || "auto"),
					height:"1.75rem",
					padding: "0.375rem 0.375rem 0.375rem 0.625rem",
					alignItems: "center",
					flexShrink: 0,
					//text
					color: Color.text.secondary,
					fontFeatureSettings: Font.fontFeatureSettings,
				}
			}}
			placeholder={props?.placeholder}
		/>
	)
})(({theme}) => ({
	display:"flex",
	fullWidth: true,
}))

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;