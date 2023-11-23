import React from "react";
import { TemplateWidth, TemplateHeight, CodeString } from '../recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import CodeComponent from "../../../Components/CodeBlock";
import ButtonCode from "./Button.txt?raw";
import TextfieldCode from "./Textfield.txt?raw";
import { ItemTypes } from '../../Playground/ItemTypes';
import { Source } from "@storybook/blocks";


export default function TotalCodeString(){
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
  const Codestring = useRecoilValue(CodeString);
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
${ isButtonExist ? `import { Button } from "@midasit-dev/moaui";` : ""}
${ isTextfieldExist ? `import { Textfield } from '@midasit-dev/moaui';` : ""}

function Components(props: any) {
  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // do something
  }

  return (
    <Box sx={{width: "${Sizewidth}px", height:"${Sizeheight}px", p:"0.5rem"}}>
			<Grid container spacing={0} style={{height:"100%"}}>
			${Codestring.map((value:any, index:any) => {
				if (value.length !== 0) {
					return value.map((value: any, index: any) => {
						console.log(value);
						if(value === ItemTypes.BUTTON){
							return ButtonCode;
						}else if(value === ItemTypes.TEXTFIELD){
							return TextfieldCode;
						}
						return "";
					});
				}
				return ""; // Add a return statement here
			})}
			</Grid>
    </Box>
  )
}`;

	function remove3Comma(str:string){
		let result = str.replace(/,{3}/g, "");
		let result2 = result.replace(/>,/g, ">");
		return result2;
	}

	return (
		<CodeComponent
			language="typescript"
			title='Plugin React UI Code'
			children={String(remove3Comma(totalCode)).replace(/\n$/, "")}
		/>
		// <Source 
		// 	language="typescript"
		// 	code={String(remove3Comma(totalCode)).replace(/\n$/, "")}
		// 	dark
		// />
	);
}