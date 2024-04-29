import { TextField } from "@midasit-dev/moaui"; /**${comma}*/
import { useEffect } from "react";

const ComponentsTextFieldDataSet = () => {
	useEffect(() => {
		const element = document.getElementById('textfield-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value');
			console.log(curValue);
		}
	}, []);

  return (
		<TextField 
			id='textfield-data-set'
			width="100px"
			placeholder="data-set"
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldDataSet;
