import React from "react";
import { TemplateWidth, TemplateHeight, CodeString, RowCount, ColumnCount, LayoutsInfo } from '../recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import CodeComponent from "../../../Components/CodeBlock";
import DraggedComponent from "../Components/DraggedComponent";
import ButtonCode from "../../../Components/Button/Code/Contained.code.tsx?raw";
// import TextfieldCode from "./Textfield.txt?raw";
import { ItemTypes } from '../Components/ItemTypes';
import CodeExtractor from "../../../Common/Storybook/CodeExtractor";
import * as All from "../Components/DraggedComponentRawCode";

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
	const Layoutsinfo = useRecoilValue(LayoutsInfo);
	const [isButtonExist, setIsButtonExist] = React.useState(false);
	const [isTextfieldExist, setIsTextfieldExist] = React.useState(false);

	const Code = All.ComponentsButtonContained;
	console.log("Code: ", Code);
	React.useEffect(() => {
		Codestring.map((value:any, index:any) => {
			if(value.length !== 0){
				value.map((value:any, index:any) => {
					if(value === ItemTypes.ComponentsButtonContained){
						setIsButtonExist(true);
					}
					return null;
				})
			}
			return null; // Add a return statement here
		})
	}, [Codestring]);

	const totalCode = `import React from "react";
import Box from "@mui/material/Box";
${ isButtonExist ? extractComponentImport(All.ComponentsButtonContained) : ""}

function Components(props: any) {
  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // do something
  }

	${ isButtonExist ? extractComponentCode(All.ComponentsButtonContained) : ""}

  return (
    <Box sx={{width: "${Sizewidth}px", height:"${Sizeheight}px", p:"0.5rem"}}>
			<Grid container spacing={0} style={{height:"100%"}}>
			${Layoutsinfo.map((item:any, index:any) => {
				console.log("item: ",item);
				return (`<Grid item xs={${item.w}} key={${item.i}}>
					<div
						style={{
							border: '1px solid #ccc',
							height: '${item.h * 30}px', // rowHeight의 배수로 높이를 설정합니다.
							top: '${item.y * 30}px', // y값을 rowHeight 배수로 계산해 top으로 사용합니다.
							left: '${item.x * Number(Sizewidth) / 12}px', // x값을 colWidth 배수로 계산해 left로 사용합니다.
							position: 'absolute' // 위치를 절대값으로 지정합니다.
						}}
					>
						${item.type === ItemTypes.ComponentsButtonContained ? `${extractComponentName(All.ComponentsButtonContained)}` : ""}
					</div>
				</Grid>`)
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
			title='Plugin UI React Code'
			children={String(remove3Comma(totalCode)).replace(/\n$/, "")}
		/>
	);
}