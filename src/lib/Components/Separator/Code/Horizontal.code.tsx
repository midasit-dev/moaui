import { Separator, Panel, Typography } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsSeparatorHorizontal = () => {
	return (
		<Panel width='100px' height='auto'>
			<Typography>Section 1</Typography>
			<Separator direction="horizontal" />
			<Typography>Section 2</Typography>
		</Panel>
	);
}/**${comma}*/

export default ComponentsSeparatorHorizontal;
