//worker
import * as LCOM from "./Workers/LoadCombinationWorker";

//library
import MoaButton from "@midasit-dev/moaui/Components/Button";
import MoaDroplist from "@midasit-dev/moaui/Components/DropList";
import MoaStack from "@midasit-dev/moaui/Components/Stack";
import MoaTextField from "@midasit-dev/moaui/Components/TextField";
import MoaTypography from "@midasit-dev/moaui/Components/Typography";
import * as mui from "@mui/material";
import * as React from "react";
import Scrollbars from "rc-scrollbars";
import { useSnackbar } from "notistack";
import {
	makeCombData,
	sendData,
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
  Dialog,
  Button,
	Color,
} from "@midasit-dev/moaui";

//component
import MoaDataGrid from "@midasit-dev/moaui/Components/DataGrid";
import { GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import { GridListComponents } from "./Components/GridListComponents";

//icon
import DeleteIcon from "@mui/icons-material/Delete";

const typeValueOptions = [
	{ value: 0, label: "Add" },
	{ value: 1, label: "Envelope" },
	{ value: 2, label: "ABS" },
	{ value: 3, label: "SRSS" },
];
const activeValueOptions = ["ACTIVE", "INACTIVE"];

const defaultCombValues = {
	type: 0,
	name: "New Comb",
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
	const [combActive, setCombActive] = React.useState(defaultCombValues.active);
	const [combType, setCombType] = React.useState(defaultCombValues.type);
	const [combName, setCombName] = React.useState(defaultCombValues.name);
	const [combNameLocked, setCombNameLocked] = React.useState(false);
	const [combNumber, setCombNumber] = React.useState(defaultCombValues.number);
	const [openFormDlg, setOpenFormDlg] = React.useState(false);

	const [isModifyMode, setModifyMode] = React.useState(false);
	const [isLcomLoading, setLcomLoading] = React.useState(false);

	const isPortrate = mui.useMediaQuery('(orientation: portrait)');

	const loadLcom = React.useCallback(async () => {
		setLcomLoading(true);
		const result = await LCOM.DataRawLoader({ user: userLcomList });
		setLcomLoading(false);
		if (!result) return;
		setLcomList(result);
	}, [userLcomList]);

	React.useEffect(() => {
		if (!VerifyUtil.isExistQueryStrings('redirectTo') && !VerifyUtil.isExistQueryStrings('mapiKey')) {
			setOpenFormDlg(true);
		}
	}, []);

	React.useEffect(() => {
		if (VerifyUtil.isExistQueryStrings('mapiKey')) loadLcom();
	}, [loadLcom]);

	React.useEffect(() => {
		try {
			if (VerifyUtil.isExistQueryStrings('mapiKey')) {
				const newLcomList = [...lcomList];

				if (newLcomList.length === 0) {
					setCombNumber(1);
					setCombName(`${defaultCombValues.name} 1`);
				}

				if (newLcomList.length > 0) {
					const lcomListLength = newLcomList.length;
					const lastItem = newLcomList[lcomListLength - 1];
					const lastItemNumber = lastItem.key * 1 + 1;
					setCombNumber(lastItemNumber);
					// setNumberPadLeft(String(lcomListLength).length);
					setCombName(`${defaultCombValues.name} ${lastItemNumber}`);
				}
			}
		} catch (_) {}
	}, [lcomList, userLcomList]);

	const setCombValue = React.useCallback((props) => {
		const { name, type, number, active, locked } = props;
		setCombName(name);
		setCombType(type);
		setCombNumber(number);
		setCombActive(active);
		setCombNameLocked(locked);

		if (props?.data) setCombData(props?.data);
	}, []);

	setCombValue.defaultProps = defaultCombValues;

	const handleEdit = React.useCallback((params) => {
		let combValue = { data: [] };

		try {
			const vComb = params.row.vCOMB;
			combValue.data = vComb.map((value) => makeCombData(value));

			let name = params.row.NAME;
			combValue.name = name;
			combValue.type = params.row.iTYPE;
			combValue.number = params.row.key;
			combValue.active = params.row.ACTIVE;
			combValue.locked = true;
		} catch (_) {
			console.log(_);
		}

		setModifyMode(true);
		setIsAddCombinationStatus(false);
		setIsClickedLcomTableCell(true);
		setCombValue(combValue);
	}, [setCombValue]);

	// const handleCopy = React.useCallback(
	// 	(params) => {
	// 		let combValue = { data: [] };

	// 		try {
	// 			const vCombData = params.row.vCOMB;
	// 			combValue.data = vCombData.map((value) => makeCombData(value));

	// 			const rawName = params.row.NAME;
	// 			let newCombName = processToken({ name: rawName });

	// 			combValue.name = newCombName;
	// 			combValue.type = params.row.iTYPE;
	// 			combValue.number = lcomList.length + 1;
	// 			combValue.active = params.row.ACTIVE;
	// 		} catch (_) {
	// 			console.log(_);
	// 		}

	// 		setCombValue(combValue);
	// 	},
	// 	[lcomList.length, setCombValue]
	// );

	const handleRemove = React.useCallback(
		(params) => {
			let newUserLcomList = [...userLcomList];
			const findResult = newUserLcomList.findIndex(
				(value) => value.key === params.row.key
			);
			const newCombData = { ...params.row, markAsRemoved: true };
			if (findResult !== -1) newUserLcomList[findResult] = newCombData;
			else newUserLcomList.push(newCombData);

			setUserLcomList(newUserLcomList);
		},
		[userLcomList]
	);

	const initializeCombInput = React.useCallback(() => {
		setCombValue(defaultCombValues);
		setModifyMode(true);
	}, [setCombValue]);

	const refreshLocalComponent = React.useCallback(() => {
		ref.current.init();
		loadLcom();
		initializeCombInput();
		setModifyMode(false);
		gridRef.current.selectRow(-1, false, true);
		setIsAddCombinationStatus(false);
		setIsClickedLcomTableCell(false);
	}, [gridRef, initializeCombInput, loadLcom]);

	const handleNew = React.useCallback(() => {
		refreshLocalComponent();
		setModifyMode(false);
		setCombNumber(defaultCombValues.number);
	}, [refreshLocalComponent]);

	const handleRefreshData = React.useCallback(() => {
		setUserLcomList([]);
		ref.current.init();
		initializeCombInput();
		setModifyMode(false);
		gridRef.current.selectRow(-1, false, true);
		setIsAddCombinationStatus(false);
		setIsClickedLcomTableCell(false);
	}, [gridRef, initializeCombInput]);

	const handleRegisterLcom = React.useCallback(() => {
		if (combData.length === 0) {
			enqueueSnackbar("No Load Case(s) in New Combination Panel.", {
				variant: "error",
			});
			return;
		}

		const newUserLcomList = [...userLcomList];

		if (!isModifyMode && newUserLcomList.find((value) => value.NAME === combName)) {
			enqueueSnackbar(`"${combName}" already exists.`, { variant: "error" });
			return;
		}

		let userLcomListItem = {
			key: String(combNumber),
			NAME: combName,
			ACTIVE: combActive,
			iTYPE: combType,
		};

		userLcomListItem.vCOMB = combData.map((value) => {
			const name = value.NAME;

			const startIdx = name.lastIndexOf("(");
			const endIdx = name.lastIndexOf(")");

			const analysisType = name.substring(startIdx + 1, endIdx);
			const loadCaseName = name.substring(0, startIdx);

			return { ANAL: analysisType, LCNAME: loadCaseName, FACTOR: value.FACTOR };
		});

		newUserLcomList.push(userLcomListItem);
		setUserLcomList(newUserLcomList);
		refreshLocalComponent();

		enqueueSnackbar(`"${combName}" is added.`, { variant: "success", autoHideDuration: 1500 });
	}, [combActive, combData, combName, combNumber, combType, enqueueSnackbar, isModifyMode, refreshLocalComponent, userLcomList]);

	const appendCombData = React.useCallback(
		(items) => {
			//test is Array
			let newCombData = [...combData];
			for (const item of items) {
				const findResult = newCombData.findIndex(
					(value) => value.NAME === item.NAME
				);
				if (findResult === -1) newCombData.push(item);
			}

			setCombData(newCombData);
		},
		[combData]
	);

	const handleReflectDataIntoCivil = React.useCallback(() => {
		const awaiter = async () => {
			const dataObject = {
				Assign: {},
			};

			for (const value of lcomList) {
				dataObject["Assign"][value.key] = { ...value };
			}

			const bodyString = JSON.stringify(dataObject);
			const targetUrl = "/db/LCOM-GEN";
			await sendData(targetUrl, bodyString, "PUT");
		};

		awaiter();
	}, [lcomList]);

	const handleOverwriteDataIntoCivil = React.useCallback(() => {
		const awaiter = async () => {
			//delete LCOM-GEN
			await sendData("/db/LCOM-GEN", "", "DELETE");

			//put LCOM-GEN
			const dataObject = { Assign: {} };
			for (const value of lcomList) dataObject["Assign"][value.key] = { ...value };
			await sendData('/db/LCOM-GEN', JSON.stringify(dataObject), "PUT");

			setOverwriteDlgOpen(false);

			handleReflectDataIntoCivil();
		};

		awaiter();
	}, [handleReflectDataIntoCivil, lcomList]);

	const handleOnCellEditCommit = (params, event) => {
		let newCombData = [...combData];
		const findResult = newCombData.findIndex(
			(value) => value.NAME === params.id
		);

		let value = "";
		if (params.field === "FACTOR") {
			value = Number(event.target.value);
			if (findResult === -1 || isNaN(value)) return;
		}

		newCombData[findResult][params.field] = value;
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
				flex: 1,
			},
			{
				field: "ACTIVE",
				headerName: "Active",
				type: "singleSelect",
				valueOptions: activeValueOptions,
				editable: false,
				sortable: false,
			},
			{
				field: "TYPE",
				headerName: "Type",
				type: "singleSelect",
				editable: false,
				sortable: false,
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
			},
			{
				field: "Delete",
				headerName: "Delete",
				type: "actions",
				editable: false,
				sortable: false,
				flex: 0.5,
				getActions: (params) => [
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Remove"
						onClick={() => handleRemove(params)}
					/>,
				],
			},
		],
		[handleRemove]
	);

	const AllGridDef = React.useMemo(
		() => [
			{
				flex: 1.2,
				field: "NAME",
				headerName: "Load Cases",
				editable: false,
				sortable: false,
			},
			{
				flex: 1,
				field: "FACTOR",
				headerName: "Factor",
				editable: true,
				sortable: false,
			},
			{
				flex: 1,
				field: "Delete",
				headerName: "Delete",
				type: "actions",
				editable: false,
				sortable: false,
				getActions: (params) => [
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Remove"
						onClick={() => {
							let newCombData = [...combData];
							const targetIdx = newCombData.findIndex(
								(value) => value.NAME === params.id
							);
							newCombData.splice(targetIdx, 1);
							setCombData(newCombData);
						}}
					/>,
				],
			},
		],
		[combData]
	);

	const [overwriteDlgOpen, setOverwriteDlgOpen] = React.useState(false);
	const [isAddCombinationStatus, setIsAddCombinationStatus] = React.useState(false);
	const [isClickedLcomTableCell, setIsClickedLcomTableCell] = React.useState(false);

	return (
		<div style={{width:"100%", display: "flex", justifyContent: "center"}}>
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
						<MoaStack direction={isPortrate ? "column" : "row"} justifyContent="center" spacing={2}>
							<MoaStack 
								direction="column" width={isPortrate? "100%" : 600}
								sx={{ 
									opacity: 
										isAddCombinationStatus ? 
											0.5 : 1, 
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
									<GuideBox spacing={2} height={395} verSpaceBetween>
										<Scrollbars
											autoHide
											autoHeightMax="350px"
											autoHeight
										>
											<MoaDataGrid
												apiRef={gridRef}
												onCellClick={(params) => {
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
												hideFooter
											/>
										</Scrollbars>
										<GuideBox width='100%' row center spacing={2}>
											<Tooltip title="Refresh Data From MIDAS Civil" placement="top">
												<IconButton onClick={handleRefreshData}>
													<Icon iconName="Refresh" />
												</IconButton>
											</Tooltip>
											<Tooltip title="Update Lcom Data in MIDAS Civil" placement="top">
												<MoaButton onClick={handleReflectDataIntoCivil}>
													UPDATE
												</MoaButton>
											</Tooltip>
											<Tooltip title="Overwrite Lcom Data in MIDAS Civil" placement="top">
												<MoaButton onClick={() => setOverwriteDlgOpen(true)}>
													OVERWRITE
												</MoaButton>
											</Tooltip>
											<Dialog
												open={overwriteDlgOpen}
												setOpen={setOverwriteDlgOpen}
												onClose={() => setOverwriteDlgOpen(false)}
												headerIcon={<Icon iconName="Warning" />}
												headerTitle="Warning"
											>
												<GuideBox spacing={2}>
													<GuideBox spacing={1} center>
														<Typography>Delete all General Load Combinations and</Typography>
														<Typography>overwrite with new Load Combinations.</Typography>
														<Typography>Do you want to proceed?</Typography>
													</GuideBox>

													<GuideBox width='100%' row spacing={2} center>
														<Button 
															color="negative"
															onClick={handleOverwriteDataIntoCivil}
														>
															Continue
														</Button>
													</GuideBox>
												</GuideBox>
											</Dialog>
										</GuideBox>
									</GuideBox>
								</Panel>
							</MoaStack>
							<MoaStack direction="column" width={isPortrate? "100%"  : 300}>
								<Panel 
									width='inherit'
									variant="shadow2" 
									border={
										// isAddCombinationStatus || isClickedLcomTableCell ? 
										isAddCombinationStatus ?
											`1px solid ${Color.primaryNegative.enable_strock}` : 
												'1px solid #eee'
									}
								>
									<GuideBox width="100%" height={395} verSpaceBetween>
										<GuideBox width="100%" spacing={1}>
											<GuideBox width="100%" row spacing={1}>
												<MoaTextField
													id="NumberField"
													title="No."
													titlePosition="label"
													variant="standard"
													disabled
													value={combNumber}
												/>
												<MoaTextField
													id="NameField"
													title="Name"
													titlePosition="label"
													variant="standard"
													value={combName}
													disabled={combNameLocked}
													onChange={(e) => setCombName(e.target.value)}
												/>
											</GuideBox>
											<GuideBox width="100%" row spacing={1}>
												<GuideBox row spacing={1} width="50%" verCenter horSpaceBetween>
													<MoaTypography>Active</MoaTypography>
													<MoaDroplist
														title="Active"
														width={80}
														itemList={() => {
															let map = new Map();
															for (const value of activeValueOptions) {
																map.set(value, value);
															}
															return map;
														}}
														value={combActive}
														onChange={(e) => setCombActive(e.target.value)}		
													/>
												</GuideBox>
												<GuideBox row spacing={1} width="50%" verCenter horSpaceBetween>
													<MoaTypography>Type</MoaTypography>
													<MoaDroplist
														title="Type"
														width={75}
														itemList={() => {
															let map = new Map();
															for (const value of typeValueOptions) {
																map.set(value.label, value.value);
															}
															return map;
														}}
														value={combType}
														onChange={(e) => setCombType(e.target.value)}
													/>
												</GuideBox>
											</GuideBox>
											<GuideBox width="100%">
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
													/>
												</Scrollbars>
											</GuideBox>
										</GuideBox>
										<GuideBox width="100%" row horRight spacing={1}>
											{isModifyMode && 
												<MoaButton onClick={handleRegisterLcom}>
													MODIFY
												</MoaButton>
											}
											{!isModifyMode && 
												<MoaButton onClick={handleRegisterLcom} disabled={!isAddCombinationStatus}>
													ADD
												</MoaButton>
											}
											<MoaButton onClick={handleNew} color='negative'>CLEAR</MoaButton>
										</GuideBox>
									</GuideBox>
								</Panel>
							</MoaStack>
						</MoaStack>
					</MoaStack>
				</GuideBox>
			)}
		</div>
	);
}

export default Main;
