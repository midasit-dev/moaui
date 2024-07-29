import { Grid, Panel, Typography } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsGridItems = () => {
	return (
		<Panel width="400px">
			<Typography variant="h1" marginBottom="10px">Row Direction</Typography>
			<Grid container direction='row'>
				<Grid item xs={3}>
					<Typography>Grid item 1</Typography>
				</Grid>
				<Grid item xs={3}>
					<Typography>Grid item 2</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography>Grid item 3</Typography>
				</Grid>
			</Grid>
			<Typography variant="h1" marginTop="30px" marginBottom="10px">Column Direction</Typography>
			<Grid container direction='column'>
				<Grid item xs={3}>
					<Typography>Grid item 1</Typography>
				</Grid>
				<Grid item xs={3}>
					<Typography>Grid item 2</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography>Grid item 3</Typography>
				</Grid>
			</Grid>
		</Panel>
	);
}/**${comma}*/

export default ComponentsGridItems;
