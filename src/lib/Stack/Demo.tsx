import { Fragment } from 'react';
import MoaStack from '.';
import MoaTypography from '../Typography';

function RowDemo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Row Demo</MoaTypography>
			<MoaStack direction="row" spacing={2}>
				<MoaTypography>Row 1</MoaTypography>
				<MoaTypography>Row 2</MoaTypography>
			</MoaStack>
		</Fragment>
	)
}

function ColumnDemo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Column Demo</MoaTypography>
			<MoaStack direction="column" spacing={2}>
				<MoaTypography>Column 1</MoaTypography>
				<MoaTypography>Column 2</MoaTypography>
			</MoaStack>
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