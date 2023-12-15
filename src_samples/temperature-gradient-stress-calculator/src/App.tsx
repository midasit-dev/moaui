import React from 'react';

import { 
	GuideBox, 
	ComponentsTypographyH1,
	Panel,
	Button,
	Typography,
	DropList,
	Check,
	TextField,
	TabGroup, Tab, Table, TableHead, TableRow, TableCell, TableBody,

	ComponentsIconButtonWithName,
	ComponentsChartLineAxisPointSize,
	ComponentsChartLineAxisTopRight,
	ComponentsDialogHelpIconButton,
	ComponentsTypographyBody1,
} from "@midasit-dev/moaui";

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

	return (
    <GuideBox show={visible} padding={1}>
      {/** Top Panels */}
      <GuideBox show={visible} width={1050} padding={1} row spacing={2} center>
        <Panel variant="shadow" height={486}>
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
            <GuideBox show={visible} width="100%" fill="3">
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
        <Panel variant="shadow" height={486}>
          <GuideBox show={visible} fill="2" spacing={2}>
            <GuideBox show={visible} width="100%" height={60} fill="3" center>
              <ComponentsTypographyH1 />
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" center>
              <ComponentsChartLineAxisTopRight />
            </GuideBox>
          </GuideBox>
        </Panel>
        <Panel variant="shadow" height={486}>
          <GuideBox show={visible} fill="2" spacing={2}>
            <GuideBox show={visible} width="100%" height={60} fill="3" center>
              <ComponentsTypographyH1 />
            </GuideBox>
            <GuideBox show={visible} width="100%" fill="3" center>
              <ComponentsChartLineAxisPointSize />
            </GuideBox>
          </GuideBox>
        </Panel>
      </GuideBox>

      {/** Bottom Buttons */}
      <GuideBox show={visible} width={1050} row padding={1} fill="2" center>
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
          <Button>Import Section</Button>
        </GuideBox>
        <GuideBox
          show={visible}
          width="69%"
          height={30}
          fill="4"
          row
          spacing={0}
          horSpaceBetween
          verCenter
        >
          <ComponentsTypographyBody1 />
          <Button
            color="negative"
            onClick={() => {
              console.log("main_func start");
              const main_func = pyscript.interpreter.globals.get("main");
              main_func();
            }}
          >
            Add
          </Button>
        </GuideBox>
      </GuideBox>
    </GuideBox>
  );
};

export default ComponentsGuideBoxLayout1;