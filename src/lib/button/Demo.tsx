import Button from "./index";

export default function MoaButton(){
	return (
		<>
			<Button variant="contained" width="140px">Contained Button</Button><br/><br/>
			<Button variant="text" width="20rem">Text Button</Button><br/><br/>
			<Button variant="outlined" width="200px">Outlined Button</Button><br/><br/>
			disabled examples<br/><br/>
			<Button variant="contained" disabled={true}>Outlined Button</Button><br/><br/>
			<Button variant="text" disabled={true}>Outlined Button</Button><br/><br/>
			<Button variant="outlined" disabled={true}>Outlined Button</Button>
		</>
	)
}