import React from "react";
import MoaIconButton from "@moaui/lib/button/Styled";

type MoaIconbuttonProps = {
	children: React.ReactNode,
	onClick: Function
}

MoaIconbutton.defaultProps = {
	children: "Iconbutton",
	onClick: () => {},
}

function MoaIconbutton(props: MoaIconbuttonProps) : React.ReactElement {
	const buttonText:React.ReactNode = props.children;
	const onClickEvent:Function = props.onClick;

	async function onClickHandler(){
		await onClickEvent();
	}
	
	return (
		<MoaIconButton onClick={onClickHandler}>{buttonText}</MoaIconButton>
	)
}

export default MoaIconbutton;