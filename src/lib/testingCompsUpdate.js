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
			path: path.replace('.tsx', ''),
		})
	}
	return json;
};

const rootPath = ".";
const filteredFilePaths = getAllFilePaths(rootPath);
const arrInfos = generateFileInformations(filteredFilePaths);

const importRawCodes = [];
for (const info of arrInfos) 
	importRawCodes.push(`export { default as ${info.title} } from "${info.path}";`);

const ExtractedCodeComponentCode = `/**
* Testing Components
*/
${importRawCodes.join('\n')};`

writeFileSync('./testingCompsExports.tsx', ExtractedCodeComponentCode);