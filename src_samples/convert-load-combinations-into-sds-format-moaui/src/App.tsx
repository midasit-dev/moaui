/**
 *	                        __
 *	  ___ ___       __     /\_\     ___                 __      _____    _____
 *	/' __` __`\   /'__`\   \/\ \  /' _ `\             /'__`\   /\ '__`\ /\ '__`\
 *	/\ \/\ \/\ \ /\ \L\.\_  \ \ \ /\ \/\ \           /\ \L\.\_ \ \ \L\ \\ \ \L\ \
 *	\ \_\ \_\ \_\\ \__/.\_\  \ \_\\ \_\ \_\          \ \__/.\_\ \ \ ,__/ \ \ ,__/
 *	 \/_/\/_/\/_/ \/__/\/_/   \/_/ \/_/\/_/  _______  \/__/\/_/  \ \ \/   \ \ \/
 *	                                        /\______\             \ \_\    \ \_\
 *	                                        \/______/              \/_/     \/_/
 */

import React from 'react';
import { GuideBox, Panel, Typography, DropList, Check, Button, DataGrid } from '@midasit-dev/moaui';
import { getLcbTypelist, getActivelist, runCreate, dbRead, getAllLcblist } from './utils_pyscript';
import { useSnackbar } from 'notistack';
import './App.css';
import * as XLSX from 'xlsx';
import InfiniLoading from './InfinitLoading';

function getCurrentDateText(): string {
  const currentDate = new Date();

  // Get the current year, month, and date
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const date = currentDate.getDate().toString().padStart(2, '0');

  // Combine them into the desired format
  const currentDateText = `${year}${month}${date}`;

  return currentDateText;
}


/**
 * This is a sample code.
 * for more information, please visit https://midasit-dev.github.io/moaui
 */
const App = () => {
	// snackbar
	const { enqueueSnackbar } = useSnackbar();

	// Import - DropList
	const [dropValue, setDropValue] = React.useState<string>();
	const [droplist, setDroplist] = React.useState<any>(new Map<string, number>([["NONE", 0]]));
	// Enable Lcb Active Types
	const [enableLcbActiveTypes, setEnableLcbActiveTypes] = React.useState<string[]>([]);
	React.useEffect(() => {
		if (dropValue !== undefined) {
			const allLcbList = getAllLcblist();
			const RealAPIType = allLcbList[dropValue];
			const dbName = RealAPIType["API"];
			const res = dbRead(dbName);
			if (res.hasOwnProperty("error")) {
				enqueueSnackbar(res.error, { variant: 'error' });
				setEnableLcbActiveTypes([]);
				return;
			}

			const uniqueSet = new Set<string>();
			Object.values(res).forEach((item: any) => {
				uniqueSet.add(item["ACTIVE"]);
			});
			const uniqueArray: string[] = Array.from(uniqueSet);
			setEnableLcbActiveTypes(uniqueArray);
		}
		//eslint-disable-next-line
	}, [dropValue]);

	// Select Active Type - Check
	const [checklist, setChecklist] = React.useState<any>(new Map<string, number>([]));
	const [checkKeys, setCheckKeys] = React.useState<any>([]);

	const [checkedlist, setCheckedlist] = React.useState<any>([0]);
	const [checkedStrength_Stress, setCheckedStrength_Stress] = React.useState(false);
	const [checkedSpecial, setCheckedSpecial] = React.useState(false);
	const [checkedStrength_Elastic, setCheckedStrength_Elastic] = React.useState(false);
	const [checkedU_G_Serviceablility, setCheckedU_G_Serviceablility] = React.useState(false);
	const [checkedServiceability, setCheckedServiceability] = React.useState(false);
	const [checkedVertical, setCheckedVertical] = React.useState(false);
	const [checkedU_G_Strength_Stress, setCheckedU_G_Strength_Stress] = React.useState(false);
	const [checkedU_G_Special, setCheckedU_G_Special] = React.useState(false);
	// datagrid
	const _data_ = React.useRef({ value: [""] });
	const [updateDataFrame, setUpdateDataFrame] = React.useState(false);
	// create Button
	const [disalbleCreate, setDisableCreate] = React.useState(true);
	const [isPending, setIsPending] = React.useState(false);

	function onChangeDroplistHandler(event: any){
		setDropValue(event.target.value);
	}

	React.useEffect(() => {
		const resLcb: { [key: number]: string } = getLcbTypelist();
		const resLcbEntries: [string, number][] = Object.entries(resLcb).map(([key, value]) => [value, parseInt(key)]);
		const lcbItems = new Map<string, number>(resLcbEntries);
		setDroplist(lcbItems); // 전체 lcb list 저장 - key : name, value : number

		const resActive: { [key: number]: string } = getActivelist();
		const resActiveEntries: [string, number][] = Object.entries(resActive).map(([key, value]) => [value, parseInt(key)]);
		const activeItems = new Map<string, number>(resActiveEntries);
		setChecklist(activeItems); // 전체 active list 저장 - key : name, value : number
		//make array from map
		const activeKeys = Array.from(activeItems.keys());
		setCheckKeys(activeKeys); // Check 컴포넌트의 name 속성에 사용됩니다.
	}, []);

	// Create 버튼 활성화 - lcblist 선택, activeList 체크했는지 검사
	React.useEffect(() => {
		if(checkedlist.length === 1 || dropValue === undefined){
			setDisableCreate(true);
		}else{
			setDisableCreate(false);
		}
	}, [checkedlist, dropValue]);

	// checkedlist 핸들러 - 중복체크 방지
	function setCheckedlistHandler(value:number){
		if(checkedlist.includes(value)) {
			setCheckedlist(checkedlist.filter((item: number) => item !== value));
		} else {
			setCheckedlist([...checkedlist, value]);
		}
	}

	// Check Handler
  const onChangeStrength_StressHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedStrength_Stress(event.target.checked);
  };
	const onChangeSpecialHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedSpecial(event.target.checked);
  };
	const onChangeStrength_ElasticHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedStrength_Elastic(event.target.checked);
  };
	const onChangeU_G_ServiceablilityHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedU_G_Serviceablility(event.target.checked);
  };
	const onChangeServiceabilityHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedServiceability(event.target.checked);
  };
	const onChangeVerticalHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedVertical(event.target.checked);
  };
	const onChangeU_G_Strength_StressHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedU_G_Strength_Stress(event.target.checked);
  };
	const onChangeU_G_SpecialHandler = (event: any) => {
		setCheckedlistHandler(checklist.get(event.target.name));
    setCheckedU_G_Special(event.target.checked);
  };

	// Create 버튼 핸들러
	const onClickCreateHandler = (event: any) => {
		setIsPending(true);
		const res = runCreate(checkedlist, dropValue);
		if (res.hasOwnProperty("error")) {
			enqueueSnackbar(res.error, { variant: 'error' });
			setIsPending(false);
			return;
		}

		if (res.hasOwnProperty("value") && res.value !== undefined) {
			enqueueSnackbar("Success", { variant: 'success', autoHideDuration: 1000 });
			// requestAnimationFrame 사용
			// 레이아웃 변경이 필요한 작업을 requestAnimationFrame 콜백 내에서 수행하여 변경 사항을 브라우저의 렌더링 사이클과 동기화.
			const resData = res.value as unknown;
			_data_.current.value = resData as string[];
			requestAnimationFrame(() => {
				setUpdateDataFrame(true);
			});
		} else {
			enqueueSnackbar("Failed", { variant: 'error' });
			setIsPending(false);
			return;
		}
	}

	// datagrid
  const [rows, setRows] = React.useState<any[]>([]);
  const [columns, setColumns] = React.useState<any[]>([]);
  const [sortModel, setSortModel] = React.useState<any>([]);

	React.useEffect(() => {
		if (updateDataFrame) {
			requestAnimationFrame(() => {
				const data = _data_.current.value;
				console.log("dataString :", data);

				// 배열의 첫 번째 객체의 키를 사용하여 컬럼 헤더를 생성합니다.
				 const headers = Object.keys(data[0]);
				 headers.unshift("No"); // 'No' 컬럼 추가
				 
				// 데이터 배열을 처리하여 각 객체에 'id' 프로퍼티를 추가합니다.
				const parsedRows = data.map((row: any, index: number) => ({ id: index + 1, ...row, No: index + 1 }));
				 
				// 컬럼 정의를 생성합니다.
				 const parseHeaders = headers.map((header) => {
					 const column = { field: header, headerName: header, sortable: false, width: header === 'No' ? 50 : 90};
					 return column;
				 });

				setColumns(parseHeaders);
				setRows(parsedRows);
				setIsPending(false);
				setUpdateDataFrame(false);
			})
		}
	}, [updateDataFrame]);

	// datagrid download to excel file.
  const downloadExcel = () => {
		try{
			const soltedData = getSortedData();
			// columns 배열에 있는 순서대로 데이터를 재구성합니다.
			const dataToExport = soltedData.map((soltedData:any) => {
				const newRow: { [key: string]: any } = {};
				columns.slice(1).forEach(column => {
					newRow[column.headerName || column.field] = soltedData[column.field];
				});
				return newRow;
			});

			// 엑셀 워크시트를 생성합니다.
			const worksheet = XLSX.utils.json_to_sheet(dataToExport, {
				header: columns.slice(1).map(col => col.headerName || col.field), // columns 배열을 사용하여 헤더를 지정합니다.
				skipHeader: false // true :헤더를 건너뜁니다. false : 헤더를 포함합니다.
			});

			// 워크북을 생성합니다.
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
			
			/* 파일로 내보내기 (browser only) */
			const currentDateText = getCurrentDateText();
			const fileName = `LCB-${currentDateText}.xlsx`;
			XLSX.writeFile(workbook, `${fileName}`);
			enqueueSnackbar(`Success to download excel file : ${fileName}`, { variant: 'success', autoHideDuration: 1000 });
		} catch (error) {
			enqueueSnackbar("Failed to download excel file", { variant: 'error' });
		}
  };

	// 정렬 상태가 변경될 때마다 호출되는 함수입니다.
	const handleSortModelChange = (newModel: any) => {
		setSortModel(newModel);
	};

	// 데이터를 정렬합니다.
	const getSortedData = (): any => {
    const sortedData = [...rows]; // 정렬할 데이터 배열의 사본 생성.
    const sortItem: any = sortModel[0];
    if (sortItem) {
      sortedData.sort((a, b) => {
        if (a[sortItem.field] < b[sortItem.field]) {
          return sortItem.sort === 'asc' ? -1 : 1;
        }
        if (a[sortItem.field] > b[sortItem.field]) {
          return sortItem.sort === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData;
  };

  // 클립보드에 텍스트를 복사하는 함수
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // 성공적으로 클립보드에 복사됐을 때 snackbar를 표시합니다.
			enqueueSnackbar("Data copied to clipboard", { variant: 'success', autoHideDuration: 1000 });
    }).catch(err => {
      // 에러 처리
			enqueueSnackbar("Failed to copy data", { variant: 'error' });
    });
  };

  // 정렬된 데이터를 CSV로 변환하여 클립보드에 복사하는 함수
  const handleCopyData = () => {
    const csvData = convertToCSV(getSortedData());
    copyToClipboard(csvData);
  };

	// rows 배열을 CSV 포맷으로 변환합니다.
	function convertToCSV(rows:any) {
		// 첫 번째 컬럼을 제외하고 각 로우의 데이터를 가져와서 CSV 포맷으로 변환합니다.
		const csvRows = rows.map((row:any) => 
			columns.slice(1).map(column => row[column.field]).join('\t')
		);
	
		return [...csvRows].join('\n');
	}

  // py-terminal 태그를 가진 모든 요소 가져오기
  const pyTerminals = document.querySelectorAll('py-terminal');
 
  // 가져온 모든 py-terminal 요소를 제거
  pyTerminals.forEach(pyTerminal => {
      pyTerminal.remove();
  });

	return (
		//You can modify the code here and test.
		<GuideBox show={false} width='100%' fill='2' row spacing={2} horCenter padding={2}>
			<GuideBox show width='250px'  fill='none' spacing={1}>
				<GuideBox show width='100%' fill='none' row horSpaceBetween verCenter>
					<Typography variant='h1' marginLeft={1}>Import</Typography>
					<DropList 
						itemList={droplist} 
						width="180px"
						placeholder='Select lcb Type'
						value={dropValue}
						onChange={onChangeDroplistHandler}
						maxLength={24}
					/>
				</GuideBox>
				<GuideBox show width='100%' height={"350px"} fill='none' verCenter>
					<Panel width="100%">
						<GuideBox show width='100%' fill='none' row horSpaceBetween verCenter paddingY={0.5}>
							<Typography variant='h1' center >Select Active Type</Typography>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[0]}
								disabled={!enableLcbActiveTypes.includes('STRENGTH')}
								checked={checkedStrength_Stress}
								onChange={onChangeStrength_StressHandler}
							/>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[1]}
								disabled={!enableLcbActiveTypes.includes('SERVICE')}
								checked={checkedServiceability}
								onChange={onChangeServiceabilityHandler}
							/>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[2]}
								disabled={!enableLcbActiveTypes.includes('SPECIAL')}
								checked={checkedSpecial}
								onChange={onChangeSpecialHandler}
							/>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[3]}
								disabled={!enableLcbActiveTypes.includes('VERTICAL')}
								checked={checkedVertical}
								onChange={onChangeVerticalHandler}
							/>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[4]}
								disabled={!enableLcbActiveTypes.includes('ELSTRENGTH')}
								checked={checkedStrength_Elastic}
								onChange={onChangeStrength_ElasticHandler}
							/>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[5]}
								disabled={!enableLcbActiveTypes.includes('UGSTRENGTH')}
								checked={checkedU_G_Strength_Stress}
								onChange={onChangeU_G_Strength_StressHandler}
							/>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[6]}
								disabled={!enableLcbActiveTypes.includes('UGSERVICE')}
								checked={checkedU_G_Serviceablility}
								onChange={onChangeU_G_ServiceablilityHandler}
							/>
						</GuideBox>
						<GuideBox show width='100%' fill='none' verCenter paddingY={0.8}>
							<Check 
								name={checkKeys[7]}
								disabled={!enableLcbActiveTypes.includes('UGSPECIAL')}
								checked={checkedU_G_Special}
								onChange={onChangeU_G_SpecialHandler}
							/>
						</GuideBox>
					</Panel>
				</GuideBox>
				<GuideBox show width='100%' height={"30px"} fill='none' verCenter>
					<Button variant="contained" color="negative" width="100%" onClick={onClickCreateHandler} disabled={disalbleCreate || isPending} loading={isPending}>Create</Button>
				</GuideBox>
			</GuideBox>
			<GuideBox show width='800px' fill='none'>
				<Panel width={"100%"} height={"100%"}>
					<GuideBox show width='100%'fill='none' spacing={1}>
					<GuideBox show width='100%' height={"370px"} fill='none' horSpaceBetween verCenter>
						{isPending ?
							<InfiniLoading />
							:
							<DataGrid
								rows={rows}
								columns={columns}
								sortModel={sortModel}
								onSortModelChange={handleSortModelChange}
							/>
						}
					</GuideBox>
					<GuideBox show width='100%' height={"30px"} fill='none' horRight row spacing={1}>
						<Button onClick={handleCopyData}>
							Copy
						</Button>
						<Button onClick={downloadExcel}>
							Download
						</Button>
					</GuideBox>
				</GuideBox>
				</Panel>
			</GuideBox>
		</GuideBox>
	);
}

export default App;