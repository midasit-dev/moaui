// import MoaIconButton from "@moaui/lib/button/Styled";
import MoaIconButton from "./Styled";

type MoaIconbuttonProps = {
	children: string,
	onClick: Function
}

MoaIconbutton.defaultProps = {
	children: "Iconbutton",
	onClick: () => {},
}

function MoaIconbutton(props: MoaIconbuttonProps) : React.ReactElement {
	const buttonText:string = props.children;
	const onClickEvent:Function = props.onClick;

	async function onClickHandler(){
		await onClickEvent();
	}
	
	return (
		<MoaIconButton onClick={onClickHandler}>{buttonText}</MoaIconButton>
	)
}

export default MoaIconbutton;