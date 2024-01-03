import React from "react";/**${comma}*/
import { TabGroup, Tab, Panel, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsTabGroupWithTable = ({
	tab1TableHeadRow = [ 'header1', 'header2', 'header3', 'header4' ],/**${props-seperator}*/
	tab1TableDataRows = [
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
	],/**${props-seperator}*/
	tab2TableHeadRow = [ 'another1', 'another2', 'another3', 'another4' ],/**${props-seperator}*/
	tab2TableDataRows = [
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
		{ header1: <Typography variant="body1" center>text</Typography>, header2: <Typography variant="body1" center>text</Typography>, header3: <Typography variant="body1" center>text</Typography>, header4: <Typography variant="body1" center>text</Typography> },
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
    <Panel width={300}>
      <TabGroup value={value} onChange={(e: any, newValue: string) => setValue(newValue)}>
        <Tab value="Tab 1" label="First" />
        <Tab value="Tab 2" label="Second" />
      </TabGroup>
      {value === "Tab 1" && <CompTable headRow={tab1TableHeadRow} dataRows={tab1TableDataRows} />}
			{value === "Tab 2" && <CompTable headRow={tab2TableHeadRow} dataRows={tab2TableDataRows} />}
    </Panel>
  );
}/**${comma}*/

export default ComponentsTabGroupWithTable;
