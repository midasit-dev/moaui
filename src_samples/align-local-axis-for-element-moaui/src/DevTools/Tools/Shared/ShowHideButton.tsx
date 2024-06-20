import React from 'react';
import { IconButton, Icon } from '@midasit-dev/moaui';

const ShowHideButton = (props: {
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) => {
	const { state } = props;
	const [show, setShow] = state;
	return (
		<IconButton onClick={() => setShow((prev) => !prev)} transparent={show}>
			{show ? <Icon iconName='KeyboardDoubleArrowUp' /> : <Icon iconName='KeyboardDoubleArrowDown' />}
		</IconButton>
	);
}

export default ShowHideButton;