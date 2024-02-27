import { useState, useEffect, useCallback } from 'react';
import {
	Typography,
	GuideBox,
	DataGrid,
	Tab,
	TabGroup,
	DropList,
	Panel,
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
		<GuideBox show width={900} height={400} spacing={2} fill="#f1f1f3" padding={2}>
			<TabGroup
				value={curTab}
				onChange={(event: React.SyntheticEvent, newValue: string) => setCurTab(newValue)}
				aria-label="horizontal tabs example"
				minWidth={30}
				minHeight={28}
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

			<Panel width='100%' height={400} variant="shadow2">
				<DataGrid
					disableRowSelectionOnClick
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
	{ editable: true, field: "c2", headerName: "C2", width: 60, sortable: false },
	{ editable: true, field: "c3", headerName: "C3", width: 60, sortable: false },
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
];