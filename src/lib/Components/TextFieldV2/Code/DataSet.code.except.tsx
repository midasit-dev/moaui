import { TextFieldV2 } from "@midasit-dev/moaui"; /**${comma}*/
import { useEffect } from "react";

const ComponentsTextFieldDataSet = () => {
	useEffect(() => {
		const element = document.getElementById('textfield-v2-data-set');
		if (element) {
			const curValue = element.getAttribute('data-current-value');
			console.log(curValue);
		}
	}, []);

  return (
		<TextFieldV2 
			id="textfield-v2-data-set"
			width="100px"
			placeholder="placeholder"
		/>
  );
}; /**${comma}*/

export default ComponentsTextFieldDataSet;
