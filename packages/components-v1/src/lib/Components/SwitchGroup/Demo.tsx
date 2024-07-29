import { Fragment, useState } from "react"
import SwitchGroup from ".";
import { Switch, Typography } from "../../";

function ControlledCheckboxGroupDemo() {
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
			<SwitchGroup text="title">
				<Switch label="test1" checked={values?.test1} onChange={handleCheckboxChange} />
				<Switch label="test2" checked={values?.test2} onChange={handleCheckboxChange} />
				<Switch label="test3" checked={values?.test3} onChange={handleCheckboxChange} />
			</SwitchGroup>
			<Typography>
				{`Checked : ${Object.entries(values).reduce((acc, [key, value]) => acc + (value ? `${key} ` : ""), "")}`}
			</Typography>
		</Fragment>
	)
}

function CheckboxGroupDemo() {
	return (
		<Fragment>
			<Typography variant="h1">Uncontrolled</Typography>
			<SwitchGroup text="title">
				<Switch label="test1" />
				<Switch label="test2" />
				<Switch label="test3" />
			</SwitchGroup>

			<Typography variant="h1">Controlled</Typography>
			<ControlledCheckboxGroupDemo />
		</Fragment>
	)
}

export default CheckboxGroupDemo;