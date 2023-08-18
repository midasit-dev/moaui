import React from "react";
import TextField from './index';

function Demo() {
	return (
		<React.Fragment>
			<TextField defaultValue={'TextField Demo'} />
			<br/><br/>
			<TextField defaultValue={'error left title'} title="left" titlePosition="left" error={true}/>
			<br/><br/>
			<TextField defaultValue={'disbled label title'} title="label" titlePosition="label" disabled={true}/>
			<br/><br/>
			<TextField defaultValue={'TextField right title'} title="right" titlePosition="right"/>
			<br/><br/>
			<TextField placeholder={'placeholder'} />
		</React.Fragment>
	);
}

export default Demo;