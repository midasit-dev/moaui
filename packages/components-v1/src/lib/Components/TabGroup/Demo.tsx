import React, { useState } from 'react';

import TabGroup from '.';
import { Tab } from "../../";

function Demo() {
  const [value, setValue] = useState('two');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

	return (
		<>
			<TabGroup
				value={value}
				onChange={handleChange}
				aria-label="tabs example"
			>
				<Tab value="one" label="Item One" />
				<Tab value="two" label="Item Two" />
				<Tab value="three" label="Item Three" disabled />
			</TabGroup>
			<TabGroup
				orientation='vertical'
				value={value}
				onChange={handleChange}
				aria-label="tabs example"
			>
				<Tab value="one" label="Item One" />
				<Tab value="two" label="Item Two" />
				<Tab value="three" label="Item Three" disabled />
			</TabGroup>
			<TabGroup
				orientation='vertical'
				indicator='left'
				value={value}
				onChange={handleChange}
				aria-label="tabs example"
			>
				<Tab value="one" label="Item One" />
				<Tab value="two" label="Item Two" />
				<Tab value="three" label="Item Three" disabled />
			</TabGroup>
		</>
	);
}

export default Demo;