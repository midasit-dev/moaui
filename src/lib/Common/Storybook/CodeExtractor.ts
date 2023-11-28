const mask = '/**${comma}*/';
const maskRegex = /\/\*\*\$\{comma\}\*\//gi;

const splitByMask = (code: string): string[] => {
	return code.split(maskRegex);
}

const getCode = (arrCode: string[], regex: RegExp): string => {
	let Code ='';
	for (const code of arrCode) {
		const match = code.match(regex);
		if (match) {
			Code = code;
			break;
		}
	}
	
	if (Code === '') console.error('Code is not exist');
	return Code;
}

const getComponentName = (componentCode: string, regex: RegExp) => {
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
	importCodes: string[];
	functionalComponentName: string;
	functionalComponentCode: string;
}
export const extract = (code: string): ExtractedCode => {
	const arrCode = splitByMask(code);

	let importCodes = [];
	for (const code of arrCode) {
		const importCode = getCode([code], /import\s+{.*}\s+from\s+['|"](.*)['|"]/ig);
		if (importCode !== '') importCodes.push(importCode);
	}

	const componentCode = getCode(arrCode, /const\s+(Components|Authentication|Style).*\s?=\s?\(\)\s?=>\s?{/ig);
	const componentName = getComponentName(componentCode, /const\s+(Components|Authentication|Style).*\s?=\s?\(\)\s?=>\s?{/ig);

	return {
		importCodes: importCodes,
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