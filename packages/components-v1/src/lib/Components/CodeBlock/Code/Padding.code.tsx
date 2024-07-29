import { CodeBlock, GuideBox } from "@midasit-dev/moaui-components-v1";/**${comma}*/

const ComponentsCodeBlockPadding = () => {
	return (
		<GuideBox show fill='2' width={600} padding={2}>
			<CodeBlock 
				language="bash"
				title="Padding"
				radius={0}
				titlePadding="0 0 0 20px"
			>
{`titlePadding={1}
titlePaddingX={1}
titlePaddingY={1}
codePadding={1}
codePaddingX={1}
codePaddingY={1}`}
			</CodeBlock>
		</GuideBox>
	);
}/**${comma}*/

export default ComponentsCodeBlockPadding;
