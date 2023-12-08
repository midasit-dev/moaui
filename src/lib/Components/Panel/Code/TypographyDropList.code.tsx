import React from 'react'; /**${comma}*/
import { Panel, Stack, Typography, DropList } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsPanelTypographyDropList = ({ 
	title = "Title Text",/**${props-seperator}*/
	items = new Map<string, number>([ 
		['Korean', 1],
		['American', 2],
		['Asia', 3],
		['Midas', 4]
	]),/**${props-seperator}*/
}: any) => {
	const [values, setValues] = React.useState({
    selected: 1,
    items: items
  });

	return (
		<Panel width={300} padding={8}>
			<Stack 
				direction="row" 
				spacing={2} 
				justifyContent="space-between" 
				alignItems="center"
			>
				<Typography>{title}</Typography>
				<DropList 
					itemList={values.items} 
					width="150px" 
					defaultValue="Korean"
					value={values.selected}
					onChange={(e: any) => setValues({...values, selected: Number(e.target.value)})}
				/>
			</Stack>
		</Panel>
	);
}/**${comma}*/

export default ComponentsPanelTypographyDropList;