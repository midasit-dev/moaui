import React from "react";
import { TemplateWidth, TemplateHeight, CodeString, RowCount, ColumnCount } from '../recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import CodeComponent from "../../../Components/CodeBlock";
import ButtonCode from "../../../Components/Button/Code/Contained.code.tsx?raw";
// import TextfieldCode from "./Textfield.txt?raw";
import { ItemTypes } from '../../Playground/ItemTypes';
import CodeExtractor from "../../../Common/Storybook/CodeExtractor";

function extractComponentCode(str:string){
	const code = CodeExtractor.extract(str);
	console.log(code);
	return code.functionalComponentCode;
}

function extractComponentName(str:string){
	const code = CodeExtractor.extract(str);
	console.log(code);
	return `<${code.functionalComponentName} />`;
}

function extractComponentImport(str:string){
	const code = CodeExtractor.extract(str);
	console.log(code);
	return code.importCodes;
}

export default function TotalCodeString(){
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
  const Codestring = useRecoilValue(CodeString);
	const Rowcount = useRecoilValue(RowCount);
	const Columncount = useRecoilValue(ColumnCount);
	const [isButtonExist, setIsButtonExist] = React.useState(false);
	const [isTextfieldExist, setIsTextfieldExist] = React.useState(false);

	React.useEffect(() => {
		Codestring.map((value:any, index:any) => {
			if(value.length !== 0){
				value.map((value:any, index:any) => {
					if(value === ItemTypes.BUTTON){
						setIsButtonExist(true);
					}else if(value === ItemTypes.TEXTFIELD){
						setIsTextfieldExist(true);
					}
					return null;
				})
			}
			return null; // Add a return statement here
		})
	}, [Codestring]);

	const totalCode = `import React from "react";
import Box from "@mui/material/Box";
${ isButtonExist ? extractComponentImport(ButtonCode) : ""}

function Components(props: any) {
  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // do something
  }

	${ isButtonExist ? extractComponentCode(ButtonCode) : ""}

  return (
    <Box sx={{width: "${Sizewidth}px", height:"${Sizeheight}px", p:"0.5rem"}}>
			<Grid container spacing={0} style={{height:"100%"}}>
			${Codestring.map((value:any, index:any) => {
				return (`<Grid item xs={${ 12 / Columncount }} style={{height:"${Math.floor(100 / Rowcount)}%"}}>
					${value.map((value: any, index: any) => {
							if (value === ItemTypes.BUTTON){
								return extractComponentName(ButtonCode);
							}
							// else if (value === ItemTypes.TEXTFIELD){
							// 	return extractComponentName(TextfieldCode);
							// }
							return "";
						})
					}
				</Grid>`)
			})}
			</Grid>
    </Box>
  )
}`;

	function remove3Comma(str:string){
		let result = str.replace(/,{3}/g, "");
		let result2 = result.replace(/>,/g, ">");
		console.log(result2);
		return result2;
	}

	return (
		<CodeComponent
			language="typescript"
			title='Plugin React UI Code'
			children={String(remove3Comma(totalCode)).replace(/\n$/, "")}
		/>
	);
}