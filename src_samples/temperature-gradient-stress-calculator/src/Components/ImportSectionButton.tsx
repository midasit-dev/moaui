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
import { useRecoilState, useSetRecoilState } from 'recoil';
import { VarImportSectionButton, VarGirderType, VarGirderTypeValue1, VarGirderTypeValue2 } from './variables';
import { dbRead } from '../pyscript_utils';
import { Dialog, Icon, Button, GuideBox, Scrollbars, List, ListItem, ListItemButton, Typography, Panel } from "@midasit-dev/moaui";

const CompImportSectionButton = () => {
	const [value, setValue] = useRecoilState(VarImportSectionButton);
	const setGirderType = useSetRecoilState(VarGirderType);

	const type_PSC   = React.useMemo(() => ["1CEL", "2CEL", "3CEL", "PSCI", "PSCT", "PSCH", "PSCM", "PSCB", "VALU"], []);
	const type_COMP1 = React.useMemo(() => ["B", "I", "Tub", "GB", "GI", "GT"], []);
	const type_COMP2 = React.useMemo(() => ["PC", "CI", "CT"], []);
	const type_COMP  = React.useMemo(() => [...type_COMP1, ...type_COMP2], [type_COMP1, type_COMP2]);

	const getGirderType = React.useCallback((type: string, shape: string) => {
		if (type === "PSC" 			&& type_PSC.includes(shape)) return VarGirderTypeValue2;
		if (type === "COMPOSITE" && type_COMP1.includes(shape)) return VarGirderTypeValue1;
		if (type === "COMPOSITE" && type_COMP2.includes(shape)) return VarGirderTypeValue2;
		return '';
	}, [type_COMP1, type_COMP2, type_PSC]);

	//Import Section Value를 가져옵니다.
	React.useEffect(() => {
		const sectData = dbRead('SECT');
		if (!sectData) {
			console.error('Failed to read SECT data from database.');
			return;
		}

		const Ids = Object.keys(sectData);

		let useItems: any = [];
		let useIds: string[] = [];
		for (const id of Ids) {
			const type = sectData[id].SECTTYPE;
			const beforeShape = sectData[id]["SECT_BEFORE"]["SHAPE"];
			const curSectName = sectData[id].SECT_NAME;
			if ((type === "PSC" 				&& type_PSC.includes(beforeShape)) ||
					(type === "COMPOSITE" 	&& type_COMP.includes(beforeShape))) {
				useItems.push(curSectName);
				useIds.push(id);
			}
		}

		setValue(prevState => ({
			...prevState,
			ids: useIds,
			items: useItems,
		}));
	}, [setValue, type_COMP, type_COMP1, type_COMP2, type_PSC]);

	//Section Value 변경 시, Girder Type 변경
	React.useEffect(() => {
		if (value.selected !== '') {
			const selectedSectID = value.ids[value.items.indexOf(value.selected)];
			const sectData = dbRead('SECT');
			const type = sectData[selectedSectID]["SECTTYPE"];
			const shape = sectData[selectedSectID]["SECT_BEFORE"]["SHAPE"];

			setGirderType(getGirderType(type, shape));
		}
	}
	, [setGirderType, value.items, value.ids, value.selected, getGirderType]);

	const [open, setOpen] = React.useState(false);
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
						setValue={setValue}
          />
          <GuideBox width="100%" horRight>
            <Button 
							color="negative" 
							onClick={() => {
								setOpen(false);
								const selectedItem = value.temp;
								if (selectedItem) {
									setValue({...value, selected: selectedItem, temp: ''});
								}
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
	setValue,
}: any) => {
	const [selected, setSelected] = React.useState(value.selected);

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
        {value.items.length === 0 && ( //If Empty Items
					<GuideBox width="100%" center spacing={2} height={300}>
						<Typography variant="h1" color='#b81414'>Section data is empty</Typography>
						<Typography variant="body1">Add a new Section in MIDAS Civil</Typography>
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
												selected === item ? 
													<Icon iconName="RadioButtonCheckedTwoTone"   opacity={0.5} /> :
													<Icon iconName="RadioButtonUncheckedTwoTone" opacity={0.5} />
											}
                    </Panel>
                  }
                >
                  <ListItemButton 
										padding={0.8}
										onClick={() => {
											setSelected(item);
											setValue({...value, temp: item});
										}}
									>
                    <Typography marginLeft={1}>{item}</Typography>
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
