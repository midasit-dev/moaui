const codeBlockSeperatorRegex = /\/\*\*\$\{comma\}\*\//gi; // 원래 형태: /**${comma}*/ 코드를 의미 단위로 분리하기 위함
const propsSeperatorRegex = /\/\*\*\$\{props-seperator\}\*\//gi; // 원래 형태: /**${props-seperator}*/

const splitByMask = (code: string): string[] => {
	return code.split(codeBlockSeperatorRegex);
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
	
	if (Code === '') console.error(arrCode, regex, 'Code is not exist');
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

const transformReadyToUse = (componentString: string): string => {
  // 컴포넌트 이름을 추출하기 위한 정규식
  const componentNameRegex = /const (\w+) = \(\{/;

  // 속성들을 추출하기 위한 정규식 (분석을 위한 lazy quantifier사용)
  const propsRegex = /(\w+)\s*=\s*((?:(?!,\s*\/\*\*\${props-seperator}\*\/)[\s\S])*)(?=\s*,\s*\/\*\*\${props-seperator}\*\/)/ig;

  const matchesComponentName = componentNameRegex.exec(componentString);
  const componentName = matchesComponentName ? matchesComponentName[1] : '';

  // 속성들을 저장할 객체 생성
  const props: { [key: string]: any } = {};

  // 속성을 객체로 저장
  let match;
  while ((match = propsRegex.exec(componentString))) {
		console.log(match);
    const [fullMatch, propName, propValue] = match;
    props[propName] = propValue;
  }

  // JSX 문자열을 조합
  const propsString = Object.entries(props)
    .map(([key, value]) => `${key}={${value}}`)
    .join('\n\t');

  return `<${componentName} \n\t${propsString}\n/>`;
};

interface ExtractedCode {
	/**
	 * import 구문들 (react || @midasit-dev/moaui)
	 */
	importCodes: string[];
	/**
	 * 함수형 컴포넌트 이름 (Code로부터 유추)
	 */
	functionalComponentName: string;
	/**
	 * 함수형 컴포넌트 코드 (정의를 위한 코드)
	 */
	functionalComponentCode: string;
	/**
	 * 사용을 위한 함수형 컴포넌트 코드 (사용을 위한 코드)
	 */
	functionalComponentCodeWithProps: string;
}
export const extract = (code: string): ExtractedCode => {
	const arrCode = splitByMask(code);

	let importCodes = [];
	for (const code of arrCode) {
		let importCode = getCode([code], /import\s+{.*}\s+from\s+['|"](.*)['|"]/ig);
		importCode = importCode.replace(/\r\nimport/ig, "import"); // import 구문이 2개 이상일 경우, 앞에 \r\n이 붙어있어서 제거
		if (importCode !== '') importCodes.push(importCode);
	}

	const componentCode = getCode(arrCode, /const\s+(Components|Authentication|Style|Templates).*\s?=\s?\(\)\s?=>\s?{/ig);
	const componentName = getComponentName(componentCode, /const\s+(Components|Authentication|Style|Templates).*\s?=\s?\(\)\s?=>\s?{/ig);
	const componentCodeWithProps = (transformReadyToUse(componentCode)).replace(propsSeperatorRegex, '');
	
	return {
		importCodes: importCodes,
		functionalComponentName: componentName.replace(/Components/gi, ''),
		functionalComponentCode: componentCode.replace(/Components/gi, ''),
		functionalComponentCodeWithProps: componentCodeWithProps,
	}
}

export const cleanMask = (code: string) => {
	return code.replace(codeBlockSeperatorRegex, '').replace(propsSeperatorRegex, '');
}

const Extractor = {
	extract,
	cleanMask,
}

export default Extractor;