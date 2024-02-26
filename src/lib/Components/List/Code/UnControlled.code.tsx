import { List, ListItem, ListItemButton, Check, Typography } from "@midasit-dev/moaui"; /**${comma}*/

const ComponentsListUnControlled = () => {
  return (
    <List dense={true} disablePadding={true}>
      <ListItem secondaryAction={<Check />}>
        <ListItemButton padding={0.8}>
          <Typography marginLeft={1}>List Item Button 1</Typography>
        </ListItemButton>
      </ListItem>
      <ListItem secondaryAction={<Check />}>
        <ListItemButton padding={0.8}>
          <Typography marginLeft={1}>List Item Button 2</Typography>
        </ListItemButton>
      </ListItem>
      <ListItem secondaryAction={<Check />}>
        <ListItemButton padding={0.8}>
          <Typography marginLeft={1}>List Item Button 3</Typography>
        </ListItemButton>
      </ListItem>
    </List>
  );
}; /**${comma}*/

export default ComponentsListUnControlled;
