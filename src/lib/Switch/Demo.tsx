import { Fragment } from 'react';
import Switch from './index';

function Demo() {
	return (
		<Fragment>
			<Switch />
			<Switch name="label test" />
			<Switch checked={false} name="only false" />
			<Switch checked={true} name="only true" />
			
			<Switch disabled />
			<Switch disabled name="label test" />
			<Switch disabled checked={false} name="only false" />
			<Switch disabled checked={true} name="only true" />
		</Fragment>
	);
}

export default Demo;