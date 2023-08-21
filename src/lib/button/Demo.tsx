import Button from "./index";

export default function MoaButton(){
	return (
		<>
			<Button variant="contained">Contained Button</Button><br/><br/>
			<Button variant="text">Text Button</Button><br/><br/>
			<Button variant="outlined">Outlined Button</Button>
		</>
	)
}