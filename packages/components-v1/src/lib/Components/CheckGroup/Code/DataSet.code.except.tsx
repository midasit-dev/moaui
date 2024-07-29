import React, { useEffect } from 'react';
import { CheckGroup, Check } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsCheckGroupControlled = () => {
	const [checked1, setChecked1] = React.useState(true);
	const [checked2, setChecked2] = React.useState(false);
	const [checked3, setChecked3] = React.useState(false);

	useEffect(() => {
		const element = document.getElementById('check-group-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value');
			console.log(curValue);
		}
	}, []);

	return (
    <CheckGroup id="check-group-data-set" text="title">
      <Check
        name="test1"
        checked={checked1}
        onChange={(e: any, checked: any) => setChecked1(checked)}
      />
      <Check
        name="test2"
        checked={checked2}
        onChange={(e: any, checked: any) => setChecked2(checked)}
      />
      <Check
        name="test3"
        checked={checked3}
        onChange={(e: any, checked: any) => setChecked3(checked)}
      />
    </CheckGroup>
  );
}/**${comma}*/

export default ComponentsCheckGroupControlled;