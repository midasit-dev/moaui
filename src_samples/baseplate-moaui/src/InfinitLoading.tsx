import ColorfulCircularProgress from "./Components/ColorfulCircularProgress";

export default function InfiniLoading() 
{
	return (
		<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
			<ColorfulCircularProgress speed={1}/>
		</div>
	);
}