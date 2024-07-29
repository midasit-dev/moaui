import React from "react";/**${comma}*/
import { TabGroup, Tab, Panel, DataGrid, Typography, Stack } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsTabGroupWithDataGrid = ({
	tab1DataGridColumns = [
		{ field: 'id', headerName: 'ID', width: 70, editable: true },
		{ field: 'firstName', headerName: 'First name', width: 130, editable: true },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
	],/**${props-separator}*/
	tab1DataGridRows = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Korea', firstName: 'Kim', age: 40 },
	],/**${props-separator}*/
	tab2Title = `This is Title!`,/**${props-separator}*/
	tab2Description = `This is Description!\nWrite your description here.`,/**${props-separator}*/
}: any) => {
	const [value, setValue] = React.useState('Tab 1');

	return (
    <Panel width={400} padding={8}>
      <TabGroup value={value} onChange={(e: any, newValue: string) => setValue(newValue)}>
        <Tab value="Tab 1" label="First" />
        <Tab value="Tab 2" label="Second" />
        <Tab value="Tab 3" label="Third" disabled />
      </TabGroup>
      {value === "Tab 1" && (
        <Panel width="100%" height={200}>
          <DataGrid
            columns={tab1DataGridColumns}
            rows={tab1DataGridRows}
            rowHeight={30}
          />
        </Panel>
      )}
      {value === "Tab 2" && (
        <Panel width="100%" height={160} paddingY="20px">
          <Stack direction="column" marginLeft="25px" spacing={1}>
            <Typography variant="h1">{tab2Title}</Typography>
            <Typography paddingLeft="10px">{tab2Description}</Typography>
          </Stack>
        </Panel>
      )}
    </Panel>
  );
}/**${comma}*/

export default ComponentsTabGroupWithDataGrid;
