import { useState } from "react";/**${comma}*/
import { GuideBox, Panel, TabGroup, Tab } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsTabGroupSizeControl = () => {
		/**
	 * About properties to controll size.
	 * 
	 * [Tab Props]
	 * width, height, minWidth, minHeight, fontSize(small, medium, large)
	 * 
	 * [TabGroup Props]
	 * width, height, minWidth, minHeight, tabProps(Tab Props)
	 */

		const [value1, setValue1] = useState('Tab 1');
		const [value2, setValue2] = useState('Tab 1');
	
		return (
			<GuideBox spacing={2}>
				<Panel variant='shadow2' padding={0}>
					<TabGroup
						value={value1}
						onChange={(event: React.SyntheticEvent, newValue: string) => setValue1(newValue)}
						aria-label="horizontal tabs example"
						minWidth={30}
						minHeight={28}
						tabProps={{
							minWidth: 65,
							minHeight: 28,
							fontSize: 'small'
						}}
					>
						<Tab value="Tab 1" label="section1" />
						<Tab value="Tab 2" label="section2" />
					</TabGroup>
				</Panel>
	
				<Panel variant='shadow2' padding={0}>
					<TabGroup
						value={value2}
						onChange={(event: React.SyntheticEvent, newValue: string) => setValue2(newValue)}
						aria-label="horizontal tabs example"
					>
						<Tab value="Tab 1" label="section1" minWidth={100} minHeight={50} fontSize={'medium'} />
						<Tab value="Tab 2" label="section2" minWidth={100} minHeight={50} fontSize={'medium'} />
					</TabGroup>
				</Panel>
			</GuideBox>
	);
}/**${comma}*/

export default ComponentsTabGroupSizeControl;
