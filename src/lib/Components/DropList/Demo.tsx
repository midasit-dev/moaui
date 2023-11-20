import React from "react";
import Droplist from './index';
import { SelectChangeEvent } from '@mui/material/Select';
import MoaTypography from "../Typography";
import Box from '@mui/material/Box';

function DropListwithitemListAnonymousFunction(){
	const [value, setValue] = React.useState("");

	function onChangeHandler(event:SelectChangeEvent){
		setValue(event.target.value);
	}

	const arrSample = [1,2,3,4];
	return (
		<Droplist
			itemList={() => {
				let map = new Map<string, string | number>();
				arrSample.forEach((value) => { map.set(value.toString(), value); });
				return map;
			}}
			value={value} 
			width={"100px"} 
			onChange={onChangeHandler} 
			defaultValue=""
		/>
	)
}

function DropListwithitemListMap(){
	const [value, setValue] = React.useState("");

	function onChangeHandler(event:SelectChangeEvent){
		setValue(event.target.value);
	}

	const itemList = new Map();
	itemList.set("subheader", "Category");
	itemList.set("TEST1", 10);
	itemList.set("TEST2", 20);
	itemList.set("TEST3", 30);

	return (
		<Droplist 
			itemList={itemList}
			value={value} 
			width={"50%"} 
			onChange={onChangeHandler} 
			defaultValue=""
		/>
	)
}

function DropListDemo(){
	return (
		<Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
			<MoaTypography>DropList</MoaTypography><br/>
			<MoaTypography>itemList Map</MoaTypography>
			<DropListwithitemListMap/>
			<MoaTypography>itemList AnonymousFunction</MoaTypography>
			<DropListwithitemListAnonymousFunction/>
		</Box>
	)
}

export default DropListDemo;