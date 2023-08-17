import { useState } from 'react';
import MoaTabGroup from '.';
import MoaTab from '../Tab';

function Demo() {
  const [value, setValue] = useState('two');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

	return (
		<>
			<MoaTabGroup
				value={value}
				onChange={handleChange}
				aria-label="tabs example"
			>
				<MoaTab value="one" label="Item One" />
				<MoaTab value="two" label="Item Two" />
				<MoaTab value="three" label="Item Three" disabled />
			</MoaTabGroup>
		</>
	);
}

export default Demo;