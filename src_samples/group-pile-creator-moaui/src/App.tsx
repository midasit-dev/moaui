import React from "react";
import {
  Button,
  Check,
  GuideBox,
  Typography,
  Panel,
	Dialog,
	Tooltip,
} from "@midasit-dev/moaui";

import CompLengthUnit from "./Components/LengthUnit";
import CompGroupPileAndCapOptions from "./Components/GroupPileAndCapOptions";
import CompTypographyAndTextField from "./Components/TypographyAndTextField";
import {
  VarBngrID,
  VarCapHeight,
  VarCapMatlID,
  VarCapModeling,
  VarCapSectID,
  VarCapStartNb,
  VarGrupID,
  VarPileDia,
  VarPileLength,
  VarPileMatlID,
  VarPileSectID,
  VarPileStartNb,
	VarValidations,
  VarGrupIDList,
	VarBngrIDList,
	VarPileMatlIDList,
	VarPileSectIDList,
	VarCapMatlIDList,
	VarCapSectIDList,
	VarPileArrayLong,
	VarPileArrayTran,
	VarPileSpacingLong,
	VarPileSpacingTran,
	VarCapEdgeSpacingLong,
	VarCapEdgeSpacingTran,
	VarSpacingStyleInt,
} from "./Components/variables";
import { useRecoilState, useRecoilValue } from "recoil";
import CompTypographyAndDropList from "./Components/TypographyAndDropList";
import CompRefresh from "./Components/Refresh";
import { createGroupPile } from "./pyscript_utils";
import { useSnackbar } from "notistack";

const App = (props: any) => {
	const validations = useRecoilValue(VarValidations);

  // Group Pile Option - [Typography And DropList]
  const [grup_ID, setGrup_ID] = useRecoilState(VarGrupID);
  const [bngr_ID, setBngr_ID] = useRecoilState(VarBngrID);
  const [pile_matl_ID, setPile_matl_ID] = useRecoilState(VarPileMatlID);
  const [pile_sect_ID, setPile_sect_ID] = useRecoilState(VarPileSectID);
  const [cap_matl_ID, setCap_matl_ID] = useRecoilState(VarCapMatlID);
  const [cap_sect_ID, setCap_sect_ID] = useRecoilState(VarCapSectID);

  // Group Pile Option - [Typography And TextField]
  const [pile_start_nb, setPile_start_nb] = useRecoilState(VarPileStartNb);
  const [cap_start_nb, setCap_start_nb] = useRecoilState(VarCapStartNb);

	// @see Group Pile & Cap Option Table Values - GroupPileAndCapOptions.tsx
	const pile_array_long = useRecoilValue(VarPileArrayLong);
	const pile_array_tran = useRecoilValue(VarPileArrayTran);
	const pile_spacing_long = useRecoilValue(VarPileSpacingLong);
	const pile_spacing_tran = useRecoilValue(VarPileSpacingTran);
	const cap_edge_spacing_long = useRecoilValue(VarCapEdgeSpacingLong);
	const cap_edge_spacing_tran = useRecoilValue(VarCapEdgeSpacingTran);

	// @see Length Unit - LengthUnit.tsx
	const spacing_style_int = useRecoilValue(VarSpacingStyleInt);

  // Right Pile Options - [Typography And TextField]
  const [pile_dia, setPile_dia] = useRecoilState(VarPileDia);
  const [pile_length, setPile_length] = useRecoilState(VarPileLength);
  const [cap_height, setCap_height] = useRecoilState(VarCapHeight);

  // Create Pile Cap - [Check Box]
  const [cap_modeling, setCap_modeling] = useRecoilState(VarCapModeling);

	// Group Pile Option List Value Setters
	const grup_ID_list = useRecoilValue(VarGrupIDList);
	const bngr_ID_list = useRecoilValue(VarBngrIDList);
	const pile_matl_ID_list = useRecoilValue(VarPileMatlIDList);
	const pile_sect_ID_list = useRecoilValue(VarPileSectIDList);
	const cap_matl_ID_list = useRecoilValue(VarCapMatlIDList);
	const cap_sect_ID_list = useRecoilValue(VarCapSectIDList);

	// Create Validation Dialog
	const [open, setOpen] = React.useState(false);
	const validationCheckLists_L = [
		{ title: "Structure Group", value: grup_ID, error: validations.grup_ID(grup_ID), reason: "NONE" },
		{ title: "Boundary Group", value: bngr_ID, error: validations.bngr_ID(bngr_ID), reason: "NONE" },
		{ title: "Pile Material", value: pile_matl_ID, error: validations.pile_matl_ID(pile_matl_ID), reason: "NONE" },
		{ title: "Pile Section", value: pile_sect_ID, error: validations.pile_sect_ID(pile_sect_ID), reason: "NONE" },
		{ title: "Pile Cap Material", value: cap_matl_ID, error: validations.cap_matl_ID(cap_matl_ID), reason: "NONE" },
		{ title: "Pile Cap Section", value: cap_sect_ID, error: validations.cap_sect_ID(cap_sect_ID), reason: "NONE" },
		{ title: "Pile Start Node No.", value: pile_start_nb, error: validations.pile_start_nb(pile_start_nb), reason: "must be int and between 1 and 1,000,000" },
		{ title: "Pile Cap Start Node No.", value: cap_start_nb, error: validations.cap_start_nb(cap_start_nb), reason: "must be int and between 1 and 1,000,000" },
	];
	const validationCheckLists_R = [
		{ title: "Pile Array (Long)", value: pile_array_long, error: validations.pile_array(pile_array_long), reason: "must be int and larger than 0" },
		{ title: "Pile Array (Tran)", value: pile_array_tran, error: validations.pile_array(pile_array_tran), reason: "must be int and larger than 0" },
		{ title: "Pile Spacing (Long)", value: pile_spacing_long, error: validations.pile_spacing(pile_spacing_long), reason: "must be float and larger than 0" },
		{ title: "Pile Spacing (Tran)", value: pile_spacing_tran, error: validations.pile_spacing(pile_spacing_tran), reason: "must be float and larger than 0" },
		{ title: "Cap Edge Spacing (Long)", value: cap_edge_spacing_long, error: validations.cap_edge_spacing(cap_edge_spacing_long), reason: "must be float and larger than 0" },
		{ title: "Cap Edge Spacing (Tran)", value: cap_edge_spacing_tran, error: validations.cap_edge_spacing(cap_edge_spacing_tran), reason: "must be float and larger than 0" },
		{ title: "Spacing Style", value: spacing_style_int },
		{ title: "Pile Diameter", value: pile_dia, error: validations.pile_dia(pile_dia), reason: "must be float and larger than 0" },
		{ title: "Pile Length", value: pile_length, error: validations.pile_length(pile_length), reason: "must be float and larger than 0" },
		{ title: "Pile Cap Height", value: cap_height, error: validations.cap_height(cap_height), reason: "must be float and larger than 0" },
		{ title: "Create Pile Cap Check", value: cap_modeling },
	]
	const [disabledCreateButton, setDisabledCreateButton] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	const { enqueueSnackbar } = useSnackbar();

  return (
		<GuideBox width="100%" center>
			<GuideBox padding={1} spacing={1}>
				<GuideBox width={780} row horSpaceBetween>
					<GuideBox padding={1} spacing={1.5}>
						<GuideBox width={400} height={30} center>
							<Typography variant="h1">Group Pile Option</Typography>
						</GuideBox>
						<GuideBox width={400} spacing={2.35}>
							<CompTypographyAndDropList title="Structure Group" list={grup_ID_list}  state={grup_ID} setState={setGrup_ID} />
							<CompTypographyAndDropList title="Boundary Group" list={bngr_ID_list}  state={bngr_ID} setState={setBngr_ID} />
							<CompTypographyAndDropList title="Pile Material" list={pile_matl_ID_list}  state={pile_matl_ID} setState={setPile_matl_ID} />
							<CompTypographyAndDropList title="Pile Section" list={pile_sect_ID_list}  state={pile_sect_ID} setState={setPile_sect_ID} />
							<CompTypographyAndDropList title="Pile Cap Material" list={cap_matl_ID_list}  state={cap_matl_ID} setState={setCap_matl_ID} disabled={!cap_modeling} />
							<CompTypographyAndDropList title="Pile Cap Section" list={cap_sect_ID_list}  state={cap_sect_ID} setState={setCap_sect_ID} disabled={!cap_modeling} />
							<CompTypographyAndTextField title="Pile Start Node No." state={pile_start_nb} setState={setPile_start_nb} errorOptionIndex={1} error={validations.pile_start_nb(pile_start_nb)} />
							<CompTypographyAndTextField title="Pile Cap Start Node No." state={cap_start_nb} setState={setCap_start_nb} errorOptionIndex={1} error={validations.cap_start_nb(cap_start_nb)} disabled={!cap_modeling} />
						</GuideBox>
					</GuideBox>

					<GuideBox spacing={2.8} padding={1}>
						<Panel variant="shadow2">
							<CompGroupPileAndCapOptions />
						</Panel>
						<GuideBox width={320} horSpaceBetween spacing={1}>
							<CompLengthUnit />
							<CompTypographyAndTextField title="Pile Diameter" state={pile_dia} setState={setPile_dia} errorOptionIndex={2} error={validations.pile_dia(pile_dia)} />
							<CompTypographyAndTextField title="Pile Length" state={pile_length} setState={setPile_length} errorOptionIndex={2} error={validations.pile_length(pile_length)} />
							<CompTypographyAndTextField title="Pile Cap Height" state={cap_height} setState={setCap_height} errorOptionIndex={2} error={validations.cap_height(cap_height)} disabled={!cap_modeling} />
						</GuideBox>
					</GuideBox>
				</GuideBox>

				<GuideBox width={780} row horSpaceBetween>
					<GuideBox width={304} height={30} padding={1} verCenter>
						<CompRefresh />
					</GuideBox>
					<GuideBox width={324} height={30} padding={1} row horSpaceBetween verCenter>
						<Check 
							name="Create Pile Cap"
							namePlacement="start"
							checked={cap_modeling}
							onChange={(e: any) => setCap_modeling(!cap_modeling)}
						/>
						<Button color="negative" onClick={() => {
							const hasErrorL = validationCheckLists_L.some(item => item.error);
							const hasErrorR = validationCheckLists_R.some(item => item.error);
							setDisabledCreateButton(hasErrorL || hasErrorR);
							setOpen(true);
						}}>Create</Button>
						<Dialog
							open={open}
							setOpen={setOpen}
							headerTitle="Validation Check"
						>
							<GuideBox spacing={2}>
								<Typography variant="h1">Input Values</Typography>
								<GuideBox opacity={0.9} paddingBottom={1.5} spacing={1}>
									<GuideBox row spacing={2}>
										<GuideBox spacing={1}>
											{validationCheckLists_L.map((item, index) => (
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
										<GuideBox spacing={1}>
											{validationCheckLists_R.map((item, index) => (
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
									</GuideBox>
								</GuideBox>
								<Button 
									width="100%" 
									color="negative" 
									disabled={disabledCreateButton}
									onClick={() => {
										setLoading(true);

										setTimeout(() => {
											try {
												const res = createGroupPile(
													grup_ID,
													bngr_ID,
													pile_matl_ID,
													pile_sect_ID,
													cap_matl_ID,
													cap_sect_ID,
													pile_start_nb,
													cap_start_nb,
													pile_array_long,
													pile_array_tran,
													pile_spacing_long,
													pile_spacing_tran,
													cap_edge_spacing_long,
													cap_edge_spacing_tran,
													spacing_style_int,
													pile_dia,
													pile_length,
													cap_height,
													cap_modeling,
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
    </GuideBox>
  );
};

export default App;
