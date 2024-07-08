import React from 'react';/**${comma}*/
import { GuideBox, Typography, TextField } from "@midasit-dev/moaui";/**${comma}*/
const TypoGraphyTextField = ({
	width = 300,/**${props-separator}*/
	height = 30,/**${props-separator}*/
	title = 'Title',/**${props-separator}*/
	textFieldWidth = 150,/**${props-separator}*/
	placeholder = 'placeholder ...',/**${props-separator}*/
	defaultValue = '',/**${props-separator}*/
	error = false,/**${props-separator}*/
	disabled = false,/**${props-separator}*/
	value = undefined,/**${props-separator}*/
	onChange = undefined,/**${props-separator}*/
	variant = 'outlined',/**${props-separator}*/
	show = false,/**${props-separator}*/
	type = 'text'
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween verCenter>
			<Typography center verCenter height={height}>{title}</Typography>
			<GuideBox verCenter>
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
		</GuideBox>
	)
};/**${comma}*/

export default TypoGraphyTextField;

