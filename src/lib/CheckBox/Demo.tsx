import { Fragment, useState } from "react"
import MoaCheckbox from ".";
import MoaTypography from "../Typography";

function ControlledCheckboxDemo() {
	const [state, setState] = useState(false);
	
	return (
		<Fragment>
			<MoaCheckbox checked={state} onChange={(e, checked) => setState(checked)} />
			<MoaTypography variant="body3">{`Current State of Checkbox is : ${state}`}</MoaTypography>
		</Fragment>
	);
}

function CheckboxDemo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Uncontrolled</MoaTypography>
			<MoaCheckbox defaultChecked />
			<MoaCheckbox defaultChecked={false} />
			<MoaCheckbox indeterminate />
			<MoaTypography variant="h1">Disabled</MoaTypography>
			<MoaCheckbox disabled defaultChecked />
			<MoaCheckbox disabled defaultChecked={false} />
			<MoaCheckbox disabled indeterminate />
			<MoaTypography variant="h1">With Label</MoaTypography>
			<MoaCheckbox text="Checked" defaultChecked />
			<MoaCheckbox text="Unchecked" defaultChecked={false} />
			<MoaCheckbox text="Indeterminate" indeterminate />
			<MoaCheckbox text="Required" required />
			<MoaCheckbox text="Disabled" disabled />

			<MoaTypography variant="h1">Controlled</MoaTypography>
			<ControlledCheckboxDemo />
		</Fragment>
	)
}

export default CheckboxDemo;