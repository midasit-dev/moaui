import { Seperator, Panel, Typography } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsSeperatorVertical = () => {
	return (
		<Panel width="auto" height="auto" variant="shadow" flexItem>
			<Typography>Section 1</Typography>
			<Seperator direction="vertical" marginX='10px' />
			<Typography>Section 2</Typography>
		</Panel>
	);
}/**${comma}*/

export default ComponentsSeperatorVertical;
