import { useState } from "react";/**${comma}*/
import { Switch } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsSwitchLabel = () => {
	const [checked, setChecked] = useState(false);

	return (
		<Switch 
			checked={checked}
			onChange={() => setChecked(!checked)}
			label={checked ? "Checked" : "Unchecked"}
			disabled={false}
		/>
	);
}/**${comma}*/

export default ComponentsSwitchLabel;
