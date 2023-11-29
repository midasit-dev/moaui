import { Seperator, Panel, Typography } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsSeperatorHorizontal = () => {
	return (
		<Panel width='100px' height='auto'>
			<Typography>Section 1</Typography>
			<Seperator direction="horizontal" />
			<Typography>Section 2</Typography>
		</Panel>
	);
}/**${comma}*/

export default ComponentsSeperatorHorizontal;
