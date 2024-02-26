import { GuideBox, Typography, Panel } from "@midasit-dev/moaui";/**${comma}*/

const ComponentsGuideBoxSpaceBetween = () => {
	return (
		<GuideBox show fill='1' padding={2} spacing={2}>
			<Typography variant="h1">horSpaceBetween</Typography>
			<GuideBox show width={250} padding={2} fill='2' row horSpaceBetween>
				<Panel variant='shadow2'>start</Panel>
				<Panel variant='shadow2'>end</Panel>
			</GuideBox>
			<Typography variant="h1">verSpaceBetween</Typography>
			<GuideBox show height={150} padding={2} fill='2' verSpaceBetween>
				<Panel width="100%" variant='shadow2'>start</Panel>
				<Panel width="100%" variant='shadow2'>end</Panel>
			</GuideBox>
		</GuideBox>
	);
};/**${comma}*/

export default ComponentsGuideBoxSpaceBetween;