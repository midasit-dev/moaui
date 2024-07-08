@echo off
REM 디렉토리명에 -moaui가 포함된 디렉토리들만 대상으로 npm 명령 실행
@REM ncu가 설치되어 있다면 @midasit-dev/moaui만 업데이트해서 빌드 하도록 함

for /D %%i in (*-moaui) do (
	echo Processing directory: %%i
	cd %%i
	ncu -u @midasit-dev/moaui
	npm update @midasit-dev/moaui
	npm run build
	IF EXIST build (
		powershell -Command "Compress-Archive -Path ('build\*' | Resolve-Path) -DestinationPath '../0_TempZip/%%~nxi.zip' -Force"
	)
	cd ..
)

echo All done.
pause