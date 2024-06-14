/**
 * 
 * ██████╗        █████╗ ██████╗ ██████╗ 
 * ╚════██╗      ██╔══██╗██╔══██╗██╔══██╗
 *  █████╔╝█████╗███████║██████╔╝██████╔╝
 *  ╚═══██╗╚════╝██╔══██║██╔═══╝ ██╔═══╝ 
 * ██████╔╝      ██║  ██║██║     ██║     
 * ╚═════╝       ╚═╝  ╚═╝╚═╝     ╚═╝     
 * 
 * @description Entry point for the application after Wrapper
 * @next last entry point
 */

import React from 'react';
import { useRecoilState } from 'recoil';
import { 
	GuideBox, 
	Panel,
	List, ListItem, ListItemButton, Check, Typography, IconButton, Icon, Button, DataGrid, TextField
} from '@midasit-dev/moaui';
import { THFC_List, THFC_Data, Cor_Result} from './variables';
import {dbRead, calCorrelation} from './utils_pyscript';
import { Box } from '@mui/material';
import Formula from './cor.svg'
import { useSnackbar } from 'notistack';
const App = () => {

	const { enqueueSnackbar } = useSnackbar();

	const [THFCList, setTHFCList] = useRecoilState(THFC_List);
	const [THFCData, setTHFCData] = useRecoilState(THFC_Data);
	const [CorResult, setCorResult] = useRecoilState(Cor_Result);
	const [Target, setTarget] = React.useState(0.16);
	const [columns, setcolumns] = React.useState([]);
	const [rows, setrows] = React.useState([]);

	const handleListItemClick = (index: number) => {
		const newValues = JSON.parse(JSON.stringify(THFCList));
		newValues[index].checked = !(newValues[index].checked);
		setTHFCList(newValues);
	}

	const FetchData = () => {
		const get_THFC = dbRead('THFC')
		const THFC = Object.values(get_THFC).map((value:any) => {
			return {name : value.NAME, checked : false}
			})
		setTHFCList(THFC)

		const Data = Object.fromEntries(
      Object.entries(get_THFC).map(([key, item]:any) => [
        item.NAME,
        {
          TIME: item.aFUNCDATA.map((subItem:any) => subItem.TIME),
          VALUE: item.aFUNCDATA.map((subItem:any) => subItem.VALUE),
        }
      ])
    );
		setTHFCData(Data)
	}

	React.useEffect(() => {
		FetchData();
	}, []);

	const handleRefresh = () => {
		FetchData()
		enqueueSnackbar('Time History Function imported.', {variant: 'success', autoHideDuration: 3000})
	}

	const handleTargetChange = (event:any) => {
		if (event.target.value === ''){
			setTarget(0)
		}
		// 값이 숫자가 아닐때 0으로 초기화
		else if (isNaN(Number(event.target.value))){
			setTarget(0)
		}
		else{
			setTarget(Number(event.target.value))
		}
	}

	const handleCalculation = () => {
		const newColumns:any = THFCList.filter(item => item.checked).map(item => (
			{field: item.name, 
				headerName: item.name, 
				width: 80, 
				sortable : false,
				renderCell : (params:any) => {
					if (params.value === 'NG'){
						return <span style={{color: 'red'}}>{params.value}</span>;
					}
					else if (Number(params.value) < Target){
						return <span style={{color: 'blue'}}>{params.value}</span>;
					}
					else {
						return <span style={{color: 'red'}}>{params.value}</span>;
					}
				}
			}))
		newColumns.unshift({field: 'Name', headerName: 'Name', width: 80})
		setcolumns(newColumns)

		const newRows:any = THFCList.filter(item => item.checked).map(item => ({id: item.name, Name : item.name}))
		
		const result = calCorrelation(THFCList, THFCData)
		
		for (const key in result){
			const index = newRows.findIndex((item:any) => item.Name === result[key]['NAME1'])
			newRows[index][result[key]['NAME2']] = result[key]['CORRELATION']
		}
		// 만약 result 내에 CORRELATION 값이 NG 인 경우가 있는지 확인
		// 있으면 alert 창을 띄워준다.
		const NG = result.filter((item:any) => item.CORRELATION === 'NG')
		if (NG.length > 0){
			enqueueSnackbar('"NG" means that the correlation coefficient cannot be calculated. Check the number of data.', {variant: 'error', autoHideDuration: 3000})
		}
		else{
			enqueueSnackbar('Calculation completed', {variant: 'success', autoHideDuration: 3000})
		}
		
		setrows(newRows)
	}


	return (
		<GuideBox row height={460} width={610}>
			<GuideBox width={250} spacing={1} padding={1} height={460}>
				<Panel height={450} width={215}>
					<GuideBox spacing={1} width={210}>
						<GuideBox row verCenter width={200} horSpaceBetween>
							<Typography variant="h1" center>Time History Functions</Typography>
							<IconButton onClick={handleRefresh} transparent><Icon iconName="Refresh" /></IconButton>
						</GuideBox>
						
						<Box sx={{width: 200, height : 350, overflow:'auto'}} >
							<List dense={true} disablePadding={true} >
								{THFCList.map((value, index) => {
									return(
										<ListItem
											key={index}
											secondaryAction={<Check checked={THFCList[index].checked} />}
											onClick={() => handleListItemClick(index)}
										>
											<ListItemButton padding={0.8}>
												<Typography marginLeft={1}>{value.name}</Typography>
											</ListItemButton>
										</ListItem>
									)
								})}
								{THFCList.map((value, index) => (<Typography key={index} center></Typography>))}
							</List>
						</Box>
					</GuideBox>
				</Panel>
				<Button variant='outlined' width='218px' onClick={handleCalculation}>
					Calculate
				</Button>
			</GuideBox>

			<GuideBox width={400} height={460} spacing={2} padding={1}>
				<Typography variant='h1'>Correlation Coefficient Fomula</Typography>
				<GuideBox width={350} verCenter horCenter>
					<img src={Formula} alt='LinkFig' width='60%'/>
				</GuideBox>
				<GuideBox width={350} row verCenter horSpaceBetween>
					<Typography variant='h1'> Correlation Coefficient </Typography>
					<GuideBox width={200} row verCenter horRight spacing={1}>
						<Typography variant='h1'> Target :</Typography>
						<TextField
						width={80} 
						defaultValue = {Target.toString()}
						onChange={handleTargetChange}
						/>
					</GuideBox>
					
				</GuideBox>
				
				<div style={{ height: 310, width: 350}}>
					<DataGrid
						columnHeaderHeight={40}
						rowHeight={40}  
						disableColumnMenu
						disableColumnFilter
						hideFooter
						columns = {columns}
						rows = {rows}
					/>
					
				</div>
			</GuideBox>
		</GuideBox>
	);
}

export default App;