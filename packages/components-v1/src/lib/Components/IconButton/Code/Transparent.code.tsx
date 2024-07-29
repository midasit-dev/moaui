import { IconButton, Icon, GuideBox, Typography } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsIconButtonWithName = () => {
	return (
		<GuideBox spacing={2}>
			<Typography>Primary Color</Typography>
			<IconButton onClick={() => alert("Add")} transparent>
				<Icon iconName="Add" />
			</IconButton>
			<Typography>Customize Color</Typography>
			<IconButton onClick={() => alert("Close")} transparent transparentColor="red">
				<Icon iconName="Close" />
			</IconButton>
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsIconButtonWithName;
