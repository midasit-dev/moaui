import React, { useState } from 'react';
import { Dialog, Stack, ChartLine, GuideBox, Button, Typography, DropList, IconButton, Icon, TabGroup, Tab, Panel, Table, TableHead, TableRow, TableCell, TableBody } from "@midasit-dev/moaui";

const ComponentsDialogHelpIconButton = () => {
	const [open, setOpen] = React.useState(false);

	const HelpDialog = (props: any) => {
		return (
			<Dialog
				open={props.open}
				setOpen={props.setOpen}
				json={{
					type: 'help',
					data: {
						titleText: 'Dialog Title Text',
						body: [
							{
								type: 'single',
								title: 'Single Title',
								content: 'Single Content'
							},
							{
								type: 'multiple',
								title: 'MulPtiple Title',
								content: [
									'Plane Text',
									<Typography>Typography Text</Typography>,
									<Button>Default Button</Button>,
									<Button width="400px" color="negative">300px Button</Button>,
									<Button width="100%">100% Button</Button>,
								]
							},
							{
								type: 'single',
								title: 'Button Text',
								content: 
									<Stack direction='row' spacing={1} alignItems="center">
										<Button>A Button</Button>
										<Typography>A Button Description</Typography>
									</Stack>
							}
						]
					}
				}}
			/>
		);
	}

	return (
		<>
			<IconButton transparent onClick={() => setOpen(true)}>
				<Icon iconName="Help" />
			</IconButton>
			<HelpDialog open={open} setOpen={setOpen} />
		</>
	)
}

const ComponentsChartLineAxisPointSize = () => {
	return (
		<ChartLine 
			data={[
				{
					'id': 'AASHTO_HeatingG',
					'color': '#f47560',
					'data': [
							{ "x": -5.9701, "y": 0.0 },
							{ "x": -4.2611, "y": -30.0 },
							{ "x": -0.2734, "y": -100.0 },
							{ "x": 0.4872, "y": -230.0 },
							{ "x": 0.6042, "y": -250.0 },
							{ "x": 0.8090, "y": -285.0 },
							{ "x": 0.8968, "y": -300.0 },
							{ "x": 1.4234, "y": -390.0 },
							{ "x": 1.4819, "y": -400.0 },
							{ "x": 1.4723, "y": -410.0 },
							{ "x": 1.2408, "y": -650.0 },
							{ "x": 1.2023, "y": -690.0 },
							{ "x": 0.3537, "y": -1570.0 },
							{ "x": 0.0162, "y": -1920.0 },
							{ "x": -0.0899, "y": -2030.0 },
							{ "x": -0.1525, "y": -2095.0 },
							{ "x": -0.1574, "y": -2100.0 },
							{ "x": -0.1767, "y": -2120.0 },
							{ "x": -0.1863, "y": -2130.0 },
							{ "x": -1.4015, "y": -2330.0 }
					],
				},
				{
					'id': 'Girder',
					'color': '#333333',
					'data': [
						{ 'x': 0.0, 'y': 0.0 },
						{ 'x': 0.0, 'y': -2330.0 },
					],
				},
			]}
			axisTop
			axisTopTickValues={4}
			axisTopTickRotation={-30}
			axisTopDecimals={2}
			axisRight
			axisRightTickValues={4}
			axisRightTickRotation={-30}
			axisRightDecimals={2}
			width={250}
			height={400}
			pointSize={0}
		/>
	);
}

const ComponentsChartLineAxisTopRight = () => {
	return (
		<ChartLine 
			data={[
				{
					'id': 'TempHeating',
					'color': '#f47560',
					'data': [
						{ 'x': 23.0, 'y': 0.0 },
						{ 'x': 6.0, 'y': -100.0 },
						{ 'x': 0.0, 'y': -400.0 },
						{ 'x': 0.0, 'y': -2130.0 },
						{ 'x': 3.0, 'y': -2330.0 },
					],
				},
				{
					'id': 'TempCooling',
					'color': '#1f78b4',
					'data': [
						{ 'x': -4.6, 'y': 0.0 },
						{ 'x': -1.2, 'y': -100.0 },
						{ 'x': 0.0, 'y': -400.0 },
						{ 'x': 0.0, 'y': -2130.0 },
						{ 'x': -3.0, 'y': -2330.0 },
					],
				},
				{
					'id': 'Girder',
					'color': '#333333',
					'data': [
						{ 'x': 0.0, 'y': 0.0 },
						{ 'x': 0.0, 'y': -2330.0 },
					],
				},
			]}
			axisTop
			axisTopTickValues={5}
			axisTopDecimals={2}
			axisTopTickRotation={-30}
			axisRight
			axisRightTickValues={5}
			axisRightDecimals={2}
			axisRightTickRotation={-30}
			width={400}
		/>
	);
}

const ComponentsTabGroupWithTable = ({ 
	tab1TableHeadRow = [ 'header1', 'header2', 'header3', 'header4' ],
	tab1TableDataRows = [
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
	],
	tab2TableHeadRow = [ 'another1', 'another2', 'another3', 'another4' ],
	tab2TableDataRows = [
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
		{ header1: <Typography variant="body1">text</Typography>, header2: <Typography variant="body1">text</Typography>, header3: <Typography variant="body1">text</Typography>, header4: <Typography variant="body1">text</Typography> },
	],
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
}

const ComponentsTypographyH1 = () => {
  return (
    <Typography variant="h1" color="primary">
      Typography
    </Typography>
  );
}; 

const ComponentsTypographyBody1 = () => {
  return (
    <Typography variant="body1" color="primary">
      Typography
    </Typography>
  );
}; 

const ComponentsDropListDropdown = () => {
	const [value, setValue] = useState(1);

	function onChangeHandler(event: any){
		setValue(event.target.value);
	}

	const items = new Map<string, number>([ 
		['Korean', 1], 
		['American', 2], 
		['Asia', 3], 
		['Midas', 4] 
	]);

	return (
		<DropList 
			itemList={items} 
			width="100px" 
			defaultValue="Korean"
			value={value}
			onChange={onChangeHandler}
		/>
	);
}

const ComponentsIconButtonWithName = ({
	iconName = "Add",
}) => {
	const onClick = () => {
		alert("Clicked!");
	};

	return (
		<IconButton onClick={onClick} transparent>
			<Icon iconName={iconName} />
		</IconButton>
	);
}

const ComponentsGuideBoxRowDirection = () => {
	const visiable = true;
	const title_h = { height: 40 };
	const typography_wh = { width: 120, height: 30 };
	const dropList_wh = { width: 130, height: 30 };
	const button_wh = { width: 30, height: 30 };

	return (
		<GuideBox tag="Temperature Gradient Self-Equilibrating Stresses Calculator" show={visiable} padding={1} itemSpacing={1}>
			<GuideBox show={visiable} fill='1' padding={1} itemDirection='row' itemSpacing={1}>
				<Panel variant="shadow">
					<GuideBox tag="Tree" show={visiable} fill='2' itemSpacing={1}>
						<GuideBox tag="Girder Properties" show={visiable} {...title_h} fill='3' itemCenter>
							<ComponentsTypographyH1 />
						</GuideBox>
						<GuideBox tag="Girder Type" show={visiable} fill='3' itemDirection="row" itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Zone" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Surface" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Girder Material" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' itemCenter>
								<ComponentsIconButtonWithName iconName="Refresh" />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Apply T3" show={visiable} fill='3' itemDirection='row' itemSpacing={1}>
							<GuideBox tag="Typography" show={visiable} {...typography_wh} fill='4' itemCenter>
								<ComponentsTypographyBody1 />
							</GuideBox>
							<GuideBox tag="DropList" show={visiable} {...dropList_wh} fill='4' itemCenter>
								<ComponentsDropListDropdown />
							</GuideBox>
							<GuideBox tag="Button" show={visiable} {...button_wh} fill='4' itemCenter>
								<ComponentsDialogHelpIconButton />
							</GuideBox>
						</GuideBox>
						<GuideBox tag="Tables" show={visiable} fill='3' itemCenter>
							<ComponentsTabGroupWithTable />
						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant="shadow">
					<GuideBox tag="Chart1" show={visiable} fill='2' itemSpacing={1}>
						<GuideBox tag="Temperature Gradient" show={visiable} width={300} {...title_h} fill='3' itemCenter>
							<ComponentsTypographyH1 />
						</GuideBox>
						<GuideBox tag="ChartLine" show={visiable} width={302} height={434} fill='3' itemCenter>
							<ComponentsChartLineAxisTopRight />
						</GuideBox>
					</GuideBox>
				</Panel>
				<Panel variant="shadow">
				<GuideBox tag="Chart2" show={visiable} fill='2' itemSpacing={1}>
					<GuideBox tag="Self-Equilibrating Stresses" show={visiable} width={280} {...title_h} fill='3' itemCenter>
						<ComponentsTypographyH1 />
					</GuideBox>
					<GuideBox tag="ChartLine" show={visiable} height={434} fill='3' itemCenter>
						<ComponentsChartLineAxisPointSize />
					</GuideBox>
				</GuideBox>
				</Panel>
			</GuideBox>
			<GuideBox tag="Bottom" show={visiable} fill='1' itemSpacing={1} itemDirection='row' padding={1}>
				<GuideBox tag="Left Buttons" show={visiable} width={180} height={30} fill='2' itemDirection='row' itemSpacing={1}>
					<GuideBox tag="Help" show={visiable} {...button_wh} fill='4' itemCenter>
						<ComponentsDialogHelpIconButton />
					</GuideBox>
					<GuideBox tag="Import Section Button" show={visiable} width={143} height={30} fill='4' itemCenter>
						<Button>Import Section</Button>
					</GuideBox>
				</GuideBox>
				<GuideBox tag="Space" show={visiable} width={200} fill='2'>
				</GuideBox>
				<GuideBox tag="Right Buttons" show={visiable} width={557} fill='2' itemSpacing={1} itemDirection='row' itemHorizontalAlign='right'>
					<GuideBox tag="Typography" show={visiable} width={350} fill='4' itemHorizontalAlign='left' itemVerticalAlign='center'>
							<ComponentsTypographyBody1 />
					</GuideBox>
					<GuideBox tag="Import Section Button" show={visiable} width={80} height={30} fill='4' itemHorizontalAlign="right" itemVerticalAlign="center">
						<Button color="negative">Add</Button>
					</GuideBox>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
};

export default ComponentsGuideBoxRowDirection;