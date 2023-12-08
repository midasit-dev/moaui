import React from "react";/**${comma}*/
import { TabGroup, Tab, Panel, Table, TableHead, TableRow, TableCell, TableBody, Typography, DropList, Check } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTabGroupWithDataGrid = ({
	tab1TableHeadRow = [ 'header1', 'header2', 'header3', 'header4' ],/**${props-seperator}*/
	tab1TableDataRows = [
		{ header1: 1, header2: <Check />, header3: <DropList />, header4: <Typography>Text</Typography> },
		{ header1: 2, header2: <Check />, header3: <DropList />, header4: <Typography>Text</Typography> },
		{ header1: 3, header2: <Check />, header3: <DropList />, header4: <Typography>Text</Typography> },
		{ header1: 4, header2: <Check />, header3: <DropList />, header4: <Typography>Text</Typography> },
	],/**${props-seperator}*/
	tab2TableHeadRow = [ 'another1', 'another2', 'another3', 'another4' ],/**${props-seperator}*/
	tab2TableDataRows = [
		{ another1: <Check />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
		{ another1: <Check />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
		{ another1: <Check />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
		{ another1: <Check />, another2: <Typography>Text1</Typography>, another3: <Typography>Text2</Typography>, another4: <Typography>Text3</Typography> },
	],/**${props-seperator}*/
}: any) => {
	const [value, setValue] = React.useState('Tab 1');
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
      <TabGroup value={value} onChange={(e: any, newValue: string) => setValue(newValue)}>
        <Tab value="Tab 1" label="First" />
        <Tab value="Tab 2" label="Second" />
        <Tab value="Tab 3" label="Third" disabled />
      </TabGroup>
      {value === "Tab 1" && <CompTable headRow={tab1TableHeadRow} dataRows={tab1TableDataRows} />}
			{value === "Tab 2" && <CompTable headRow={tab2TableHeadRow} dataRows={tab2TableDataRows} />}
    </Panel>
  );
}/**${comma}*/

export default ComponentsTabGroupWithDataGrid;
