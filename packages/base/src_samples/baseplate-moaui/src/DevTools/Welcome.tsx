import {
	Panel,
	Typography,
	GuideBox,
	CodeBlock,
	Color,
} from '@midasit-dev/moaui';

const Welcome = () => {
	return (
		<Panel width="100%" variant="shadow2" padding={2} border={`1px solid ${Color.secondary.main}`}>
			<GuideBox spacing={2}>
				<GuideBox row width="100%" horSpaceBetween verCenter>
					<Typography variant="h1">Welcome, This is a MIDAS Plug-in CRA Template!</Typography>
					<GuideBox pulse spacing={1}>
						💚💚💚
					</GuideBox>
				</GuideBox>
				<GuideBox spacing={0.7}>
					<Typography>We are currently developing the dev mode to make the plug-in item more convenient</Typography>
					<Typography>To turn on the development mode, open the windows terminal.</Typography>
					<Typography>And type the command below.</Typography>
				</GuideBox>
				<CodeBlock language="markdown" title="in terminal" radius={0}>
					{`npm run dev`}
				</CodeBlock>
			</GuideBox>
		</Panel>
	)
}

export default Welcome;