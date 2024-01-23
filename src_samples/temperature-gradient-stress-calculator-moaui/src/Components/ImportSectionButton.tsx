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

import React from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilState } from 'recoil';
import { getImportSectionValues } from '../pyscript_utils';
import { Dialog, Icon, Button, GuideBox, Scrollbars, List, ListItem, ListItemButton, Typography, Panel, Alert } from "@midasit-dev/moaui";
import { useSnackbar } from 'notistack';
import { idItemString, stressCalculation } from '../utils';

//Variables
import {
  VarApplyT3,
  VarApplyT3C,
  VarApplyT3H,
  VarImportSectionButton,
  VarCalculationParseResult,
  VarGirderMaterial,
  VarZone,
  VarSurface,
  VarTemperatureGradientChart,
  VarSelfEqStressesTempHeatingChart,
  VarSelfEqStressesTempCoolingChart,
	VarForceCalcStress,
} from "./variables";

const CompImportSectionButton = () => {
	const [value, setValue] = useRecoilState(VarImportSectionButton);
	const [open, setOpen] = React.useState(false);

	const [selected, setSelected] = React.useState('');

	React.useEffect(() => {
		setSelected(value.selected);
	}, [value.selected]);

	const { enqueueSnackbar } = useSnackbar();

	//Section List를 업데이트 하는 로직
	const dbUpdate = React.useCallback((loadingFalse: any = undefined) => {
		//{name: [], id: []} or {error: 'error message'}
		const sectionValues = getImportSectionValues();
		if (sectionValues.hasOwnProperty('error')) {
			enqueueSnackbar(sectionValues['error'], { variant: 'error' });
			if (loadingFalse) loadingFalse(false);
			return;
		}

		setValue((prevState: any) => ({
			...prevState,
			ids: sectionValues['id'],
			items: sectionValues['name'],
		}));
		if (loadingFalse) loadingFalse(false);
	}, [enqueueSnackbar, setValue]);

	// React.useEffect(() => {
	// 	dbUpdate();
	// }, [dbUpdate]);

	const [loadingRefresh, setLoadingRefresh] = React.useState(false);

	//UI Values
	const importSectionValue = useRecoilValue(VarImportSectionButton);
	const zoneValue = useRecoilValue(VarZone);
	const surfaceValue = useRecoilValue(VarSurface);
	const girderMatlValue = useRecoilValue(VarGirderMaterial);
	const applyT3 = useRecoilValue(VarApplyT3);
	const applyT3H = useRecoilValue(VarApplyT3H);
	const applyT3C = useRecoilValue(VarApplyT3C);

	//Setters
	const setCalcValue = useSetRecoilState(VarCalculationParseResult);
	const setTempGradientChartValue = useSetRecoilState(VarTemperatureGradientChart);
	const setSelfEqStressLeftValue = useSetRecoilState(VarSelfEqStressesTempHeatingChart);
	const setSelfEqStressRightValue = useSetRecoilState(VarSelfEqStressesTempCoolingChart);

	const [loading, setLoading] = React.useState(false);

	//다른 UI에서 값이 변경됨을 감지하고 stressCalculation을 실행합니다.
	//import Section Value는 현 컴포넌트 Select 버튼 클릭 시 동작하기 때문에 의존성을 제외합니다.
	const [forceCalcStress, setForceCalcStress] = useRecoilState(VarForceCalcStress);
	React.useEffect(() => {
		if (forceCalcStress) {
			try {
				const calcValue = stressCalculation(
					importSectionValue,
					girderMatlValue,
					zoneValue,
					surfaceValue,
					applyT3,
					applyT3H,
					applyT3C,
					setCalcValue,
					setTempGradientChartValue,
					setSelfEqStressLeftValue,
					setSelfEqStressRightValue
				);
	
				if (calcValue.hasOwnProperty('error')) {
					enqueueSnackbar(calcValue['error'], { variant: 'error' });
				} else {
					enqueueSnackbar('Calculate stress is successfully', { variant: 'success' });
				}
			} catch (err) {
				console.error(err);
			}

			setForceCalcStress(false);
		}
	}, 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[forceCalcStress]);

	return (
    <>
      <Button onClick={() => {
				dbUpdate();
				setOpen(true);
			}}>Import Section</Button>
      <Dialog
        open={open}
        setOpen={setOpen}
        headerTitle="Import Section"
      >
        <GuideBox spacing={2}>
          <ComponentsListTypographyRadio
						value={value}
						selected={selected}
						setSelected={setSelected}
          />
          <GuideBox width="100%" row horSpaceBetween>
						<Button 
							onClick={() => {
								setLoadingRefresh(true);
								setTimeout(() => dbUpdate(setLoadingRefresh), 500);
								enqueueSnackbar('Section data is updated', { variant: 'success' });
							}}
							loading={loadingRefresh}
						>
							Refresh
						</Button>
            <Button 
							color="negative" 
							onClick={() => {
								if (selected) {
									setLoading(true);

									setTimeout(() => {
										try {
											let curValue = { ...value, selected: selected };
											setValue(curValue);
					
											const calcValue = stressCalculation(
												curValue,
												girderMatlValue,
												zoneValue,
												surfaceValue,
												applyT3,
												applyT3H,
												applyT3C,
												setCalcValue,
												setTempGradientChartValue,
												setSelfEqStressLeftValue,
												setSelfEqStressRightValue
											);
							
											if (calcValue.hasOwnProperty('error')) {
												enqueueSnackbar(calcValue['error'], { variant: 'error' });
											} else {
												enqueueSnackbar('Calculate stress is successfully', { variant: 'success' });
											}
										} catch (err) {
											console.error(err);
										} finally {
											setLoading(false);
											setOpen(false);
										}
									})
								}
							}}
							disabled={value.items.length === 0}
							loading={loading}
						>
							Select
						</Button>
          </GuideBox>
        </GuideBox>
      </Dialog>
    </>
  );
}

export default CompImportSectionButton;

const ComponentsListTypographyRadio = ({
	value,
	selected,
	setSelected,
}: any) => {
  return (
		<Scrollbars
			panelProps={{
				variant: 'strock'
			}}
			width={300}
			height={300}
			title="Select Section from MIDAS Civil"
			titleVariant="body2"
			titleColor="disable"
			titleAlign="center"
		>
			<List dense={true} disablePadding={true}>
        {value.items.length === 0 &&( //If Empty Items
					<GuideBox width="100%" center spacing={2} height={300}>
						<Alert variant="outlined" severity="error" title="Alert Message">
							<GuideBox spacing={1}>
								<p>Section data is empty</p>
								<p>Add a new Section in MIDAS Civil</p>
							</GuideBox>
						</Alert>
					</GuideBox>
				)}
        {value.items.length > 0 && ( //If Not Empty Items
          <>
            {value.items.map((item: any, index: number) => {
              return (
                <ListItem
                  key={index}
                  disableGutters
                  padding={0}
                >
                  <ListItemButton 
										padding={0.8}
										onClick={() => setSelected(idItemString(value, index))}

									>
										<GuideBox width='100%' row horSpaceBetween verCenter>
											<Typography>{idItemString(value, index)}</Typography>
											<Panel variant="box" paddingRight={value.items.length < 9 ? 0 : 2.5}>
												{
													selected === idItemString(value, index) ? 
														<Icon iconName="RadioButtonCheckedTwoTone"   opacity={0.5} /> :
														<Icon iconName="RadioButtonUncheckedTwoTone" opacity={0.5} />
												}
											</Panel>
										</GuideBox>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </>
        )}
      </List>
		</Scrollbars>
  ); 
}
