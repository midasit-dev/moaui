import React from "react";/**${comma}*/
import { TabGroup, Tab, Panel, Table, TableHead, TableRow, TableCell, TableBody, Typography, DropList, Check } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTabGroupWithDataGrid = ({
	tabGroupValue,
	tabGroupOnChange,
	tab1TableHeadRow,
	tab1TableDataRows,
	tab2TableHeadRow,
	tab2TableDataRows,
}: any) => {
	const CompTable = ({ headRow, dataRows }: any) => {
		return (
			<Table>
				<TableHead>
					<TableRow>
						{headRow.map((item: any, index: number) => (
							<TableCell key={index}>{item}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{dataRows.map((item: any, index: number) => (
						<TableRow key={index}>
							{Object.keys(item).map((key: any, index: number) => (
								<TableCell key={index}>{item[key]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}

	return (
    <Panel width={400} height={300} padding={2} variant="shadow">
      <TabGroup value={tabGroupValue} onChange={tabGroupOnChange}>
        <Tab value="Tab 1" label="First" />
        <Tab value="Tab 2" label="Second" />
        <Tab value="Tab 3" label="Third" disabled />
      </TabGroup>
      {tabGroupValue === "Tab 1" && <CompTable headRow={tab1TableHeadRow} dataRows={tab1TableDataRows} />}
			{tabGroupValue === "Tab 2" && <CompTable headRow={tab2TableHeadRow} dataRows={tab2TableDataRows} />}
    </Panel>
  );
}/**${comma}*/

const DoComponentsTabGroupWithDataGrid = () => {
	//TabGroup value
	const [value, setValue] = React.useState('Tab 1');

	//Tab 1 - Table values
	const CompCheck = () => {
		const [checked, setChecked] = React.useState(false);
		return (
			<Check 
				checked={checked}
				onChange={(e: any) => setChecked(e.target.checked)}
			/>
		);
	}

	const CompDropList = () => {
		const [value, setValue] = React.useState(1);
		const items = new Map<string, number>([ ['Korean', 1], ['American', 2], ['Asia', 3], ['Midas', 4] ]);
		return (
			<DropList 
				itemList={items} 
				width="100px" 
				defaultValue="Korean"
				value={value}
				onChange={(e: any) => setValue(e.target.value)}
			/>
		);
	}

	const headRow1 = [ 'header1', 'header2', 'header3', 'header4' ];
	const dataRows1 = [
		{ header1: 1, header2: <CompCheck />, header3: <CompDropList />, header4: <Typography>Text</Typography> },
		{ header1: 2, header2: <CompCheck />, header3: <CompDropList />, header4: <Typography>Text</Typography> },
		{ header1: 3, header2: <CompCheck />, header3: <CompDropList />, header4: <Typography>Text</Typography> },
		{ header1: 4, header2: <CompCheck />, header3: <CompDropList />, header4: <Typography>Text</Typography> },
	];
	const headRow2 = [ 'another1', 'another2', 'another3', 'another4' ];
	const dataRows2 = [
		{ another1: <CompCheck />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
		{ another1: <CompCheck />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
		{ another1: <CompCheck />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
		{ another1: <CompCheck />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
	];

	return (
		<ComponentsTabGroupWithDataGrid 
			tabGroupValue={value}
			tabGroupOnChange={(e: any, newValue: string) => setValue(newValue)}
			tab1TableHeadRow={headRow1}
			tab1TableDataRows={dataRows1}
			tab2TableHeadRow={headRow2}
			tab2TableDataRows={dataRows2}
		/>
	)
}/**${comma}*/

export default DoComponentsTabGroupWithDataGrid;
