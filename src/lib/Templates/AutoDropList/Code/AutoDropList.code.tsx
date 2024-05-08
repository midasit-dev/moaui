import React from 'react';/**${comma}*/
import { GuideBox, DropList, VerifyUtil } from "@midasit-dev/moaui";/**${comma}*/

function getNestedProperty(obj: any, path: string) {
    // 점과 대괄호를 사용하여 경로를 나눕니다. 대괄호 내의 내용(정수 인덱스)도 처리합니다.
    const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.'); // 대괄호를 점 표기법으로 변환
    let currentObject = obj;
    for (let key of keys) { 
        if (key in currentObject) { // key가 현재 객체에 존재하는지 확인
            currentObject = currentObject[key];
        } else {
            return undefined;
        }
    }
    return currentObject;
}

const AutoDropList = ({
	width = 300,/**${props-separator}*/
	height = 30,/**${props-separator}*/
	dropListwidth = 150,/**${props-separator}*/
	defaultValue = 1,/**${props-separator}*/
	value = undefined,/**${props-separator}*/
	onChange = undefined,/**${props-separator}*/
	show = false,/**${props-separator}*/
	db = "node",/**${props-separator}*/
	filter = "X",/**${props-separator}*/
	textFormat = undefined,/**${props-separator}*/
	valueFormat = undefined,/**${props-separator}*/
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	const [items, setItems] = React.useState([["NONE", 1]] as [string, number][]);
	const [isLoading, setLoading] = React.useState(false as boolean);
	const onChangeLocal = React.useCallback((e: any) => {
		setValueLocal(e.target.value);
	}, []);

	const defaultTextFormat = React.useCallback((item: [key: String, value: Object | any]) => { return String(`${item[0]} : ${item[1]}` || `${item[0]} : NONE`) }, []);
	const defaultValueFormat = React.useCallback((item: [key: String, value: Object | any]) => { return Number(item[0]) }, []);

	const fetchData = React.useCallback(async (db: string, filter: string, textFormat: Function, valueFormat: Function) => {
		const mapiKey = VerifyUtil.getMapiKey();
		if (mapiKey === "") {
		  throw Error("mapiKey is not found");
		}
	
		const baseUrl = await VerifyUtil.getBaseUrlAsync();
		if (baseUrl.includes("undefined")) {
		  throw Error("product not found");
		}
	
		const res = await fetch(`${baseUrl}/db/${db}/`, {
		  headers: {
			'MAPI-Key': mapiKey,
		  }
		}).catch(() => {
			throw Error("fetch error");
		});
	
		if (res.ok) {
		  const data = await res.json();
		  const target = Object.entries(data[db.toUpperCase()]);
		  return target.map((item: [string, object | any]) => {
			const newItem = [item[0], getNestedProperty(item[1], filter)];
			return [textFormat(newItem), valueFormat(newItem)];
		  });
		} else {
		  throw Error("");
		}
	}, []);

	React.useEffect(() => {
		setLoading(true);
		fetchData(db, filter, textFormat || defaultTextFormat, valueFormat || defaultValueFormat)
		.then((data: any) => {
			setItems(data);
		}).catch(() => {
			setItems([["NONE", 1]]);
		}).finally(() => {
			setLoading(false);
		});
	}, [db, filter, fetchData, textFormat, defaultTextFormat, valueFormat, defaultValueFormat]);

	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<DropList 
				itemList={items} 
				width={dropListwidth} 
				defaultValue={defaultValue}
				value={value || valueLocal}
				onChange={onChange || onChangeLocal}
				disabled={isLoading}
			/>
		</GuideBox>
	)
};/**${comma}*/

const SampleProps = {
	width: 300,
	height: 30,
	dropListwidth: 150,
	defaultValue: 1,
	value: undefined,
	onChange: undefined,
	show: false,
	db: "node",
	filter: "X",
	textFormat: (item: [key: String, value: Object | any]) => { return String(`${item[0]} : ${item[1]}` || `${item[0]} : No Value`) },
	valueFormat: (item: [key: String, value: Object | any]) => { return Number(item[0]) },
};/**${comma}*/

export default AutoDropList;

export {
	SampleProps as AutoDropListSample,
}