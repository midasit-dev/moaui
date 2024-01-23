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
const port = constant.port;
const baseUrl = constant.baseUrl;

app.put('/public/manifest-json', (req, res) => {
	logServerON(port);
  console.log(`\n\x1b[36mPUT /public/manifest-json ...\x1b[0m\n`);

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
        return res.status(500).send('An error occurred');
      }
      res.send('manifest.json updated successfully!');
    });
  } catch (error) {
    console.error('Error updating manifest.json:', error);
    return res.status(500).send('An error occurred');
  } finally {
		logServerON(port);
		console.log(`\x1b[36mPUT /public/manifest-json Completed!\x1b[0m`);
		console.log(`modified at \x1b[37m\x1b[1m${manifestPath}\x1b[0m`);
		console.log('modified data:', req.body, '\n');
	}
});

app.get('/build', (req, res) => {
	logServerON(port);
  console.log(`\n\x1b[36mStart Plug-in Item Package Build ...\x1b[0m\n`);

  try {
    // 동기적으로 npm run build 실행
    const buildStdout = execSync('npm run build');
		// console.log(buildStdout.toString());
    res.send(JSON.stringify({ message: buildStdout.toString() }));
  } catch (error) {
    console.error(`Error executing 'npm run build': ${error.stderr.toString()}`);
    res.status(500).send('An error occurred during npm run build');
  }

	logServerON(port);
  console.log(`\x1b[36mPlug-in Item Package Build Completed!\x1b[0m`);
	const buildPath = path.join(__dirname, '../../build/index.html');
	console.log(`production build, \x1b[37m\x1b[1m${buildPath}\x1b[0m`);
});

app.get('/upgrade/moaui', (req, res) => {
	logServerON(port);
	console.log(`\n\x1b[36mStart @midasit-dev/moaui upgrade ...\x1b[0m\n`);

	try {
		// 동기적으로 npm run build 실행
		const upgradeStdout = execSync('npm upgrade @midasit-dev/moaui');
		const listStdout = execSync('npm list @midasit-dev/moaui');
		// console.log(upgradeStdout.toString());
		res.send(JSON.stringify({ message: upgradeStdout.toString() }));

		logServerON(port);
		console.log(`\x1b[36m@midasit-dev/moaui upgrade Completed!\x1b[0m`);
		console.log(`installed! \x1b[37m\x1b[1m${listStdout.toString()}\x1b[0m`);
	} catch (error) {
		console.error(`Error executing 'npm upgrade @midasit-dev/moaui': ${error.stderr.toString()}`);
		res.status(500).send('An error occurred during npm upgrade @midasit-dev/moaui');
	}
});

app.get('/health', (req, res) => {
	res.send('ok');
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

const server = app.listen(port, () => {
	logServerON();
	changeServerStatus('listening');
});

// 서버 종료 이벤트 리스너
server.on('close', () => {
	logServerOFF();
	changeServerStatus('');
});

// 어떤 이유로든 서버를 강제로 종료
// 예시: Ctrl+C를 눌러 프로세스를 종료하는 경우
process.on('SIGINT', () => {
	console.log(`\n\x1b[36mServer Closing ...\x1b[0m`)
  server.close(() => {
		logServerOFF();
		changeServerStatus('');
    process.exit(0);
  });
});

const logServerON = () => {
	console.clear();
	console.log(`\n\x1b[32m┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ╔═╗╔╗╔\n└─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  ║ ║║║║\n└─┘└─┘┴└─ └┘ └─┘┴└─  ╚═╝╝╚╝\x1b[0m\n`);
  console.log(`Welcome, moaui-cra dev mode!\n`);
	console.log(`  Port:\t\t\x1b[1m${port}\x1b[0m`);
	console.log(`  Base URL:\t\x1b[1m${baseUrl}\x1b[0m\n`);	
}

const logServerOFF = () => {
	console.clear();
	console.log(`\n\x1b[31m┌─┐┌─┐┬─┐┬  ┬┌─┐┬─┐  ╔═╗╔═╗╔═╗\n└─┐├┤ ├┬┘└┐┌┘├┤ ├┬┘  ║ ║╠╣ ╠╣ \n└─┘└─┘┴└─ └┘ └─┘┴└─  ╚═╝╚  ╚  \x1b[0m\n`);
	console.log(`Bye, moaui-cra dev mode!\n`);
}