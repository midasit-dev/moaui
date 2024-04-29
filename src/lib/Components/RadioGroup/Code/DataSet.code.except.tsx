import { useEffect, useState } from "react";/**${comma}*/
import { Radio, RadioGroup } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsRadioGroupDataSet = () => {
	const [value, setValue] = useState("Value 1");

	useEffect(() => {
		const element = document.getElementById('radio-group-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value');
			console.log(curValue);
		}
	}, [value]);

	return (
    <RadioGroup
      id="radio-group-data-set"
      onChange={(e: any, value: any) => setValue(value)}
      value={value}
    >
      <Radio name="Value 1" value="Value 1" />
      <Radio name="Value 2" value="Value 2" />
    </RadioGroup>
  );
}/**${comma}*/

export default ComponentsRadioGroupDataSet;
