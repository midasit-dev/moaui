import { styled } from '@mui/material/styles';

import MoaStyledComponent from "../../Style/MoaStyled";
import { Typography } from '../../';

import RadioGroup, {RadioGroupProps} from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

export interface StyledProps extends RadioGroupProps {
	/**
	 * Defines a string value that labels the current element.
	 * @default "Radio Group"
	 */
	ariaLabel?: string,
	/**
	 * The content of the component.
	 */
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
	/**
	 * set a spacing between radio buttons.
	 */
	spacing?: number,

	/**
	 * `Not Used` The sx prop lets you style elements quickly using values from your theme.
	 * @default undefined
	 */
	sx?: never,
};

const StyledComponent = styled((props: StyledProps) => {
	const { ariaLabel, text, sx, ...rest } = props;
	
	return (
		<FormControl aria-label={`${text} ${ariaLabel}`}>
			{text && <div style={{padding: '0.25rem'}}><Typography>{text}</Typography></div>}
			<RadioGroup {...rest} style={{paddingLeft: text ? '0.5rem' : '0rem'}} />
		</FormControl>
	)

})(({theme}) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;