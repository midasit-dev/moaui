//App.js
//worker
import * as LCOM from "./Workers/LoadCombinationWorker";

//library

import MoaStack from "@midasit-dev/moaui/Components/Stack";
import * as mui from "@mui/material";
import * as React from "react";
import Scrollbars from "rc-scrollbars";
import { useSnackbar } from "notistack";
import {
	makeCombData,
} from "./utils";
import {
	VerifyUtil,
	VerifyDialog,
	GuideBox,
	Panel,
	IconButton,
	Icon,
	Typography,
	Tooltip,
	Button,
	Color,
	TextField,
} from "@midasit-dev/moaui";

//component
import MoaDataGrid from "@midasit-dev/moaui/Components/DataGrid";
import { useGridApiRef } from "@mui/x-data-grid";
import { GridListComponents } from "./Components/GridListComponents";
import EndList from "./Components/ComponentEndList";
import UnitList from "./Components/ComponentUnit";
import StyleList from "./Components/ComponentStyle.js";
import ElementList from "./Components/ComponentElement.js";
import BeamTable from "./Components/ComponentBeamTable.js";
import FactorTable from "./Components/ComponentFactorTable.js";
import CreateBeamForce from "./Components/ComponentCreateBeamForce.js";
import SortOptionSelector from "./Components/ComponentSortOption.js";
import Animations from "./Components/ComponentAnimations.js";
//icon



const typeValueOptions = [
	{ value: 0, label: "Add" },
	{ value: 1, label: "Envelope" },
	{ value: 2, label: "ABS" },
	{ value: 3, label: "SRSS" },
];
const activeValueOptions = ["ACTIVE", "INACTIVE"];

const defaultCombValues = {
	type: 0,
	name: "Undefined",
	number: 0,
	active: "ACTIVE",
	data: [],
};



function Main() {
	const ref = React.useRef({});
	const { enqueueSnackbar } = useSnackbar();
	const gridRef = useGridApiRef();

	const [lcomList, setLcomList] = React.useState([]);
	const [userLcomList, setUserLcomList] = React.useState([]);
	const [requestData, setRequestData] = React.useState(false);

	// const [numberPadLeft, setNumberPadLeft] = React.useState(1);

	//States
	const [combData, setCombData] = React.useState([]);
	const [combType, setCombType] = React.useState(defaultCombValues.type);
	const [combName, setCombName] = React.useState(defaultCombValues.name);
	const [combNameLocked, setCombNameLocked] = React.useState(true);
	const [combNumber, setCombNumber] = React.useState(defaultCombValues.number);
	const [openFormDlg, setOpenFormDlg] = React.useState(false);

	const [isModifyMode, setModifyMode] = React.useState(true);
	const [isLcomLoading, setLcomLoading] = React.useState(false);

	const [isStep2, setStep2] = React.useState(false);
	const [beamForceData, setBeamForceData] = React.useState([]);
	const [selectedData, setSelectedData] = React.useState(null);

	const [prePostTableData, setPrePostTableData] = React.useState({
		part: "Part I",
		style: { format: "Fixed", place: 2 },
		unit: { force: "KN", dist: "M" },
		element: [],
	});

	const handleOnChange = React.useCallback((key, value) => {
		setPrePostTableData((prev) => ({ ...prev, [key]: value }));
	}, []);

	const isPortrate = mui.useMediaQuery('(orientation: portrait)');

	const loadLcom = React.useCallback(async () => {
		setLcomLoading(true);
		const result = await LCOM.DataRawLoader({ user: userLcomList });
		setLcomLoading(false);
		if (!result) return;
		const filteredResults = result.filter((value) => value.iTYPE === 0);
		setLcomList(filteredResults); // Type이 Add인 것만 필터링

		if (filteredResults.length > 0) { // 데이터가 하나 이상일 때
			console.log("filteredResutls0",filteredResults[0]);

			let combValue = {};
			combValue.name = result[0].NAME;
			combValue.type = result[0].iTYPE;
			combValue.number = result[0].key;
			combValue.active = result[0].ACTIVE;
			combValue.locked = true;
			combValue.data = result[0].vCOMB.map((value) => makeCombData(value));
			setCombValue(combValue); // 테이블에 표시될 데이터
			setCombNumber(result[0].key); // No. field
			setCombName(result[0].NAME); // Name field
		}
	}, []);

	React.useEffect(() => {
		if (!VerifyUtil.isExistQueryStrings('redirectTo') && !VerifyUtil.isExistQueryStrings('mapiKey')) {
			setOpenFormDlg(true);
		}
	}, []);

	React.useEffect(() => {
		console.log(combData);
	}, [combData]);

	React.useEffect(() => {
		if (VerifyUtil.isExistQueryStrings('mapiKey')) loadLcom();
	}, [loadLcom]);

	React.useEffect(() => {
		try {
			if (VerifyUtil.isExistQueryStrings('mapiKey')) {

				if (lcomList.length === 0) { // 데이터가 없을 때
					setCombNumber(0);
					setCombName(`${defaultCombValues.name}`);
				}
			}
		} catch (_) { }
	}, [lcomList]);

	const setCombValue = React.useCallback((props) => { // 테이블에 표시하기 위한 데이터 컨버팅
		const { name, type, number, locked } = props;
		setCombName(name);
		setCombType(type);
		setCombNumber(number);
		setCombNameLocked(locked);

		if (props?.data) setCombData(props?.data);
	}, []);

	setCombValue.defaultProps = defaultCombValues;

	const handleEdit = React.useCallback((params) => {
    const vComb = params.row.vCOMB.map((value) => makeCombData(value));
    const combValue = {
      name: params.row.NAME,
      type: params.row.iTYPE,
      number: params.row.key,
      active: params.row.ACTIVE,
      locked: true,
      data: vComb,
    };
    setCombValue(combValue);
    setModifyMode(true);
    setIsAddCombinationStatus(false);
    setIsClickedLcomTableCell(true);
  }, [setCombValue]);

	const initializeCombInput = React.useCallback(() => {
		setCombValue(defaultCombValues);
		setModifyMode(true);
	}, [setCombValue]);

	const handleRefreshData = React.useCallback(async () => {
		setUserLcomList([]);
		ref.current.init();
		initializeCombInput();
		setModifyMode(false);
		gridRef.current.selectRow(-1, false, true);
		setIsAddCombinationStatus(false);
		setIsClickedLcomTableCell(false);

		await loadLcom();
	}, [gridRef, initializeCombInput, loadLcom]);

	const appendCombData = React.useCallback((items) => {
    const newCombData = [...combData];
    for (const item of items) {
      const findResult = newCombData.findIndex((value) => value.NAME === item.NAME);
      if (findResult === -1) newCombData.push(item);
    }
    setCombData(newCombData);
  }, [combData]);
	
	const handleOnCellEditCommit = (params, event) => {
    const newCombData = [...combData];
    const findResult = newCombData.findIndex((value) => value.NAME === params.id);

    if (params.field === "FACTOR") {
      const value = Number(event.target.value);
      if (findResult === -1 || isNaN(value)) return;
      newCombData[findResult][params.field] = value;
    }

    setCombData(newCombData);
  };

	const LcomListGridDef = React.useMemo(
		() => [
			{
				field: "key",
				headerName: "No.",
				editable: false,
				sortable: false,
				valueGetter: (params) => `${params.row.key}${!params.row.isPending ? "*" : ""}`,
				flex: 0.1,
			},
			{
				field: "NAME",
				headerName: "Name",
				editable: false,
				sortable: false,
				flex: 0.5,
			},
			{
				field: "ACTIVE",
				headerName: "Active",
				type: "singleSelect",
				valueOptions: activeValueOptions,
				editable: false,
				sortable: false,
				flex: 0.5,
			},
			{
				field: "TYPE",
				headerName: "Type",
				type: "singleSelect",
				editable: false,
				sortable: false,
				flex: 0.5,
				valueOptions: typeValueOptions,
				valueGetter: (params) =>
					typeValueOptions.find((type) => type.value === params.row.iTYPE)
						.value,
			},
			{
				field: "DESC",
				headerName: "Description",
				editable: false,
				sortable: false,
				flex: 1.2,
			},
		],
	);
	
	const AllGridDef = React.useMemo(
		() => [
			{
				flex: 1.0,
				field: "NAME",
				headerName: "Load Cases",
				editable: false,
				sortable: false,
			},
			{
				flex: 1,
				field: "FACTOR",
				headerName: "Factor",
				editable: false,
				sortable: false,
			},
		],
	);
	const handleCellSelect = (id, field, value) => {
		if (id === undefined) setSelectedData(null);

		setSelectedData({ id, field, value });
	};
	
	const [isAddCombinationStatus, setIsAddCombinationStatus] = React.useState(false);
	const [isClickedLcomTableCell, setIsClickedLcomTableCell] = React.useState(false);
	const GoToStep2 = () => {
		if (combName === "Undefined") {
			enqueueSnackbar("No Load Combination selected.", { variant: "error", autoHideDuration: 1000 });
		} else {
			setStep2(true);
		}
	};
	const GoToStep1 = () => {
		setStep2(false);
	}
	const [sortOption, setSortOption] = React.useState(0); // 0: By Absolute, 1: By Max/Mi
	const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

	const [displayUnit, setDisplayUnit] = React.useState({ force: "KN", dist: "M" });
	const [displayStyle,setDisplayStyle] = React.useState({ format: "Fixed", place: 2 });
	
	


	return (
		<div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems:"center"}}>
			{openFormDlg === true ? (
				<VerifyDialog />
			) : (
				<GuideBox width="100%" center>
					<MoaStack spacing={2} padding={2}>
						<GridListComponents
							dataRequested={requestData}
							setDataRequested={setRequestData}
							updateCombData={appendCombData}
							additionalData={{ LCOM: userLcomList }}
							setIsAddCombinationStatus={setIsAddCombinationStatus}
							isModifyMode={isModifyMode}
							isClickedLcomTableCell={isClickedLcomTableCell}
							ref={ref}
						/>

						{true && <MoaStack direction={isPortrate ? "column" : "row"} justifyContent="center" spacing={1}>
							<MoaStack
								direction="column" width={isPortrate ? "100%" : 800}
								sx={{
									opacity:
										isAddCombinationStatus ?
											0.5 : 1
								}}
							>
								<Panel
									width='inherit'
									variant='shadow2'
									border={
										isClickedLcomTableCell ?
											`1px solid ${Color.primaryNegative.enable_strock}` :
											'1px solid #eee'
									}
								>
									<GuideBox show fill='1' width="100%" center padding={0} borderRadius={1}>
										<Typography verCenter variant="h1" height={30} color={Color.secondary.main}>Load Combinations</Typography>
									</GuideBox>
									<GuideBox padding={1} spacing={1} height={395} verSpaceBetween>
										<Scrollbars
											autoHide
											autoHeightMax="350px"
											autoHeight
										>
											<MoaDataGrid
												disableRowSelectionOnClick={isStep2}
												apiRef={gridRef}
												onCellClick={(params) => {
													if (isStep2) return;
													if (params.field === "Delete") return;
													handleEdit(params);
												}}
												initialState={{
													filter: {
														filterModel: {
															items: [
																{
																	columnField: "KIND",
																	operator: "equals",
																	value: "GEN",
																},
															],
														},
													},
													columns: {
														columnVisibilityModel: {
															KIND: false,
														},
													},
												}}
												loading={isLcomLoading}
												rows={lcomList}
												columns={LcomListGridDef}
												getRowId={(row) => row.key}
												density="compact"
												disableColumnMenu
												sx={{
													width: "100%",
													height: "350px",
												}}
												experimentalFeatures={{ newEditingApi: true }}
											/>
										</Scrollbars>
										<GuideBox width='100%' row center spacing={2}>
											<Tooltip title="Refresh Data From MIDAS Civil" placement="top">
												<IconButton onClick={handleRefreshData}>
													<Icon iconName="Refresh" />
												</IconButton>
											</Tooltip>
										</GuideBox>
									</GuideBox>
								</Panel>
							</MoaStack>
							<MoaStack direction="column" width={isPortrate ? "100%" : 300}>
								<Panel
									width='inherit'
									variant="shadow2"
									border={
										isAddCombinationStatus ?
											`1px solid ${Color.primaryNegative.enable_strock}` :
											'1px solid #eee'
									}
								>
									<GuideBox show fill='1' width="100%" center padding={0} borderRadius={1}>
										<Typography verCenter variant="h1" height={30} color={Color.secondary.main}>Selected Combination Information</Typography>
									</GuideBox>
									<GuideBox width="100%" height={395} verSpaceBetween>
										<GuideBox width="100%" spacing={1} padding={1}>
											<GuideBox width="100%" row spacing={1}>
												<TextField
													id="NumberField"
													title="No. "
													titlePosition="label"
													variant="standard"
													disabled
													textAlign="center"
													value={combNumber}
												/>
												<TextField
													id="NameField"
													title="Name "
													titlePosition="label"
													variant="standard"
													value={combName}
													disabled={combNameLocked}
													textAlign="center"
												/>
											</GuideBox>
										</GuideBox>
										<GuideBox width="100%" padding={1}>
											<Scrollbars
												autoHide
												autoHeight
												autoHeightMax={"260px"}
											>
												<MoaDataGrid
													rows={combData}
													columns={AllGridDef}
													getRowId={(row) => row.NAME}
													density="compact"
													disableColumnMenu
													sx={{ width: "100%", height: "260px" }}
													onCellEditStop={handleOnCellEditCommit}
													experimentalFeatures={{ newEditingApi: true }}
													hideFooter
													onCellClick={({ id, field, value }) => handleCellSelect(id, field, value)}
												/>
											</Scrollbars>
										</GuideBox>
										<GuideBox width="100%" row horRight spacing={2}>
											{!isStep2 ? (
												<Button
													color="negative"
													variant="contained"
													width="30%"
													onClick={GoToStep2}
												>
													Select
												</Button>
											) : (
												<Button
													variant="outlined"
													width="30%"
													onClick={GoToStep1}
												>
													Deselect
												</Button>
											)}
										</GuideBox>
									</GuideBox>
								</Panel>
							</MoaStack>
						</MoaStack>}

						{!isStep2 ? 
							<Animations />
							: 
							<MoaStack direction="row" width="100%" justifyContent="space-between" alignItems="center">
								<GuideBox width="100%" >
									<MoaStack direction={isPortrate ? "column" : "row"} justifyContent="center" spacing={1}>
										<MoaStack direction="column" width={isPortrate ? "100%" : 300}>
											<Panel
												width='inherit'
												variant="shadow2"
												border={
													isAddCombinationStatus ?
														`1px solid ${Color.primaryNegative.enable_strock}` :
														'1px solid #eee'
												}
											>
												<GuideBox show fill='1' width="100%" center padding={0} borderRadius={1}>
													<Typography verCenter variant="h1" height={30} color={Color.secondary.main}>Parameters</Typography>
												</GuideBox>
												<GuideBox width="100%" height={415} spacing={1} column>
													<Panel width="100%" variant="shadow1" border="1px solid #eee">
														<GuideBox width="100%" padding={1} spacing={2} >
															<ElementList element={prePostTableData.element} onElementSelect={handleOnChange} />
															<EndList onChange={handleOnChange} />
															<UnitList onUnitChange={handleOnChange} />
															<StyleList onStyleChange={handleOnChange} />
														</GuideBox>
													</Panel>
												</GuideBox>
												<CreateBeamForce
													setBeamForceData={setBeamForceData}
													onUpdateUnit={(unit) => setDisplayUnit(unit)}
													onUpdateStyle={(style) => setDisplayStyle(style)}
													{...prePostTableData}
													combName={combName}
													combData={combData} 
													/>
										
											</Panel>
										</MoaStack>
										<GuideBox width="100%" >
											<MoaStack direction="column" width={isPortrate ? "100%" : 800}>
												<Panel
													width='inherit'
													variant="shadow2"
													border={
														isAddCombinationStatus ?
															`1px solid ${Color.primaryNegative.enable_strock}` :
															'1px solid #eee'
													}
												>		
													<BeamTable beamData={beamForceData} onCellSelect={handleCellSelect}/>
													<FactorTable combData={combData} beamData={beamForceData} selectedData={selectedData} style={displayStyle} sortOption={sortOption}/>
													<SortOptionSelector onSortChange={handleSortChange} currentUnit={displayUnit}/>
												</Panel>
											</MoaStack>
										</GuideBox>
									</MoaStack>
								</GuideBox>
							</MoaStack>
						}
					</MoaStack>
				</GuideBox>
			)}
		</div >
	);
}

export default Main;