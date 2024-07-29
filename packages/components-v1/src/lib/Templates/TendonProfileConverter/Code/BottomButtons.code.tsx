import { GuideBox, Button, Typography, TemplatesTendonProfileConverterHelpIconButton } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const TemplatesTendonProfileConverterBottomButtons = () => {
  return (
		<GuideBox row spacing={2.53} center>
			<TemplatesTendonProfileConverterHelpIconButton />
      <Typography center>Convert to</Typography>
      <Button>New</Button>
      <Button color="negative">Modify</Button>
    </GuideBox>
  );
}; /**${comma}*/

export default TemplatesTendonProfileConverterBottomButtons;
