import React from 'react';
import { GuideBox, Typography, TextField } from "@midasit-dev/moaui";

export const TypographyWithTextField = ({
	key = "", width = 300, height = 30, title = 'Title', textFieldWidth = 150, placeholder = 'placeholder ...', error = false, disabled = false, show = false, ...optional
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(optional?.defaultValue || 0);
	let onChangeLocal = React.useCallback((e: any) => {
		setValueLocal(e.target.value);
	}, []);

	React.useEffect(() => {
		console.log(key, optional?.value);
	}, []);

	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<Typography flexItem textAlign='center' height={height}>{title}</Typography>
			<TextField
				width={textFieldWidth}
				height={30}
				placeholder={placeholder}
				error={error}
				disabled={disabled}
				defaultValue={optional?.defaultValue}
				value={optional?.value || valueLocal}
				onChange={(e) => {
					let newE = { ...e};
					const targetNumber = Number(e.target.value);
					if (Number.isNaN(targetNumber)) newE.target.value = String(0);
					else if (targetNumber <= 0) newE.target.value = String(0);
					else newE.target.value = String(targetNumber);
					optional?.onChange(e, key) || onChangeLocal(e);
				}} />
		</GuideBox>
	);
};
