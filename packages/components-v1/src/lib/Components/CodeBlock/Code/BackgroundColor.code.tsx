import { CodeBlock, GuideBox } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsCodeBlockBackgroundColorChange = () => {
	return (
		<GuideBox show fill='2' width={600} padding={2}>
			<CodeBlock 
				language="bash"
				title="Background color change"
				radius={0}
				backgroundColor="#2E8B57"
			>
				npm run dev
			</CodeBlock>
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsCodeBlockBackgroundColorChange;
