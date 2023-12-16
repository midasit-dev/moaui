import React from 'react';
import { GuideBox, Button, Typography } from '@midasit-dev/moaui';

/** 기본 설명
 * PythonSample1이 렌더링 될 때, 초기 데이터를 불러오는 예제는 example1과 example2 처럼 하면 됩니다.
 * 렌더링이 된 후, 버튼 클릭을 통해 Python으로부터 데이터를 얻어오려면 example3, example4 처럼 하면 됩니다.
 */
const PythonSample1 = () => {
	const [example1, setExample1] = React.useState('');
	const [example2, setExample2] = React.useState('');
	const [example3, setExample3] = React.useState('');
	const [example4, setExample4] = React.useState('');

	//PythonSample1이라는 컴포넌트가 렌더링이 되는 시점에 아래 함수가 실행 됩니다.
  React.useEffect(() => {
		function checkPyScriptReady(callback : any) {
			//Pyscript가 모두 설치가 완료 되고 실행 가능한 조건인지 반복해서 확인 합니다.
			if (pyscript && pyscript.interpreter) {
				//pyscript가 정상적으로 설치되었고 interpreter라는 변수를 사용할 수 있다면,
				//매개변수로 넘겨받은 callback 함수를 실행 합니다.
				callback();
			} else {
				//실행 조건이 아니라면, 현 함수를 다시 실행 합니다.
				setTimeout(() => checkPyScriptReady(callback), 100);
			}
		}
	
		//실행할 수 있는 조건이 되면, 데이터를 채울 함수를 정의 합니다.
		const callback = () => {
			//def set(v)
			const py_set = pyscript.interpreter.globals.get("set");
			const py_set_return_value = py_set("from js string");
			console.log(py_set_return_value);
			setExample1(py_set_return_value);
			
			//def get()
			const py_get = pyscript.interpreter.globals.get("get");
			const py_get_return_value = py_get();
			console.log(py_get_return_value);
			setExample2(py_get_return_value);
		}
    
		checkPyScriptReady(callback);
	}, []);

	//버튼 클릭 시, python과 데이터를 주고 받으려면 아래 함수처럼 연결 하면 됩니다.
	const onClickHandler = () => {
			//def setJsonString(jsonString)
			const jsonObject = {
				key1: 1,
				key2: "value"
			};
			const jsonString = JSON.stringify(jsonObject);
			const py_setJsonString = pyscript.interpreter.globals.get("setJsonString");
			const py_setJsonString_return_value = py_setJsonString(jsonString);
			console.log(py_setJsonString_return_value);
			setExample3(py_setJsonString_return_value);

			//def getJsonString()
			const py_getJsonString = pyscript.interpreter.globals.get("getJsonString");
			const py_getJsonString_return_value = py_getJsonString();
			console.log(py_getJsonString_return_value);
			setExample4(py_getJsonString_return_value);
	}

  return (
    <GuideBox padding={2} spacing={2}>
			<GuideBox show>
				<GuideBox show padding={1} fill='3'>
					<Typography variant='h1'>해당 컴포넌트가 그려지자 마자 함수가 실행되어, useEffect의 함수가 실행 됩니다.</Typography>	
				</GuideBox>
				<GuideBox width="inherit" padding={1} spacing={2}>
					<Typography variant='h1'>def set(v)</Typography>
					<GuideBox fill='2'>{example1}</GuideBox>
					<Typography variant='h1'>def get()</Typography>
					<GuideBox fill='2'>{example2}</GuideBox>
				</GuideBox>
			</GuideBox>
			<GuideBox show>
				<GuideBox show row horSpaceBetween verCenter fill='3' spacing={3} padding={1}>
					<Typography variant='h1'>버튼 클릭 시, example3 / example4 데이터가 채워 집니다.</Typography>
					<Button onClick={onClickHandler}>데이터 채우기</Button>
				</GuideBox>
				<GuideBox width="100%" padding={1} spacing={2}>
					<Typography variant='h1'>def set_jsonString(jsonString)</Typography>
					<GuideBox fill='2'>{example3}</GuideBox>
					<Typography variant='h1'>def get_jsonSTring()</Typography>
					<GuideBox fill='2'>{example4}</GuideBox>
				</GuideBox>
			</GuideBox>
    </GuideBox>
  )
}

export default PythonSample1;