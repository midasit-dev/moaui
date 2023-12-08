import React from 'react';/**${comma}*/
import { Scrollbars, List, ListItem, ListItemButton, Panel, Typography, Stack, Icon } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsListTypographyRadio = ({
	listItemValues,
	listItemOnClick,
}: any) => {
  return (
		<Scrollbars
			outline="strock"
			width={300}
			height={300}
			title="Type Your Title Text"
			titleVariant="body2"
			titleColor="disable"
			titleAlign="center"
		>
			<List dense={true} disablePadding={true}>
        {listItemValues.items.length === 0 && ( //If Empty Items
					<Stack direction="column" alignItems="center" justifyContent="center" height={300}>
						<Typography variant="h1">** NO DATA **</Typography>
						<Typography variant="body1">Please import list ...</Typography>
					</Stack>
				)}
        {listItemValues.items.length > 0 && ( //If Not Empty Items
          <>
            {listItemValues.items.map((item: any, index: number) => {
              return (
                <ListItem
                  key={index}
                  disableGutters
                  padding={0}
                  secondaryAction={
                    <Panel variant="box" paddingRight={listItemValues.items.length < 9 ? 0 : 2.5}>
											{
												listItemValues.selected === item ? 
													<Icon iconName="RadioButtonCheckedTwoTone"   opacity={0.5} /> :
													<Icon iconName="RadioButtonUncheckedTwoTone" opacity={0.5} />
											}
                    </Panel>
                  }
                >
                  <ListItemButton 
										padding={0.8}
										onClick={(e: any) => listItemOnClick(item)}
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
}/**${comma}*/

const _Use_ComponentsListTypographyRadio = () => {
  const [state, setState] = React.useState({
    selected: '',
    items: [
      'List Item 1', 'List Item 2', 'List Item 3', 'List Item 4', 'List Item 5',
      'List Item 6', 'List Item 7', 'List Item 8', 'List Item 9', 'List Item 10',
      'List Item 11', 'List Item 12'
    ]
  });

  return {
    values: state,
    setSelection: (selectedItem: string) => setState({...state, selected: selectedItem})
  }
};/**${comma}*/

const _Render_ComponentsListTypographyRadio = () => {
	const { 
		values: values_ComponentsListTypographyRadio, 
		setSelection: setSelection_ComponentsListTypographyRadio
	} = _Use_ComponentsListTypographyRadio();

	return (
		<ComponentsListTypographyRadio
			listItemValues={values_ComponentsListTypographyRadio}
			listItemOnClick={(item: string) => setSelection_ComponentsListTypographyRadio(item)}
		/>
	);
};/**${comma}*/

export default _Render_ComponentsListTypographyRadio;