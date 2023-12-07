import React from 'react'; /**${comma}*/
import { Panel, Stack, Typography, DropList } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsPanelTypographyDropList = ({ 
	typographyValue, 
	dropListItems, 
	dropListValue, 
	dropListOnChange 
}: any) => (
  <Panel width={300} padding={8}>
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between" 
      alignItems="center"
    >
      <Typography>{typographyValue}</Typography>
      <DropList 
        itemList={dropListItems} 
        width="150px" 
        defaultValue="Korean"
        value={dropListValue}
        onChange={dropListOnChange}
      />
    </Stack>
  </Panel>
) /**${comma}*/

const DoComponentsPanelTypographyTextField = () => {
	//DropList value
	const [value, setValue] = React.useState(1);

	//DropList Items
	const items = new Map<string, number>([ 
		['Korean', 1], 
		['American', 2], 
		['Asia', 3], 
		['Midas', 4] 
	]);

	return (
		<ComponentsPanelTypographyDropList 
			typographyValue="Title Text"
			dropListItems={items}
			dropListValue={value}
			dropListOnChange={(e: any) => setValue(e.target.value)}
		/>
	);
}; /**${comma}*/

export default DoComponentsPanelTypographyTextField;
