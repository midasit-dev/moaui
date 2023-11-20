import { useState } from "react"
import MoaRadioButtonGroup from ".";
import MoaRadioButton from "../Radio";
import MoaTypography from "../Typography";

function RadioGroupUncontrolledDemo() {
	return (
		<MoaRadioButtonGroup defaultValue="Value 1">
			<MoaRadioButton name="Value 1" value="Value 1" />
			<MoaRadioButton name="Value 2" value="Value 2" />
		</MoaRadioButtonGroup>	
	);
}

function RadioGroupControlledDemo() {
	const [state, setState] = useState("Value 1");

	const onChange = (event : React.ChangeEvent, state: any) => {
		setState(state);
	}

	return (
		<MoaRadioButtonGroup onChange={onChange} value={state}>
			<MoaRadioButton name="Value 1" value="Value 1" />
			<MoaRadioButton name="Value 2" value="Value 2" />
		</MoaRadioButtonGroup>	
	);
}

function RadioGroupLabelDemo() {
	const [state, setState] = useState("Value 1");

	const onChange = (event : React.ChangeEvent, state: any) => {
		setState(state);
	}

	return (
		<MoaRadioButtonGroup onChange={onChange} value={state} text="Header Text">
			<MoaRadioButton name="Value 1" value="Value 1" />
			<MoaRadioButton name="Value 2" value="Value 2" />
		</MoaRadioButtonGroup>	
	);
}

function RadioGroupLabelWithDisabledItemDemo() {
	const [state, setState] = useState("Value 1");

	const onChange = (event : React.ChangeEvent, state: any) => {
		setState(state);
	}

	return (
		<MoaRadioButtonGroup onChange={onChange} value={state} text="Header Text">
			<MoaRadioButton name="Value 1" value="Value 1" />
			<MoaRadioButton name="Value 2" value="Value 2" />
			<MoaRadioButton name="Value 3" value="Value 3" disabled />
		</MoaRadioButtonGroup>	
	);
}

function RadioGroupDemo() {
	return (
		<div style={{display: "flex", flexDirection: "column"}}>
			<MoaTypography>Uncontrolled Demo</MoaTypography>
			<RadioGroupUncontrolledDemo />
			<MoaTypography>Controlled Demo</MoaTypography>
			<RadioGroupControlledDemo />
			<MoaTypography>Controlled Demo with Header(title) text</MoaTypography>
			<RadioGroupLabelDemo />
			<MoaTypography>Controlled Demo with Header(title) text and disabled item.</MoaTypography>
			<RadioGroupLabelWithDisabledItemDemo />
		</div>
	)
}

export default RadioGroupDemo;