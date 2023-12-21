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
import { useRecoilState } from 'recoil';
import { VarImportSectionButton } from './variables';
import { getImportSectionValues } from '../pyscript_utils';
import { Dialog, Icon, Button, GuideBox, Scrollbars, List, ListItem, ListItemButton, Typography, Panel, Alert } from "@midasit-dev/moaui";
import { useSnackbar } from 'notistack';
import { idItemString } from '../utils';

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

	React.useEffect(() => {
		dbUpdate();
	}, [dbUpdate]);

	const [loadingRefresh, setLoadingRefresh] = React.useState(false);

	return (
    <>
      <Button onClick={() => setOpen(true)}>Import Section</Button>
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
							}}
							loading={loadingRefresh}
						>
							Refresh
						</Button>
            <Button 
							color="negative" 
							onClick={() => {
								if (selected) {
									setValue({...value, selected: selected});
								}
								setOpen(false);
							}}
							disabled={value.items.length === 0}
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
			outline="strock"
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
                  secondaryAction={
                    <Panel variant="box" paddingRight={value.items.length < 9 ? 0 : 2.5}>
											{
												selected === idItemString(value, index) ? 
													<Icon iconName="RadioButtonCheckedTwoTone"   opacity={0.5} /> :
													<Icon iconName="RadioButtonUncheckedTwoTone" opacity={0.5} />
											}
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
  ); 
}
