import { IconButton, Icon } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsIconButtonWithName = ({
	iconName = "Add",/**${props-separator}*/
}) => {
	const onClick = () => {
		alert("Clicked!");
	};

	return (
		<IconButton onClick={onClick} transparent>
			<Icon iconName={iconName} />
		</IconButton>
	);
}/**${comma}*/

export default ComponentsIconButtonWithName;
