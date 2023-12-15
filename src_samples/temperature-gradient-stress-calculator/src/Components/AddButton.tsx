import React from 'react';
import { 
	Dialog, Icon, Button, GuideBox,
	Scrollbars, List, ListItem, ListItemButton, Stack, Typography, Panel,
} from "@midasit-dev/moaui";

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
			title="Select Static Load case from MIDAS Civil"
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

const ImportButton = ({
	value,
	setValue,
}: any) => {
	const [open, setOpen] = React.useState(false);
	return (
    <>
      <Button color='negative' onClick={() => setOpen(true)}>Add</Button>
      <Dialog
        open={open}
        setOpen={setOpen}
        headerTitle="Select Load Case"
      >
        <GuideBox spacing={2}>
          <ComponentsListTypographyRadio
						value={value}
						setValue={setValue}
          />
          <GuideBox width="100%" horRight>
            <Button color="negative" onClick={() => {
							setOpen(false);
							const selectedItem = value.temp;
							if (selectedItem) {
								setValue({...value, selected: selectedItem, temp: ''});
							}
						}}
						disabled={value.items.length === 0}
						>
							Add
						</Button>
          </GuideBox>
        </GuideBox>
      </Dialog>
    </>
  );
}

export default ImportButton;