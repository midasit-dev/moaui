import { useState } from 'react';/**${comma}*/
import { DropList } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsDropListDropdown = () => {
	const [value, setValue] = useState(1);

	function onChangeHandler(event: any){
		setValue(event.target.value);
	}

	const items = new Map<string, number>([ 
		['Korean', 1], 
		['American', 2], 
		['Asia', 3], 
		['Midas', 4] 
	]);

	return (
		<DropList 
			itemList={items} 
			width="100px" 
			defaultValue="Korean"
			value={value}
			onChange={onChangeHandler}
			maxLength={3}
		/>
	);
}/**${comma}*/

export default ComponentsDropListDropdown;
