import React from 'react';
import {
  Panel,
  GuideBox,
  Typography,
  TextFieldV2,
  RadioGroup,
  Radio,
  Dialog,
  IconButton,
  Icon,
} from "@midasit-dev/moaui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  VarDesignDuctilityFactor,
  VarDistanceFromNearestMajorFault,
  VarHazardFactor,
  VarReturnPeriodFactor,
  VarSiteSubSoilClass,
	VarValids,
} from "./variables";
import CompTypographyAndTextFieldNumOnly from "./TypographyAndTextFieldNumOnly";
import { debounce } from 'lodash';

const CompSeismicData_NZS1170_5_2004 = (props: any) => {
	const valids = useRecoilValue(VarValids);

	const [return_period_factor, setReturn_period_factor] = useRecoilState(VarReturnPeriodFactor);
  const [hazard_factor, setHazard_factor] = useRecoilState(VarHazardFactor);
  const [design_ductility_factor, setDesign_ductility_factor] = useRecoilState(VarDesignDuctilityFactor);

	return (
		<GuideBox overflow='visible'>
			<Panel variant="strock" width="100%" padding={2} border="1px solid #ddd">
				<GuideBox show fill='1' row borderRadius={1} center marginBottom={1}>
					<Typography variant="h1">Seismic Data</Typography>
					<CompInfoDialog />
				</GuideBox>
				<GuideBox width="100%" spacing={2}>
					<CompSubSoilClass />
					<CompTypographyAndTextFieldNumOnly title="Return Period Factor (R)" state={return_period_factor} setState={setReturn_period_factor} error={!valids.VarReturnPeriodFactor(return_period_factor)} />
					<CompTypographyAndTextFieldNumOnly title="Hazard Factor (Z)" state={hazard_factor} setState={setHazard_factor} error={!valids.VarHazardFactor(hazard_factor)} />
					<CompDistanceFromNearestMajorFault />
					<CompTypographyAndTextFieldNumOnly title="Design Ductility Factor" state={design_ductility_factor} setState={setDesign_ductility_factor} error={!valids.VarDesignDuctilityFactor(design_ductility_factor)} />
				</GuideBox>
			</Panel>
		</GuideBox>
	)
}

export default CompSeismicData_NZS1170_5_2004;

const CompDistanceFromNearestMajorFault = () => {
	const valids = useRecoilValue(VarValids);
  const [distance_from_nearest_major_fault, setDistance_from_nearest_major_fault,] = useRecoilState(VarDistanceFromNearestMajorFault);

	const [value, setValue] = React.useState(distance_from_nearest_major_fault);

	//for 디바운스!
  React.useEffect(() => {
    const debounceSetValue = debounce((newValue) => {
      setDistance_from_nearest_major_fault(newValue);
    }, 500);

    debounceSetValue(value);

    // Cleanup the debounce function on component unmount
    return () => {
      debounceSetValue.cancel();
    };
  }, [value, setDistance_from_nearest_major_fault]);

  return (
    <GuideBox width="100%" row horSpaceBetween>
      <GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<GuideBox spacing={0}>
					<Typography variant="h1">Distance From</Typography>
					<Typography variant="h1">Nearest Major Fault (km)</Typography>
				</GuideBox>
        <TextFieldV2
          error={!valids.VarDistanceFromNearestMajorFault(distance_from_nearest_major_fault)}
          width={150}
          height={30}
          placeholder="Input value ..."
          onChange={(e: any) => setValue(e.target.value)}
          value={value}
          disabled={false}
					type='number'
					numberOptions={{
						min: 0.0,
						step: 1.0,
						condition: {
							min: 'greater'
						}
					}}
        />
      </GuideBox>
    </GuideBox>
  );
};

const CompSubSoilClass = () => {
  const [site_sub_soil_class, setSite_sub_soil_class] = useRecoilState(VarSiteSubSoilClass);

  const handleChange = (event: React.ChangeEvent, state: string) => {
    setSite_sub_soil_class(state);
  };

  return (
    <GuideBox width='100%'>
      <Typography variant="h1" height={30} verCenter>
				Site Sub Soil Class
      </Typography>
      <GuideBox padding={1} width='100%' center>
        <RadioGroup onChange={handleChange} value={site_sub_soil_class} row>
          <Radio name="A" value="A" />
          <Radio name="B" value="B" marginLeft={3} />
          <Radio name="C" value="C" marginLeft={3} />
          <Radio name="D" value="D" marginLeft={3} />
          <Radio name="E" value="E" marginLeft={3} />
        </RadioGroup>
      </GuideBox>
    </GuideBox>
  );
};

const CompInfoDialog = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<GuideBox>
			<IconButton onClick={() => setOpen(true)} transparent>
				<Icon iconName="InfoOutlined" />
			</IconButton>
			<Dialog
				open={open}
				setOpen={setOpen}
				headerIcon={<Icon iconName="InfoOutlined" />}
				headerTitle='Seismic Data'
			>
				<GuideBox spacing={2}>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Site Sub Soil Class :</Typography>
							<Typography variant='body1' color='third'>Refer to Section 3.1.3 of NZS 1170.5</Typography>
						</GuideBox>
						<GuideBox paddingLeft={1}>
							<Typography variant='body1'>A : Strong Rock</Typography>
							<Typography variant='body1'>B : Rock</Typography>
							<Typography variant='body1'>C : Shallow Soil</Typography>
							<Typography variant='body1'>D : Deep or Soft Soil</Typography>
							<Typography variant='body1'>E : Very Soft Soil</Typography>
						</GuideBox>
					</GuideBox>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Return Period Factor :</Typography>
							<Typography variant='body1' color='third'>Refer to Section 3.1.5 of NZS 1170.5</Typography>
						</GuideBox>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Hazard Factor :</Typography>
							<Typography variant='body1' color='third'>Refer to Section 3.1.4 of NZS 1170.5</Typography>
						</GuideBox>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Distance From Nearest Major Fault :</Typography>
							<Typography variant='body1' color='third'>Refer to Section 3.1.6 of NZS 1170.5</Typography>
						</GuideBox>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Design Ductility Factor :</Typography>
							<Typography variant='body1' color='third'>Refer to Section 4.3 of NZS 1170.5</Typography>
						</GuideBox>
					</GuideBox>
				</GuideBox>
			</Dialog>
		</GuideBox>
	)
}