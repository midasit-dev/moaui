import React from 'react';/**${comma}*/
import { Scrollbars, List, ListItem, ListItemButton, Panel, Typography, Stack, Icon } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsListTypographyRadio = ({
	items = [
		'List Item 1', 'List Item 2', 'List Item 3', 'List Item 4', 'List Item 5',
		'List Item 6', 'List Item 7', 'List Item 8', 'List Item 9', 'List Item 10',
		'List Item 11', 'List Item 12'
	],/**${props-separator}*/
}: any) => {
  const [state, setState] = React.useState({
    selected: '',
    items: items,
  });

  return (
		<Scrollbars
			panelProps={{
				variant: 'strock',
			}}
			width={300}
			height={300}
			title="Type Your Title Text"
			titleVariant="body2"
			titleColor="disable"
			titleAlign="center"
		>
			<List dense={true} disablePadding={true}>
        {state.items.length === 0 && ( //If Empty Items
					<Stack direction="column" alignItems="center" justifyContent="center" height={300}>
						<Typography variant="h1">** NO DATA **</Typography>
						<Typography variant="body1">Please import list ...</Typography>
					</Stack>
				)}
        {state.items.length > 0 && ( //If Not Empty Items
          <>
            {state.items.map((item: any, index: number) => {
              return (
                <ListItem
                  key={index}
                  disableGutters
                  padding={0}
                  secondaryAction={
                    <Panel variant="box" paddingRight={state.items.length < 9 ? 0 : 2.5}>
											{
												state.selected === item ? 
													<Icon iconName="RadioButtonCheckedTwoTone"   opacity={0.5} /> :
													<Icon iconName="RadioButtonUncheckedTwoTone" opacity={0.5} />
											}
                    </Panel>
                  }
                >
                  <ListItemButton 
										padding={0.8}
										onClick={() => setState({...state, selected: item})}
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

export default ComponentsListTypographyRadio;