import { useState } from 'react';/**${comma}*/
import { DropList } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsDropListItemListFromArray = () => {
	const [value, setValue] = useState(1);

	function onChangeHandler(event: any){
		setValue(event.target.value);
	}

	return (
		<DropList 
			itemList={[
				['Korean', 		1], 
				['American', 	2], 
				['Asia', 			3], 
				['Midas', 		4],
			]} 
			width="100px" 
			defaultValue="Korean"
			value={value}
			onChange={onChangeHandler}
			disabled
		/>
	);
}/**${comma}*/

export default ComponentsDropListItemListFromArray;
