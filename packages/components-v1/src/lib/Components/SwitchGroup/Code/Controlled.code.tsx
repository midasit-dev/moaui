import { useState } from "react";/**${comma}*/
import { SwitchGroup, Switch } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsSwitchGroupControlled = () => {
	const [check1, setCheck1] = useState(false);
	const [check2, setCheck2] = useState(false);
	const [check3, setCheck3] = useState(false);

	const labelString = (checked: boolean) => checked ? "Checked" : "Unchecked";

	return (
		<>
			<SwitchGroup text="Switch Header Text">
				<Switch label={labelString(check1)} checked={check1} onChange={() => setCheck1(!check1)} />
				<Switch label={labelString(check2)} checked={check2} onChange={() => setCheck2(!check2)} />
				<Switch label={labelString(check3)} checked={check3} onChange={() => setCheck3(!check3)} />
			</SwitchGroup>
		</>
	);
}/**${comma}*/

export default ComponentsSwitchGroupControlled;
