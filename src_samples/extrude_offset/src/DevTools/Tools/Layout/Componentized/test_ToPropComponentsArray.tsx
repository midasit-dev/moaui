import { useState, useCallback, useEffect } from 'react';
import { 
	Panel, 
	DataGrid, 
	Typography,
	GuideBox
} from '@midasit-dev/moaui';
import { PropComponentProps, usePropComponent } from './ToPropComponents';

//for hoisting
//define Row interface
interface Row {
	[key: string]: any;

	id: number;
	elemValue?: any;
	elemValue1?: any;
	elemValue2?: any;
}
//for Column
const columnWidth = 100;
const defaultColumnProperties = {
	width: columnWidth,
	editable: true,
	sortable: false,
};
//for Row
// const rowModels = [
// 	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
// 	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
// 	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
// ];

//1차원 배열 판단 함수
const is1DArray = (arr: any[]) => arr.every((elem) => !Array.isArray(elem));
//2차원 배열 판단 함수
const is2DArray = (arr: any[]) => arr.every((elem) => Array.isArray(elem) && elem.every((elem) => !Array.isArray(elem)));
//convert arr to Rows by array 조건에 따라
const convertArrToRows = (arr: any[]): Row[] => {
	if (is1DArray(arr)) {
		return arr.map((elem: any, index: number) => ({ id: index + 1, elemValue: elem }));
	} else if (is2DArray(arr)) {
		return arr.map((elem: any[], index: number) => ({ id: index + 1, elemValue1: elem[0], elemValue2: elem[1] }));
	} else {
		console.error('3차원 이상의 배열은 지원하지 않습니다.');
		return [];
	}
}
//convert Arr to Cols by array 조건에 따라
const convertArrToCols = (arr: any[]): any[] => {
	if (is1DArray(arr)) {
		return [ { ...defaultColumnProperties, field: 'elemValue', 	headerName: 'value', }, ];
	} else if (is2DArray(arr)) {
		return [
			{ ...defaultColumnProperties, field: 'elemValue1', 	headerName: 'value1', },
			{ ...defaultColumnProperties, field: 'elemValue2', 	headerName: 'value2',  },
		];
	} else {
		console.error('3차원 이상의 배열은 지원하지 않습니다.');
		return [];
	}
}
//convert Rows to arr by array 조건에 따라
const convertRowsToArr = (rows: Row[]): any[] => {
	if (rows.every((row: Row) => row.elemValue !== undefined)) {
		return rows.map((row: Row) => row.elemValue);
	} else if (rows.every((row: Row) => row.elemValue1 !== undefined && row.elemValue2 !== undefined)) {
		return rows.map((row: Row) => [row.elemValue1, row.elemValue2]);
	} else {
		console.error('3차원 이상의 배열은 지원하지 않습니다.');
		return [];
	}
}
//row와 newRow의 key들의 typeof를 확인해서 동일하게 변환한후 반환한다.
const updateRowsBySameKeyType = (row: Row, newRow: any) => {
	const newTemp = { ...newRow };
	for (const key in row) {
		const keyType = typeof row[key];
		if (keyType === 'string') { /* 할짓이 없음 */ }
		else if (keyType === 'number') newTemp[key] = Number(newTemp[key]);
		else if (keyType === 'boolean') newTemp[key] = newTemp[key] === 'true';
		else if (keyType === 'object') newTemp[key] = JSON.parse(newTemp[key]);
		else if (keyType === 'undefined') newTemp[key] = undefined;
		else { console.error('지원하지 않는 타입입니다.'); }
	}
	return newTemp;
}

const DataGridRowUpdate = (props: {
	name: string;
	arr: any[];
	updateGlobalValue: (prev: any) => any;
}) => {
	const { name, arr, updateGlobalValue } = props;

	const [rows, setRows] = useState<Row[]>([]);
	const [cols, setCols] = useState<any[]>([]);
	useEffect(() => {
		setCols(convertArrToCols(arr));
		setRows(convertArrToRows(arr));
	}, [arr]);

	//Row가 업데이트 될 때 마다 호출된다.
	const processRowUpdateHandler = useCallback((newRow: any) => {
		setRows((prev: Row[]) => prev.map((row: Row) => {
			return row.id === newRow.id ? 
				updateRowsBySameKeyType(row, newRow) : row;
		}));
		return newRow;
	}, [setRows]);

	//Row가 업데이트되면, processRowUpdateHandler이후 글로벌 값도 업데이트한다.
	useEffect(() => {
		updateGlobalValue((prev: any) => ({
			...prev,
			props: {
				...prev.props,
				[name]: convertRowsToArr(rows),
			},
		}));
	}, [name, rows, updateGlobalValue, arr]);

	return (
		<Panel variant='box' width={columnWidth * 2 + 5} height='200px' padding={0}>
			<DataGrid 
				rows={rows}
				columns={cols}
				hideFooter
				editMode='row'
				processRowUpdate={processRowUpdateHandler}
			/>
		</Panel>
	);
}

const ToPropComponentArray = (props: PropComponentProps<any[]>): JSX.Element => {
	//1차원 배열은 Column1, 2차원 배열은 Column2로 구분
	//그 이상 차원의 배열은... 음.. 고민을 해봅시다.
	const { type, name, value, hookType } = props;
	const { localValue, updateGlobalValue } = usePropComponent(type, name, value, hookType);

	return (
		<GuideBox width="100%" row horSpaceBetween verCenter>
			<Typography variant='body1'>{name}</Typography>
			<DataGridRowUpdate name={name} arr={localValue} updateGlobalValue={updateGlobalValue} />

			{/* <TextField
				width="100px"
				value={JSON.stringify(localValue)}
				titlePosition="left"
				multiline
				rows={3}
				onChange={(event) => {
					setLocalValue(event.target.value);
					updateGlobalValue((prev: any) => ({
						...prev,
						props: {
							...prev.props,
							[name]: event.target.value,
						}
					}));
				}} /> */}
		</GuideBox>
	);
};

export default ToPropComponentArray;