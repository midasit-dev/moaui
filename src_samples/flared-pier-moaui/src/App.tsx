import React from "react";
import {
  GuideBox,
  Panel,
	Button,
	Table, TableHead, TableRow, TableCell, TableBody,
	Typography,
	Icon,
	IconButton,
	Dialog,
	Tooltip,
} from "@midasit-dev/moaui";
import InfoDialog from "./Components/InfoDialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { VarBngrID, VarBngrIDList, VarCapBotLen, VarCapBotMatlID, VarCapBotMatlIDList, VarCapBotSectID, VarCapBotSectIDList, VarCapTopLen, VarCapTopMatlID, VarCapTopMatlIDList, VarCapTopSectID, VarCapTopSectIDList, VarColumnLen, VarColumnMatlID, VarColumnMatlIDList, VarColumnSectID, VarColumnSectIDList, VarGrupID, VarGrupIDList, VarStartNodeNb, VarValidations } from "./Components/variables";
import CompRefresh from "./Components/Refresh";
import CompTypographyAndDropList from "./Components/TypographyAndDropList";
import CompTypographyAndTextField from "./Components/TypographyAndTextField";
import CompSingleDropList from "./Components/SingleDropList";
import CompSelectedReferenceNodes from "./Components/SelectedReferenceNodes";
import { create_pier } from "./pyscript_utils";
import CompUnitNotation from "./Components/UnitNotation";
import { useSnackbar } from "notistack";
import CompPileStartNodeNo from "./Components/PileStartNodeNo";

const App = () => {
	const {enqueueSnackbar} = useSnackbar();

	const [openInfo, setOpenInfo] = React.useState(false);

	const validations = useRecoilValue(VarValidations);

	const [grup_ID, setGrup_ID] = useRecoilState(VarGrupID);
	const [bngr_ID, setBngrID] = useRecoilState(VarBngrID);
	const start_node_nb = useRecoilValue(VarStartNodeNb);
	const [column_sect_ID, setColumn_sect_ID] = useRecoilState(VarColumnSectID);
	const [cap_bot_sect_ID, setCap_bot_sect_ID] = useRecoilState(VarCapBotSectID);
	const [cap_top_sect_ID, setCap_top_sect_ID] = useRecoilState(VarCapTopSectID);
	const [column_matl_ID, setColumn_matl_ID] = useRecoilState(VarColumnMatlID);
	const [cap_bot_matl_ID, setCap_bot_matl_ID] = useRecoilState(VarCapBotMatlID);
	const [cap_top_matl_ID, setCap_top_matl_ID] = useRecoilState(VarCapTopMatlID);
	const [column_len, setColumn_len] 	= useRecoilState(VarColumnLen);
	const [cap_bot_len, setCap_bot_len] = useRecoilState(VarCapBotLen);
	const [cap_top_len, setCap_top_len] = useRecoilState(VarCapTopLen);

	const grup_ID_list = useRecoilValue(VarGrupIDList);
	const bngr_ID_list = useRecoilValue(VarBngrIDList);
	const column_sect_ID_list = useRecoilValue(VarColumnSectIDList);
	const cap_bot_sect_ID_list = useRecoilValue(VarCapBotSectIDList);
	const cap_top_sect_ID_list = useRecoilValue(VarCapTopSectIDList);
	const column_matl_ID_list = useRecoilValue(VarColumnMatlIDList);
	const cap_bot_matl_ID_list = useRecoilValue(VarCapBotMatlIDList);
	const cap_top_matl_ID_list = useRecoilValue(VarCapTopMatlIDList);

	const validationCheckLists = [
		{ title: "Structure Group", value: grup_ID, error: !validations.grup_ID(grup_ID), reason: "NONE" },
		{ title: "Boundary Group", value: bngr_ID, error: !validations.bngr_ID(bngr_ID), reason: "NONE" },
		{ title: "Pile Start Node No.", value: start_node_nb, error: !validations.start_node_nb(start_node_nb), reason: "It must be between 1 and 1,000,000 or duplicated node number" },
		{ title: "Column Section", value: column_sect_ID, error: !validations.column_sect_ID(column_sect_ID), reason: "NONE" },
		{ title: "Cap Bottom Section", value: cap_bot_sect_ID, error: !validations.cap_bot_sect_ID(cap_bot_sect_ID), reason: "NONE" },
		{ title: "Cap Top Section", value: cap_top_sect_ID, error: !validations.cap_top_sect_ID(cap_top_sect_ID), reason: "NONE" },
		{ title: "Column Material", value: column_matl_ID, error: !validations.column_matl_ID(column_matl_ID), reason: "NONE" },
		{ title: "Cap Bottom Material", value: cap_bot_matl_ID, error: !validations.cap_bot_matl_ID(cap_bot_matl_ID), reason: "NONE" },
		{ title: "Cap Top Material", value: cap_top_matl_ID, error: !validations.cap_top_matl_ID(cap_top_matl_ID), reason: "NONE" },
		{ title: "Column Length", value: column_len, error: !validations.column_len(column_len), reason: "It must be larger than 0" },
		{ title: "Cap Bottom Length", value: cap_bot_len, error: !validations.cap_bot_len(cap_bot_len), reason: "It must be larger than 0" },
		{ title: "Cap Top Length", value: cap_top_len, error: !validations.cap_top_len(cap_top_len), reason: "It must be larger than 0" },
	];

	const [loading, setLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [disabledCreateButton, setDisabledCreateButton] = React.useState(true);

  return (
		<GuideBox width='100%' center>

			<GuideBox padding={1} spacing={2} width={430} center>
				
				<GuideBox width={"100%"} height={30} row verCenter horSpaceBetween>
					<GuideBox row verCenter>
						<Typography variant="h1">Pier Option</Typography>
						<IconButton transparent={true} marginLeft={"2px"} onClick={() => setOpenInfo(true)}><Icon iconName="ErrorOutline" /></IconButton>
						<InfoDialog open={openInfo} setOpen={setOpenInfo}/>
					</GuideBox>
					<GuideBox>
						<CompUnitNotation />
					</GuideBox>
				</GuideBox>

				<CompTypographyAndDropList title="Structural Group" list={grup_ID_list}  state={grup_ID} setState={setGrup_ID} />
				<CompTypographyAndDropList title="Boundary Group" list={bngr_ID_list}  state={bngr_ID} setState={setBngrID} />
				<CompPileStartNodeNo />
				<CompSelectedReferenceNodes />

				<Panel variant="shadow2" width={"100%"} marginTop={1}>
					<GuideBox width={"100%"}>
						<Table>
							<TableHead>
								<TableRow>
									{["Component", "Column", "Cap Bot", "Cap Top"].map((header, index) => 
										<TableCell key={index}>
											<Typography center>{header}</Typography>
										</TableCell>
									)}
								</TableRow>
							</TableHead>
							<TableBody>
									{[
										[
											"Section", 
											<CompSingleDropList list={column_sect_ID_list} state={column_sect_ID} setState={setColumn_sect_ID} />,
											<CompSingleDropList list={cap_bot_sect_ID_list} state={cap_bot_sect_ID} setState={setCap_bot_sect_ID} />,
											<CompSingleDropList list={cap_top_sect_ID_list} state={cap_top_sect_ID} setState={setCap_top_sect_ID} />,
										],
										[
											"Material", 
											<CompSingleDropList list={column_matl_ID_list} state={column_matl_ID} setState={setColumn_matl_ID} />,
											<CompSingleDropList list={cap_bot_matl_ID_list} state={cap_bot_matl_ID} setState={setCap_bot_matl_ID} />,
											<CompSingleDropList list={cap_top_matl_ID_list} state={cap_top_matl_ID} setState={setCap_top_matl_ID} />,
										],
										[
											"Length(+Z)",
											<CompTypographyAndTextField textFieldWidth={82} state={column_len} setState={setColumn_len} 	error={!validations.column_len(column_len)} />,
											<CompTypographyAndTextField textFieldWidth={82} state={cap_bot_len} setState={setCap_bot_len} error={!validations.cap_bot_len(cap_bot_len)} />,
											<CompTypographyAndTextField textFieldWidth={82} state={cap_top_len} setState={setCap_top_len} error={!validations.cap_top_len(cap_top_len)} />,
										],
									].map((row, index) => {
										return (
											<TableRow key={index}>
												{row.map((cell, index) => <TableCell key={index}>{cell}</TableCell>)}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</GuideBox>
				</Panel>
				<GuideBox width="100%" height={30} row horSpaceBetween verCenter marginTop={1}>
					<CompRefresh />
					<Button 
						color="negative" 
						variant="contained" 
						onClick={() => {
							const hasError = validationCheckLists.some((item) => item.error);
							setDisabledCreateButton(hasError);
							setOpen(true);
						}}
					>
						Create
					</Button>
					<Dialog
						open={open}
						setOpen={setOpen}
						headerTitle="Validation Check"
					>
						<GuideBox spacing={2}>
							<Typography variant="h1">Input Values</Typography>
							<GuideBox opacity={0.9} paddingBottom={1.5} spacing={1}>
								{validationCheckLists.map((item, index) => (
									<GuideBox key={index} row spacing={2}>
										<GuideBox width={200} row horSpaceBetween>
											<Typography variant="body1">{item.title}</Typography>
											<Typography variant="h1" color={item.error ? "red" : "primary"}>{item.value !== null ? item.value.toString() : '-'}</Typography>
										</GuideBox>
										{item.error ?
											<Tooltip title={<Typography variant="body1" color="red">{item.reason}</Typography>} placement="top">
												<Typography variant="body1" color="red">ER</Typography>
											</Tooltip>
											:
											<Typography variant="body1" color='primary'>OK</Typography>
										}
									</GuideBox>
								))}
							</GuideBox>
							<Button 
								width="100%" 
								color="negative" 
								disabled={disabledCreateButton}
								onClick={() => {
									setLoading(true);

									setTimeout(() => {
										try {
											const res = create_pier(
												grup_ID,
												bngr_ID,
												start_node_nb,
												column_sect_ID,
												cap_bot_sect_ID,
												cap_top_sect_ID,
												column_matl_ID,
												cap_bot_matl_ID,
												cap_top_matl_ID,
												column_len,
												cap_bot_len,
												cap_top_len,
											);
		
											if (res.hasOwnProperty('error')) {
												enqueueSnackbar(res['error'], { variant: 'error' });
											}
		
											if (res.hasOwnProperty('success')) {
												enqueueSnackbar(res['success'], { variant: 'success' });
											}
										} catch (err) {
											console.error(err);
										} finally {
											setLoading(false);
											setOpen(false);
										}
									}, 500);
								}}
								loading={loading}
							>
								Create
							</Button>
						</GuideBox>
					</Dialog>
				</GuideBox>
			</GuideBox>
		</GuideBox>
	);
}

export default App;