const mask = '/**${comma}*/';
const maskRegex = /\/\*\*\$\{comma\}\*\//gi;

const splitByMask = (code: string): string[] => {
	return code.split(maskRegex);
}

export const getImportCode = (code: string) => {
	const arrCode = splitByMask(code);

	let importCode = '';
	for ( code of arrCode ) {
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

export const getComponentCode = (code: string) => {
	const arrCode = splitByMask(code);

	let componentCode = '';
	for (code of arrCode) {
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

export const cleanMask = (code: string) => {
	console.log(code);
	return code.replace(maskRegex, '');
}

const Extractor = {
	getImportCode,
	getComponentCode,
	cleanMask,
}

export default Extractor;