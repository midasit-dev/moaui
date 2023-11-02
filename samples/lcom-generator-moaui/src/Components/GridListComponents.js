import * as React from "react";
import MoaButton from "@midasit-dev/moaui/Button";
import Typography from "@midasit-dev/moaui/Typography";
import MoaStack from "@midasit-dev/moaui/Stack";
import { ListComponent } from "./ListComponent";
import { useSnackbar } from "notistack";
import { makeObject, setStateUpdate } from "../utils";

import * as LCOM from "../Workers/LoadCombinationWorker";
import * as THIS from "../Workers/TimeHistoryWorker";
import * as STLD from "../Workers/StaticLoadWorker";
import * as CSCS from "../Workers/ConstructStageWorker";
import * as SPLC from "../Workers/ResponseSpectrumWorker";
import * as SMLC from "../Workers/SettlementWorker";
import * as MVLD from "../Workers/MovingLoadWorker";

export const GridListComponents = React.forwardRef((props, ref) => {
	const [stldList, setStldList] = React.useState([]);
	const [cscsList, setCscsList] = React.useState([]);
	const [mvldList, setMvldList] = React.useState([]);
	const [lcomList, setLcomList] = React.useState([]);
	const [smlcList, setSmlcList] = React.useState([]);
	const [splcList, setSplcList] = React.useState([]);
	const [thisList, setThisList] = React.useState([]);
	const [doUpdate, setDoUpdate] = React.useState("");
	const { dataRequested, setDataRequested, updateCombData, additionalData } =
		props;
	const updateKit = { doUpdate: doUpdate, setDoUpdate: setDoUpdate };
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		if (dataRequested) {
			let newAllItems = [
				...makeObject(stldList, "(ST)"),
				...makeObject(cscsList, "(CS)"),
				...makeObject(mvldList, "(MV)"),
				...makeObject(lcomList, "(CB)"),
				...makeObject(smlcList, "(SM)"),
				...makeObject(splcList, "(RS)"),
				...makeObject(thisList, "(TH)"),
			];

			if (newAllItems.length === 0) {
				enqueueSnackbar("No Load Cases selected.", { variant: "error" });
			} else {
				updateCombData(newAllItems);
			}

			setDataRequested(false);
		}
	}, [
		dataRequested,
		stldList,
		cscsList,
		mvldList,
		lcomList,
		smlcList,
		splcList,
		thisList,
		updateCombData,
		setDataRequested,
		enqueueSnackbar,
	]);

	const init = () => {
		setDoUpdate("INIT");
		setTimeout(() => {
			setDoUpdate("");
		}, 200);
	};

	React.useImperativeHandle(ref, () => ({ init }));

	React.useEffect(() => {}, []);

	return (
		<React.Fragment>
			<div style={{marginBottom: "10px"}} />
			<MoaStack direction="row" width="100%" height="100%" spacing={1}>
				<MoaStack width="60%" height="100%">
					<Typography variant="body2">Presetted Load Cases</Typography>
					<div style={{marginBottom: "14px"}} />
					<div style={{ display: "flex", flexDirection: "column", width: "100%"}}>
					<MoaStack direction="row" spacing={0.25}>
						<ListComponent
							width="33%"
							label={"Static Load"}
							Loader={STLD.DataLoader}
							checkList={stldList}
							setCheckList={(l) => setStateUpdate(setStldList, l)}
							{...updateKit}
						/>
						<ListComponent
							width="33%"
							label={"Construction Stage"}
							Loader={CSCS.DataLoader}
							checkList={cscsList}
							setCheckList={(l) => setStateUpdate(setCscsList, l)}
							{...updateKit}
						/>
						<ListComponent
							width="33%"
							label={"Moving Load"}
							Loader={MVLD.DataLoader}
							checkList={mvldList}
							setCheckList={(l) => setStateUpdate(setMvldList, l)}
							{...updateKit}
						/>
					</MoaStack>
					<MoaStack direction={"row"} spacing={0.25} marginTop={.25}>
						<ListComponent
							width="33%"
							label={"Settlement Load"}
							Loader={SMLC.DataLoader}
							checkList={smlcList}
							setCheckList={(l) => setStateUpdate(setSmlcList, l)}
							{...updateKit}
						/>
						<ListComponent
							width="33%"
							label={"Response Spectrum"}
							Loader={SPLC.DataLoader}
							checkList={splcList}
							setCheckList={(l) => setStateUpdate(setSplcList, l)}
							{...updateKit}
						/>
						<ListComponent
							width="33%"
							label={"Time History"}
							Loader={THIS.DataLoader}
							checkList={thisList}
							setCheckList={(l) => setStateUpdate(setThisList, l)}
							{...updateKit}
						/>
					</MoaStack>
					</div>
				</MoaStack>
				<MoaStack width="40%">
					<Typography variant="body2">Combined Load Cases</Typography>
					<div style={{marginBottom: "14px"}} />
					<ListComponent
						width="100%"
						height="16rem"
						label={"Load Combinations"}
						userData={{ user: additionalData.LCOM }}
						Loader={LCOM.DataLoader}
						checkList={lcomList}
						setCheckList={(l) => setStateUpdate(setLcomList, l)}
						{...updateKit}
					/>
				</MoaStack>
			</MoaStack>
			<MoaStack direction="row" width="100%" justifyContent="space-between" alignItems="center" marginY="10px">
				<MoaStack direction="row" justifyContent="right" spacing={2}>
					<MoaButton
						onClick={() => {
							setDoUpdate("DESELECT");
						}}
					>
						Deselect All
					</MoaButton>
					<MoaButton
						onClick={() => {
							setDoUpdate("SELECT");
						}}
					>
						Select All
					</MoaButton>
				</MoaStack>
				<MoaButton onClick={() => setDataRequested(true)}>ADD CHECKED ITEM TO LIST</MoaButton>
			</MoaStack>
		</React.Fragment>
	);
});
