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
			title: `${exec[2]}${exec[3]}${exec[4]}`,
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

//index.tsx 변경
const importRawCodes = [];
for (const info of arrInfos) importRawCodes.push(`export { default as ${info.title} } from '${info.path}.tsx?raw';`);
writeFileSync('./DraggedComponentRawCode.ts', `${importRawCodes.join('\n')}`);

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
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				flexDirection: 'column',
			}}
		>
${arrInfos.map(info => `\t\t\t<${info.title} />`).join('\n')}
		</div>
	);
};
	
export default DraggableComponent;
`);