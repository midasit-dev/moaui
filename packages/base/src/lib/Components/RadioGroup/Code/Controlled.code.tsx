import { useState } from "react";/**${comma}*/
import { Radio, RadioGroup, Typography } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsRadioGroupControlled = () => {
	const [state, setState] = useState("Value 1");

	const onChange = (event : React.ChangeEvent, state: any) => {
		setState(state);
	}

	return (
		<>
			<RadioGroup onChange={onChange} value={state}>
				<Radio name="Value 1" value="Value 1" />
				<Radio name="Value 2" value="Value 2" />
			</RadioGroup>	
			<Typography variant="h1" marginTop="10px">Current: {state}</Typography>
		</>
	);
}/**${comma}*/

export default ComponentsRadioGroupControlled;
