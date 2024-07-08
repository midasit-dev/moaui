const path = require('path');
const fs = require('fs');

const inactivatePyscript = () => {
	const publicIndexPath = path.join(__dirname, '../../public/index.html');
	const inactiveIndexHtmlString = require('./server-pyscript-activation').inactive_index_html;
	fs.writeFileSync(publicIndexPath, inactiveIndexHtmlString, 'utf-8');

	const wrapperPath = path.join(__dirname, '../../src/Wrapper.tsx');
	const inactiveWrapperTsxString = require('./server-pyscript-activation').inactive_wrapper_tsx;
	fs.writeFileSync(wrapperPath, inactiveWrapperTsxString, 'utf-8');
}

inactivatePyscript();