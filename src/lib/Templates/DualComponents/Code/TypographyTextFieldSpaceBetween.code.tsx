import React from 'react';/**${comma}*/
import { GuideBox, Typography, TextField } from "@midasit-dev/moaui";/**${comma}*/

const TemplatesDualComponentsTypographyTextFieldSpaceBetween = ({
	width = 300,/**${props-seperator}*/
	height = 30,/**${props-seperator}*/
	title = 'Title',/**${props-seperator}*/
	textFieldWidth = 150,/**${props-seperator}*/
	placeholder = 'placeholder ...',/**${props-seperator}*/
	defaultValue = '',/**${props-seperator}*/
	error = false,/**${props-seperator}*/
	disabled = false,/**${props-seperator}*/
	value = undefined,/**${props-seperator}*/
	onChange = undefined,/**${props-seperator}*/
	show = false,/**${props-seperator}*/
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<Typography flexItem textAlign='center' height={height}>{title}</Typography>
			<TextField
				width={textFieldWidth}
				height={30}
				placeholder={placeholder}
				error={error}
				disabled={disabled}
				defaultValue={defaultValue}
				value={value || valueLocal}
				onChange={onChange || onChangeLocal}
			/>
		</GuideBox>
	)
};/**${comma}*/

export default TemplatesDualComponentsTypographyTextFieldSpaceBetween;