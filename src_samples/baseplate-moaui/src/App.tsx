

import React from 'react';
import { 
	GuideBox, 
	Panel,
	Check,
	Typography,
	TabGroup,
	Tab, Button
} from '@midasit-dev/moaui';
import { default as WelcomeDevTools } from './DevTools/Welcome';
import SectionDrawing from './Components/SectionDrawing';
import TypoGraphyTextField from './NewComponents/TypoGraphyTextField';
import { SelectedNodes, SelectedColumnList, SelectedColumnIndex_DBName, BasePlateName, Node_BP_Data
, HBeamH, HBeamB, HBeamtf, HBeamtw, HBeamr, BasePlateWidth, BasePlateHeight, MinMaxCoordinates, SelectedColumnIndex
, LoadCombinations, ReactionResult
} from './variables';
import { useRecoilState, SetRecoilState } from 'recoil';
import Member from './Member/Member';
import { selectNodeList, setColumnInfo, dbReadItem, getNodeInfo, dbRead, getReactionTable} from './utils_pyscript';
import {
  TextField
} from '@mui/material'
import { useSnackbar } from 'notistack';

import Load from './Load/Load';
import { set } from 'lodash';
import Design from './Design/Design';

const NodeFetching = () => {
  const response = selectNodeList();
  if (response.hasOwnProperty('error')){
    console.error(response['error'])
  }
  if (!response) return [];
  return response;
}

const App = () => {
	const { enqueueSnackbar } = useSnackbar();

	const CanvasSize = 350


	const [selectedNodes, setSelectedNodes] = useRecoilState(SelectedNodes);
	const [selectedColumnList, setSelectedColumnList] = useRecoilState(SelectedColumnList);
	const [columnIndex_DBName, setcolumnIndex_DBName] = useRecoilState(SelectedColumnIndex_DBName);
	const [basePlateName, setBasePlateName] = useRecoilState(BasePlateName);
	const [node_BP_Data, setNode_BP_Data] = useRecoilState(Node_BP_Data);

	const [hBeamH, setHBeamH] = useRecoilState(HBeamH);
	const [hBeamB, setHBeamB] = useRecoilState(HBeamB);
	const [hBeamtf, setHBeamtf] = useRecoilState(HBeamtf);
	const [hBeamtw, setHBeamtw] = useRecoilState(HBeamtw);
	const [hBeamr, setHBeamr] = useRecoilState(HBeamr);
	const [basePlateWidth, setBasePlateWidth] = useRecoilState(BasePlateWidth);
	const [basePlateHeight, setBasePlateHeight] = useRecoilState(BasePlateHeight);

	const [minMaxCoordinates, setMinMaxCoordinates] = useRecoilState(MinMaxCoordinates);
	const [selectedColumnIndex, setSelectedColumnIndex] = useRecoilState(SelectedColumnIndex);

	const [loadCombinations, setLoadCombinations] = useRecoilState(LoadCombinations);
	const [reactionResult, setReactionResult] = useRecoilState(ReactionResult);
	const [tabName, setTabName] = React.useState('Member');
	const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setTabName(newValue);
	};

	// Node 정보 Fetching
	const FetchingNodes = () => {
    const FetchingResults = NodeFetching();
    if (FetchingResults.length === 0){
      enqueueSnackbar('선택된 절점이 없습니다', {variant: 'error', autoHideDuration: 3000})
    }
    else{
      setSelectedNodes(FetchingResults.join(','))
    }
  }

	const SetInitialData = () => {
		if (selectedNodes === '' || selectedNodes === undefined || selectedNodes === null){
			enqueueSnackbar('선택된 절점이 없습니다', {variant: 'error', autoHideDuration: 3000})
			return;
		}
    const nodeList = selectedNodes.split(',');
    const selected_data = setColumnInfo(nodeList);

		//Section id 만 추출
    const sections = Object.values(selected_data).map((item:any) => item['section_id']);
    //중복 제거
		const sectionArray = sections.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const sectionid = sectionArray.join(',');
		const sectiondata:any = dbReadItem('SECT', sectionid);

		// 각 Section id에 해당하는 Section Name 저장
		const section_name = sectionArray.map((key:any) => [sectiondata[key].SECT_NAME, key])

		// 각 Section id에 해당하는 Section Dimension 저장
    let section_dim :any = {};
		for (let i = 0; i < sectionArray.length; i++){
			section_dim[sectionArray[i]] = sectiondata[sectionArray[i]].SECT_BEFORE.SECT_I.SECT_NAME
		}

		// Set Section List
    setSelectedColumnList(section_name);
		// Set Section Dim
    setcolumnIndex_DBName(section_dim);
		
		
		const nodedata = dbReadItem('NODE', selectedNodes);

		let newBasePlateName :any = {};
		for (let i=0; i<sectionArray.length; i++){
			newBasePlateName[sectionArray[i]] = 'BP'+(i+1).toString()
		}
		setBasePlateName(newBasePlateName);
		// Node_BP_Data
		let newNodeBPData :any = {};
		for (let i = 0; i < nodeList.length; i++){
			try{
				const sectionid = selected_data[nodeList[i]]['section_id']
				const sectiondim = section_dim[sectionid]
				const splitspace = sectiondim.split(' ')
				const splitdim = splitspace[1].split('x')
				const splieslash = splitdim[2].split('/')
				const dimarray = [Number(splitdim[0]), Number(splitdim[1]), Number(splieslash[0]), Number(splieslash[1])]
				const columnName = sectiondata[sectionid].SECT_NAME
				newNodeBPData[nodeList[i]] = {
					COLUMN_NAME : columnName,
					NODECORD : [nodedata[nodeList[i]].X, nodedata[nodeList[i]].Y],
					BASEPLATE: {
						COLUMN : {
							MATL : '24',
							SHAPE : 'H',
							DB : sectiondim,
						},
						PLATE : {
							MATL : "SS275",
							SHAPE : "REC",
							WIDTH : 1000,
							HEIGHT : 1000,
							THIK : 12
						}
					},
					PEDESTAL : {
						MATL : "SS275",
						SHAPE : "REC",
						WIDTH : 1500,
						HEIGHT : 1500,
					},
				}
			}
			catch(err){
				enqueueSnackbar('절점 상부 요소 단면 확인 필요', {variant: 'error', autoHideDuration: 3000})
			}
				
		}
		
		setNode_BP_Data(newNodeBPData);

		// Set Initial Section Dim
		const firstsectionName = section_name[0][0];
		const sectionDB = section_dim[section_name[0][1]];
		const splitdim = sectionDB.split(' ')[1].split('x')
		const dimarray = [Number(splitdim[0]), Number(splitdim[1]), Number(splitdim[2].split('/')[0]), Number(splitdim[2].split('/')[1])]
		for(let key in newNodeBPData){
			if (newNodeBPData[key].COLUMN_NAME === firstsectionName){
				setHBeamH(dimarray[0]);
				setHBeamB(dimarray[1]);
				setHBeamtf(dimarray[2]);
				setHBeamtw(dimarray[3]);
				setHBeamr(0);
				break;
			}
		}
		
		const MinMaxCord = getNodeInfo();
		setMinMaxCoordinates(MinMaxCord);

		setSelectedColumnIndex(section_name[0][1]);		

		const SteelLC = dbRead('LCOM-STEEL');
		if (SteelLC.hasOwnProperty('error')){
			enqueueSnackbar('Steel Design 하중 조합이 없습니다.', {variant: 'error', autoHideDuration: 3000})
			return
		}
		
		let LClist:any = {ENV : [], ADD : []}
		for(let key in SteelLC){
			if(SteelLC[key].ACTIVE == 'STRENGTH' && SteelLC[key].iTYPE == 1){
				LClist.ENV.push(SteelLC[key].NAME)
			}
			else if (SteelLC[key].ACTIVE == 'STRENGTH' && SteelLC[key].iTYPE == 0){
				LClist.ADD.push(SteelLC[key].NAME)
			}
		}
		setLoadCombinations(LClist)

		// LClist 내 모든 값 뒤에 (CBs)를 붙인 뒤, 배열로 합침
		const LClistENV = LClist.ENV.map((item:any) => item+'(CBs)')
		const LClistADD = LClist.ADD.map((item:any) => item+'(CBs)')
		const LClistTotal = LClistENV.concat(LClistADD)
		
		const GetReactions = getReactionTable(nodeList, LClistTotal);
		if (GetReactions.hasOwnProperty('error')){
			enqueueSnackbar('선택된 절점에 대한 하중 결과가 없습니다.', {variant: 'error', autoHideDuration: 3000})
			return
		}
		const ReactionData :any = GetReactions['Reaction(Global)'].DATA

		let ReactionDataList :any = {}
		ReactionData.forEach((item:any) => {
			const [_, nodeNum, loadCase, ...reactions] = item;
			if (!ReactionDataList[nodeNum]) ReactionDataList[nodeNum] = {}; 
			ReactionDataList[nodeNum][loadCase] = reactions;
		})
		setReactionResult(ReactionDataList)
		enqueueSnackbar('Import 완료', {variant: 'success', autoHideDuration: 3000})

	}	
	

	return (
		<GuideBox>
			<GuideBox row verCenter spacing={1} height={35} margin={1}>
				<Typography variant='h1'>Select Nodes :</Typography>
				<TextField
					size = "small"
					value = {selectedNodes}
					onChange = {(e:any) => {setSelectedNodes(e.target.value)}}
					inputProps = {{onClick:FetchingNodes, style:{height:25, fontSize: 12, margin:0, padding:2, verticalAlign: 'middle'}}}
					style={{width: 200, height : 25, marginLeft:4, marginTop : -4, padding: 0, verticalAlign: 'middle'}}
				/>
				<Button
					variant = "outlined"
					onClick = {SetInitialData}
				>Add</Button>
		</GuideBox>
			<GuideBox width={1000} height={600} row>
					<TabGroup
						orientation='vertical'
						value = {tabName}
						onChange={handleTabChange}
					>
						<Tab value = "Member" label='MEMBER'/>
						<Tab value = "Load"label='LOAD'/>
						<Tab value = "Design" label='DESIGN'/>
						<Tab value = "Drawing" label = "DRAWING"/>
					</TabGroup>
					{tabName === 'Member' && <Member/>}
					{tabName === 'Load' && <Load/>}
					{tabName === 'Design' && <Design/>}
			</GuideBox>

			

		</GuideBox>
	);
}

export default App;
