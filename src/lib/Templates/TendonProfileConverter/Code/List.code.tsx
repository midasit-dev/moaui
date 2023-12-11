import React from 'react'; /**${comma}*/
import { Scrollbars, List, ListItem, ListItemButton, Panel, Check, Typography, Stack } from "@midasit-dev/moaui"; /**${comma}*/

const TemplatesTendonProfileConverterList = () => {
	//Dynamic Component
	const DynamicComponent = () => {
		//Define a State
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
				{values.length === 0 && <EmptyContent />}
				{values.length !== 0 && <ListItemContent />}
      </List>
    );
	}

	//Main Component
  return (
    <>
      <Scrollbars
        outline="strock"
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
}; /**${comma}*/

export default TemplatesTendonProfileConverterList; /**${comma}*/