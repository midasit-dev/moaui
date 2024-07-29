import { useState } from "react"; /**${comma}*/
import { TabGroup, Tab } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsTabGroupVertical = () => {
  const [value, setValue] = useState("one");

  return (
    <TabGroup
      orientation="vertical"
      value={value}
      onChange={(event: React.SyntheticEvent, newValue: string) => setValue(newValue)}
      aria-label="tabs example"
    >
      <Tab value="one" label="Item One" />
      <Tab value="two" label="Item Two" />
      <Tab value="three" label="Item Three" disabled />
    </TabGroup>
  );
}; /**${comma}*/

export default ComponentsTabGroupVertical;
