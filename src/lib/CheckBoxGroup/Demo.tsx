import { Fragment, useState } from "react"
import MoaCheckboxGroup from ".";
import MoaCheckbox from "../Checkbox";
import MoaTypography from "../Typography";

function ControlledCheckboxGroupDemo() {
	const [values, setValues] = useState({
		"test1" : true,
		"test2" : false,
		"test3" : false,
	});

	const handleCheckboxChange = (e: React.SyntheticEvent, checked: boolean) => {
		const event = e as React.ChangeEvent<HTMLInputElement>;
		console.log(event);
		
		setValues({
			...values,
			[event.target.name] : checked,
		})
	}

	return (
		<Fragment>
			<MoaCheckboxGroup text="title">
				<MoaCheckbox name="test1" checked={values?.test1} onChange={handleCheckboxChange} />
				<MoaCheckbox name="test2" checked={values?.test2} onChange={handleCheckboxChange} />
				<MoaCheckbox name="test3" checked={values?.test3} onChange={handleCheckboxChange} />
			</MoaCheckboxGroup>
			<MoaTypography>
				{`Checked : ${Object.entries(values).reduce((acc, [key, value]) => acc + (value ? `${key} ` : ""), "")}`}
			</MoaTypography>
		</Fragment>
	)
}

function CheckboxGroupDemo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Uncontrolled</MoaTypography>
			<MoaCheckboxGroup text="title">
				<MoaCheckbox name="test1" />
				<MoaCheckbox name="test2" />
				<MoaCheckbox name="test3" />
			</MoaCheckboxGroup>

			<MoaTypography variant="h1">Controlled</MoaTypography>
			<ControlledCheckboxGroupDemo />
		</Fragment>
	)
}

export default CheckboxGroupDemo;