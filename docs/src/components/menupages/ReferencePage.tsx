import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMenu } from '../../recoil/atom';
import Button from './Button';
import TextField from './TextField';
import Check from './Check';
import Box from "@mui/material/Box";

export default function ReferencePage(props: any) {
	const selectedMenuItem:string = useRecoilValue<string>(selectedMenu);

	function ReferenceCompo(props:any){
		console.log(props.Compo)
		return (
			<>
				{props.Compo === "Button" ? <Button/> : <></>}
				{props.Compo === "TextField" ? <TextField/> : <></>}
				{props.Compo === "Check" ? <Check/> : <></>}
			</>
		)
	}

	return (
		<Box sx={{ml:2}}display={"flex"} justifyContent={"center"} width={"100%"} >
			<ReferenceCompo Compo={selectedMenuItem}/>
		</Box>
	);
}