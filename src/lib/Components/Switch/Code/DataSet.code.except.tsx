import { useEffect, useState } from "react";/**${comma}*/
import { Switch } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsSwitchDataSet = () => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const element = document.getElementById('switch-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value');
			console.log(curValue);
		}
	}, [checked]);

	return (
		<Switch 
			id='switch-data-set'
			checked={checked}
			onChange={() => setChecked(!checked)}
			label={checked ? "Checked" : "Unchecked"}
			disabled={false}
		/>
	);
}/**${comma}*/

export default ComponentsSwitchDataSet;
