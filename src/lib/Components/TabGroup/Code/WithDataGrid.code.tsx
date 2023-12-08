import React from "react";/**${comma}*/
import { TabGroup, Tab, Panel, DataGrid, Typography, Stack } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTabGroupWithDataGrid = ({
	tabGroupValue,
	tabGroupOnChange,
	tab1DataGridColumns,
	tab1DataGridRows,
	tab2Title,
	tab2Description,
}: any) => {
	return (
    <Panel width={400} padding={8}>
      <TabGroup value={tabGroupValue} onChange={tabGroupOnChange}>
        <Tab value="Tab 1" label="First" />
        <Tab value="Tab 2" label="Second" />
        <Tab value="Tab 3" label="Third" disabled />
      </TabGroup>
      {tabGroupValue === "Tab 1" && (
        <Panel width="100%" height={200}>
          <DataGrid
            columns={tab1DataGridColumns}
            rows={tab1DataGridRows}
            rowHeight={30}
          />
        </Panel>
      )}
      {tabGroupValue === "Tab 2" && (
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

const _Use_ComponentsTabGroupWithDataGrid = () => {
	const [value, setValue] = React.useState('Tab 1');
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70, editable: true },
		{ field: 'firstName', headerName: 'First name', width: 130, editable: true },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
	];
	const rows = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Korea', firstName: 'Kim', age: 40 },
	];
	const title = `This is Title!`;
	const description = `This is Description!\nWrite your description here.`;

	return {
		tabGroupValue: value,
		tabGroupOnChnage: (e: any, newValue: string) => setValue(newValue),
		tab1DataGridColumns: columns,
		tab1DataGridRows: rows,
		tab2Title: title,
		tab2Description: description
	};
};/**${comma}*/

const _RealTime_ComponentsTabGroupWithDataGrid = () => {
	const {
		tabGroupValue: tabGroupValue_ComponentsTabGroupWithDataGrid,
		tabGroupOnChnage: tabGroupOnChnage_ComponentsTabGroupWithDataGrid,
		tab1DataGridColumns: tab1DataGridColumns_ComponentsTabGroupWithDataGrid,
		tab1DataGridRows: tab1DataGridRows_ComponentsTabGroupWithDataGrid,
		tab2Title: tab2Title_ComponentsTabGroupWithDataGrid,
		tab2Description: tab2Description_ComponentsTabGroupWithDataGrid,
	} = _Use_ComponentsTabGroupWithDataGrid();

	<ComponentsTabGroupWithDataGrid
		tabGroupValue={tabGroupValue_ComponentsTabGroupWithDataGrid}
		tabGroupOnChange={tabGroupOnChnage_ComponentsTabGroupWithDataGrid}
		tab1DataGridColumns={tab1DataGridColumns_ComponentsTabGroupWithDataGrid}
		tab1DataGridRows={tab1DataGridRows_ComponentsTabGroupWithDataGrid}
		tab2Title={tab2Title_ComponentsTabGroupWithDataGrid}
		tab2Description={tab2Description_ComponentsTabGroupWithDataGrid}
	/>;
}

const _Render_ComponentsTabGroupWithDataGrid = () => {
	const {
		tabGroupValue: tabGroupValue_ComponentsTabGroupWithDataGrid,
		tabGroupOnChnage: tabGroupOnChnage_ComponentsTabGroupWithDataGrid,
		tab1DataGridColumns: tab1DataGridColumns_ComponentsTabGroupWithDataGrid,
		tab1DataGridRows: tab1DataGridRows_ComponentsTabGroupWithDataGrid,
		tab2Title: tab2Title_ComponentsTabGroupWithDataGrid,
		tab2Description: tab2Description_ComponentsTabGroupWithDataGrid,
	} = _Use_ComponentsTabGroupWithDataGrid();

	return (
		<ComponentsTabGroupWithDataGrid 
			tabGroupValue={tabGroupValue_ComponentsTabGroupWithDataGrid}
			tabGroupOnChange={tabGroupOnChnage_ComponentsTabGroupWithDataGrid}
			tab1DataGridColumns={tab1DataGridColumns_ComponentsTabGroupWithDataGrid}
			tab1DataGridRows={tab1DataGridRows_ComponentsTabGroupWithDataGrid}
			tab2Title={tab2Title_ComponentsTabGroupWithDataGrid}
			tab2Description={tab2Description_ComponentsTabGroupWithDataGrid}
		/>
	)
};/**${comma}*/

export default _Render_ComponentsTabGroupWithDataGrid;
