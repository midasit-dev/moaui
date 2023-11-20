import { Fragment } from 'react';
import Stack from '.';
import { Typography } from '../../';

function RowDemo() {
	return (
		<Fragment>
			<Typography variant="h1">Row Demo</Typography>
			<Stack direction="row" spacing={2}>
				<Typography>Row 1</Typography>
				<Typography>Row 2</Typography>
			</Stack>
		</Fragment>
	)
}

function ColumnDemo() {
	return (
		<Fragment>
			<Typography variant="h1">Column Demo</Typography>
			<Stack direction="column" spacing={2}>
				<Typography>Column 1</Typography>
				<Typography>Column 2</Typography>
			</Stack>
		</Fragment>
	)
}

function Demo() {
	return (
		<Fragment>
			<RowDemo />
			<hr />
			<ColumnDemo />
		</Fragment>
	)
}

export default Demo;