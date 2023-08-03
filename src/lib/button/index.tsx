import MoaButton from "./Styled";

type MoabuttonProps = {
	children: string,
	onClick: Function
}

Moabutton.defaultProps = {
	children: "Button",
	onClick: () => {},
}

function Moabutton(props: MoabuttonProps) : React.ReactElement {
	const buttonText:string = props.children;
	const onClickEvent:Function = props.onClick;

	async function onClickHandler(){
		await onClickEvent();
	}
	
	return (
		<MoaButton onClick={onClickHandler}>{buttonText}</MoaButton>
	)
}

export default Moabutton;