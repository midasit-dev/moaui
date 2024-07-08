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
	Button,
} from "@midasit-dev/moaui";
import { List, ListItem, ListItemButton, Check } from "@midasit-dev/moaui"; 
import { useRecoilState, useRecoilValue } from "recoil";
import {
	VarSiteClass,
	VarSpectralAccelerationSs,
	VarSpectralAccelerationS1,
	VarImportanceFactor,
	VarResponseModificationFactor,
	VarLongTranPeriod,
	VarMaximumPeriod,
	VarValids,
} from "./variables";
import CompTypographyAndTextFieldNumOnly from "./TypographyAndTextFieldNumOnly";
import { debounce } from 'lodash';

const ComponentsListControlled = () => {
	const [values, setValues] = React.useState([ false, false, false ]);

	const handleListItemClick = (index: number) => {
		const newValues = [...values];
		newValues[index] = !newValues[index];
		setValues(newValues);
	}

  return (
    <List dense={true} disablePadding={true}>
      <ListItem
				secondaryAction={<Check checked={values[0]} />}
				onClick={() => handleListItemClick(0)}
      >
        <ListItemButton padding={0.8}>
          <Typography marginLeft={1}>List Item Button 1</Typography>
        </ListItemButton>
      </ListItem>
			<ListItem
        secondaryAction={<Check checked={values[1]} />}
				onClick={() => handleListItemClick(1)}
      >
        <ListItemButton padding={0.8}>
          <Typography marginLeft={1}>List Item Button 1</Typography>
        </ListItemButton>
      </ListItem>
			<ListItem
        secondaryAction={<Check checked={values[2]} />}
				onClick={() => handleListItemClick(2)}
      >
        <ListItemButton padding={0.8}>
          <Typography marginLeft={1}>List Item Button 1</Typography>
        </ListItemButton>
      </ListItem>
			{values.map((value, index) => (<Typography key={index} marginTop={2} center>{value ? 'Checked' : 'UnChecked'}</Typography>))}
    </List>
  );
}; 

const CompSeismicData_SBC301_CR_2018 = (props: any) => {
	const valids = useRecoilValue(VarValids);
  const [importance_factor, setImportance_factor] = useRecoilState(VarImportanceFactor);
	const [response_modification_factor, setResponse_modification_factor] = useRecoilState(VarResponseModificationFactor);
  const [long_tran_period, setLong_tran_period] = useRecoilState(VarLongTranPeriod);
  const [spectralAccelerationSs,setSpectralAccelerationSs] = useRecoilState(VarSpectralAccelerationSs);
  const [spectralAccelerationS1,setSpectralAccelerationS1] = useRecoilState(VarSpectralAccelerationS1);

  
	return (
		<GuideBox overflow='visible' width={368}>
			<Panel variant="strock" width="100%" padding={1}>
				<GuideBox show fill='1' row borderRadius={1} center marginBottom={1}>
					<Typography variant="h1">Seismic Data</Typography>
					<CompInfoDialog />
				</GuideBox>
				<GuideBox width="100%" spacing={2}>
					<CompSiteClass />
          <CompTypographyAndTextFieldNumOnly title="Spectral Acceleration(Ss)" state={spectralAccelerationSs} setState={setSpectralAccelerationSs} error={!valids.VarSpectralAccelerationSs(spectralAccelerationSs)} />
          <CompTypographyAndTextFieldNumOnly title="Spectral Acceleration(S1)" state={spectralAccelerationS1} setState={setSpectralAccelerationS1} error={!valids.VarSpectralAccelerationS1(spectralAccelerationS1)} /> 
          <CompTypographyAndTextFieldNumOnly title="Importance Factor(Ie)" state={importance_factor} setState={setImportance_factor} error={!valids.VarImportanceFactor(importance_factor)} />
          <CompTypographyAndTextFieldNumOnly title="Response Modification Factor(R)" state={response_modification_factor} setState={setResponse_modification_factor} error={!valids.VarResponseModificationFactor(response_modification_factor)} />
					<CompTypographyAndTextFieldNumOnly title="Long-Period Transition Period(TL)" state={long_tran_period} setState={setLong_tran_period} error={!valids.VarLongTranPeriod(long_tran_period)} />
				</GuideBox>
			</Panel>
		</GuideBox>
	)
}

export default CompSeismicData_SBC301_CR_2018;



const CompSiteClass = () => {
  const [site_class, setSite_class] = useRecoilState(VarSiteClass);

  const handleChange = (event: React.ChangeEvent, state: string) => {
    setSite_class(state);
  };

  return (
    <GuideBox width='100%'>
      <Typography variant="h1" height={30} verCenter>
				Site Class
      </Typography>
      <GuideBox padding={1} width='100%' center>
        <RadioGroup onChange={handleChange} value={site_class} row>
          <Radio name="A" value="A" />
          <Radio name="B" value="B" marginLeft={3} />
          <Radio name="C" value="C" marginLeft={3} />
          <Radio name="D" value="D" marginLeft={3} />
          <Radio name="E" value="E" marginLeft={2} />
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
				headerTitle='Seismic Data : SBC301-CR (2018)'
			>
				<GuideBox spacing={2}>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Site Class :</Typography>
							<Typography variant='body1' color='third'>Refer to Table 20-1 of SBC301-CR (2018)</Typography>
						</GuideBox>
						<GuideBox paddingLeft={1}>
							<Typography variant='body1'>A : Hard Rock</Typography>
							<Typography variant='body1'>B : Rock</Typography>
							<Typography variant='body1'>C : Very Dense Soil and Soft Rock</Typography>
							<Typography variant='body1'>D : Stiff Soil</Typography>
							<Typography variant='body1'>E : Soft Clay Soil</Typography>
						</GuideBox>
					</GuideBox>
					<GuideBox spacing={1}>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Ss :</Typography>
							<Typography variant='body1' color='third'>Spectral Response Acceleration Parameter at short periods as defined in Section 11.4.1</Typography>
						</GuideBox>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- S1 :</Typography>
							<Typography variant='body1' color='third'>Spectral Response Acceleration Parameter at a period of 1s as defined in Section 11.4.1</Typography>
						</GuideBox>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Fa :</Typography>
							<Typography variant='body1' color='third'>Short-period site coefficient as defined in Section 11.4.3</Typography>
						</GuideBox>
						<GuideBox row spacing={0.7}>
							<Typography variant='h1'>- Fv :</Typography>
							<Typography variant='body1' color='third'>Long-period site coefficient as defined in Section 11.4.3</Typography>
						</GuideBox>
            <GuideBox row spacing={0.7}>
              <Typography variant='h1'>- Ie :</Typography>
              <Typography variant='body1' color='third'>The Importance Factor as prescibed in Section 11.5.1</Typography>
            </GuideBox>
            <GuideBox row spacing={0.7}>
              <Typography variant='h1'>- R :</Typography>
              <Typography variant='body1' color='third'>The Response Modification Factor as given in Table 12-1</Typography>
            </GuideBox>
            <GuideBox row spacing={0.7}>
              <Typography variant='h1'>- TL :</Typography>
              <Typography variant='body1' color='third'>Long-period transition period as defined in Section 11.4.5</Typography>
            </GuideBox>
					</GuideBox>
				</GuideBox>
			</Dialog>
		</GuideBox>
	)
}