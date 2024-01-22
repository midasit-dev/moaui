import { styled } from '@mui/material/styles';

import MoaStyledComponent from "../../Style/MoaStyled";
import { Color } from '../../';

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Circle from '@mui/icons-material/Circle';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import { MarginTypes, MarginProps, hasMarginProps } from '../../Style/Margin';
import { PaddingTypes, PaddingProps } from '../../Style/Padding';

export type StyledProps = {
	/**
	 * If `true`, the component appears checked.
	 */
	checked?: boolean,

	/**
	 * Callback fired when the state is changed.
	 * @param event The event source of the callback. You can pull out the new checked state by accessing event.target.checked (boolean).
	 */
	onChange?: (event: React.SyntheticEvent, checked: boolean) => void,
	
	/**
	 * The value of the component.
	 * @defaultValue ""
	 */
	value?: unknown,

	/**
	 * The Name of the component.
	 * If not empty, text will appears after button.
	 */
	name?: string,

	/**
	 * Defines a string value that labels the current element.
	 * @defaultValue "Radio Button"
	 */
	ariaLabel?: string,

	/**
	 * If `true`, the component appears disabled.
	 * @defaultValue false
	 */
	disabled?: boolean,

	/**
	 * `Not Used` The sx prop lets you style elements quickly using values from your theme.
	 * @default undefined
	 */
	sx?: never,
} & MarginTypes & PaddingTypes;


type RadioButtonIconProps = {
	/**
	 * If `true`, the component appears in disabled state.
	 * @defaultValue false
	*/
	disabled?: boolean,
	
	/**
	 * If `true`, the component appears in checked state.
	 */
	checked?: boolean,
}

function RadioButtonIcon(props : RadioButtonIconProps) {
	if (props?.disabled) {
		if (props?.checked) {
			return (
				<CircleTwoToneIcon sx={{
					fill: Color.component.gray,
				}} />
			)
		} else {
			return (
				<Circle sx={{
					fill: Color.component.gray_light,
				}} />
			)
		}
	}

	return (
		<CircleTwoToneIcon sx={{
			"circle": {
				fill: Color.component.gray,
			},
			"&:hover": {
				fill: Color.component.gray_dark,
			}
		}} />
	)
}

const StyledComponent = 
	styled((props: StyledProps) : React.ReactElement => {
	return (
		<FormControlLabel
			aria-label={`${props?.ariaLabel} FormControlLabel`} 
			onChange={props?.onChange}
			checked={props?.checked}
			disabled={props?.disabled}
			value={props?.value}
			name={props?.name}
			control={
				<Radio
					disableFocusRipple
					disableRipple
					aria-label={`${props?.name} ${props?.ariaLabel}`}
					checkedIcon={<RadioButtonChecked />}
					icon={<RadioButtonIcon />}
					sx={{
						".MuiSvgIcon-root": {
							fontSize: "1rem",
						},
						padding: "0.25rem", /** 4px */
						"&.Mui-disabled": {
							color: Color.component.gray_light
						},
						":not(.Mui-disabled)": {
							"&.Mui-checked": {
								color: Color.primary.main,
							},
							":not(.Mui-checked)": {
								"&:hover": {
									color: Color.component.gray_dark,
								},
								":not(hover)": {
									color: Color.component.gray,
								}
							}
						}
					}}
				/>
			}
			label={props?.name}
			sx={{
				...(!hasMarginProps(props) ? { marginLeft: 0, marginRight: 0} : MarginProps(props)),
				...PaddingProps(props),
				".MuiFormControlLabel-label": {
					// marginLeft: "0.25rem", /** 4px */
					color: `${Color.text.secondary}!important`,
				},
			}}
		/>
	)
})(({ theme }) => ({}));

const ThemedComponent = (props: StyledProps) => (
	<MoaStyledComponent>
		<StyledComponent {...props} />
	</MoaStyledComponent>
);
export default ThemedComponent;