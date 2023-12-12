import { GuideBox, Button, Typography, TemplatesTendonProfileConverterHelpIconButton } from "@midasit-dev/moaui";/**${comma}*/

const TemplatesTendonProfileConverterBottomButtons = () => {
  return (
		<GuideBox width={300} row itemSpacing={2.5}>
			<TemplatesTendonProfileConverterHelpIconButton />
      <Typography flexItem textAlign="center">Convert to</Typography>
      <Button>New</Button>
      <Button color="negative">Modify</Button>
    </GuideBox>
  );
}; /**${comma}*/

export default TemplatesTendonProfileConverterBottomButtons;
