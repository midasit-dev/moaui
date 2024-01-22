import './App.css';
import * as React from 'react';
import { GuideBox, Panel } from '@midasit-dev/moaui';
import MoaStack from "@midasit-dev/moaui/Components/Stack";
import Sep from '@midasit-dev/moaui/Components/Separator';
import { useSnackbar } from 'notistack';
// UserDefined Components
import * as Buttons from './Components/Buttons'
import * as Modals from './Components/Modal'
import * as DataGrids from './Components/Datagrid';
import * as Charts from './Components/Chart';
import TextFieldInput from './Components/TextField'
import VerticalTabs from './Components/Tabs';
import { CreateLayout } from './Function/CreateLayout';
import { midasAPI, convertChartData, chartScaleSet } from './Function/Common';
import { checkAllTrue, AlignDataValid, SegmDataValid, NodeElemValid } from './Function/Validation';
import { VerifyUtil, VerifyDialog, MidasController } from "@midasit-dev/moaui";
// import MKeyDialog from "./Components/MKeyDialog";

//Data Grid Default Setting
const AlignDefault = [
  { id: 1, linetype: "Straight", linelength: 30, linerads: 0, linerade: 0 },
];

const SegmDefault = [
  { id: 1, seglength: 1, segNumber: 30, strgroup: "Seg1", matlid: 1, sectid: 1 },
];

//Chart Default Setting
const chartDefault = [{ "id": "Line", "data": [{ "x": 0, "y": 0 }] }];
const chartScaleDefault = ['auto', 'auto', 'auto', 'auto'];

//Snack Bar
const enqueueMessage = (func, message, variant = "error") => {
  func(
    message,
      {
        variant: variant,
        autoHideDuration: 3000,
        anchorOrigin:{ vertical: "bottom", horizontal: "center" }
      },
  );
};

function Separator() {
	return (
		<div width="100%">
			<Sep direction="vertical" />
		</div>
	);
}

function App() {
	const [showDialog, setDialogShowState] = React.useState(false);

  //SnackBar
  const { enqueueSnackbar } = useSnackbar();
  //Node & Element
  const [nodeStart, setNodeStart] = React.useState(1);
  const [elemStart, setElemStart] = React.useState(1);
  //Tabs
  const [tabValue, setTabValue] = React.useState(0);
  //DataGrid
  const [alignGrid, setAlignGrid] = React.useState(AlignDefault);
  const [segmGrid, setSegmGrid] = React.useState(SegmDefault);
  //Chart Variable
  const [chartNodeData, setChartNodeData] = React.useState(chartDefault);
  const [chartLineData, setChartLineData] = React.useState(chartDefault);
  const [chartScale, setChartScale] = React.useState(chartScaleDefault);
  //AlignHelpModal
  const [openAlignModal, setOpenAlignModal] = React.useState(false);
  const AlignModalOpen = () => setOpenAlignModal(true);
  const AlignModalClose = () => setOpenAlignModal(false);
  //SegmHelpModal
  const [openSegmModal, setOpenSegmModal] = React.useState(false);
  const SegmModalOpen = () => setOpenSegmModal(true);
  const SegmModalClose = () => setOpenSegmModal(false);
  //Draw Chart
  React.useEffect(() => {
    let AlignValid = AlignDataValid(alignGrid);
    let AlignValidCheck = checkAllTrue(AlignValid);
    if (AlignValidCheck) {
      let layoutData = CreateLayout(nodeStart, elemStart, alignGrid, segmGrid);
      let chartData = convertChartData(layoutData);
      if (chartData !== false) {
        setChartNodeData(chartData);
        setChartLineData(chartData);
        setChartScale(chartScaleSet(chartData));
      } else {
        setChartNodeData(chartDefault);
        setChartLineData(chartDefault);
        setChartScale(chartScaleDefault);
      }
    } else {
      setChartNodeData(chartDefault);
      setChartLineData(chartDefault);
      setChartScale(chartScaleDefault);
    }
  },
    [alignGrid, segmGrid, elemStart, nodeStart]
  )

  //Data Check then Action
  async function checkData() {
    //Valid Check
    let AlignValid = AlignDataValid(alignGrid);
    let SegmValid = SegmDataValid(segmGrid);
    let NdElValid = NodeElemValid(nodeStart,elemStart);
    //All Valid Check
    let AlignValidCheck = checkAllTrue(AlignValid);
    let SegmValidCheck = checkAllTrue(SegmValid);
    let NdElValidCheck = checkAllTrue(NdElValid);
    //Sending API Data or Error Message
    if (AlignValidCheck && SegmValidCheck && NdElValidCheck) {
      let resData = await SendData();
      for (let i = 0; i < resData.length; i++) {
        enqueueMessage(enqueueSnackbar, resData[i][1], resData[i][0]);  
      }
    } else {
      let errorMessage;
      //Alignment Data Error Message
      for (let i = 0; i < AlignValid.length; i++) {
        if (AlignValid[i].valid === false) {
          errorMessage = "Review Alignments Data Row #" + (i+1)
          enqueueMessage(enqueueSnackbar, errorMessage, "error");
        }
      }
      //Segment Data Error Message
      for (let i = 0; i < SegmValid.length; i++) {
        if (SegmValid[i].valid === false) {
          errorMessage = "Review Segments Data Row #" + (i+1)
          enqueueMessage(enqueueSnackbar, errorMessage, "error");
        }
      }
      //Node & Element Error Message
      for (let i = 0; i < NdElValid.length; i++) {
        if (NdElValid[i].valid === false) {
          errorMessage = NdElValid[i].message;
          enqueueMessage(enqueueSnackbar, errorMessage, "error");
        }
      }
    }
  };
  
  //Sending API
  async function SendData() {
    let layoutData = CreateLayout(nodeStart, elemStart, alignGrid, segmGrid);
    let dbNode = layoutData[2];
    let dbElem = layoutData[3];
    let dbSkew = layoutData[4];
    let dbGrup = layoutData[5];

    let resNode = await midasAPI("PUT", "/db/node", dbNode);
    let resElem = await midasAPI("PUT", "/db/elem", dbElem);
    let resSkew = await midasAPI("PUT", "/db/skew", dbSkew);
    let resGrup = await midasAPI("PUT", "/db/grup", dbGrup);

    let rtNode, rtElem, rtSkew, rtGrup;
    let resAPI = [resNode, resElem, resSkew, resGrup];
    let rtAPI = [rtNode, rtElem, rtSkew, rtGrup];
    let dbCMD = ["NODE", "ELEM", "SKEW", "GRUP"]

    for (let i = 0; i < resAPI.length; i++) {
      if ("message" in resAPI[i]) {
        rtAPI[i] = ["error", dbCMD[i] + " : " + resNode.message];
      } else if ("error" in resAPI[i]) {
        rtAPI[i] = ["error", dbCMD[i] + " : " + resNode.error.message];
      } else if (dbCMD[i] in resAPI[i]) {
        rtAPI[i] = ["success", dbCMD[i] + " : data parsed successfully"];
      } else {
        rtAPI[i] = ["error", dbCMD[i] + " : unknown error"];
      }
    }
    return rtAPI;
  }
  //Clear Data Grid
  function clearData() {
    setAlignGrid([]);
    setSegmGrid([]);
    setChartNodeData(chartDefault);
    setChartLineData(chartDefault);
    setChartScale(chartScaleDefault);
  }

  React.useEffect(() => {
	console.log({
		align: alignGrid,
		segm: segmGrid,
	})
  }, [alignGrid, segmGrid]);

  React.useEffect(() => {
	if (
		!VerifyUtil.isExistQueryStrings("redirectTo") &&
		!VerifyUtil.isExistQueryStrings("mapiKey")
	) {
		setDialogShowState(true);
	}
}, []);

  //Main UI
  return (
	<div className="App" >
		{/* {showDialog && <MKeyDialog />} */}
		{showDialog && <VerifyDialog />}
		{process.env.NODE_ENV === 'development' && <MidasController title='Create alignment' icoSrc={`${process.env.PUBLIC_URL}/favicon.ico`}/>}
		<GuideBox
			padding={2}
			center
		>
			<Panel width={630} height={657} variant='shadow2'>
				<MoaStack direction="row" justifyContent="space-between" alignItems="center" marginY={1}>
					<MoaStack direction="row" spacing={2}>
						{TextFieldInput("Start Node", nodeStart, setNodeStart)}
						{TextFieldInput("Start Elem", elemStart, setElemStart)}
					</MoaStack>
					<MoaStack direction="row" spacing={1}>
						{Buttons.MainButton("contained", "Create", checkData)}
						{Buttons.SubButton("contained", "Data Clear", clearData)}
					</MoaStack>
				</MoaStack>
				<Separator />
				<MoaStack height={293}>
					{VerticalTabs(
						tabValue, setTabValue,
						DataGrids.DataGridAlign(alignGrid, setAlignGrid, AlignModalOpen),
						DataGrids.DataGridSegm(segmGrid, setSegmGrid, SegmModalOpen)
					)}
				</MoaStack>
				<Separator />
				<MoaStack height={295} padding={0}>
				<div className='userWrap'>
					<div className='chartStyle'>
						{Charts.ChartScatter(chartNodeData, chartScale)}
					</div>
					<div className='chartStyle'>
						{Charts.ChartLine(chartLineData, chartScale)}
					</div>
				</div>
				</MoaStack>
			</Panel>
			{Modals.AlignHelp(openAlignModal, AlignModalClose)}
			{Modals.SegmHelp(openSegmModal, SegmModalClose)}
		</GuideBox>
	</div>
  );
}

export default App;