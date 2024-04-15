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
import { useEffect, } from "react";
import React from 'react';
import { 
	GuideBox, 
	Panel,
	Typography, 
	Button,
	DropList
} from '@midasit-dev/moaui';
import {
  TextField
} from '@mui/material'
import RigidLink from "./Components/RigidLink";
import ElasticLink from "./Components/ElasticLink";
import {MasterNode, SlaveNode, RigidDX, RigidDY, RigidDZ, RigidRX, RigidRY, RigidRZ,} from './Components/variables';
import {ApplyLink,selectNodeList, getBNGROUPList} from './utils_pyscript';
import {useRecoilState, useRecoilValue} from 'recoil';
import { useSnackbar } from "notistack";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTranslation } from 'react-i18next';

const App = () => {
	const { t:translate, i18n: internationalization} = useTranslation();
	const queryClient = new QueryClient();

	const { enqueueSnackbar } = useSnackbar();
	const [value, setValue] = React.useState('Rigid');
	const [masterNode, setMasterNode] = useRecoilState(MasterNode);
	const [slaveNode, setSlaveNode] = useRecoilState(SlaveNode);

	const rigideDX = useRecoilValue(RigidDX) ? 1 : 0;
	const rigideDY = useRecoilValue(RigidDY) ? 1 : 0;
	const rigideDZ = useRecoilValue(RigidDZ) ? 1 : 0;
	const rigideRX = useRecoilValue(RigidRX) ? 1 : 0;
	const rigideRY = useRecoilValue(RigidRY) ? 1 : 0;
	const rigideRZ = useRecoilValue(RigidRZ) ? 1 : 0;

	const NodeFetching = () => {
		const response = selectNodeList();
		if (response.hasOwnProperty('error')){
			console.error(response['error'])
		}
		if (!response) return [];
		return response;
	}

	const IsError = () => {
		if (rigideDX + rigideDY + rigideDZ + rigideRX + rigideRY + rigideRZ == 0){
			enqueueSnackbar('Please select one or more degrees of freedom.', {variant: 'error', autoHideDuration: 3000})
			return true;
		}
		const masterNodeArr = masterNode.split(',');
		const slaveNodeArr = slaveNode.split(',');
		for (let i = 0; i < masterNodeArr.length; i++){
			for (let j=0; j<slaveNodeArr.length; j++){
				if (masterNodeArr[i] == slaveNodeArr[j]){
					console.log(masterNodeArr[i], slaveNodeArr[j])
					enqueueSnackbar('Master Node and Slave Node cannot be the same.', {variant: 'error', autoHideDuration: 3000})
					return true;
				}
			}
		}
		if (masterNodeArr.length == 0){
			enqueueSnackbar('Please select Master Node.', {variant: 'error', autoHideDuration: 3000})
			return true;
		}
		if (slaveNodeArr.length == 0){
			enqueueSnackbar('Please select Slave Node.', {variant: 'error', autoHideDuration: 3000})
			return true;
		}
		return false;
	}

	const ExportToCivil = () => {
		const MasterNodeArr = masterNode.split(',');
		const SlaveNodeArr = slaveNode.split(',');
		const LinkType = `${rigideDX}${rigideDY}${rigideDZ}${rigideRX}${rigideRY}${rigideRZ}`;
		if (IsError() == false){
			ApplyLink(MasterNodeArr, SlaveNodeArr, LinkType);
		}
		
	}

	const onClickMasterNode = () => {
		const FetchingResult = NodeFetching();
		if (FetchingResult.length == 0){
			enqueueSnackbar('There is no node to select.', {variant: 'error', autoHideDuration: 3000})
		}
		setMasterNode(FetchingResult.join(','));
	}

	const onClickSlaveNode = () => {
		const FetchingResult = NodeFetching();
		if (FetchingResult.length == 0){
			enqueueSnackbar('There is no node to select.', {variant: 'error', autoHideDuration: 3000})
		}
		setSlaveNode(FetchingResult.join(','));
	}
	
	const LanguageList:any = [
		['en', 'en'],
		['kr', 'kr']
	]
	const [language, setLanguage] = React.useState('en');

	const handelLanguageChange = (e:any) => {
		setLanguage(e.target.value);
		internationalization.changeLanguage(e.target.value);
	}
	return (
		<QueryClientProvider client={queryClient}>
			<GuideBox width='auto' spacing={2} padding={2}>
				<GuideBox width={460} row horSpaceBetween verCenter>
					<Typography variant='h1'>{translate("PluginMainDescription")}</Typography>
					<DropList
						itemList={LanguageList}
						defaultValue={'en'}
						value={language}
						onChange = {handelLanguageChange}
					/>
				</GuideBox>
				
				<Panel>
					<GuideBox>
						<Panel>
							<GuideBox width = 'auto' spacing={1}>

								<GuideBox width= {420} row verCenter spacing={1} horSpaceBetween>
									<Typography >{translate("MasterNodeSelection")} </Typography>
									<TextField
										size = 'small'
										placeholder="Select Master Nodes"
										value={masterNode}
										onChange={(e:any)=>setMasterNode(e.target.value)}
										inputProps={{onClick:onClickMasterNode}}
										style={{width: 200, height : '30px'}}
									/>
								</GuideBox>

								<GuideBox width= {420} row verCenter spacing={1} horSpaceBetween>
									<Typography >{translate("SlaveNodeSelection")}</Typography>
									<TextField
										size = 'small'
										placeholder="Select Slave Nodes"
										value={slaveNode}
										onChange={(e:any)=>setSlaveNode(e.target.value)}
										inputProps={{onClick:onClickSlaveNode}}
										style={{width: 200, height : '30px'}}
									/>
								</GuideBox>

							</GuideBox>
						</Panel>
					</GuideBox>
				</Panel>
				<GuideBox>
					<Typography variant='h1'>Link Property </Typography>
				</GuideBox>
				<GuideBox>
					{value == 'Rigid' && <RigidLink/>}
					{value == 'Elastic' && <ElasticLink/>}
				</GuideBox>
				<GuideBox row width = {450} horRight verCenter>
					<Button onClick = {ExportToCivil}> Apply </Button>
				</GuideBox>
			</GuideBox>
		</QueryClientProvider>
	);
}

export default App;