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
			title: `${exec[2]}/${exec[3]}/${exec[4]}`,
			path: path,
		})
	}
	return json;
};

const rootPath = "../../..";
const filteredFilePaths = getAllFilePaths(rootPath);
const arrInfos = generateFileInformations(filteredFilePaths);

const importRawCodes = [];
for (const info of arrInfos) importRawCodes.push(`			rawCodes.push(await import("${info.path}?raw"));`);

const ExtractedCodeComponentCode = `import { useEffect, useState } from 'react';
import { Source } from '@storybook/blocks';
import { extract } from "../CodeExtractor";

const SourceComponentBundle = (props: any) => {
	const { importCodes, functionalComponentName, functionalComponentCode } = extract(props.code);

	return (
		<>
			<h1>{functionalComponentName}</h1>
			{importCodes.map((code, index) => <Source key={index} code={code} language="ts" dark />)}
			<Source code={functionalComponentCode} language="ts" dark />
		</>
	)
};

const App = () => {
	const [codes, setCodes] = useState<any[]>([]);

	useEffect(() => {
		const asyncFunction = async () => {
			const rawCodes: string[] = [];
${importRawCodes.join('\n')}
			setCodes(rawCodes);
		}

		asyncFunction();
	}, []);
	
	return (
		<>
			{codes.map((code, index) => <SourceComponentBundle key={index} code={code.default} />)}
		</>
	)
}

export default App;`

writeFileSync('./ExtractedCodeComponent.tsx', ExtractedCodeComponentCode);