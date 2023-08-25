import React from "react";
import TextField from './index';
import MoaStack from "../Stack";

function Demo() {
	const [value, setValue] = React.useState('TextField Demo');

	function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	}

	return (
		<React.Fragment>
			<TextField defaultValue={'TextField Demo'} onChange={onChangeHandler}/>
			<br/><br/>
			<TextField defaultValue={'error left title'} title="left" titlePosition="left" error={true}/>
			<br/><br/>
			<TextField defaultValue={'disbled label title'} title="label" titlePosition="label" disabled={true}/>
			<br/><br/>
			<TextField defaultValue={'TextField right title'} title="right" titlePosition="right"/>
			<br/><br/>
			<TextField placeholder={'placeholder'} />
			<br/><br/>
			<TextField placeholder={'value'} value="valueTest"/>
			<TextField placeholder={'value'} title="label" titlePosition="label" width="100%" value="width Test"/>
		</React.Fragment>
	);
}

export default Demo;