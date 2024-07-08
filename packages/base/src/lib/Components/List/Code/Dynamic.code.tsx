import React from 'react'; /**${comma}*/
import { List, ListItem, ListItemButton, Check, Typography } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsListDynamic = () => {
	const [values, setValues] = React.useState([
		{ name: 'List Item Button 1', checked: false },
		{ name: 'List Item Button 2', checked: false },
		{ name: 'List Item Button 3', checked: false },
	]);

	const handleListItemClick = (index: number) => {
		const newValues = [...values];
		newValues[index].checked = !(newValues[index].checked);
		setValues(newValues);
	}

  return (
    <List dense={true} disablePadding={true}>
			{values.map((value, index) => {
				return (
					<ListItem
						secondaryAction={<Check checked={values[index].checked} />}
						onClick={() => handleListItemClick(index)}
					>
						<ListItemButton padding={0.8}>
							<Typography marginLeft={1}>{value.name}</Typography>
						</ListItemButton>
					</ListItem>
				)
			})}
			{values.map((value, index) => (<Typography key={index} marginTop={2} center>{value.checked ? 'Checked' : 'UnChecked'}</Typography>))}
    </List>
  );
}; /**${comma}*/

export default ComponentsListDynamic;
