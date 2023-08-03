import React from "react";
import MoaIconButton from "./Styled";

type MoaIconbuttonProps = {
	icon: any,
	children: string,
	onClick: Function
}

MoaIconbutton.defaultProps = {
	icon: <></>,
	children: "Iconbutton",
	onClick: () => {},
}

function MoaIconbutton(props: MoaIconbuttonProps) : React.ReactElement {
	const buttonText: string = props.children;
	const onClickEvent:Function = props.onClick;

	async function onClickHandler(){
		await onClickEvent();
	}
	
	return (
		<MoaIconButton onClick={onClickHandler}>{props.icon}{buttonText}</MoaIconButton>
	)
}

export default MoaIconbutton;