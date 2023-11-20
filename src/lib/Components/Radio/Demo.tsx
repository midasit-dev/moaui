import { Fragment, useState, useCallback } from "react"
import MoaRadio from "./index"
import MoaTypography from "../Typography";
import MoaPanel from "../Panel";

function RadioWithSelectionDemo() {
	const [selected, setSelected] = useState('a');
	const radioSet = ['a', 'b', 'c'];

	const handleOnChange = useCallback((e: React.SyntheticEvent, checked: boolean) => {
		const event = e as React.ChangeEvent<HTMLInputElement>;
		checked && setSelected(event.target.value);
	}, []);

	return (
		<MoaPanel>
			<MoaTypography>Simple Radio Demo</MoaTypography>
			<MoaTypography>{`Selected : ${selected}`}</MoaTypography>
			<div style={{display: "flex", flexDirection: "row"}}>
				{
					radioSet?.map(
						(value) =>
							<MoaRadio
								checked={selected===value}
								key={value}
								onChange={handleOnChange}
								value={value}
								name={value}
							/>)
				}
			</div>
		</MoaPanel>
	);
}

function RadioWithValueSelectionAndDisabledDemo() {
	const [selected, setSelected] = useState('a');
	const radioSet = ['a', 'b', 'c'];

	const handleOnChange = useCallback((e: React.SyntheticEvent, checked: boolean) => {
		const event = e as React.ChangeEvent<HTMLInputElement>;
		checked && setSelected(event.target.value);
	}, []);

	return (
		<MoaPanel>
			<MoaTypography>Simple Radio Demo with Disabled radio button</MoaTypography>
			<MoaTypography>{`Selected : ${selected}`}</MoaTypography>
			<div style={{display: "flex", flexDirection: "row"}}>
				{
					radioSet?.map(
						(value) =>
							<MoaRadio
								checked={selected===value}
								key={value}
								onChange={handleOnChange}
								value={value}
								name={value}
							/>
					)
				}
				<MoaRadio value="d" name="d" disabled />
			</div>
		</MoaPanel>
	);
}

function RadioDemo() {
	return (
		<Fragment>
			<MoaTypography>Checked</MoaTypography>
			<MoaRadio checked />
			<MoaTypography>Checked with Text</MoaTypography>
			<MoaRadio checked name="Text" />
			<MoaTypography>Unchecked</MoaTypography>
			<MoaRadio checked={false} />
			<MoaTypography>Unchecked with Text</MoaTypography>
			<MoaRadio checked={false} name="Text" />
			<MoaTypography>Disabled Checked</MoaTypography>
			<MoaRadio disabled checked />
			<MoaTypography>Disabled Checked Text</MoaTypography>
			<MoaRadio disabled checked name="Text" />
			<MoaTypography>Disabled Unchecked</MoaTypography>
			<MoaRadio disabled checked={false} />
			<MoaTypography>Disabled Unchecked Text</MoaTypography>
			<MoaRadio disabled checked={false} name="Text" />
			
			<MoaTypography variant="h1">Usages</MoaTypography>
			<RadioWithSelectionDemo />
			<RadioWithValueSelectionAndDisabledDemo />
		</Fragment>
	)
}

export default RadioDemo;