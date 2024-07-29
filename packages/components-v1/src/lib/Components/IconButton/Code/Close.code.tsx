import { IconButton, Icon } from "@midasit-dev/moaui-components-v1";/**${comma}*/

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
