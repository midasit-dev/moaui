import React from 'react'; /**${comma}*/
import { List, ListItem, ListItemButton, Check, Typography } from "@midasit-dev/moaui"; /**${comma}*/

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
			{values.map((value, index) => (<Typography key={index} marginTop={2} textAlign="center">{value ? 'Checked' : 'UnChecked'}</Typography>))}
    </List>
  );
}; /**${comma}*/

export default ComponentsListControlled;
