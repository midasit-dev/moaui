import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import prettier from "prettier/standalone";
import parserBabel from 'prettier/parser-babel';
// import parserBabel from "prettier/plugins/babel";
import { Typography, Color } from "../..";
	
interface CodeComponentProps {	
	/**
	 * The code to be displayed
	 * @default ""
	 */
	children: string;
	/**
	 * The language of the code
	 * @default "javascript"
	 */
	language: string;
	/**
	 * The title of the code
	 * @default ""
	 */
	title?:string;
	/**
	 * Whether to hide the title
	 * 
	 * @default false
	 */
	hidetitle?: string;
	/**
	 * The radius of the code block
	 * 
	 * @default 8
	 */
	radius?: number;
}

CodeBlock.defaultProps = {
	children: "",
	language: "javascript",
	title: "",
	hidetitle: "false",
	radius: 8,
}
/**
 * A code block with syntax highlighting
 * 
 * @param props  - The props of the component (children, language, title)
 * @returns A code block with syntax highlighting
 */
function CodeBlock(props: CodeComponentProps){
	const [copySuccess, setCopySuccess] = React.useState(false);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setCopySuccess(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, [copySuccess]);

  const [formattedCode, setFormattedCode] = React.useState<any>(props.children);

  React.useEffect(() => {
    const formatCode = async () => {
      try {
        const result = await prettier.format(props.children, {
					parser: "babel",
					plugins: [parserBabel],
					useTabs: true,
					semi: true,
					singleQuote: true,
					trailingComma: "all",
					jsxSingleQuote: true,
					jsxBracketSameLine: true,
					printWidth: 120,
        });
        setFormattedCode(result);
      } catch (error) {
        console.error("Error formatting code:", error);
      }
    };

    formatCode();
  }, [props.children]);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(props.children);
			setCopySuccess(true);
		} catch (err) {
			console.error('Async: Could not copy text: ', err);
		}
	}

	return (
		<>
			<Box
				display="flex"
				justifyContent={"space-between"}
				alignItems='center'
				sx={{
					backgroundColor: Color.primaryNegative.enable,
					width: "100%",
					height: "2rem",
					borderTopLeftRadius: props.radius,
					borderTopRightRadius: props.radius,
				}}
			>
				{/* <Button sx={{display:"flex", justifyContent:"left", textTransform:"none", color:"#FFFFFF", ml:1, width:"auto"}}>{props.title}</Button> */}
				<Typography color={Color.primaryNegative.white} variant="h1" paddingLeft='1.4rem'>{props.title}</Typography>
				<IconButton onClick={copyToClipboard} sx={{backgroundColor:"transparent", width:"30px", height:"100%", mr: '0.6rem'}}>
					{copySuccess ? (
						<SpellcheckOutlinedIcon style={{ color: "gray", fontSize: "20" }}/>
					) : (
						<CodeRoundedIcon style={{ color: "white", fontSize: "20" }} />
					)}
				</IconButton>
			</Box>
			<SyntaxHighlighter
				showLineNumbers
				style={vscDarkPlus}
				wrapLines={true}
				customStyle={{
					borderBottomRightRadius: props.radius,
					borderBottomLeftRadius: props.radius,
					padding: '1rem 1rem 1rem 0',
					fontSize: "3px",
					margin: 0,
					// minHeight: "100px",
				}}
				{...props}
			>
				{formattedCode}
			</SyntaxHighlighter>
		</>
	);
}

export default CodeBlock;
