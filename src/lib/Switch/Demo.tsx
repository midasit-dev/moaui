import { Fragment } from 'react';
import Switch from './index';

function Demo() {
	return (
		<Fragment>
			<Switch />
			<Switch label="label test" />
			<Switch checked={false} label="only false" />
			<Switch checked={true} label="only true" />
			
			<Switch disabled />
			<Switch disabled label="label test" />
			<Switch disabled checked={false} label="only false" />
			<Switch disabled checked={true} label="only true" />
		</Fragment>
	);
}

export default Demo;