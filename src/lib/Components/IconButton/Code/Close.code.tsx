import { IconButton, Icon } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsIconButtonClose = () => {
	const onClick = () => {
		alert("Clicked!");
	};

	return (
		<IconButton onClick={onClick} >
			<Icon iconName="Close" />
		</IconButton>
	);
}/**${comma}*/

export default ComponentsIconButtonClose;
