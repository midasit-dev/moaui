/**
 *		                                                                         __
 *		                                                                        /\ \__
 *		  ___     ___     ___ ___     _____     ___     ___       __     ___    \ \ ,_\
 *		 /'___\  / __`\ /' __` __`\  /\ '__`\  / __`\ /' _ `\   /'__`\ /' _ `\   \ \ \/
 *		/\ \__/ /\ \L\ \/\ \/\ \/\ \ \ \ \L\ \/\ \L\ \/\ \/\ \ /\  __/ /\ \/\ \   \ \ \_
 *		\ \____\\ \____/\ \_\ \_\ \_\ \ \ ,__/\ \____/\ \_\ \_\\ \____\\ \_\ \_\   \ \__\
 *		 \/____/ \/___/  \/_/\/_/\/_/  \ \ \/  \/___/  \/_/\/_/ \/____/ \/_/\/_/    \/__/
 *		                                \ \_\
 *		                                 \/_/
 */

import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { VarAddButtonCooling, VarAddButtonHeating, VarCalculationParseResult, VarTemperatureGradientChartCoolingCheck, VarTemperatureGradientChartHeatingCheck } from "./variables";
import {
  Dialog,
  Icon,
  Button,
  GuideBox,
  Scrollbars,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Panel,
	Alert,
	Chip,
	Color,
} from "@midasit-dev/moaui";
import { useSnackbar } from "notistack";
import { assignLoad, dbRead } from "../pyscript_utils";
import { idItemString, parseId } from "../utils";

const CompAddButton = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [value_h, setValue_h] = useRecoilState(VarAddButtonHeating);
	const [value_c, setValue_c] = useRecoilState(VarAddButtonCooling);

	//Static Load Case 데이터를 업데이트 하는 로직.
	const dbUpdate = React.useCallback(() => {
		const stld = dbRead('STLD');
		if (stld.hasOwnProperty('error')) {
			enqueueSnackbar(stld['error'], { variant: 'error' });
			return;
		}
		const ids: any[] = [];
		const items: any[] = [];
		for (const [key, value] of Object.entries(stld)) {
			ids.push(key);
			items.push((value as any).NAME);
		}

		setValue_h((prevState: any) => ({ ...prevState, ids: ids, items: items }));
		setValue_c((prevState: any) => ({ ...prevState, ids: ids, items: items }));
	}, [enqueueSnackbar, setValue_c, setValue_h]);
	React.useEffect(() => dbUpdate(), [dbUpdate]);

	const [open, setOpen] = useState(false);

	const [selected_h, setSelected_h] = useState<string>('');
	React.useEffect(() => {
		setSelected_h(value_h.selected);
	}, [value_h.selected]);

	const [selected_c, setSelected_c] = useState<string>('');
	React.useEffect(() => {
		setSelected_c(value_c.selected);
	}, [value_c.selected]);

	const heatingCheck = useRecoilValue(VarTemperatureGradientChartHeatingCheck);
	const coolingCheck = useRecoilValue(VarTemperatureGradientChartCoolingCheck);

	const [queue, setQueue] = useState<any[]>([]);
	const [curQueue, setCurQueue] = useState<string | undefined>('');

	React.useEffect(() => {
		console.log(queue, curQueue, 'h: ', value_h, 'h_sel:', selected_h, 'c: ', value_c, 'c_sel', selected_c);
	}, [queue, curQueue, value_h, value_c, selected_h, selected_c]);

  return (
    <>
      <Button
        color="negative"
        onClick={() => {
					dbUpdate();

          if (!heatingCheck && !coolingCheck) {
            //Temperature load data is empty, Select any temperature in the plug-in
            enqueueSnackbar("Please select at least one heating or cooling.", {
              variant: "error",
            });
            return;
          }

          const q: any[] = [];
          if (heatingCheck) q.push("heating");
          if (coolingCheck) q.push("cooling");
					q.push("assign");
          if (q.length !== 0) {
						const curQ = q.shift();
            setQueue(q);
            setCurQueue(curQ);
            setOpen(true);
          }
        }}
      >
        Assign Load
      </Button>
      {curQueue && (
        <DialogPage
					queue={queue}
					setQueue={setQueue}
					curQueue={curQueue}
					setCurQueue={setCurQueue}

					chip={
						(curQueue === "heating" && 
							<Chip size="small" bgColor="#D32F2F" color={Color.primaryNegative.white} label="heating" /> ) ||
						(curQueue === "cooling" && 
							<Chip size="small" bgColor="#1f78b4" color={Color.primaryNegative.white} label="cooling" /> ) ||
						(curQueue === "assign" &&
							<></> )
					}

          value={
						(curQueue === "heating" && value_h) ||
						(curQueue === "cooling" && value_c) ||
						(curQueue === "assign" && {})
					}
          setValue={
						(curQueue === "heating" && setValue_h) ||
						(curQueue === "cooling" && setValue_c) ||
						(curQueue === "assign" && (() => {}))
					}

					selected={
						(curQueue === "heating" && selected_h) ||
						(curQueue === "cooling" && selected_c) ||
						(curQueue === "assign" && "")
					}
					setSelected={
						(curQueue === "heating" && setSelected_h) ||
						(curQueue === "cooling" && setSelected_c) ||
						(curQueue === "assign" && (() => {}))
					}

          open={open}
          setOpen={setOpen}

					dbUpdate={dbUpdate}
        />
      )}
    </>
  );
};

export default CompAddButton;

const DialogPage = ({
	queue,
	setQueue,
	curQueue,
	setCurQueue,
	chip,
	value,
	setValue,
	selected,
	setSelected,
	open,
	setOpen,
	dbUpdate,
}: any) => {
	const heatingCheck = useRecoilValue(VarTemperatureGradientChartHeatingCheck);
	const coolingCheck = useRecoilValue(VarTemperatureGradientChartCoolingCheck);
	const value_h = useRecoilValue(VarAddButtonHeating);
	const value_c = useRecoilValue(VarAddButtonCooling);
	const calcValue = useRecoilValue(VarCalculationParseResult);

	const { enqueueSnackbar } = useSnackbar();

	const [loading, setLoading] = useState(false);

	React.useEffect(() => {
		console.log(selected);
	}, [selected]);

	return (
    <Dialog
      open={open}
      setOpen={setOpen}
			onClose={() => {
				setSelected(value.selected)
			}}
      headerIcon={chip}
      headerTitle="Select Load Case"
    >
      <GuideBox spacing={2}>
				{curQueue !== "assign" && 
					<Scrollbars
						outline="strock"
						width={300}
						height={300}
						title="Select Static Load case from MIDAS Civil"
						titleVariant="body2"
						titleColor="disable"
						titleAlign="center"
					>
						<List dense={true} disablePadding={true}>
							{value.items.length === 0 && (
								<GuideBox width="100%" center spacing={2} height={300}>
									<Alert
										variant="outlined"
										severity="error"
										title="Alert Message"
									>
										<GuideBox spacing={0.5}>
											<p>Static Load case data is empty</p>
											<p>Add a new Static Load case in MIDAS Civil</p>
										</GuideBox>
									</Alert>
								</GuideBox>
							)}
							{value.items.length > 0 && (
								<>
									{value.items.map((item: any, index: number) => {
										return (
											<ListItem
												key={index}
												disableGutters
												padding={0}
												secondaryAction={
													<Panel
														variant="box"
														paddingRight={value.items.length < 9 ? 0 : 2.5}
													>
														{selected === idItemString(value, index) ? (
															<Icon
																iconName="RadioButtonCheckedTwoTone"
																opacity={0.5}
															/>
														) : (
															<Icon
																iconName="RadioButtonUncheckedTwoTone"
																opacity={0.5}
															/>
														)}
													</Panel>
												}
											>
												<ListItemButton
													padding={0.8}
													onClick={() => setSelected(idItemString(value, index))}
												>
													<Typography marginLeft={1}>{idItemString(value, index)}</Typography>
												</ListItemButton>
											</ListItem>
										);
									})}
								</>
							)}
						</List>
					</Scrollbars>
				}
				{curQueue !== "assign" && 
					<GuideBox width="100%" row horSpaceBetween>
						<GuideBox width={150} row spacing={1}>
							<Button onClick={() => {
								dbUpdate();
								enqueueSnackbar('Static Load data is updated', { variant: 'success' });
							}}>
								Refresh
							</Button>
						</GuideBox>
						<Button
							color="negative"
							onClick={() => {
								const curQ = queue.shift();
								setQueue(queue);
								setCurQueue(curQ);

								if (selected) {
									setValue({ ...value, selected: selected });
								}
							}}
							disabled={value.items.length === 0 || selected === "" || !selected}
						>
							Select
						</Button>
					</GuideBox>
				}
				{curQueue === "assign" &&
					<GuideBox width={250} spacing={2}>
						<Typography variant="h1">Current Values</Typography>
						<GuideBox width="inherit" opacity={0.9} paddingBottom={1.5} spacing={1}>
							{heatingCheck &&
								<GuideBox width="inherit" spacing={1}>
									<GuideBox width="inherit" row horSpaceBetween>
										<Typography variant="body1">Heating CheckBox: </Typography>
										<Typography variant="h1">{heatingCheck ? 'checked' : 'unchecked'}</Typography>
									</GuideBox>
									<GuideBox width="inherit" row horSpaceBetween>
										<Typography variant="body1">Heating Selected: </Typography>
										<Typography variant="h1" color="#D32F2F">{value_h.selected}</Typography>
									</GuideBox>
								</GuideBox>
							}

							{coolingCheck &&
								<GuideBox width="inherit" spacing={1}>
									<GuideBox width="inherit" row horSpaceBetween>
										<Typography variant="body1">Cooling CheckBox: </Typography>
										<Typography variant="h1">{coolingCheck ? 'checked' : 'unchecked'}</Typography>
									</GuideBox>
									<GuideBox width="inherit" row horSpaceBetween>
										<Typography variant="body1">Cooling Selected: </Typography>
										<Typography variant="h1" color="#1f78b4">{value_c.selected}</Typography>
									</GuideBox>	
								</GuideBox>	
							}
						</GuideBox>
						<Button
							width="100%"
							color="negative"
							onClick={() => {
								setLoading(true);

								setTimeout(() => {
									try {
										const res = assignLoad(JSON.stringify({
											heating_assign: heatingCheck,
											cooling_assign: coolingCheck,
											select_stld_key_heat: parseId(value_h.selected),
											select_stld_key_cool: parseId(value_c.selected),
											result_data: JSON.stringify(calcValue["assign_load_input"]),
										}));
	
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
							Assign Load
						</Button>
					</GuideBox>
				}
			</GuideBox>
    </Dialog>
  );
}