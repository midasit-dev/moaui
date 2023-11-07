import "./App.css";
import * as React from "react";
// Material UI import data
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// UserDefined Components
import { useSnackbar } from "notistack";
import * as TextInput from "./Components/Textfield";
import RadioButtonSpline from "./Components/Radiogroup";
import SelectVariants from "./Components/Select";
import StyledTypo from "./Components/Typography";
import * as Buttons from "./Components/Buttons";
import CheckboxOption from "./Components/Checkbox";
import DataGridAxle from "./Components/Datagrid";
import * as Modals from "./Components/Modal";
import * as Common from "./Function/Common";
import * as Loadcase from "./Function/Loadcase";
import * as MainFunc from "./Function/MainFunc";
import * as Validation from "./Function/Validation";
import MoaPanel from "@midasit-dev/moaui/Panel";
import MoaStack from "@midasit-dev/moaui/Stack";
import MoaTextField from "@midasit-dev/moaui/TextField";
import MoaTypography from "@midasit-dev/moaui/Typography";
import MoaButton from "@midasit-dev/moaui/Button";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { VerifyUtil } from '@midasit-dev/moaui';

//window settings
const width = 720;
const height = 700;

//Units - Latex
const unit_meter = "\\(\\rm m \\)";
const unit_loads = "\\(\\rm kN/m \\)";
const unit_percn = "\\(\\rm \\% \\)";
const unit_speed = "\\(\\rm km/h \\)";
const unit_accel = "\\(\\rm m/s^2 \\)";

//PreSetList
const preSetList = {
	10: "KL-510TRK",
	20: "KL-510FTG",
	30: "KL-510LNE",
	40: "HL-93TRK",
	50: "Load_Model_1",
};

const preSetValue = {
	10: {
		name: "KL-510TRK",
		axle: [
			{ id: 1, index: 1, loads: 48.0, dist: 3.6 },
			{ id: 2, index: 2, loads: 135.0, dist: 1.2 },
			{ id: 3, index: 3, loads: 135.0, dist: 7.2 },
			{ id: 4, index: 4, loads: 192.0, dist: 0.0 },
		],
		distributed: [12.7, 0, 0],
		impact: 25,
		centrf: [9.806, 1.333],
		eccentric: 1.8,
		point: [1, 0, 0],
		option: [true, true, false, true],
	},
	20: {
		name: "KL-510FTG",
		axle: [
			{ id: 1, index: 1, loads: 38.4, dist: 3.6 },
			{ id: 2, index: 2, loads: 108.0, dist: 1.2 },
			{ id: 3, index: 3, loads: 108.0, dist: 7.2 },
			{ id: 4, index: 4, loads: 153.6, dist: 0.0 },
		],
		distributed: [12.7, 0, 0],
		impact: 15,
		centrf: [9.806, 1.333],
		eccentric: 1.8,
		point: [1, 0, 0],
		option: [true, true, false, false],
	},
	30: {
		name: "KL-510LNE",
		axle: [
			{ id: 1, index: 1, loads: 36.0, dist: 3.6 },
			{ id: 2, index: 2, loads: 101.25, dist: 1.2 },
			{ id: 3, index: 3, loads: 101.25, dist: 7.2 },
			{ id: 4, index: 4, loads: 144.0, dist: 0.0 },
		],
		distributed: [12.7, 30, 30],
		impact: 15,
		centrf: [9.806, 1.333],
		eccentric: 1.8,
		point: [1, 0, 0],
		option: [true, true, true, true],
	},
	40: {
		name: "HL-93TRK",
		axle: [
			{ id: 1, index: 1, loads: 35.0, dist: 4.3 },
			{ id: 2, index: 2, loads: 145.0, dist: 9.0 },
			{ id: 3, index: 3, loads: 145.0, dist: 0 },
		],
		distributed: [9.3, 30, 30],
		impact: 33,
		centrf: [9.807, 1.333],
		eccentric: 1.8,
		point: [1, 0, 0],
		option: [true, true, true, true],
	},
	50: {
		name: "Load_Model_1",
		axle: [
			{ id: 1, index: 1, loads: 300.0, dist: 1.2 },
			{ id: 2, index: 2, loads: 300.0, dist: 0 },
		],
		distributed: [9, 30, 30],
		impact: 33,
		centrf: [9.807, 1.333],
		eccentric: 1.8,
		point: [1, 0, 0],
		option: [true, false, true, false],
	},
};

const enqueueMessage = (func, message, variant = "error") => {
	func(message, {
		variant: variant,
		autoHideDuration: 3000,
		anchorOrigin: { vertical: "bottom", horizontal: "center" },
	});
};

function FormDialog() {
	const [open, setOpen] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	}

	const [baseUrl, setBaseUrl] = React.useState("");
	const [mapiKey, setMapiKey] = React.useState("");
	const handleOk = () => {
		window.location.search = `?redirectTo=${baseUrl}&mapiKey=${mapiKey}`;
		handleClose();
	};

	const handleBaseUrlChange = (e) => {
		console.log(e);
		setBaseUrl(e.target.value)
	};

	const handleMapiKeyChange = (e) => {
		console.log(e);
		setMapiKey(e.target.value)
	};

	return (
		<div>
			<Dialog open={open} sx={{backdropFilter: "blur(5px)"}}>
				<DialogTitle>Enter URL and MAPI-Key</DialogTitle>
				<DialogContent>
					<MoaTypography>
						To use the plugin, <br />
						you need a base URL and an MAPI-key
					</MoaTypography>
					<br />
					<MoaTypography variant="h1">Base URL</MoaTypography>
					<MoaTextField
						autoFocus
						margin="dense"
						id="baseurl"
						placeholder="ex) https://api-beta.midasit.com"
						type="email"
						fullWidth
						variant="standard"
						onChange={handleBaseUrlChange}
					/>
					<div style={{ height: "1rem" }} />
					<MoaTypography variant="h1">MAPI-Key</MoaTypography>
					<MoaTextField
						id="mapikey"
						type="email"
						fullWidth
						variant="standard"
						onChange={handleMapiKeyChange}
					/>
				</DialogContent>
				<DialogActions>
					<MoaButton onClick={handleOk} variant="text">continue</MoaButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}

//enqueueMessage(enqueueSnackbar, "Input the node data", "error");
function App() {
	//Snack bar
	const { enqueueSnackbar } = useSnackbar();
	//For Axle Loads
	const [axleLoads, setAxleLoads] = React.useState(preSetValue[10]["axle"]);
	//For Distributed Loads
	const [distLoads, setDistLoads] = React.useState(12.7);
	const [distLenFor, setDistLenFor] = React.useState(30);
	const [distLenBak, setDistLenBak] = React.useState(30);
	//For Impact Loads
	const [imptFac, setImptFac] = React.useState(25);
	//For Centrifugal Loads
	const [maxSpeed, setMaxSpeed] = React.useState(80);
	const [grvAccel, setGrvAccel] = React.useState(9.81);
	const [centFac, setCentFac] = React.useState(1.333);
	const [radioOp, setRadioOp] = React.useState("MCS");
	const [disText, setDisText] = React.useState(true);
	const [startPt, setStartPt] = React.useState(1);
	const [endPt, setEndPt] = React.useState(1);
	//For Common Setting
	const [preListNb, setPreListNb] = React.useState(10);
	const [lcName, setLcName] = React.useState("KL-510TRK");
	const [nbCases, setNbCases] = React.useState(100);
	const [distSeries, setDistSeries] = React.useState(1);
	//For Load Point Setting
	const [firLoadPos, setFirLoadPos] = React.useState(0);
	const [horEccen, setHorEccen] = React.useState(1.5);
	const [verEccen, setVerEccen] = React.useState(1.8);
	const [orgPtStrPt, setOrgPtStrPt] = React.useState(1.0);
	const [strPtDist1, setStrPtDist1] = React.useState(0);
	const [strPtDist2, setstrPtDist2] = React.useState(0);
	//For Control Panel
	const [elemLen, setElemLen] = React.useState(0);
	const [totLen, setTotLen] = React.useState(0);
	const [envLcomChk, setEnvLcomChk] = React.useState(true);
	const [loadCaseChk, setLoadCaseChk] = React.useState(true);
	const [axeLoadChk, setAxeLoadChk] = React.useState(true);
	const [dstLoadChk, setDstLoadChk] = React.useState(true);
	const [impLoadChk, setImpLoadChk] = React.useState(true);
	const [cntLoadChk, setCntLoadChk] = React.useState(true);
	//Help Modal Actions
	const [openHelpModal, setOpenHelpModal] = React.useState(false);
	const modalHelpOpen = () => setOpenHelpModal(true);
	const modalHelpClose = () => setOpenHelpModal(false);

	const [openFormDlg, setOpenFormDlg] = React.useState(false);
	React.useEffect(() => {
		if (!VerifyUtil.isExistQueryStrings('redirectTo') && !VerifyUtil.isExistQueryStrings('mapiKey')) {
			setOpenFormDlg(true);
		}
	}, []);

	//Radio Button
	React.useEffect(() => {
		if (radioOp === "MCS") {
			setDisText(true);
		} else if (radioOp === "NCS") {
			setDisText(true);
		} else if (radioOp === "CCS") {
			setDisText(false);
		}
	}, [radioOp]);

	//Preset List
	React.useEffect(() => {
		setLcName(preSetList[preListNb]);
		setAxleLoads(preSetValue[preListNb]["axle"]);
		setDistLoads(preSetValue[preListNb]["distributed"][0]);
		setDistLenFor(preSetValue[preListNb]["distributed"][1]);
		setDistLenBak(preSetValue[preListNb]["distributed"][2]);
		setImptFac(preSetValue[preListNb]["impact"]);
		setGrvAccel(preSetValue[preListNb]["centrf"][0]);
		setCentFac(preSetValue[preListNb]["centrf"][1]);
		setVerEccen(preSetValue[preListNb]["eccentric"]);
		setOrgPtStrPt(preSetValue[preListNb]["point"][0]);
		setStrPtDist1(preSetValue[preListNb]["point"][1]);
		setstrPtDist2(preSetValue[preListNb]["point"][2]);
		setAxeLoadChk(preSetValue[preListNb]["option"][0]);
		setImpLoadChk(preSetValue[preListNb]["option"][1]);
		setDstLoadChk(preSetValue[preListNb]["option"][2]);
		setCntLoadChk(preSetValue[preListNb]["option"][3]);
	}, [preListNb]);

	//For Control Panel Button
	const [openModal, setOpenModal] = React.useState(false);
	const ImportModalOpen = () => setOpenModal(true);
	const ImportModalClose = () => setOpenModal(false);
	const [elemInputList, setElemInputList] = React.useState();

	//Show the Load Length
	React.useEffect(() => {
		let axleLength = 0;
		let distForward = 0;
		let distBackward = 0;
		for (let i = 0; i < axleLoads.length - 1; i++) {
			axleLength = axleLength - axleLoads[i]["dist"];
		}
		axleLength = axleLength + orgPtStrPt;
		distForward = strPtDist1 + distLenFor;
		distBackward = (strPtDist2 + distLenBak) * -1;
		let maxLength = Math.max(distForward, orgPtStrPt);
		let minLength = Math.min(distBackward, axleLength);
		let totalLength = maxLength - minLength;
		setTotLen(totalLength);
	}, [axleLoads, distLenFor, distLenBak, orgPtStrPt, strPtDist1, strPtDist2]);

	//Create Load Cases
	async function ClickShowLoads() {
		let resShowLoads = await Loadcase.ShowLoads(lcName, nbCases);
		if (resShowLoads === false) {
			enqueueMessage(
				enqueueSnackbar,
				"Review whether all load cases are exist or not.",
				"error"
			);
			return;
		}
	}

	// Assign Series Loads
	async function ApplySeriesLoads(_elemInputList) {
		//Input Element Check
		if (_elemInputList === undefined) {
			enqueueMessage(enqueueSnackbar, "Input the element data", "error");
			return;
		} else {
			let elemParsing = Common.NEParser(_elemInputList);
			let elemlist = Common.stringTolist(elemParsing);
			if (isNaN(elemlist[0]) || elemlist[0] === 0) {
				enqueueMessage(enqueueSnackbar, "Input the proper data", "error");
				return;
			} else {
				let elemTotalLength = await Common.listToLength(elemParsing);
				if (elemTotalLength === false) {
					enqueueMessage(
						enqueueSnackbar,
						"The element data is empty. Review opened file",
						"error"
					);
					return;
				}
				setElemLen(elemTotalLength);
				ImportModalClose();
			}
		}

		//Axle Load Data Check
		let axleLoadsCheck = Validation.VerticalLoadValid(axleLoads);
		let axleLoadsValid = Validation.checkAllTrue(axleLoadsCheck);
		if (axleLoadsValid === false) {
			enqueueMessage(enqueueSnackbar, "Review the Vertical Loads", "error");
			return;
		}

		//Load Case Check
		if (loadCaseChk) {
			let resCreateLC = await Loadcase.CreateLoadCases(lcName, nbCases);
			if (resCreateLC === "10") {
				enqueueMessage(
					enqueueSnackbar,
					"Review the load case name. It is a duplicate",
					"error"
				);
				return;
			} else if (resCreateLC === "20") {
				enqueueMessage(enqueueSnackbar, "Fail to put the data", "error");
				return;
			}
		} else {
			let LoadCaseExistCheck = await Loadcase.ExistLoadCases(lcName, nbCases);
			if (LoadCaseExistCheck === "10") {
				enqueueMessage(
					enqueueSnackbar,
					"The load case data is empty.",
					"error"
				);
				return;
			} else if (LoadCaseExistCheck === "20") {
				enqueueMessage(
					enqueueSnackbar,
					"Review whether all load cases are exist or not.",
					"error"
				);
				return;
			}
		}
		// Load Combinations
		if (envLcomChk) {
			let resCreateLcom = await Loadcase.CreateLcom(lcName, nbCases);
			if (resCreateLcom === "10") {
				enqueueMessage(
					enqueueSnackbar,
					"Review the combination name. It is a duplicate",
					"error"
				);
				return;
			} else if (resCreateLcom === "20") {
				enqueueMessage(enqueueSnackbar, "Fail to put the data", "error");
				return;
			}
		}
		//Create Loads
		let main_result = await MainFunc.AxleLoads(
			axleLoads,
			distLoads,
			distLenFor,
			distLenBak,
			imptFac,
			maxSpeed,
			grvAccel,
			centFac,
			radioOp,
			startPt,
			endPt,
			lcName,
			nbCases,
			distSeries,
			firLoadPos,
			horEccen,
			verEccen,
			orgPtStrPt,
			strPtDist1,
			strPtDist2,
			_elemInputList,
			axeLoadChk,
			dstLoadChk,
			impLoadChk,
			cntLoadChk
		);
		console.log(main_result);
		if (main_result.length === 0) {
			enqueueMessage(enqueueSnackbar, "Unknow error", "error");
			return;
		}
		for (let i = 0; i < main_result.length; i++) {
			if (main_result[i][1] === true) {
				enqueueMessage(
					enqueueSnackbar,
					"success to send : " + main_result[i][0],
					"success"
				);
			} else if (main_result[i][1] === false) {
				enqueueMessage(
					enqueueSnackbar,
					"fail to send : " + main_result[i][0],
					"error"
				);
			}
		}
	}

	return (
		<div className="App">
			{
				openFormDlg && <FormDialog />
			}
			{ <MoaPanel variant="strock">
				<MoaStack direction="row">
					<MoaStack width={width / 2} height={height}>
						{StyledTypo("Vertical loads")}
						{DataGridAxle(axleLoads, setAxleLoads)}
						<hr className="horLine" />
						{StyledTypo("Distributed loads")}
						{TextInput.BasicInputField(
							"Distributed loads",
							"\\(\\omega=\\)",
							unit_loads,
							distLoads,
							setDistLoads
						)}
						{TextInput.BasicInputField(
							"Length of forward loads",
							"\\( L_1= \\)",
							unit_meter,
							distLenFor,
							setDistLenFor
						)}
						{TextInput.BasicInputField(
							"Length of backward loads",
							"\\( L_2= \\)",
							unit_meter,
							distLenBak,
							setDistLenBak
						)}
						<hr className="horLine" />
						{StyledTypo("Impact loads for Vertical Loads")}
						{TextInput.BasicInputField(
							"Impact factor",
							"\\(I_m=\\)",
							unit_percn,
							imptFac,
							setImptFac
						)}
						<hr className="horLine" />
						{StyledTypo("Centrifugal loads")}
						{TextInput.BasicInputField(
							"Maximum speed",
							"\\(V=\\)",
							unit_speed,
							maxSpeed,
							setMaxSpeed
						)}
						{TextInput.BasicInputField(
							"Gravity acceleration",
							"\\(g= \\)",
							unit_accel,
							grvAccel,
							setGrvAccel
						)}
						{TextInput.BasicInputField(
							"Factors",
							"\\(f= \\)",
							"",
							centFac,
							setCentFac
						)}
						<hr className="horLine" />
						{RadioButtonSpline(radioOp, setRadioOp)}
						<MoaStack
							spacing={2}
							direction="row"
							alignItems="center"
							justifyContent="center"
							marginTop={1}
						>
							{TextInput.SubInputField(
								"Start Point",
								startPt,
								setStartPt,
								disText
							)}
							{TextInput.SubInputField("End Point", endPt, setEndPt, disText)}
						</MoaStack>
					</MoaStack>
					<MoaStack width={width / 2} height={height}>
						{StyledTypo("Common Setting")}
						{SelectVariants(
							"Load Pre-set",
							preSetList,
							preListNb,
							setPreListNb
						)}
						{TextInput.SubInputFieldWide("Load Case Name", lcName, setLcName)}
						<hr className="horLine" />
						{TextInput.BasicInputField(
							"Number of Cases",
							"\\(n=\\)",
							"",
							nbCases,
							setNbCases
						)}
						{TextInput.BasicInputField(
							"Distance of Series loads",
							"\\(d=\\)",
							unit_meter,
							distSeries,
							setDistSeries
						)}
						<hr className="horLine" />
						<MoaStack direction="row" justifyContent="space-between">
							{StyledTypo("Load Points Setting")}
							<IconButton
								aria-label="Delete"
								color="primary"
								onClick={modalHelpOpen}
							>
								<HelpOutlineIcon />
							</IconButton>
						</MoaStack>
						{TextInput.BasicInputField(
							"1st load position",
							"\\(d_0=\\)",
							unit_meter,
							firLoadPos,
							setFirLoadPos
						)}
						{TextInput.BasicInputField(
							"Horizontal eccentric",
							"\\(e_h=\\)",
							unit_meter,
							horEccen,
							setHorEccen
						)}
						{TextInput.BasicInputField(
							"Vertical eccentric",
							"\\(e_v=\\)",
							unit_meter,
							verEccen,
							setVerEccen
						)}
						<hr className="horLine" />
						{TextInput.BasicInputField(
							"Origin point to Start point",
							"\\(x_s=\\)",
							unit_meter,
							orgPtStrPt,
							setOrgPtStrPt
						)}
						{TextInput.BasicInputField(
							"Start Point to Dist. Loads",
							"\\(x_{\\omega1}=\\)",
							unit_meter,
							strPtDist1,
							setStrPtDist1
						)}
						{TextInput.BasicInputField(
							"Start Point to Dist. Loads",
							"\\(x_{\\omega2}=\\)",
							unit_meter,
							strPtDist2,
							setstrPtDist2
						)}
						<hr className="horLine" />
						{StyledTypo("Control Panel")}
						{TextInput.BasicInputFieldHidden(
							"Elem. Length",
							"",
							unit_meter,
							elemLen,
							setElemLen
						)}
						{TextInput.BasicInputFieldHidden(
							"Load Length",
							"",
							unit_meter,
							totLen,
							setTotLen
						)}
						<MoaStack marginX={2}>
							<MoaStack direction="column">
								{CheckboxOption(
									"Create Static Load Cases",
									loadCaseChk,
									setLoadCaseChk
								)}
								{CheckboxOption(
									"With Enveloped Load Combinations",
									envLcomChk,
									setEnvLcomChk
								)}
							</MoaStack>
							<MoaStack direction="row">
								<MoaStack direction="column">
									{CheckboxOption("Axle Loads", axeLoadChk, setAxeLoadChk)}
									{CheckboxOption(
										"Distributed loads",
										dstLoadChk,
										setDstLoadChk
									)}
								</MoaStack>
								<MoaStack direction="column">
									{CheckboxOption("Impact Loads", impLoadChk, setImpLoadChk)}
									{CheckboxOption(
										"Centrifugal Loads",
										cntLoadChk,
										setCntLoadChk
									)}
								</MoaStack>
							</MoaStack>
							<MoaStack
								spacing={1}
								direction="row"
								alignItems="center"
								justifyContent="center"
								marginTop={1}
							>
								{Buttons.WideButtonSubColor(
									"contained",
									"SHOW SERIES LOADS",
									ClickShowLoads
								)}
								{Buttons.WideButton(
									"contained",
									"APPLY SERIES LOADS",
									async () => {
										const data = await Common.midasAPI("GET", "/view/select");
										const arrElem = data["SELECT"]["ELEM_LIST"];
										if (arrElem.length === 0) {
											enqueueMessage(enqueueSnackbar, "No elements are selected", "error");
											return;
										}
										enqueueMessage(enqueueSnackbar, `Getting Selected Elements is successfully (Count: ${arrElem.length})`, "success");
										setElemInputList(arrElem.toString());
										console.log(elemInputList)
										await ApplySeriesLoads(elemInputList);
										// ImportModalOpen();
									}
								)}
							</MoaStack>
						</MoaStack>
					</MoaStack>
				</MoaStack>
			</MoaPanel>
			}
			{Modals.HelpModal(openHelpModal, modalHelpClose)}
			{/* {Modals.ElemImportModal(
				openModal,
				ImportModalClose,
				elemInputList,
				setElemInputList,
				ApplySeriesLoads
			)} */}
		</div>
	);
}

export default App;
