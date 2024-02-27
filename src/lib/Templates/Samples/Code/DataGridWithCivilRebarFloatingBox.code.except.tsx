import { useState, useEffect, useCallback } from 'react';
import {
	FloatingBox,
	Typography,
	GuideBox,
	DataGrid,
	Tab,
	TabGroup,
	DropList,
	Panel,
	Button,
} from '@midasit-dev/moaui';

const getColumnVisibilityModel = (count: number) => {
	const result: { [key: string]: boolean } = {};
	for (let i = 1; i <= 10; ++i) {
		result[`c${i}`] = false;
		result[`stn${i}`] = false;
		result[`std${i}`] = false;
		result[`mdn${i}`] = false;
		result[`mdd${i}`] = false;
		result[`edn${i}`] = false;
		result[`edd${i}`] = false;
	}

	for (let i = 1; i <= count; ++i) {
		result[`c${i}`] = true;
		result[`stn${i}`] = true;
		result[`std${i}`] = true;
		result[`mdn${i}`] = true;
		result[`mdd${i}`] = true;
		result[`edn${i}`] = true;
		result[`edd${i}`] = true;
	}

	return result;
}

const App = () => {
	//Tab (TOP, BOTTOM)
	const [curTab, setCurTab] = useState('Tab 1');

	//Layer DropList
	const [curLayer, setCurLayer] = useState(1);
	const [curColumnVisiblity, setCurColumnVisibility] = useState(getColumnVisibilityModel(1));
	const onChangeCurLayer = useCallback((event: any) => {
		setCurLayer(event.target.value);
		setCurColumnVisibility(getColumnVisibilityModel(event.target.value));
	}, []);

	return (
		<GuideBox spacing={1}>
			<Typography variant='h1'>for FloatingBox</Typography>
			<Panel relative width={900} height={480} backgroundColor="#f5f5f7" border='1px solid #d1d1d1' variant='box'>
				<FloatingBox x={16} y={16}>
					<TabGroup
						value={curTab}
						onChange={(event: React.SyntheticEvent, newValue: string) => setCurTab(newValue)}
						aria-label="horizontal tabs example"
						minWidth={30}
						minHeight={35}
						tabProps={{
							minWidth: 65,
							minHeight: 28,
							fontSize: 'small'
						}}
					>
						<Tab label="TOP" 			value="Tab 1" />
						<Tab label="BOTTOM" 	value="Tab 2" />
						<Tab label="STIRRUP" 	value="Tab 3" />
					</TabGroup>
				</FloatingBox>
				<FloatingBox x={16} y={72} width={868}>
					<Panel width='100%' height={350} variant="shadow2">
						<GuideBox width="100%" spacing={1}>
							<GuideBox width="100%" row verCenter horSpaceBetween>
								<GuideBox row spacing={2} verCenter>
									<Typography variant="body1">Select Layer</Typography>
									<DropList 
										itemList={[
											['1', 1], ['2', 2], ['3', 3]
										]} 
										width="50px" 
										defaultValue="1"
										value={curLayer}
										onChange={onChangeCurLayer}
									/>
								</GuideBox>
								<GuideBox>
									<Typography variant="body1">Unit: (mm)</Typography>
								</GuideBox>
							</GuideBox>

							<Panel variant='box' width="100%" height={290} padding={0}>
								<DataGrid />
							</Panel>
						</GuideBox>
					</Panel>
				</FloatingBox>
				<FloatingBox x={16} y={436} width={868}>
					<GuideBox width="100%" row horSpaceBetween>
						<Button>Refresh</Button>
						<Button color='negative'>Apply</Button>
					</GuideBox>
				</FloatingBox>
			</Panel>

			<Typography variant='h1'>for GuideBox</Typography>
			<GuideBox show width={900} spacing={2} fill="#f5f5f7" padding={2} border='1px solid #d1d1d1' borderRadius={1}>
				<TabGroup
					value={curTab}
					onChange={(event: React.SyntheticEvent, newValue: string) => setCurTab(newValue)}
					aria-label="horizontal tabs example"
					minWidth={30}
					minHeight={35}
					tabProps={{
						minWidth: 65,
						minHeight: 28,
						fontSize: 'small'
					}}
				>
					<Tab value="Tab 1" label="TOP" />
					<Tab value="Tab 2" label="BOTTOM" />
					<Tab value="Tab 3" label="STIRRUP" />
				</TabGroup>

				<Panel width='100%' height={350} variant="shadow2">
					<GuideBox width="100%" spacing={1}>
						<GuideBox width="100%" row verCenter horSpaceBetween>
							<GuideBox row spacing={2} verCenter>
								<Typography variant="body1">Select Layer</Typography>
								<DropList 
									itemList={[
										['1', 1], ['2', 2], ['3', 3]
									]} 
									width="50px" 
									defaultValue="1"
									value={curLayer}
									onChange={onChangeCurLayer}
								/>
							</GuideBox>
							<GuideBox>
								<Typography variant="body1">Unit: (mm)</Typography>
							</GuideBox>
						</GuideBox>

						<Panel variant='box' width="100%" height={290} padding={0}>
							<DataGrid
								initialState={{
									columns: { columnVisibilityModel: curColumnVisiblity }
								}}
								columnVisibilityModel={curColumnVisiblity}
								hideFooter
								columns={columnsDefault}
								rows={rowsDefault}
							/>
						</Panel>
					</GuideBox>
				</Panel>

				<GuideBox width="100%" row horSpaceBetween>
					<Button>Refresh</Button>
					<Button color='negative'>Apply</Button>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	)
}

export default App;

/**
 * columns and rows default values
 */
const toDecimal = (value: string, decimal: number) => {
	const fixedValue = `${Number(value).toFixed(decimal)}`;
	return String(fixedValue);
}
const columnsDefault = [
	{ editable: true, field: "id", headerName: "ID", width: 30, sortable: false },
	{ editable: true, valueFormatter: (params: any) => toDecimal(params.value, 2), field: "c1", headerName: "C1", width: 60, sortable: false },
	{ editable: true, valueFormatter: (params: any) => toDecimal(params.value, 2), field: "c2", headerName: "C2", width: 60, sortable: false },
	{ editable: true, valueFormatter: (params: any) => toDecimal(params.value, 2), field: "c3", headerName: "C3", width: 60, sortable: false },
	{ editable: true, field: "stn1", headerName: "St1-No", width: 70, sortable: false },
	{ editable: true, field: "std1", headerName: "St1-Dia", width: 70, sortable: false },
	{ editable: true, field: "stn2", headerName: "St2-No", width: 70, sortable: false },
	{ editable: true, field: "std2", headerName: "St2-Dia", width: 70, sortable: false },
	{ editable: true, field: "stn3", headerName: "St3-No", width: 70, sortable: false },
	{ editable: true, field: "std3", headerName: "St3-Dia", width: 70, sortable: false },
	{ editable: true, field: "mdn1", headerName: "Md1-No", width: 70, sortable: false },
	{ editable: true, field: "mdd1", headerName: "Md1-Dia", width: 70, sortable: false },
	{ editable: true, field: "mdn2", headerName: "Md2-No", width: 70, sortable: false },
	{ editable: true, field: "mdd2", headerName: "Md2-Dia", width: 70, sortable: false },
	{ editable: true, field: "mdn3", headerName: "Md3-No", width: 70, sortable: false },
	{ editable: true, field: "mdd3", headerName: "Md3-Dia", width: 70, sortable: false },
	{ editable: true, field: "edn1", headerName: "Ed1-No", width: 70, sortable: false },
	{ editable: true, field: "edd1", headerName: "Ed1-Dia", width: 70, sortable: false },
	{ editable: true, field: "edn2", headerName: "Ed2-No", width: 70, sortable: false },
	{ editable: true, field: "edd2", headerName: "Ed2-Dia", width: 70, sortable: false },
	{ editable: true, field: "edn3", headerName: "Ed3-No", width: 70, sortable: false },
	{ editable: true, field: "edd3", headerName: "Ed3-Dia", width: 70, sortable: false },
];

const rowsDefault = [
	{ id: 1, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 2, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 3, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 4, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 5, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 6, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 7, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 8, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
	{ id: 9, c1: "40.00", c2: "", c3: "", stn1: 6, std1: '#6', stn2: "", std2: "", stn3: "", std3: "", mdn1: 6, mdd1: "#6", mdn2: "", mdd2: "", mdn3: "", mdd3: "", edn1: 6, edd1: "#6", edn2: "", edd2: "", edn3: "", edd3: "" },
];