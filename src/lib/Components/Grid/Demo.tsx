import { Fragment } from 'react';

import Grid from '.';
import { Typography } from '../../';

function Demo() {
	return (
		<Fragment>
			<Typography variant="h1">Grid Demo</Typography>
			<Typography></Typography>
			<Grid container>
				<Grid item xs={6}>
					<Typography>Grid item 1</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>Grid item 2</Typography>
				</Grid>
			</Grid>
		</Fragment>
	)
}

export default Demo;