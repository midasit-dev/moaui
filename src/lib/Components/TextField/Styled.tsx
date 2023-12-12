import { styled } from '@mui/material/styles';
import MoaStyledComponent from "../../Style/MoaStyled";
import TextField from '@mui/material/TextField';
import Color from '../../Style/Color';
import Font from '../../Style/Font';

export type StyledProps = {
	/**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus?: boolean;
	/**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: React.InputHTMLAttributes<unknown>['type'];
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
	 * The callback function that is fired when the textfield's value changes.
	 * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.value` (string).
	 * @defaultValue undefined
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/**
	 * The value of the textfield.
	 * @defaultValue undefined
	 */
	value?:string,

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
	width?: number | string,
	/**
	 * The height of the textfield.
	 */
	height?: string | number;
	/**
	 * The spacing title and textfield.
	 */
	spacing?: number,
}

const StyledComponent = styled((props:StyledProps) => {
	return(
		<TextField
			autoFocus={props?.autoFocus}
			type={props?.type}
			onChange={props?.onChange}
			defaultValue={props?.defaultValue}
			error = {props?.error}
			disabled = {props?.disabled}
			value = {props?.value}
			sx={{
				width: props?.width || "auto",
				height: props?.height || "auto",
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
					width: props?.width || "auto",
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