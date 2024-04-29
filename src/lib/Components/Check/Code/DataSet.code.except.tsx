import { Check } from "@midasit-dev/moaui";/**${comma}*/
import { useEffect, useState } from "react";

const ComponentsCheckDataSet = () => {
	const [value, setValue] = useState(true);

	useEffect(() => {
		const element = document.getElementById('check-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value');
			console.log(curValue);
		}
	}, [value]);

	return (
		<Check 
			id="check-data-set"
			name="Data-Set CheckBox"
			checked={value}
			onChange={(event: any) => setValue(event.target.checked)}
		/>
	);
}/**${comma}*/

export default ComponentsCheckDataSet;