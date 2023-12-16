import React from 'react';

import { 
	GuideBox, 
	Panel,
	Typography,
	DropList,
	Check,
	TextField,
	TabGroup, Tab, Table, TableHead, TableRow, TableCell, TableBody,

	ComponentsIconButtonWithName,
	ComponentsDialogHelpIconButton,
	ComponentsTypographyBody1,
} from "@midasit-dev/moaui";

import ImportSection from './Components/ImportSection';
import AddButton from './Components/AddButton';
import SelfEqStressesCharts from './Components/SelfEqStressesCharts';
import TemperatureGradientChart from './Components/TemperatureGradientChart';
import PythonSample1 from './PythonSample1';

const ComponentsTabGroupWithTable = ({
	tab1Label = 'Tab 1',
	tab1TableHeadRow = [ 'header1', 'header2', 'header3', 'header4' ],
	tab1TableDataRows = [
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
	],
	tab2Label = 'Tab 2',
	tab2TableHeadRow = [ 'another1', 'another2', 'another3', 'another4' ],
	tab2TableDataRows = [
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
		{ header1: <Typography variant="body1" textAlign='center'>text</Typography>, header2: <Typography variant="body1" textAlign='center'>text</Typography>, header3: <Typography variant="body1" textAlign='center'>text</Typography>, header4: <Typography variant="body1" textAlign='center'>text</Typography> },
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
        <Tab value="Tab 1" label={tab1Label} />
        <Tab value="Tab 2" label={tab2Label} />
      </TabGroup>
      {value === "Tab 1" && <CompTable headRow={tab1TableHeadRow} dataRows={tab1TableDataRows} />}
			{value === "Tab 2" && <CompTable headRow={tab2TableHeadRow} dataRows={tab2TableDataRows} />}
    </Panel>
  );
}

const TemplatesDualComponentsTypographyDropListSpaceBetween = ({
	width = 300,
	height = 30,
	title = 'Title',
	dropListwidth = 150,
	items = [ 
		['Korean', 	 1],
		['American', 2],
		['Asia', 		 3],
		['Midas', 	 4],
	],
	defaultValue = 1,
	value = undefined,
	onChange = undefined,
	show = false,
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	const itemsMap = new Map<string, number>(items as [string, number][]);
	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<Typography flexItem textAlign='center' height={height}>{title}</Typography>
			<DropList 
				itemList={itemsMap} 
				width={dropListwidth} 
				defaultValue={defaultValue}
				value={value || valueLocal}
				onChange={onChange || onChangeLocal}
			/>
		</GuideBox>
	)
};

const ComponentsGuideBoxLayout1 = () => {
	const visible = false;

	//fill in global variables
	React.useEffect(() => {
		function checkPyScriptReady(callback : any) {
			// if pyscript is ready, call callback function
			if (pyscript && pyscript.interpreter) {
				const pGetDB = pyscript.interpreter.globals.get("getDB");
				const db = JSON.parse(pGetDB("NODE"));
				console.log(db);
			} else {
				// if not, wait 100ms and try again
				setTimeout(() => checkPyScriptReady(callback), 100);
			}
		}
	
		checkPyScriptReady(() => {});
	}, []);

	//Import Section Select Value
	const [importSectionValue, setImportSectionValue] = React.useState({
    selected: '',
		temp: '',
    items: [
			"List Item 1",
			"List Item 2",
			"List Item 3",
			"List Item 4",
			"List Item 5",
			"List Item 6",
			"List Item 7",
			"List Item 8",
			"List Item 9",
			"List Item 10",
			"List Item 11",
			"List Item 12",
		],
  });

	//Select Load Case (Add Button)
	const [addValue, setAddValue] = React.useState({
    selected: '',
		temp: '',
    items: [
			"Static Load Case 1",
			"Static Load Case 2",
			"Static Load Case 3",
			"Static Load Case 4",
			"Static Load Case 5",
			"Static Load Case 6",
			"Static Load Case 7",
			"Static Load Case 8",
			"Static Load Case 9",
		],
  });

	//Self Equilibrating Stresses Chart Values
	const [leftSelfEqStressesChartValue, setLeftSelfEqStressesChartValue] = React.useState([
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
	]);

	const [rightSelfEqStressesChartValue, setRightSelfEqStressesChartValue] = React.useState([
		{
			'id': 'Cooling',
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
	]);

	//Temperature Gradient Chart Values
	const [temperatureGradientChartValue, setTemperatureGradientChartValue] = React.useState([
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
	]);	

	return (
    <GuideBox show={visible} padding={1}>
      {/** Top Panels */}
      <GuideBox show={visible} width={1300} padding={1} row spacing={2} center>
        <Panel variant="shadow" height={520}>
          <GuideBox show={visible} fill="2">
            <GuideBox
              show={visible}
              width="100%"
              height={60}
              fill="3"
              verCenter
            >
              <Typography variant="h1">Girder Properties</Typography>
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" spacing={1}>
              <GuideBox show={visible} width="100%" spacing={1} row>
                <TemplatesDualComponentsTypographyDropListSpaceBetween
                  width="100%"
                  title="Girder Type"
                />
                <GuideBox show={visible} width={43} height={30} />
              </GuideBox>
              <GuideBox show={visible} width="100%" spacing={1} row>
                <TemplatesDualComponentsTypographyDropListSpaceBetween
                  width="100%"
                  title="Zone"
                />
                <GuideBox show={visible} width={43} height={30} />
              </GuideBox>
              <GuideBox show={visible} width="100%" spacing={1} row>
                <TemplatesDualComponentsTypographyDropListSpaceBetween
                  width="100%"
                  title="Surface"
                />
                <GuideBox show={visible} width={43} height={30} />
              </GuideBox>
              <GuideBox show={visible} width="100%" spacing={1} row>
                <TemplatesDualComponentsTypographyDropListSpaceBetween
                  width="100%"
                  title="Girder Material"
                />
                <ComponentsIconButtonWithName iconName="Refresh" />
              </GuideBox>
              <GuideBox show={visible} width="100%" spacing={1} row verCenter>
                <Check name="Apply T3" namePlacement="start" />
                <GuideBox
                  show={visible}
                  width={75}
                  height={30}
                  verCenter
                  paddingX={0.75}
                >
                  <TextField
                    width="100%"
                    height={30}
                    title="H:"
                    placeholder="1.8"
                    disabled
                  />
                </GuideBox>
                <GuideBox show={visible} width={75} height={30} verCenter>
                  <TextField
                    width="100%"
                    height={30}
                    title="C:"
                    placeholder="1.8"
                    disabled
                  />
                </GuideBox>
                <ComponentsIconButtonWithName iconName="Help" />
              </GuideBox>
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" marginTop={2}>
              <ComponentsTabGroupWithTable
                tab1Label="Material"
                tab1TableHeadRow={["Component", "Property", "Symbol", "Value"]}
                tab2Label="Stress Summary"
                tab2TableHeadRow={[
                  "Component",
                  "Position",
                  "Heating",
                  "Cooling",
                ]}
              />
            </GuideBox>
          </GuideBox>
        </Panel>
        <Panel variant="shadow" height={520}>
          <GuideBox show={visible} fill="2" spacing={2}>
            <GuideBox show={visible} width="100%" height={60} fill="3" center>
              <Typography variant='h1'>Temperature Gradient</Typography>
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" center>
              <TemperatureGradientChart
								value={temperatureGradientChartValue}
							/>
            </GuideBox>
          </GuideBox>
        </Panel>
        <Panel variant="shadow" height={520}>
          <GuideBox show={visible} fill="2" spacing={2}>
            <GuideBox show={visible} width="100%" height={60} fill="3" center>
              <Typography variant='h1'>Self Equilibrating Stresses</Typography>
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" center row>
              <SelfEqStressesCharts 
								leftValue={leftSelfEqStressesChartValue}
								rightValue={rightSelfEqStressesChartValue}
							/>
            </GuideBox>
          </GuideBox>
        </Panel>
      </GuideBox>

      {/** Bottom Buttons */}
      <GuideBox show={visible} width={1300} row padding={1} fill="2" center>
        <GuideBox
          show={visible}
          width="30%"
          height={30}
          fill="3"
          row
          spacing={2}
          verCenter
        >
          <ComponentsDialogHelpIconButton />
          <ImportSection 
						value={importSectionValue}
						setValue={setImportSectionValue}
					/>
        </GuideBox>
        <GuideBox
          show={visible}
          width="69%"
          height={30}
          fill="4"
          row
          spacing={3}
          horRight
          verCenter
        >
          <Typography>The above Temperature Gradient Loads in MIDAS Civil Load Cases</Typography>
          {/* <Button
            color="negative"
            onClick={() => {
              console.log("main_func start");
              const main_func = pyscript.interpreter.globals.get("main");
              main_func();
            }}
          >
            Add
          </Button> */}
					<AddButton 
						value={addValue}
						setValue={setAddValue}
					/>
        </GuideBox>
      </GuideBox>
			<PythonSample1 />
    </GuideBox>
  );
};

export default ComponentsGuideBoxLayout1;