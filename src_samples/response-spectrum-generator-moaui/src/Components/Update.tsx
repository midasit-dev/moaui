import React from 'react';
import { useSnackbar } from 'notistack';
import { useRecoilValue } from "recoil";
import {
  VarDesignDuctilityFactor,
  VarDistanceFromNearestMajorFault,
  VarHazardFactor,
  VarReturnPeriodFactor,
  VarSiteSubSoilClass,
  VarSiteClass,
  VarDesignSpectrum,
	getDesignSpectrumCodeName,
  VarSpectralAccelerationSs,
  VarSpectralAccelerationS1,
  VarImportanceFactor,
  VarResponseModificationFactor,
	VarLongTranPeriod,
  VarFuncName,
  VarMaximumPeriod,
	VarValids,
} from "./variables";
import {
  GuideBox,
  Button,
	TemplatesFunctionalComponentsValidCheckDialog,
} from "@midasit-dev/moaui";

import { spfcUpdate4NZS1170_5_2004,spfcUpdate4SBC301_CR_2018} from "../utils_pyscript";

const CompUpdate = () => {
	//기준
	const design_spectrum = useRecoilValue(VarDesignSpectrum);

	//for Dialog
	const [open, setOpen] = React.useState(false);

  return (
		<GuideBox horRight width="50%">
			<Button 
				color='negative'
				onClick={() => setOpen(true)}
			>
				Update
			</Button>
			{
				design_spectrum === 1 && 
					<CompValidCheckDialogNZS117052004 
						open={open} 
						setOpen={setOpen} 
						design_spectrum={design_spectrum} 
					/>
			}
      {
				design_spectrum === 2 && 
					<CompValidCheckDialogSBC301CR2018 
						open={open} 
						setOpen={setOpen} 
						design_spectrum={design_spectrum} 
					/>
			}
		</GuideBox>
	)
};

export default CompUpdate;

const CompValidCheckDialogNZS117052004 = (props: any) => {
	const { 
		open, 
		setOpen, 
		design_spectrum,
	} = props;

	const { enqueueSnackbar } = useSnackbar();

	//for CheckList
	const [checkList, setCheckList] = React.useState<any>([]);

	//UI Values
	const func_name = useRecoilValue(VarFuncName);

  const site_sub_soil_class = useRecoilValue(VarSiteSubSoilClass);
  const return_period_factor = useRecoilValue(VarReturnPeriodFactor);
  const hazard_factor = useRecoilValue(VarHazardFactor);
  const distance_from_nearest_major_fault = useRecoilValue(VarDistanceFromNearestMajorFault);
  const design_ductility_factor = useRecoilValue(VarDesignDuctilityFactor);
  const maximum_period = useRecoilValue(VarMaximumPeriod);

	//Create CheckList
	const valids = useRecoilValue(VarValids);
	React.useEffect(() => {
		setCheckList([
			{ title: "Function Name", value: func_name, error: !valids.VarFunctionName(func_name), reason: "The length of name must be greater than 0." },
			{ title: "Design Spectrum", value: getDesignSpectrumCodeName(design_spectrum), error: !valids.VarDesignSpectrum(design_spectrum), reason: "" },
			{ title: "Site Sub Soil Class", value: site_sub_soil_class, error: !valids.VarSiteSubSoilClass(site_sub_soil_class), reason: "" },
			{ title: "Return Period Factor", value: return_period_factor, error: !valids.VarReturnPeriodFactor(return_period_factor), reason: "Return period factor must be greater than 0." },
			{ title: "Hazard Factor", value: hazard_factor, error: !valids.VarHazardFactor(hazard_factor), reason: "Hazard Factor must be greater than 0." },
			{ title: "Distance From Nearest Major Fault", value: distance_from_nearest_major_fault, error: !valids.VarDistanceFromNearestMajorFault(distance_from_nearest_major_fault), reason: "Distance From Nearest Major Fault must be greater than 0." },
			{ title: "Design Ductility Factor", value: design_ductility_factor, error: !valids.VarDesignDuctilityFactor(design_ductility_factor), reason: "Design Ductility Factor must be greater than 0." },
			{ title: "Maximum Period", value: maximum_period, error: !valids.VarMaximumPeriod(maximum_period), reason: "Maximum Period must be greater than 0." },
		]);
	}, [
		design_ductility_factor, 
		design_spectrum, 
		distance_from_nearest_major_fault, 
		func_name, 
		hazard_factor, 
		maximum_period, 
		return_period_factor, 
		site_sub_soil_class, valids
	]);

	return (
		<TemplatesFunctionalComponentsValidCheckDialog
			open={open}
			setOpen={setOpen}
			checkList={checkList}
			buttonText="Update"
			buttonClick={() => {
				const result = spfcUpdate4NZS1170_5_2004(
					func_name,
					site_sub_soil_class,
					return_period_factor,
					hazard_factor,
					distance_from_nearest_major_fault,
					design_ductility_factor,
					maximum_period
				);

				if (result.hasOwnProperty("error")) {
					enqueueSnackbar(result.error, { variant: "error" });
				}

				if (result.hasOwnProperty("success")) {
					enqueueSnackbar(result.success, { 
						variant: "success",
						autoHideDuration: 1500,
					});
				}
			}}
			maxPanelRows={8}
		/>
	)
}

const CompValidCheckDialogSBC301CR2018 = (props: any) => {
	const { 
		open, 
		setOpen, 
		design_spectrum,
	} = props;

	const { enqueueSnackbar } = useSnackbar();

	//for CheckList
	const [checkList, setCheckList] = React.useState<any>([]);

	//UI Values
	const func_name = useRecoilValue(VarFuncName);
  const site_class = useRecoilValue(VarSiteClass);
  const spectral_acceleration_ss = useRecoilValue(VarSpectralAccelerationSs);
  const spectral_acceleration_s1 = useRecoilValue(VarSpectralAccelerationS1);
  const importance_factor = useRecoilValue(VarImportanceFactor);
  const response_modification_factor = useRecoilValue(VarResponseModificationFactor);
  const long_tran_period = useRecoilValue(VarLongTranPeriod);
  const maximum_period = useRecoilValue(VarMaximumPeriod);

	//Create CheckList
	const valids = useRecoilValue(VarValids);
	React.useEffect(() => {
		setCheckList([
			{ title: "Function Name", value: func_name, error: !valids.VarFunctionName(func_name), reason: "The length of name must be greater than 0." },
			{ title: "Design Spectrum", value: getDesignSpectrumCodeName(design_spectrum), error: !valids.VarDesignSpectrum(design_spectrum), reason: "" },
			{ title: "Site Class", value: site_class, error: !valids.VarSiteClass(site_class), reason: "" },
			{ title: "Spectral Acceleration(Ss)", value: spectral_acceleration_ss, error: !valids.VarSpectralAccelerationSs(spectral_acceleration_ss), reason: "Spectral Acceleration(Ss) must be greater than 0." },
			{ title: "Spectral Acceleration(S1)", value: spectral_acceleration_s1, error: !valids.VarSpectralAccelerationS1(spectral_acceleration_s1), reason: "Spectral Acceleration(S1) must be greater than 0." },
			{ title: "Importance Factor(Ie)", value: importance_factor, error: !valids.VarImportanceFactor(importance_factor), reason: "Importance Factor must be greater than 0." },
			{ title: "Response Modification Factor(R)", value: response_modification_factor, error: !valids.VarResponseModificationFactor(response_modification_factor), reason: "Response Modification Factor must be greater than 0." },
			{ title: "Long-Period Transition Period(TL)", value: long_tran_period, error: !valids.VarLongTranPeriod(long_tran_period), reason: "TL must be greater than Ts and less than the Max Period." },
      { title: "Maximum Period", value: maximum_period, error: !valids.VarMaximumPeriod(maximum_period), reason: "Maximum Period must be greater than 0." },
		]);
	}, [
    design_spectrum,
    func_name,
    importance_factor,
    long_tran_period,
    maximum_period,
    response_modification_factor,
    site_class,
    spectral_acceleration_s1,
    spectral_acceleration_ss,
    valids
	]);

	return (
		<TemplatesFunctionalComponentsValidCheckDialog
			open={open}
			setOpen={setOpen}
			checkList={checkList}
			buttonText="Update"
			buttonClick={() => {
				const result = spfcUpdate4SBC301_CR_2018(
					func_name,
					site_class,
          spectral_acceleration_ss,
          spectral_acceleration_s1,
          importance_factor,
          response_modification_factor,
          long_tran_period,
          maximum_period
				);

				if (result.hasOwnProperty("error")) {
					enqueueSnackbar(result.error, { variant: "error" });
				}

				if (result.hasOwnProperty("success")) {
					enqueueSnackbar(result.success, { 
						variant: "success",
						autoHideDuration: 1500,
					});
				}
			}}
			maxPanelRows={9}
		/>
	)
}