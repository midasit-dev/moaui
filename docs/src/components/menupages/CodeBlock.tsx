	import React from "react";
	import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
	import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
	import ContentCopyIcon from '@mui/icons-material/ContentCopy';
	import IconButton from "@mui/material/IconButton"
	import Box from "@mui/material/Box";
	import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
	import { styled } from '@mui/system';
	interface Props {
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
	}

	/**
	 * @param props  - The props of the component (children, language)
	 * @returns A code block with syntax highlighting
	 */
	const CodeComponent = (props: Props) => {
		const [copySuccess, setCopySuccess] = React.useState(false);

		React.useEffect(() => {
			const timer = setTimeout(() => {
				setCopySuccess(false);
			}, 1500);
			return () => clearTimeout(timer);
		}, [copySuccess]);

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
          justifyContent={"right"}
          sx={{
            backgroundColor: "#18244a",
            width: "100%",
            height: "1.6rem",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <IconButton onClick={copyToClipboard}>
						{copySuccess ? (
							<CheckCircleOutlineIcon
								style={{ color: "white", fontSize: "20" }}
							/>
						) : (
							<ContentCopyIcon style={{ color: "white", fontSize: "18" }} />
						)}
          </IconButton>
        </Box>
        <SyntaxHighlighter
          showLineNumbers
          style={vscDarkPlus}
          wrapLines={true}
          customStyle={{
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            padding: "1.7em",
            fontSize: "3px",
            margin: 0,
          }}
          {...props}
        >
          {props.children}
        </SyntaxHighlighter>
      </>
    );
	}
	export default CodeComponent;

