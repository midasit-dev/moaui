import { Fragment } from 'react';
import MoaGrid from '.';
import MoaTypography from '../Typography';

function Demo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Grid Demo</MoaTypography>
			<MoaTypography></MoaTypography>
			<MoaGrid container>
				<MoaGrid item xs={6}>
					<MoaTypography>Grid item 1</MoaTypography>
				</MoaGrid>
				<MoaGrid item xs={6}>
					<MoaTypography>Grid item 2</MoaTypography>
				</MoaGrid>
			</MoaGrid>
		</Fragment>
	)
}

export default Demo;