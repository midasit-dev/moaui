import React from "react";
import Droplist from './index';
import { SelectChangeEvent } from '@mui/material/Select';
function Demo() {
	const [value1, setValue1] = React.useState("");
	const [value2, setValue2] = React.useState("");

	function onChangeHandler1(event:SelectChangeEvent){
		setValue1(event.target.value);
	}

	function onChangeHandler2(event:SelectChangeEvent){
		setValue2(event.target.value);
	}
	const itemList = new Map();
	itemList.set("subheader", "Category");
	itemList.set("TEST1", 10);
	itemList.set("TEST2", 20);
	itemList.set("TEST3", 30);

	const arrSample = [1,2,3,4];

	return (
		<React.Fragment>
			<br/>
			<Droplist 
				itemList={itemList}
				value={value1} 
				width={"100px"} 
				onChange={onChangeHandler1} 
				defaultValue=""
			/>
			<br/><br/>
			<Droplist
				itemList={() => {
					let map = new Map<string, string | number>();
					for (const value of arrSample) {
						map.set(value.toString(), value);
					}
					return map;
				}}
				value={value2} 
				width={"100px"} 
				onChange={onChangeHandler2} 
				defaultValue=""
			/>
		</React.Fragment>
	);
}

export default Demo;