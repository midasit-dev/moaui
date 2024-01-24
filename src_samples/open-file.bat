@echo off
REM 디렉토리명에 -moaui가 포함된 디렉토리들만 대상으로 npm 명령 실행

for /D %%i in (*-moaui) do (
	echo Processing directory: %%i
	start "" code %%i\public\readme.md
)

echo All done.
pause