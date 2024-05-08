import React from 'react';/**${comma}*/
import { GuideBox, Typography, Icon } from "@midasit-dev/moaui";/**${comma}*/

const PopupButtonComponent = (props: any) => {
	return (
        <Icon iconName={`KeyboardDoubleArrow${props.direction}`} toButton onClick={() => props.setOpen(!props.open)} />
	)
}

export default PopupButtonComponent;

