import * as React from "react";
import PropTypes from "prop-types";

import MoaStack from "@midasit-dev/moaui/Stack";
import MoaTextField from "@midasit-dev/moaui/TextField";
import MoaTypography from "@midasit-dev/moaui/Typography";
import { MathJax } from "better-react-mathjax";

const mathJaxWidth = 35;

//Text Field Style
function StyledTextField(props) {
	const { defaultValue, units, value, onChange, disabled, width, type } = props;

	return (
		<MoaTextField
			disabled={disabled}
			width={width}
			hiddenLabel
			defaultValue={defaultValue}
			variant="standard"
			size="small"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			type={type}
			title={units}
		/>
	);
}

StyledTextField.propTypes = {
	onChange: PropTypes.func.isRequired,
};

function BasicInputField(
	title,
	symbol,
	units,
	values,
	SetValue,
	type = "number"
) {
	return (
		<MoaStack
			direction="row"
			spacing={2}
			justifyContent="space-between"
			alignItems="center"
			marginY={0.5}
			marginX={2}
		>
			<MoaTypography>{title}</MoaTypography>
			<MoaStack direction="row" alignItems="center" spacing={2}>
				<MathJax className="mathStyle">{symbol}</MathJax>
				<StyledTextField
					value={values}
					type={type}
					onChange={SetValue}
					width={70}
				/>
				<MoaStack width={mathJaxWidth}>
					<MathJax className="mathStyle">{units}</MathJax>
				</MoaStack>
			</MoaStack>
		</MoaStack>
	);
}

function BasicInputFieldHidden(title, symbol, units, values, SetValue) {
	return (
		<MoaStack
			direction="row"
			spacing={2}
			justifyContent="space-between"
			alignItems="center"
			marginY={0.5}
			marginX={2}
		>
			<MoaTypography>{title}</MoaTypography>
			<MoaStack direction="row" alignItems="center" spacing={2}>
				<MathJax className="mathStyle">{symbol}</MathJax>
				<StyledTextField
					value={values}
					onChange={SetValue}
					disabled={true}
					width={70}
				/>
				<MoaStack width={mathJaxWidth}>
					<MathJax className="mathStyle">{units}</MathJax>
				</MoaStack>
			</MoaStack>
		</MoaStack>
	);
}

function SubInputField(title = NaN, values, SetValue, Display) {
	return (
		<MoaStack
			direction="row"
			pacing={2}
			justifyContent="space-between"
			alignItems="center"
			marginY={0.5}
			marginX={2}
		>
			<MoaTypography>{title}</MoaTypography>
			<StyledTextField
				units=""
				type="number"
				value={values}
				onChange={SetValue}
				disabled={Display}
				width={70}
			/>
		</MoaStack>
	);
}

function SubInputFieldWide(title = NaN, values, SetValue) {
	return (
		<MoaStack
			direction="row"
			apacing={2}
			justifyContent="space-between"
			alignItems="center"
			marginY={0.5}
			marginX={2}
		>
			<MoaTypography>{title}</MoaTypography>
			<StyledTextField
				value={values}
				onChange={SetValue}
				disabled={false}
				width={160}
			/>
		</MoaStack>
	);
}

export {
	BasicInputField,
	BasicInputFieldHidden,
	SubInputField,
	SubInputFieldWide,
};
