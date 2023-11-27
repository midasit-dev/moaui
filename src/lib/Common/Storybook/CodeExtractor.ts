const mask = '/**${comma}*/';
const maskRegex = /\/\*\*\$\{comma\}\*\//gi;

const splitByMask = (code: string): string[] => {
	return code.split(maskRegex);
}

const getImportCode = (arrCode: string[]) => {
	let importCode = '';
	for (const code of arrCode) {
		//정규식으로 import { ... } from '@midasit-dev'; 이거나 import { ... } from "@midasit-dev"; 를 찾아 분리
		const importRegex = /import\s+{([\s\S]*)}\s+from\s+['"]@midasit-dev\/moaui['"];?/g;
		const importMatch = code.match(importRegex);
		if (importMatch) {
			importCode = code;
			break;
		}
	}

	if (importCode === '') console.error('importCode is not exist');
	return importCode;
}

const getComponentCode = (arrCode: string[]) => {
	let componentCode = '';
	for (const code of arrCode) {
		//정규식으로 const App = () => { ... } 를 찾아 분리
		const componentRegex = /const\s+Comp.*\s?=\s?\(\)\s?=>\s?{/ig;
		const componentMatch = code.match(componentRegex);
		if (componentMatch) {
			componentCode = code;
			break;
		}
	}

	if (componentCode === '') console.error('componentCode is not exist');
	return componentCode;
}

const getComponentName = (componentCode: string) => {
	//첫번째 const ... = () => { 를 찾아서 그 안에 있는 ... 을 찾아 분리
	const componentNameRegex = /const\s+(.*)\s?=\s?\(\)\s?=>\s?{/ig;
	const componentNameMatch = componentNameRegex.exec(componentCode);
	let componentName = '';
	if (!componentNameMatch) {
		console.error('componentName is not exist');
		return componentName;
	}
	componentName = componentNameMatch[1].trim();
	return componentName;
}

interface ExtractedCode {
	importCode: string;
	functionalComponentName: string;
	functionalComponentCode: string;
}
export const extract = (code: string): ExtractedCode => {
	const arrCode = splitByMask(code);

	const importCode = getImportCode(arrCode);
	const componentCode = getComponentCode(arrCode);
	const componentName = getComponentName(componentCode);

	return {
		importCode: importCode,
		functionalComponentName: componentName,
		functionalComponentCode: componentCode,
	}
}

export const cleanMask = (code: string) => {
	return code.replace(maskRegex, '');
}

const Extractor = {
	extract,
	cleanMask,
}

export default Extractor;