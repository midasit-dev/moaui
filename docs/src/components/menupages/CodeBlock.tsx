import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
	/**
	 * The code to be displayed
	 * @default ""
	 */
	children: string | string[];
	/**
	 * The language of the code
	 * @default "javascript"
	 */
	language: string;
}

/**
 * @param props  - The props of the component (children, language)
 * @returns A code block with syntax highlighting
 */
const CodeComponent = (props: Props) => {
	return <SyntaxHighlighter showLineNumbers style={vscDarkPlus} 
	wrapLines={true} customStyle={{borderBottomRightRadius: 8, borderBottomLeftRadius: 8, padding: '1.5em', fontSize:"2px", margin:0}} {...props}>{props.children}</SyntaxHighlighter>;
}

export default CodeComponent;