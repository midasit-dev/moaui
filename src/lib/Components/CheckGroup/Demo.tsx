import { Fragment, useState } from "react"

import CheckGroup from ".";
import { Check, Typography } from "../../";

function ControlledCheckGroupDemo() {
	const [values, setValues] = useState({
		"test1" : true,
		"test2" : false,
		"test3" : false,
	});

	const handleCheckboxChange = (e: React.SyntheticEvent, checked: boolean) => {
		const event = e as React.ChangeEvent<HTMLInputElement>;
		
		setValues({
			...values,
			[event.target.name] : checked,
		})
	}

	return (
		<Fragment>
			<CheckGroup text="title">
				<Check name="test1" checked={values?.test1} onChange={handleCheckboxChange} />
				<Check name="test2" checked={values?.test2} onChange={handleCheckboxChange} />
				<Check name="test3" checked={values?.test3} onChange={handleCheckboxChange} />
			</CheckGroup>
			<Typography>
				{`Checked : ${Object.entries(values).reduce((acc, [key, value]) => acc + (value ? `${key} ` : ""), "")}`}
			</Typography>
		</Fragment>
	)
}

function CheckGroupDemo() {
	return (
		<Fragment>
			<Typography variant="h1">Uncontrolled</Typography>
			<CheckGroup text="title">
				<Check name="test1" />
				<Check name="test2" />
				<Check name="test3" />
			</CheckGroup>

			<Typography variant="h1">Controlled</Typography>
			<ControlledCheckGroupDemo />
		</Fragment>
	)
}

export default CheckGroupDemo;