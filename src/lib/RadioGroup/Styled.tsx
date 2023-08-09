import { styled } from '@mui/material/styles';
import RadioGroup, {RadioGroupProps} from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import MoaTypography from '../Typography';

export interface StyledProps extends RadioGroupProps {
	children?: React.ReactElement[],
	/**
	 * The default value. Use when the component is not controlled.
	 */
	defaultValue?: any,
	/**
	 * The name used to reference the value of the control.
	 * If you don't provide this prop, it falls back to a randomly generated name.
	 */
	name?: string,
	/**
	 * Callback fired when a radio button is selected.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
	 * @param {string} value The value of the selected radio button.
	 * You can pull out the new value by accessing `event.target.value` (string).
	 */
	onChange?: (event: React.ChangeEvent, value: string) => void,
	/**
	 * Value of the selected radio button. The DOM API casts this to a string.
	 */
	value?: any,
	/**
	 * Value of the header text. If leave empty this field, header field will not show.
	 */
	text?: string,
};

const StyledComponent = styled((props: StyledProps) => {
	return (
		<FormControl>
			{props?.text && <div style={{padding: '0.25rem'}}><MoaTypography>{props.text}</MoaTypography></div>}
			<RadioGroup {...props} style={{paddingLeft: props?.text ? '0.5rem' : '0rem'}} />
		</FormControl>
	)

})(({theme}) => ({}));

export default StyledComponent;