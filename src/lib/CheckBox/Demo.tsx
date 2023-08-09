import { Fragment, useState } from "react"
import MoaCheckBox from ".";
import MoaTypography from "../Typography";

function ControlledCheckboxDemo() {
	const [state, setState] = useState(false);
	
	return (
		<Fragment>
			<MoaCheckBox checked={state} onChange={(e, checked) => setState(checked)} />
			<MoaTypography variant="body3">{`Current State of Checkbox is : ${state}`}</MoaTypography>
		</Fragment>
	);
}


function CheckBoxDemo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Uncontrolled</MoaTypography>
			<MoaCheckBox defaultChecked />
			<MoaCheckBox defaultChecked={false} />
			<MoaCheckBox indeterminate />
			<MoaTypography variant="h1">Disabled</MoaTypography>
			<MoaCheckBox disabled defaultChecked />
			<MoaCheckBox disabled defaultChecked={false} />
			<MoaCheckBox disabled indeterminate />
			<MoaTypography variant="h1">With Label</MoaTypography>
			<MoaCheckBox text="Checked" defaultChecked />
			<MoaCheckBox text="Unchecked" defaultChecked={false} />
			<MoaCheckBox text="Indeterminate" indeterminate />
			<MoaCheckBox text="Required" required />
			<MoaCheckBox text="Disabled" disabled />

			<MoaTypography variant="h1">Controlled</MoaTypography>
			<ControlledCheckboxDemo />
		</Fragment>
	)
}

export default CheckBoxDemo;