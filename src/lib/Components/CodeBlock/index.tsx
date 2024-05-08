import StyledComponent, { type StyledProps } from "./Styled";
import { toUnionType } from "../../Common/UnionType";

/**
 * moaui styled code block with syntax highlighting
 * 
 * @param props  - The props of the component (children, language, title)
 * @link https://github.com/react-syntax-highlighter/react-syntax-highlighter
 * @returns A code block with syntax highlighting
 */
function CodeBlock(props: StyledProps) {	
	return <StyledComponent {...props} />
}

CodeBlock.defaultProps = {
	children: "",
	language: "js",
	title: "",
	radius: 8,
	width: "100%",
} as StyledProps;

const SampleProps = {
	id: '',
	children: `// this is javascript code.
	const value = 1;`,
	language: toUnionType({ values: ['js', 'javascript', 'ts', 'typescript', 'json', 'markdown'] }),
	title: "Code Block Title",
	radius: 4,
	width: "100%",
	backgroundColor: "",
	titlePadding: 1,
	titlePaddingX: 1,
	titlePaddingY: 1,
	codePadding: 1,
	codePaddingX: 1,
	codePaddingY: 1,
}

export default CodeBlock;

export {
	type StyledProps as CodeBlockProps,
	SampleProps as CodeBlockSample,
}