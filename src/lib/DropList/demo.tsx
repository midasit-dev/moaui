import React from "react";
import Droplist from './index';
import { SelectChangeEvent } from '@mui/material/Select';
function Demo() {
	const [value, setValue] = React.useState("");

	function onChangeHandler(event:SelectChangeEvent){
		setValue(event.target.value);
	}
	const itemList = new Map();
	itemList.set("subheader", "Category");
	itemList.set("TEST2", 10);
	itemList.set("TEST1", 20);
	itemList.set("a", 2);

	return (
		<React.Fragment>
			<br/>
			<Droplist 
				itemList={itemList} 
				value={value} 
				width={"100px"} 
				onChange={onChangeHandler} 
				defaultValue=""
			/>
		</React.Fragment>
	);
}

export default Demo;