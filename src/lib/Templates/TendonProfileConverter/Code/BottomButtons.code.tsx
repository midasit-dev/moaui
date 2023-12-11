import { Stack, IconButton, Icon, Button, Typography } from "@midasit-dev/moaui"; /**${comma}*/

const TemplatesTendonProfileConverterBottomButtons = () => {
  return (
    <Stack width="321px" direction="row" spacing={2} alignItems='center'>
			<IconButton transparent>
				<Icon iconName="Help" />
			</IconButton>
      <Typography>Convert to</Typography>
      <Button>New</Button>
      <Button color="negative">Modify</Button>
    </Stack>
  );
}; /**${comma}*/

export default TemplatesTendonProfileConverterBottomButtons;
