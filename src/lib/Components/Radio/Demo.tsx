import { Fragment, useState, useCallback } from "react"
import Radio from "."
import { Typography, Panel } from "../../";

function RadioWithSelectionDemo() {
	const [selected, setSelected] = useState('a');
	const radioSet = ['a', 'b', 'c'];

	const handleOnChange = useCallback((e: React.SyntheticEvent, checked: boolean) => {
		const event = e as React.ChangeEvent<HTMLInputElement>;
		checked && setSelected(event.target.value);
	}, []);

	return (
		<Panel>
			<Typography>Simple Radio Demo</Typography>
			<Typography>{`Selected : ${selected}`}</Typography>
			<div style={{display: "flex", flexDirection: "row"}}>
				{
					radioSet?.map(
						(value) =>
							<Radio
								checked={selected===value}
								key={value}
								onChange={handleOnChange}
								value={value}
								name={value}
							/>)
				}
			</div>
		</Panel>
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
		<Panel>
			<Typography>Simple Radio Demo with Disabled radio button</Typography>
			<Typography>{`Selected : ${selected}`}</Typography>
			<div style={{display: "flex", flexDirection: "row"}}>
				{
					radioSet?.map(
						(value) =>
							<Radio
								checked={selected===value}
								key={value}
								onChange={handleOnChange}
								value={value}
								name={value}
							/>
					)
				}
				<Radio value="d" name="d" disabled />
			</div>
		</Panel>
	);
}

function RadioDemo() {
	return (
		<Fragment>
			<Typography>Checked</Typography>
			<Radio checked />
			<Typography>Checked with Text</Typography>
			<Radio checked name="Text" />
			<Typography>Unchecked</Typography>
			<Radio checked={false} />
			<Typography>Unchecked with Text</Typography>
			<Radio checked={false} name="Text" />
			<Typography>Disabled Checked</Typography>
			<Radio disabled checked />
			<Typography>Disabled Checked Text</Typography>
			<Radio disabled checked name="Text" />
			<Typography>Disabled Unchecked</Typography>
			<Radio disabled checked={false} />
			<Typography>Disabled Unchecked Text</Typography>
			<Radio disabled checked={false} name="Text" />
			
			<Typography variant="h1">Usages</Typography>
			<RadioWithSelectionDemo />
			<RadioWithValueSelectionAndDisabledDemo />
		</Fragment>
	)
}

export default RadioDemo;