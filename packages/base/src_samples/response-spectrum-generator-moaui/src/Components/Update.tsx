import React from 'react';
import { useSnackbar } from 'notistack';
import { useRecoilValue } from "recoil";
import {
  VarDesignDuctilityFactor,
  VarDesignSpectrum,
	getDesignSpectrumCodeName,
  VarDistanceFromNearestMajorFault,
  VarFuncName,
  VarHazardFactor,
  VarMaximumPeriod,
  VarReturnPeriodFactor,
  VarSiteSubSoilClass,
	VarValids,
} from "./variables";
import {
  GuideBox,
  Button,
	TemplatesFunctionalComponentsValidCheckDialog,
} from "@midasit-dev/moaui";
import { spfcUpdate4NZS1170_5_2004 } from "../utils_pyscript";

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