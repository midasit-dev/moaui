import { ListItem, ListItemButton, Typography, Check } from "@midasit-dev/moaui-components-v1"; /**${comma}*/

const ComponentsListItemDefault = () => {
  return (
		<ListItem secondaryAction={<Check />}>
			<ListItemButton padding={0.8}>
				<Typography marginLeft={1}>List Item Button</Typography>
			</ListItemButton>
		</ListItem>
  );
}; /**${comma}*/

export default ComponentsListItemDefault;
