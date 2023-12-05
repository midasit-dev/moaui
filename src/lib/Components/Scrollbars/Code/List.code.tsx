import React from 'react'; /**${comma}*/
import { Scrollbars, List, ListItem, ListItemButton, Check, Typography } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsScrollbarsList = () => {
	const ComponentsListDynamic = (props: any) => {
		const handleListItemClick = (index: number) => {
			const newValues = [...props.values];
			newValues[index].checked = !(newValues[index].checked);
			props.setValues(newValues);
		}
	
		return (
      <>
        <List dense={true} disablePadding={true}>
          {props.values.map((value: any, index: any) => {
            return (
              <ListItem
                secondaryAction={<Check checked={props.values[index].checked} />}
                onClick={() => handleListItemClick(index)}
              >
                <ListItemButton>
                  <Typography>{value.name}</Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </>
    );
	}

	const [values, setValues] = React.useState([
		{ name: 'List Item Button 1', checked: false },
		{ name: 'List Item Button 2', checked: false },
		{ name: 'List Item Button 3', checked: false },
		{ name: 'List Item Button 4', checked: false },
		{ name: 'List Item Button 5', checked: false },
		{ name: 'List Item Button 6', checked: false },
		{ name: 'List Item Button 7', checked: false },
		{ name: 'List Item Button 8', checked: false },
	]);

  return (
    <>
      <Scrollbars
        outline="strock"
        width={400}
        height={150}
        title="Scrollbars Title Text"
        titleVariant="body2"
        titleColor="disable"
      >
        <ComponentsListDynamic values={values} setValues={setValues} />
      </Scrollbars>
      {values.map((value: any, index: any) => (
        <Typography key={index} marginTop={2} textAlign="center">
          {value.checked ? "Checked" : "UnChecked"}
        </Typography>
      ))}
    </>
  ); 
}; /**${comma}*/

export default ComponentsScrollbarsList;
