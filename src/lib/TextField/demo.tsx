import React from "react";
import TextField from './index';

function Demo() {
	return (
		<React.Fragment>
			<TextField defaultValue={'TextField Demo'} />
			<TextField defaultValue={'TextField left title'} title="left" titlePosition="left"/>
			<TextField defaultValue={'TextField label title'} title="label" titlePosition="label"/>
			<TextField defaultValue={'TextField right title'} title="right" titlePosition="right"/>
		</React.Fragment>
	);
}

export default Demo;