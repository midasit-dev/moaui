const fs = require('fs');
const path = require('path');

//./Utils.ts를 원복하여 개발 모드를 활성화 한다.
const utilsText = fs.readFileSync(path.join(__dirname, 'Utils.ts'), 'utf-8');

const newUtilsText = utilsText.replace(
		`export const IsDevEnv = \(\) => process.env.NODE_ENV !== 'development';`,
		`export const IsDevEnv = () => process.env.NODE_ENV === 'development';`
		);

fs.writeFileSync(path.join(__dirname, 'Utils.ts'), newUtilsText, 'utf-8');

console.log(`\n\x1b[33m┌┬┐┌─┐┬  ┬  ┌┬┐┌─┐┌┬┐┌─┐  ╔═╗╔╗╔\n ││├┤ └┐┌┘  ││││ │ ││├┤   ║ ║║║║\n─┴┘└─┘ └┘   ┴ ┴└─┘─┴┘└─┘  ╚═╝╝╚╝\x1b[0m\n`);
