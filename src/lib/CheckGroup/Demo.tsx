import { Fragment, useState } from "react"
import MoaCheckGroup from ".";
import MoaCheck from "../Check";
import MoaTypography from "../Typography";

function ControlledCheckGroupDemo() {
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
			<MoaCheckGroup text="title">
				<MoaCheck name="test1" checked={values?.test1} onChange={handleCheckboxChange} />
				<MoaCheck name="test2" checked={values?.test2} onChange={handleCheckboxChange} />
				<MoaCheck name="test3" checked={values?.test3} onChange={handleCheckboxChange} />
			</MoaCheckGroup>
			<MoaTypography>
				{`Checked : ${Object.entries(values).reduce((acc, [key, value]) => acc + (value ? `${key} ` : ""), "")}`}
			</MoaTypography>
		</Fragment>
	)
}

function CheckGroupDemo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Uncontrolled</MoaTypography>
			<MoaCheckGroup text="title">
				<MoaCheck name="test1" />
				<MoaCheck name="test2" />
				<MoaCheck name="test3" />
			</MoaCheckGroup>

			<MoaTypography variant="h1">Controlled</MoaTypography>
			<ControlledCheckGroupDemo />
		</Fragment>
	)
}

export default CheckGroupDemo;