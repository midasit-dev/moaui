import React from "react";
import MoaIconButton from "@moaui/lib/button/Styled";

function MoaIconbutton(props: any) {
	const buttonText:string = props.children;
	const onClickEvent = props.onClick;
	return (
		<MoaIconButton onClick={onClickEvent}>{buttonText}</MoaIconButton>
	)
}

export default MoaIconbutton;