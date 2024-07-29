import { IconButton, Icon } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsIconButtonAdd = () => {
	const onClick = () => {
		alert("Clicked!");
	};

	return (
		<IconButton onClick={onClick} >
			<Icon iconName="Add" />
		</IconButton>
	);
}/**${comma}*/

export default ComponentsIconButtonAdd;
