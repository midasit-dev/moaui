import { Fragment, useState } from "react"
import MoaCheck from ".";
import MoaTypography from "../Typography";

function ControlledCheckboxDemo() {
	const [state, setState] = useState(false);
	
	return (
		<Fragment>
			<MoaCheck checked={state} onChange={(e, checked) => setState(checked)} />
			<MoaTypography variant="body3">{`Current State of Checkbox is : ${state}`}</MoaTypography>
		</Fragment>
	);
}

function CheckDemo() {
	return (
		<Fragment>
			<MoaTypography variant="h1">Uncontrolled</MoaTypography>
			<MoaCheck defaultChecked />
			<MoaCheck defaultChecked={false} />
			<MoaCheck indeterminate />
			<MoaTypography variant="h1">Disabled</MoaTypography>
			<MoaCheck disabled defaultChecked />
			<MoaCheck disabled defaultChecked={false} />
			<MoaCheck disabled indeterminate />
			<MoaTypography variant="h1">With Label</MoaTypography>
			<MoaCheck name="Checked" defaultChecked />
			<MoaCheck name="Unchecked" defaultChecked={false} />
			<MoaCheck name="Indeterminate" indeterminate />
			<MoaCheck name="Required" required />
			<MoaCheck name="Disabled" disabled />

			<MoaTypography variant="h1">Controlled</MoaTypography>
			<ControlledCheckboxDemo />
		</Fragment>
	)
}

export default CheckDemo;