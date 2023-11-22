import { useRecoilValue } from 'recoil';
import { selectedMenu } from '../../recoil/atom';
import Button from './Button';
import TextField from './TextField';
import Check from './Check';
import Box from "@mui/material/Box";
import Installation from './Installation';
import Switch from './Switch';
import Typography from './Typography';

export default function ReferencePage(props: any) {
	const selectedMenuItem:string = useRecoilValue<string>(selectedMenu);

	function ReferenceCompo(props:any){
		return (
			<>
				{props.Compo === "Installation" ? <Installation/> : <></>}
				{props.Compo === "Button" ? <Button/> : <></>}
				{props.Compo === "TextField" ? <TextField/> : <></>}
				{props.Compo === "Check" ? <Check/> : <></>}
				{props.Compo === "Switch" ? <Switch/> : <></>}
				{props.Compo === "Typography" ? <Typography/> : <></>}
			</>
		)
	}

	return (
		<Box sx={{ml:2}}display={"flex"} justifyContent={"center"} width={"100%"} >
			<ReferenceCompo Compo={selectedMenuItem}/>
		</Box>
	);
}