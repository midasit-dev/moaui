import { Radio } from "@midasit-dev/moaui-components-v1";
import { useState, useEffect } from "react";

const ComponentsRadioDataSet = () => {
	const [value, setValue] = useState('');
	useEffect(() => {
		const element = document.getElementById('radio-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value');
			console.log(curValue);
		}
	}, [value]);

	return (
		<Radio 
			id="radio-data-set"
			name="Radio Button Text"
			onChange={(e: any, value: any) => setValue(value)}
			value={value}
		/>
	);
}

export default ComponentsRadioDataSet;
