import { Separator, Panel, Typography } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsSeparatorVertical = () => {
	return (
		<Panel width="auto" height="auto" variant="shadow" flexItem>
			<Typography>Section 1</Typography>
			<Separator direction="vertical" marginX='10px' />
			<Typography>Section 2</Typography>
		</Panel>
	);
}/**${comma}*/

export default ComponentsSeparatorVertical;
