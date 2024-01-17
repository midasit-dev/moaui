import React from 'react'; /**${comma}*/
import { Dialog, Button, Scrollbars, List, ListItem, ListItemButton, Panel, Check, Typography, Stack, IconButton, Icon } from "@midasit-dev/moaui"; /**${comma}*/

const TemplatesTendonProfileConverterComposite = () => {
	//Define a Data State of list
	const [values, setValues] = React.useState([
		{ name: 'A1L', checked: false },
		{ name: 'A1R', checked: false },
		{ name: 'A2L', checked: false },
		{ name: 'A2R', checked: false },
		{ name: 'A3L', checked: false },
		{ name: 'A3R', checked: false },
		{ name: 'A4L', checked: false },
		{ name: 'A4R', checked: false },
		{ name: 'B1L', checked: false },
		{ name: 'B1R', checked: false },
		{ name: 'B2L', checked: false },
		{ name: 'B2R', checked: false },
		{ name: 'B3L', checked: false },
		{ name: 'B3R', checked: false },
		{ name: 'B4L', checked: false },
		{ name: 'B4R', checked: false },
	]);

	//Check ComponentList, Data is Empty or not
	function isItemEmpty() {
		return values.length === 0;
	}

	function isSelectedEmpty() {
		return values.filter((value: any) => value.checked).length === 0;
	}

	//[Component] Update Button
	const ComponentUpdateButton = () => <Button color="negative" width="321px">Update Tendon Profile List</Button>;

	//[Component] List
	const ComponentList = () => {
		//Dynamic Component
		const DynamicComponent = () => {
			//If Values is Empty
			const EmptyContent = () => {
				return (
					<Stack direction="column" alignItems="center" justifyContent="center" height={300}>
						<Typography variant="h1">No Convertable Tendon Profile</Typography>
						<Typography variant="body1">Please import tendon profile list</Typography>
					</Stack>
				);
			}
	
			//If Values is not Empty
			const ListItemContent = () => {
				return (
					<>
						{values.map((value: any, index: any) => {
							return (
								<ListItem
									disableGutters
									padding={0}
									secondaryAction={
										<Panel variant="box" paddingRight={1}>
											<Check checked={values[index].checked} />
										</Panel>
									}
									onClick={() => handleListItemClick(index)}
								>
									<ListItemButton padding={0.8}>
										<Typography marginLeft={1}>{value.name}</Typography>
									</ListItemButton>
								</ListItem>
							);
						})}
					</>
				);
			}
	
			//Handle List Item Click (CheckBox)
			const handleListItemClick = (index: number) => {
				const newValues = [...values];
				newValues[index].checked = !(newValues[index].checked);
				setValues(newValues);
			}
		
			return (
				<List dense={true} disablePadding={true}>
					{isItemEmpty() === true  && <EmptyContent />}
					{isItemEmpty() === false && <ListItemContent />}
				</List>
			);
		}
	
		//Main Component
		return (
			<>
				<Scrollbars
					panelProps={{
						variant: 'strock',
					}}
					width={300}
					height={300}
					title="Convertable Tendon Profile List"
					titleVariant="body2"
					titleColor="disable"
					titleAlign="center"
				>
					<DynamicComponent />
				</Scrollbars>
			</>
		); 
	}

	//[Component] Select Button
	const ComponentSelectButton = () => {
		if (isSelectedEmpty() === true) {
			return (
				<Button
					variant='text'
					color="negative"
					width='300px'
					onClick={() => setValues(values.map((value: any) => { return { ...value, checked: true } }))}
				>
					{"Select All"}
				</Button>
			);
		} else {
			return (
				<Button
					variant='text'
					color="negative"
					width='300px'
					onClick={() => setValues(values.map((value: any) => { return { ...value, checked: false } }))}
				>
					{"Deselect All"}
				</Button>
			);
		}
	}

	//[Component] Bottom Buttons
	const ComponentBottomButtons = () => {
    //[Component] Help Dialog
    const [open, setOpen] = React.useState(false);

    const HelpDialog = (props: any) => {
      return (
        <Dialog
          open={props.open}
          setOpen={props.setOpen}
          json={{
            type: "help",
            data: {
              titleText: "Tendon Profile Converter",
              body: [
                {
                  type: "single",
                  title: "Tendon Profile Coordinate Converter",
                  content: (
                    <Typography paddingLeft={1}>
                      <div>
                        This Plug-in converts <b>Element</b> tendon profile to{" "}
                        <b>Straight</b> tendon profile.
                      </div>
                    </Typography>
                  ),
                },
                {
                  type: "multiple",
                  title: "Details",
                  content: [
                    <Button>Update Tendon Profile List</Button>,
                    "Only Import : 2D/3D, Splice, Element type tendon profile",
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button>New</Button>
                      <Typography>
                        Create new tendon profile as file name + _str
                      </Typography>
                    </Stack>,
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button color="negative">Modify</Button>
                      <Typography>Edit imported tendon profile</Typography>
                    </Stack>,
                  ],
                },
                {
                  type: "single",
                  title: "Improper conditions",
                  content: `2D/3D : When Straight Length of Tendon, Transfer Length existed.`,
                },
              ],
            },
          }}
        />
      );
    };

    return (
      <Stack
				width="321px"
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
				{/** Help IconButton & Help Dialog */}
        <IconButton transparent onClick={() => setOpen(true)}>
          <Icon iconName="Help" />
        </IconButton>
				<HelpDialog open={open} setOpen={setOpen} />
				{/** Convert to New / Modify */}
        <Typography>Convert to</Typography>
        <Button>New</Button>
        <Button color="negative">Modify</Button>
      </Stack>
    );
  }

	//Main Component
  return (
    <Stack direction='column' justifyContent='center' spacing={3}>
      <ComponentUpdateButton />
      <ComponentList />
      <ComponentSelectButton />
			<ComponentBottomButtons />
    </Stack>
  );
}; /**${comma}*/

export default TemplatesTendonProfileConverterComposite;
