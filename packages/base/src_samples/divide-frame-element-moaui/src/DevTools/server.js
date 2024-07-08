const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const constantPath = path.join(__dirname, 'constant.json');
const constantJson = fs.readFileSync(constantPath, 'utf-8');
const constant = JSON.parse(constantJson);

const defaultPort = constant.port;
const defaultHost = constant.host;
let anotherPort = '';
const currentPort = () => {
	return anotherPort || defaultPort;
}
const currentBaseUrl = () => {
	return `http://${defaultHost}:${currentPort()}`;
}

const responseHandler = (text, type = 'ok') => {
	if (type === 'error') {
		return {
			error: text
		}
	}

	return {
		message: text
	}
}

app.get('/exports/schemas/:filename', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
	console.debug(`\n\x1b[36mGet layer json ...\x1b[0m`);

	const { filename } = req.params;
	const exportDir = path.join(__dirname, '../../src/Exports/Schemas');
	const exportFilePath = path.join(exportDir, filename);

	if (!fs.existsSync(exportFilePath)) {
		console.error('Export file does not exist');
		return res.status(404).send(responseHandler('Export file does not exist', 'error'));
	}

	const exportFile = fs.readFileSync(exportFilePath, 'utf-8');
	console.debug(`import file text, ${exportFile.slice(0, 100)} ...`);
	res.send(exportFile);

	console.debug(`\x1b[36mGetting the layer json is completed!\x1b[0m`);
});

app.get('/exports/schemas', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
	console.debug(`\n\x1b[36mGet Exported layer file names ...\x1b[0m`);

	const exportDir = path.join(__dirname, '../../src/Exports/Schemas');
	if (!fs.existsSync(exportDir)) {
		console.error('Export directory does not exist');
		return res.send(responseHandler('Export directory does not exist!', 'error'));
	}

	const exportFiles = fs.readdirSync(exportDir);
	const exportList = exportFiles.filter((file) => file.endsWith('.json'));
	res.send(exportList);

	console.debug(`\x1b[36mGetting the layer file names is completed!\x1b[0m\n`);
});

app.post('/exports/schemas', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
  console.debug(`\n\x1b[36mExport layer json ...\x1b[0m`);

	const {
		fileName,
		content
	} = req.body;

	try {
		const exportDir = path.join(__dirname, '../../src/Exports/Schemas');
		if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });
		const exportFilePath = path.join(exportDir, fileName);
		fs.writeFileSync(exportFilePath, content, 'utf-8');
		const resText = `saved at ${exportFilePath}`;
		console.debug(resText);
		res.send(responseHandler(resText));
	} catch (error) {
		console.error(`Error executing 'npm run export:layer': ${error.stderr.toString()}`);
		res.status(500).send(responseHandler('An error occurred during npm run export:layer', 'error'));
	}

	console.debug(`\x1b[36mExport layer json Completed!\x1b[0m\n`);
});

app.post('/exports/codes', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
	console.debug(`\n\x1b[36mExport code ...\x1b[0m`);

	const {
		fileName,
		content
	} = req.body;

	try {
		//넘어온 content(codeString)을 exports/codes에 저장한다.
		const exportDir = path.join(__dirname, '../../src/Exports/Codes');
		if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });
		const exportFilePath = path.join(exportDir, fileName);
		fs.writeFileSync(exportFilePath, content, 'utf-8');
		const resText = `saved at ${exportFilePath}`;
		console.debug(resText);
		res.send(responseHandler(resText));
	} catch (error) {
		console.error(`Error executing 'npm run export:code': ${error.stderr.toString()}`);
		res.status(500).send(responseHandler('An error occurred during npm run export:code', 'error'));
	}

	console.debug(`\x1b[36mExport code Completed!\x1b[0m\n`);
});

// GET exports/codes
app.get('/exports/codes', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
	console.debug(`\n\x1b[36mGet Exported code file names ...\x1b[0m`);

	try {
		const exportDir = path.join(__dirname, '../../src/Exports/Codes');
		if (!fs.existsSync(exportDir)) {
			console.error('Export directory does not exist');
			return res.send(responseHandler('Export directory does not exist!', 'error'));
		}
	
		const exportFiles = fs.readdirSync(exportDir);
		const exportList = exportFiles.filter((file) => file.endsWith('.json'));
		res.send(exportList);
	} catch (error) {
		console.error(`Error executing 'npm run export:code': ${error.stderr.toString()}`);
		res.status(500).send(responseHandler('An error occurred during npm run export:code', 'error'));
	}

	console.debug(`\x1b[36mGetting the code file names is completed!\x1b[0m\n`);
});

// POST /apply-code
app.post('/apply-code', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
	console.debug(`\n\x1b[36mPOST /apply-code ...\x1b[0m`);

	const {
		fileName
	} = req.body;

	try {
		const exportDir = path.join(__dirname, '../../src/Exports/Codes');
		const exportFilePath = path.join(exportDir, fileName);
		const exportFile = fs.readFileSync(exportFilePath, 'utf-8');
		const exportCodes = JSON.parse(exportFile);

		if ('tsx' in exportCodes && exportCodes.tsx !== "") {
			//백업한다.
			const appPath = path.join(__dirname, '../../src/App.tsx');
			const appText = fs.readFileSync(appPath, 'utf-8');
			const backupAppPath = path.join(__dirname, `../../src/App-${fileName}.bak`);
			fs.writeFileSync(backupAppPath, appText, 'utf-8');

			//기존 파일에 exportCode를 적용한다.
			fs.writeFileSync(appPath, exportCodes.tsx, 'utf-8');
		}

		if ('py' in exportCodes && exportCodes.py !== "") {
			//백업한다.
			const pyPath = path.join(__dirname, '../../public/py_main.py');
			const pyText = fs.readFileSync(pyPath, 'utf-8');
			const backupPyPath = path.join(__dirname, `../../public/py_main.py-${fileName}.bak`);
			fs.writeFileSync(backupPyPath, pyText, 'utf-8');

			//기존 파일에 exportCode를 적용한다.
			fs.writeFileSync(pyPath, exportCodes.py, 'utf-8');
		}
		
		console.debug(`saved at ${exportFilePath}`);
		res.send(responseHandler('App.tsx updated successfully!'));
	} catch (error) {
		console.error(`Error executing 'npm run export:code': ${error.stderr.toString()}`);
		res.status(500).send(responseHandler('An error occurred during npm run export:code', 'error'));
	}

	console.debug(`\x1b[36mPOST /apply-code Completed!\x1b[0m\n`);
});

app.put('/public/manifest-json', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
  console.debug(`\n\x1b[36mPUT /public/manifest-json ...\x1b[0m\n`);

  const { 
		short_name, 
		name,
		width, 
		height,
		background_color,
	} = req.body;

  // 현재 스크립트의 디렉토리를 기준으로 manifest.json의 경로 생성
  const manifestPath = path.join(__dirname, '../../public/manifest.json');

  try {
    const manifestJson = fs.readFileSync(manifestPath, 'utf-8');
    const prevData = JSON.parse(manifestJson);
    const newData = { 
      ...prevData, 
			short_name: short_name || prevData.short_name,
			name: name || prevData.name,
			width: width || prevData.width,
			height: height || prevData.height,
			background_color: background_color || prevData.background_color,
    };

    fs.writeFileSync(manifestPath, JSON.stringify(newData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(responseHandler('An error occurred', 'error'));
      }
      res.send(responseHandler('manifest.json updated successfully!'));
    });
  } catch (error) {
    console.error('Error updating manifest.json:', error);
    return res.status(500).send(responseHandler('An error occurred', 'error'));
  } finally {
		logServerON(currentPort(), currentBaseUrl());
		console.debug(`\x1b[36mPUT /public/manifest-json Completed!\x1b[0m`);
		console.debug(`modified at \x1b[37m\x1b[1m${manifestPath}\x1b[0m`);
		console.debug('modified data:', req.body, '\n');
	}
});

app.get('/build', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
  console.debug(`\n\x1b[36mStart Plug-in Item Package Build ...\x1b[0m\n`);

  try {
    // 동기적으로 npm run build 실행
    const buildStdout = execSync('npm run build');
		// console.debug(buildStdout.toString());
    res.send(JSON.stringify({ message: buildStdout.toString() }));
  } catch (error) {
    console.error(responseHandler(`Error executing 'npm run build': ${error.stderr.toString()}`, 'error'));
    res.status(500).send(responseHandler('An error occurred during npm run build', 'error'));
  }

	logServerON(currentPort(), currentBaseUrl());
  console.debug(`\x1b[36mPlug-in Item Package Build Completed!\x1b[0m`);
	const buildPath = path.join(__dirname, '../../build/index.html');
	console.debug(`production build, \x1b[37m\x1b[1m${buildPath}\x1b[0m`);
});

app.get('/upgrade/moaui', (req, res) => {
	logServerON(currentPort(), currentBaseUrl());
	console.debug(`\n\x1b[36mStart @midasit-dev/moaui upgrade ...\x1b[0m\n`);

	try {
		// 동기적으로 npm run build 실행
		const upgradeStdout = execSync('npm upgrade @midasit-dev/moaui');
		const listStdout = execSync('npm list @midasit-dev/moaui');
		// console.debug(upgradeStdout.toString());
		res.send(JSON.stringify({ message: upgradeStdout.toString() }));

		logServerON(currentPort(), currentBaseUrl());
		console.debug(`\x1b[36m@midasit-dev/moaui upgrade Completed!\x1b[0m`);
		console.debug(`installed! \x1b[37m\x1b[1m${listStdout.toString()}\x1b[0m`);
	} catch (error) {
		console.error(`Error executing 'npm upgrade @midasit-dev/moaui': ${error.stderr.toString()}`);
		res.status(500).send(responseHandler('An error occurred during npm upgrade @midasit-dev/moaui', 'error'));
	}
});

app.get('/health', (req, res) => {
	res.send(responseHandler('ok'));
});

const inactivatePyscript = () => {
	const publicIndexPath = path.join(__dirname, '../../public/index.html');
	const inactiveIndexHtmlString = require('./server-pyscript-activation').inactive_index_html;
	fs.writeFileSync(publicIndexPath, inactiveIndexHtmlString, 'utf-8');

	const wrapperPath = path.join(__dirname, '../../src/Wrapper.tsx');
	const inactiveWrapperTsxString = require('./server-pyscript-activation').inactive_wrapper_tsx;
	fs.writeFileSync(wrapperPath, inactiveWrapperTsxString, 'utf-8');
}

const activatePyscript = () => {
	const publicIndexPath = path.join(__dirname, '../../public/index.html');
	const activeIndexHtmlString = require('./server-pyscript-activation').active_index_html;
	fs.writeFileSync(publicIndexPath, activeIndexHtmlString, 'utf-8');

	const wrapperPath = path.join(__dirname, '../../src/Wrapper.tsx');
	const activeWrapperTsxString = require('./server-pyscript-activation').active_wrapper_tsx;
	fs.writeFileSync(wrapperPath, activeWrapperTsxString, 'utf-8');
}

app.put('/activation/pyscript', (req, res) => {
	const { value } = req.body;

	logServerON(currentPort(), currentBaseUrl());
	console.debug(`\n\x1b[36mStart activation pyscript (${value}) ...\x1b[0m`);

	if (value === 'inactivate') {
		try {
			inactivatePyscript();
			res.send(responseHandler('inactivate pyscript completed!'));
		} catch (error) {
			console.error('Error inactivate pyscript:', error);
			res.status(500).send(responseHandler('An error occurred during inactivate pyscript', 'error'));
		}
	}

	if (value === 'activate') {
		try {
			activatePyscript();
			res.send(responseHandler('activate pyscript completed!'));
		} catch (error) {
			console.error('Error activate pyscript:', error);
			res.status(500).send(responseHandler('An error occurred during activate pyscript', 'error'));
		}
	}

	console.debug(`\x1b[36mActivation pyscript (${value}) Completed!\x1b[0m\n`);
});

//./Utils.ts의 const devServerStatus: string = ''; 
//부분을 const devServerStatus: string = 'listening'; 으로 변경한다
const changeServerStatus = (status) => {
	const utilsPath = path.join(__dirname, 'ServerListening.ts');
	const utilsText = fs.readFileSync(utilsPath, 'utf-8');
	const newUtilsText = utilsText.replace(
		/const devServerStatus: string = '.*';/g,
		`const devServerStatus: string = '${status}';`
		);
	fs.writeFileSync(utilsPath, newUtilsText, 'utf-8');
}

//port 변경
const changeConstant = (port) => {
	anotherPort = port;
	const constantPath = path.join(__dirname, 'constant.json');
	const constantJson = fs.readFileSync(constantPath, 'utf-8');
	const constant = JSON.parse(constantJson);
	constant.port = currentPort();
	constant.baseUrl = currentBaseUrl();
	fs.writeFileSync(constantPath, JSON.stringify(constant, null, 2), 'utf-8');
}

//default Port로 원복
const resetConstant = () => {
	anotherPort = '';
	const constantPath = path.join(__dirname, 'constant.json');
	const constantJson = fs.readFileSync(constantPath, 'utf-8');
	const constant = JSON.parse(constantJson);
	constant.port = currentPort();
	constant.baseUrl = currentBaseUrl();
	fs.writeFileSync(constantPath, JSON.stringify(constant, null, 2), 'utf-8');
}

const findAvailablePortAndStartServer = (port) => {
  const server = app.listen(port, () => {
    logServerON(currentPort(), currentBaseUrl());
    changeServerStatus('listening');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.debug(`Port ${port} is already in use, trying the next one...`);
			anotherPort = port + 1;
			changeConstant(anotherPort);

      findAvailablePortAndStartServer(anotherPort);
    } else {
      console.error('Error starting server:', err.message);
    }
  });

  server.on('listening', () => {
    logServerON(currentPort(), currentBaseUrl());
    console.debug(`\x1b[36mServer is running on port ${port}\x1b[0m`);
  });

	// 서버 종료 이벤트 리스너
	server.on('close', () => {
		logServerOFF();
		changeServerStatus('');
		resetConstant();
	});

	// 어떤 이유로든 서버를 강제로 종료
	// 예시: Ctrl+C를 눌러 프로세스를 종료하는 경우
	process.on('SIGINT', () => {
		console.debug(`\n\x1b[36mServer Closing ...\x1b[0m`)
		server.close(() => {
			logServerOFF();
			changeServerStatus('');
			resetConstant();
			process.exit(0);
		});
	});
}

const logServerON = (_port, _baseUrl) => {
	console.clear();
	console.debug(`\n\x1b[32m┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ╔═╗╔╗╔\n└─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  ║ ║║║║\n└─┘└─┘┴└─ └┘ └─┘┴└─  ╚═╝╝╚╝\x1b[0m\n`);
  console.debug(`Welcome, moaui-cra dev mode!\n`);
	console.debug(`  Port:\t\t\x1b[1m${_port}\x1b[0m`);
	console.debug(`  Base URL:\t\x1b[1m${_baseUrl}\x1b[0m\n`);	
}

const logServerOFF = () => {
	console.clear();
	console.debug(`\n\x1b[31m┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ╔═╗╔═╗╔═╗\n└─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  ║ ║╠╣ ╠╣ \n└─┘└─┘┴└─ └┘ └─┘┴└─  ╚═╝╚  ╚  \x1b[0m\n`);
	console.debug(`Bye, moaui-cra dev mode!\n`);
}

// main function
function serverStart() {
	//서버 실행 시, 초기 상태인지 확인 후, WelcomDevTools를 지워준다.
	// if (constant.initial === true) {
	// 	const appPath = path.join(__dirname, '../../src/App.tsx');
	// 	const appText = fs.readFileSync(appPath, 'utf-8');
	// 	const deleteAppText = 
	// 		appText
	// 			.replace(/import { default as WelcomeDevTools } from '.\/DevTools\/Welcome';/g, '',)
	// 				.replace(/const opacity = 0.5;/g, '')
	// 					.replace(/<WelcomeDevTools \/>/g, '')
	// 						.replaceAll(/ opacity={opacity}/g, '')
	// 	fs.writeFileSync(appPath, deleteAppText, 'utf-8');

	// 	//constant json 갱신
	// 	constant.initial = false;
	// 	fs.writeFileSync(constantPath, JSON.stringify(constant, null, 2), 'utf-8');
	// }

	findAvailablePortAndStartServer(currentPort());
}

serverStart();