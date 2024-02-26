import { useState } from "react";/**${comma}*/
import { TabGroup, Tab } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTabGroupHorizontal = () => {
	const [value, setValue] = useState('one');

	return (
			<TabGroup
				value={value}
				onChange={(event: React.SyntheticEvent, newValue: string) => setValue(newValue)}
				aria-label="horizontal tabs example"
			>
				<Tab value="Tab 1" label="Item One" />
				<Tab value="Tab 2" label="Item Two" />
				<Tab value="Tab 3" label="Item Three" disabled />
			</TabGroup>
	);
}/**${comma}*/

export default ComponentsTabGroupHorizontal;
