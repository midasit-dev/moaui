import "./App.css";
import * as React from "react";
// Material UI import data
import MoaPanel from "@midasit-dev/moaui/Panel";
import MoaGrid from "@midasit-dev/moaui/Grid";
import MoaStack from "@midasit-dev/moaui/Stack";
import { useSnackbar } from "notistack";
// UserDefined Components
import RadioButtonsGroup from "./Components/RadioGroup";
import MoaTextField from "@midasit-dev/moaui/TextField";
// import TextFieldInput from "./Components/TextField";
import MoaButton from "@midasit-dev/moaui/Button/Styled";
import * as Charts from "./Components/Chart";
import * as Modals from "./Components/Modal";
import * as Common from "./Function/Common";
import * as Spline from "./Function/Spline";
import MoaTypography from "@midasit-dev/moaui/Typography";

const enqueueMessage = (func, message, variant = "error") => {
	func(message, {
		variant: variant,
		autoHideDuration: 3000,
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
	async function showNode() {
		if (node === undefined) {
			enqueueMessage(enqueueSnackbar, "Input the node data", "error");
		} else {
			let nodeParsing = Common.NEParser(node);
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
					closeNodeDialog();
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
		<MoaPanel>
			<MoaGrid container spacing={1} paddingBottom={1}>
				<MoaGrid item xs={8}>
					<MoaPanel>
						<MoaStack margin="20px" justifyContent="left">
							<MoaTypography variant="h1">Cubic Spline</MoaTypography>
							{RadioButtonsGroup(radioOp, setRadioOp)}
							<br />
							<MoaStack
								spacing={2}
								direction="row"
								justifyContent="right"
								alignItems="center"
							>
								<MoaTextField title="Start Point" placeholder={disText + ""} value={startPt} onChange={(e) => setStartPt(e.target.value)} />
								<MoaTextField title="End Point" placeholder={disText + ""} value={endPt} onChange={(e) => setEndPt(e.target.value)} />
							</MoaStack>
						</MoaStack>
					</MoaPanel>
				</MoaGrid>
				<MoaGrid item xs={4}>
					<MoaStack
						spacing={1}
						direction="column"
						justifyContent="center"
						alignItems="center"
						height="100%"
					>
						<MoaButton variant="contained" width="100%" onClick={openHelpDialog}>
							SPLINE
						</MoaButton>
						<MoaButton variant="contained" width="100%" onClick={openNodeDialog}>
							IMPORT NODE
						</MoaButton>
						<MoaButton variant="contained" width="100%" onClick={LocalAxis}>
							APPLY LOCAL AXIS
						</MoaButton>
					</MoaStack>
				</MoaGrid>
			</MoaGrid>
			<MoaPanel width="600px" height="350px">
				<MoaStack spacing={1} paddingBottom={1}>
					<div className="userWrap">
						<div className="chartStyle">
							{Charts.ChartScatter(chartNodeData, chartScale)}
						</div>
						<div className="chartStyle">
							{Charts.ChartLine(chartSplineData, chartScale)}
						</div>
					</div>
				</MoaStack>
			</MoaPanel>
			{Modals.NodeImportDialog(nodeDialogState, closeNodeDialog, setNode, showNode)}
			{Modals.HelpDialog(helpDialogState, closeHelpDialog)}
		</MoaPanel>
	);
}

function App() {
	return (
		<div className="App">
			<div className="MainApp">
				<Main />
			</div>
		</div>
	);
}

export default App;
