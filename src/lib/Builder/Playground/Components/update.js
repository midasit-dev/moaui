const { readdirSync, writeFileSync } = require('fs');

const getAllFilePaths = (rootPath) => {
	const files = readdirSync(rootPath, { withFileTypes: true });
	const allFiles = [];
	for (const file of files) {
		const path = `${rootPath}/${file.name}`;
		if (file.isDirectory()) {
			const subFiles = getAllFilePaths(path);
			allFiles.push(...subFiles);
		} else {
			//*.code.* 파일만 추출
			if (/.*\/(.*)\/Code\/(.*)\.code\.(tsx|jsx|ts|js)/ig.test(path)) allFiles.push(path);
			continue;
		}
	}
	return allFiles.flat();
};

const generateFileInformations = (paths) => {
	let json = [];
	for (const path of paths) {
		const exec = /(.*)\/(.*)\/(.*)\/Code\/(.*)\.code\.(tsx|jsx|ts|js)/ig.exec(path);
		json.push({
			title: `${exec[3]}${exec[4]}`,
			path: path.replace(/\.(tsx|jsx|ts|js)/g, ''),
		})
	}
	return json;
};

const rootPath = "../../..";
const filteredFilePaths = getAllFilePaths(rootPath);
const arrInfos = generateFileInformations(filteredFilePaths);

//index.tsx 변경
const importCodes = [];
for (const info of arrInfos) importCodes.push(`export { default as ${info.title} } from '${info.path}';`);
writeFileSync('./index.ts', `${importCodes.join('\n')}`);

//DraggedComponentRawCode.tsx 변경
const importRawCodes = [];
for (const info of arrInfos) importRawCodes.push(`export { default as ${info.title} } from '${info.path}.tsx?raw';`);
writeFileSync('./DraggedComponentRawCode.ts', `${importRawCodes.join('\n')}`);

//TotalStringV2.tsx 변경
const totalSringV2 = [];
for (const info of arrInfos) totalSringV2.push(`\t\t\t\t\t\t\${item.type === ItemTypes.${info.title} ? \`\${extractComponentName(All.${info.title})}\` : ""}`);
const useStates = [];
for (const info of arrInfos) useStates.push(`\tconst [${info.title.toLowerCase()}, set${info.title}] = React.useState(false);`);
const useEffects = [];
for (const info of arrInfos) useEffects.push(`\t\t\t\tcase ItemTypes.${info.title}: \n\t\t\t\t\tset${info.title}(true);\n\t\t\t\tbreak;`)
const ComponentCode = [];
for (const info of arrInfos) ComponentCode.push(`\t\${${info.title.toLowerCase()} ? extractComponentCode(All.${info.title}) : ""}`);

writeFileSync('./TotalStringV2.tsx', `import React from "react";
import { TemplateWidth, TemplateHeight, CodeString, RowCount, ColumnCount, LayoutsInfo } from '../recoil/PlaygroundAtom';
import { useRecoilValue } from 'recoil';
import CodeComponent from "../../../Components/CodeBlock";
import DraggedComponent from "./DraggedComponent";
import ButtonCode from "../../../Components/Button/Code/Contained.code.tsx?raw";
// import TextfieldCode from "./Textfield.txt?raw";
import { ItemTypes } from './ItemTypes';
import CodeExtractor from "../../../Common/Storybook/CodeExtractor";
import * as All from "./DraggedComponentRawCode";

function extractComponentCode(str:string){
	const code = CodeExtractor.extract(str);
	return code.functionalComponentCode;
}

function extractComponentName(str:string){
	const code = CodeExtractor.extract(str);
	return \`<\${code.functionalComponentName} />\`;
}

function extractComponentImport(str:string){
	const code = CodeExtractor.extract(str);
	return code.importCodes;
}

export default function TotalCodeString(){
  const Sizewidth = useRecoilValue(TemplateWidth);
  const Sizeheight = useRecoilValue(TemplateHeight);
	const Codestring = useRecoilValue(CodeString);
	const Rowcount = useRecoilValue(RowCount);
	const Columncount = useRecoilValue(ColumnCount);
	const Layoutsinfo = useRecoilValue(LayoutsInfo);
${useStates.join('\n')}

	React.useEffect(() => {
		Layoutsinfo.map((value: any) => {
			switch(value.type){
${useEffects.join('\n')}
				default:
					break;
			}
		});
	}, [Layoutsinfo]);


	const totalCode = \`import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
\${ buttoncomposite || buttoncontained || buttonnegative || buttonnormal || buttonoutlined || buttontext || buttonwidth ? extractComponentImport(All.ButtonContained) : ""}
\${ checknotrequired || checkrequired || checkgroupcontrolled || checkgroupuncontrolled ? extractComponentImport(All.CheckNotRequired) : ""}
\${ datagridpagination ? extractComponentImport(All.DataGridPagination) : ""}
\${ dialoghelpbutton || dialoghelpiconbutton ? extractComponentImport(All.DialogHelpButton) : ""}
\${ droplistdropdown ? extractComponentImport(All.DropListDropdown) : ""}
\${ gridcolumn || griditems || gridrow ? extractComponentImport(All.GridColumn) : ""}
\${ iconadd || iconclose ? extractComponentImport(All.IconAdd) : ""}
\${ iconbuttonadd || iconbuttonclose ? extractComponentImport(All.IconButtonAdd) : ""}
\${ listcontrolled || listdynamic || listuncontrolled ? extractComponentImport(All.ListControlled) : ""}
\${ listitemdefault ? extractComponentImport(All.ListItemDefault) : ""}
\${ listitembuttondefault ? extractComponentImport(All.ListItemButtonDefault) : ""}
\${ panelbox || panelshadow || panelstrock ? extractComponentImport(All.PanelBox) : ""}
\${ radioname ? extractComponentImport(All.RadioName) : ""}
\${ radiogroupcontrolled || radiogroupuncontrolled ? extractComponentImport(All.RadioGroupControlled) : ""}
\${ scrollbarscheckgroup || scrollbarslist ? extractComponentImport(All.ScrollbarsCheckGroup) : ""}
\${ seperatorhorizontal || seperatorvertical ? extractComponentImport(All.SeperatorHorizontal) : ""}
\${ stackcolumn || stackrow ? extractComponentImport(All.StackColumn) : ""}
\${ switchlabel ? extractComponentImport(All.SwitchLabel) : ""}
\${ switchgroupcontrolled || switchgroupuncontrolled ? extractComponentImport(All.SwitchGroupControlled) : ""}
\${ tablabel || switchgroupuncontrolled ? extractComponentImport(All.TabLabel) : ""}
\${ tabgrouphorizontal || tabgroupvertical ? extractComponentImport(All.TabGroupHorizontal) : ""}
\${ tablebody || tablebundle ? extractComponentImport(All.TableBody) : ""}

function Components(props: any) {
  function onClickExampleHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // do something
  }

${ComponentCode.join('\n')}

  return (
    <Box sx={{width: "\${Sizewidth}px", height:"\${Sizeheight}px", p:"0.5rem", border: '1px solid #bebebe'}}>
			<Grid container spacing={0} style={{height:"100%", position: 'relative'}}>
			\${Layoutsinfo.map((item:any, index:any) => {
				return (\`
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: '\${item.w * Number(Sizewidth) / 12}px', // w값을 colWidth 배수로 계산해 width로 사용합니다.
							height: '\${item.h * 30}px', // rowHeight의 배수로 높이를 설정합니다.
							top: '\${item.y * 30}px', // y값을 rowHeight 배수로 계산해 top으로 사용합니다.
							left: '\${item.x * Number(Sizewidth) / 12}px', // x값을 colWidth 배수로 계산해 left로 사용합니다.
							position: 'absolute' // 위치를 절대값으로 지정합니다.
						}}
					>
${totalSringV2.join('\n')}
					</div>\`
				)
			})}
			</Grid>
    </Box>
  )
}\`;

	function remove3Comma(str:string){
		let result = str.replace(/,{3}/g, "");
		let result2 = result.replace(/>,/g, ">");
		return result2;
	}

	return (
		<CodeComponent
			language="typescript"
			title='Plugin UI React Code'
			children={String(remove3Comma(totalCode)).replace(/\\n$/, "")}
		/>
	);
}`)

//ItemTypes.ts 변경
const TypeStrings = [];
for (const info of arrInfos) TypeStrings.push(`\t${info.title}: '${info.title}',`);
writeFileSync('./ItemTypes.ts', `export const ItemTypes = {
  BOX: 'box',
  BUTTON: 'button',
  TEXTFIELD: 'textfield',
  CHECKBOX: 'checkbox',
  DROPLIST: 'droplist',
  RADIO: 'radio',
  SEPERATOR: 'seperator',
  SWITCH: 'switch',
  TAB: 'tab',
  TABLE: 'table',
  TYPOGRAPHY: 'typography',
${TypeStrings.join('\n')}
};
`)

//DraggedComponent.tsx 변경
const caseReturns = [];
const prefixAlias = 'All';
for (const info of arrInfos) caseReturns.push(`\t\tcase ItemTypes.${info.title}: return <${prefixAlias}.${info.title} />;`);
writeFileSync('./DraggedComponent.tsx', `import * as ${prefixAlias} from ".";
import { ItemTypes } from './ItemTypes';

function DraggedComponent(props: any){
  const item = props.item;

	switch (item.type) {
${caseReturns.join('\n')}
		default: return <>Invalid</>;
	}
}

export default DraggedComponent;
`);

//DraggableComponent.tsx 변경
writeFileSync('./DraggableComponent.tsx', `import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../Components/ItemTypes';

const CustomStyled = (isDragging: boolean) => {
	return {
		width: '100%',
		cursor: 'grab',
		opacity: isDragging ? 0.5 : 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
}

const CustomDraggableComponent = (props: any) => {
	const itemType = props.itemType || "Invalid";

	const [{ isDragging }, drag] = useDrag({
    type: itemType,
		item: { type: itemType },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

	return (
		<div 
			draggable={true}
			onDragStart={(e) => {e.dataTransfer.setData("type", itemType)}}
			ref={drag}
			style={CustomStyled(isDragging)}
		>
			{props.children}
		</div>
	)
}

${arrInfos.map(info => `export const ${info.title} = 
	() => <CustomDraggableComponent itemType={ItemTypes.${info.title}}>${info.title}</CustomDraggableComponent>;
`).join('\n')}

const DraggableComponent: React.FC = () => {
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
${arrInfos.map(info => `\t\t\t<${info.title} />`).join('\n')}
		</div>
	);
};
	
export default DraggableComponent;
`);