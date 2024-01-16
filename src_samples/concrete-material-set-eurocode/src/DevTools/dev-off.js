const fs = require('fs');
const path = require('path');

//./Utils.ts의 조건을 살짝 고쳐 개발 모드를 잠시 꺼본다.
const utilsText = fs.readFileSync(path.join(__dirname, 'Utils.ts'), 'utf-8');

const newUtilsText = utilsText.replace(
		`export const IsDevEnv = () => process.env.NODE_ENV === 'development';`,
		`export const IsDevEnv = () => process.env.NODE_ENV !== 'development';`
		);

fs.writeFileSync(path.join(__dirname, 'Utils.ts'), newUtilsText, 'utf-8');

console.log(`\n\x1b[31m┌┬┐┌─┐┬  ┬  ┌┬┐┌─┐┌┬┐┌─┐  ╔═╗╔═╗╔═╗\n ││├┤ └┐┌┘  ││││ │ ││├┤   ║ ║╠╣ ╠╣ \n─┴┘└─┘ └┘   ┴ ┴└─┘─┴┘└─┘  ╚═╝╚  ╚  \x1b[0m\n`);
