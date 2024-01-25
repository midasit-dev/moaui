import "./App.css";
import * as React from "react";
// Material UI import data
import { GuideBox, Panel } from "@midasit-dev/moaui";
import { useSnackbar } from "notistack";
// UserDefined Components
import RadioButtonsGroup from "./Components/RadioGroup";
import MoaTextFieldV2 from "@midasit-dev/moaui/Components/TextFieldV2";
// import TextFieldInput from "./Components/TextField";
import MoaButton from "@midasit-dev/moaui/Components/Button/Styled";
import * as Charts from "./Components/Chart";
import * as Modals from "./Components/Modal";
import * as Common from "./Function/Common";
import * as Spline from "./Function/Spline";
import MoaTypography from "@midasit-dev/moaui/Components/Typography";

import { VerifyDialog, VerifyUtil } from '@midasit-dev/moaui';

const enqueueMessage = (func, message, variant = "error") => {
	func(message, {
		variant: variant,
		autoHideDuration: variant === 'success' ? 1500 : 3000,
		anchorOrigin: { vertical: "bottom", horizontal: "center" },
	});
};

function Main() {
	//SnackBar
	const { enqueueSnackbar } = useSnackbar();
	//Variable for UI
	const [radioOp, setRadioOp] = React.useState("MCS");
	const [disText, setDisText] = React.useState(true);
	const [startPt, setStartPt] = React.useState(1);
	const [endPt, setEndPt] = React.useState(1);
	const [node, setNode] = React.useState();
	//Nodes Modal Actions
	const [nodeDialogState, setNodeDialogState] = React.useState(false);
	const openNodeDialog = () => setNodeDialogState(true);
	const closeNodeDialog = () => setNodeDialogState(false);
	//Help Modal Actions
	const [helpDialogState, setHelpDialogState] = React.useState(false);
	const openHelpDialog = () => setHelpDialogState(true);
	const closeHelpDialog = () => setHelpDialogState(false);
	//Chart Variable
	const [chartNodeData, setChartNodeData] = React.useState([
		{ id: "Line", data: [{ x: 0, y: 0 }] },
	]);
	const [chartSplineData, setChartSplineData] = React.useState([
		{ id: "Line", data: [{ x: 0, y: 0 }] },
	]);
	const [chartScale, setChartScale] = React.useState([
		"auto",
		"auto",
		"auto",
		"auto",
	]);
	//Node vertices
	const [nodeVertix, setNodeVertix] = React.useState();

	//Button Actions for Node import
	async function showNode(_node) {
		if (_node === undefined) {
			enqueueMessage(enqueueSnackbar, "Input the node data", "error");
		} else {
			let nodeParsing = Common.NEParser(_node);
			let nodelist = Common.stringTolist(nodeParsing);
			if (isNaN(nodelist[0]) || nodelist[0] === 0) {
				enqueueMessage(enqueueSnackbar, "Input the proper data", "error");
			} else if (nodelist.length <= 1) {
				enqueueMessage(enqueueSnackbar, "Input two or more nodes", "error");
			} else {
				let nodeCoor = await Common.listTochartData(nodelist);
				if (nodeCoor === false) {
					enqueueMessage(
						enqueueSnackbar,
						"Inputed nodes are not exist",
						"error"
					);
				} else if (typeof nodeCoor === "string") {
					enqueueMessage(enqueueSnackbar, nodeCoor, "error");
				} else {
					setChartNodeData([
						{
							id: "Line",
							data: nodeCoor[0],
						},
					]);
					// closeNodeDialog();
					let chartMaxMin = Common.chartScale(nodeCoor[0]);
					setChartScale(chartMaxMin);
					setNodeVertix(() => {
						let importNb = new Array(3);
						importNb = [nodeCoor[1], nodeCoor[2], nodeCoor[3]];
						return importNb;
					});
				}
			}
		}
	}

	//Sending API Data
	async function LocalAxis() {
		if (nodeVertix === undefined) {
			enqueueMessage(enqueueSnackbar, "Input the node data", "error");
		} else {
			try {
				let LocalAxisResult;
				let div = 1;
				if (radioOp === "MCS") {
					LocalAxisResult = Spline.MonotoneCubicSpline(
						nodeVertix[1],
						nodeVertix[2],
						div
					);
				} else if (radioOp === "NCS") {
					LocalAxisResult = Spline.NaturalCubicSpline(
						nodeVertix[1],
						nodeVertix[2],
						div
					);
				} else if (radioOp === "CCS") {
					LocalAxisResult = Spline.ClampedCubicSpline(
						nodeVertix[1],
						nodeVertix[2],
						div,
						startPt,
						endPt
					);
				}
				let jsonbody = {};
				for (let i = 0; i < LocalAxisResult.length; i++) {
					jsonbody[nodeVertix[0][i]] = {
						iMETHOD: 1,
						ANGLE_X: 0,
						ANGLE_Y: 0,
						ANGLE_Z: Math.atan(LocalAxisResult[i][2]) * (180 / Math.PI),
					};
				}
				jsonbody = { Assign: jsonbody };
				await Common.midasAPI("PUT", "/db/skew", jsonbody);
			} catch (error) {
				console.log(error);
			}
		}
	}

	//Show the Chart by Spline
	React.useEffect(() => {
		try {
			let div = 10;
			let LocalAxisResult;
			if (nodeVertix !== undefined) {
				if (radioOp === "MCS") {
					LocalAxisResult = Spline.MonotoneCubicSpline(
						nodeVertix[1],
						nodeVertix[2],
						div
					);
				} else if (radioOp === "NCS") {
					LocalAxisResult = Spline.NaturalCubicSpline(
						nodeVertix[1],
						nodeVertix[2],
						div
					);
				} else if (radioOp === "CCS") {
					LocalAxisResult = Spline.ClampedCubicSpline(
						nodeVertix[1],
						nodeVertix[2],
						div,
						startPt,
						endPt
					);
				}
				let dviSplineChart = [];
				for (let i = 0; i < LocalAxisResult.length; i++) {
					dviSplineChart.push({
						x: LocalAxisResult[i][0],
						y: LocalAxisResult[i][1],
					});
				}
				setChartSplineData([
					{
						id: "Line",
						data: dviSplineChart,
					},
				]);
				let chartMaxMin = Common.chartScale(dviSplineChart);
				setChartScale(chartMaxMin);
			}
		} catch (error) {
			console.log(error);
		}
	}, [chartNodeData, nodeVertix, radioOp, startPt, endPt]);

	//Disable or Able Textfield denpend on the Radio Button
	React.useEffect(() => {
		if (radioOp === "MCS") {
			setDisText(true);
		} else if (radioOp === "NCS") {
			setDisText(true);
		} else if (radioOp === "CCS") {
			setDisText(false);
		}
	}, [radioOp]);

	return (
		<GuideBox padding={2} spacing={2}>
			<Panel variant="shadow2" width="100%">
				<GuideBox spacing={1}>
					<GuideBox width="100%" row horSpaceBetween>

						<GuideBox spacing={1} paddingBottom={1}>
							<GuideBox spacing={1}>
								<MoaTypography variant="h1">Cubic Spline</MoaTypography>
								<GuideBox paddingLeft={1}>
									{RadioButtonsGroup(radioOp, setRadioOp)}
								</GuideBox>
							</GuideBox>
						</GuideBox>

						<GuideBox>
							<GuideBox spacing={1} center>
								<MoaButton variant="contained" width="100%" onClick={openHelpDialog}>SPLINE</MoaButton>
								<MoaButton variant="contained" width="100%" onClick={async () => {
									const data = await Common.midasAPI("GET", "/view/select");
									const arrNode = data["SELECT"]["NODE_LIST"];
									if (arrNode.length === 0) {
										enqueueMessage(enqueueSnackbar, "No Nodes are selected", "error");
									}
									enqueueMessage(enqueueSnackbar, `Getting Selected Nodes is successfully (Count: ${arrNode.length})`, "success");
									const strNodes = arrNode.toString();
									setNode(strNodes);
									await showNode(strNodes);
									// openNodeDialog();
								}}>
									IMPORT NODE
								</MoaButton>
								<MoaButton variant="contained" width="100%" onClick={LocalAxis} color='negative'>APPLY LOCAL AXIS</MoaButton>
							</GuideBox>
						</GuideBox>

					</GuideBox>
					<GuideBox width="100%" spacing={2} row paddingLeft={1}>
						<GuideBox row verCenter spacing={1}>
							<MoaTypography>Start Point</MoaTypography>
							<MoaTextFieldV2 placeholder={disText + ""} value={startPt} onChange={(e) => setStartPt(e.target.value)} />
						</GuideBox>
						<GuideBox row verCenter spacing={1}>
							<MoaTypography>End Point</MoaTypography>
							<MoaTextFieldV2 placeholder={disText + ""} value={endPt} onChange={(e) => setEndPt(e.target.value)} />
						</GuideBox>
					</GuideBox>
				</GuideBox>
			</Panel>

			<Panel variant='shadow2' width="100%" height="350px" padding={0}>
				<GuideBox>
					<div className="userWrap">
						<div className="chartStyle">
							{Charts.ChartScatter(chartNodeData, chartScale)}
						</div>
						<div className="chartStyle">
							{Charts.ChartLine(chartSplineData, chartScale)}
						</div>
					</div>
				</GuideBox>
			</Panel>
			{/* {Modals.NodeImportDialog(nodeDialogState, closeNodeDialog, setNode, showNode)} */}
			{Modals.HelpDialog(helpDialogState, closeHelpDialog)}
		</GuideBox>
	);
}

function App() {
	//moaUI Verify Dialog
	const [openFormDlg, setOpenFormDlg] = React.useState(false);
	React.useEffect(() => {
		if (!VerifyUtil.isExistQueryStrings('redirectTo') && !VerifyUtil.isExistQueryStrings('mapiKey')) {
			setOpenFormDlg(true);
		}
	}, []);

	return (
		<div className="App">
			{openFormDlg ? <VerifyDialog /> :
				<>
					<Main />
				</>
			}
		</div>
	);
}

export default App;
