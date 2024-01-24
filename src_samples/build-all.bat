@echo off
REM 디렉토리명에 -moaui가 포함된 디렉토리들만 대상으로 npm 명령 실행

for /D %%i in (*-moaui) do (
	echo Processing directory: %%i
	cd %%i
	npm install
	npm run build
	IF EXIST build (
		powershell -Command "Compress-Archive -LiteralPath 'build' -DestinationPath '../0_TempZip/%%~nxi.zip' -Force"
	)
	cd ..
)

echo All done.
pause