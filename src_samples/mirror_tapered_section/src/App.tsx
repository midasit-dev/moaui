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

import React, { useEffect, useState } from 'react';
import { 
	GuideBox, 
	Panel,
	List,
	ListItem,
	ListItemButton,
	Check,
	Typography,
	IconButton,
	Icon,
	TextField,
	Button
} from '@midasit-dev/moaui';
import { Box } from '@mui/material';
import {dbGetTaperedSection, dbCreateTaperedSection} from './utils_pyscript';
import { useSnackbar } from 'notistack';
import { set } from 'lodash';

const App = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [sectionList, setSectionList] = useState<any>([]);
	const [NameTag, setNameTag] = useState<string>('');
	const [SectionJson, setSectionJson] = useState<any>([]);
	const [maxID, setMaxID] = useState<number>(0);
	const getTaperedSection = () => {
		const Result = dbGetTaperedSection()
		const Tapered_Section = Result[0]
		const MaxID = Result[1]
		const List = Object.values(Tapered_Section).map((value:any) => {
			return {
				name : value.SECT_NAME,
				checked : false
			}
		})
		setSectionList(List)
		setSectionJson(Tapered_Section)
		setMaxID(MaxID)
	}

	useEffect(() => {
		getTaperedSection()
	}, []);

	const handleRefresh = () => {
		getTaperedSection()
	}

	const handleListItemClick = (index:any) => {
		const newSectionList = JSON.parse(JSON.stringify(sectionList));
		newSectionList[index].checked = !newSectionList[index].checked;
		setSectionList(newSectionList);
	}

	const handleGenerateSection = () => {
		if ((NameTag === '') || (NameTag === undefined)) {
			enqueueSnackbar('Please enter Name Tag', {variant: 'error', autoHideDuration: 3000, style: {width: '220px', padding: 10, fontSize: 12}})
			return
		}
		const selectedList = sectionList.filter((value:any) => value.checked);
		if (selectedList.length === 0) {
			enqueueSnackbar('Please select Section', {variant: 'error', autoHideDuration: 3000, style: {width: '220px', padding: 10, fontSize: 12}})
			return
		}
		const selectedSection = selectedList.map((value:any) => value.name);
		// 기존의 SectionJson 에서, selectedSection 을 찾아서, NameTag 를 붙여서 새로운 SectionJson 을 만들어야 함
		const OrgSectionArray = Object.values(JSON.parse(JSON.stringify(SectionJson)))
		const NewSectionJson:any = {}
		let ID = maxID + 1
		selectedSection.forEach((value:any) => {
			const newSectionName = value + NameTag;
			// OrgSectionJson 의 value 중, value의 SECT_NAME 이 value 인 것을 찾아서, newSectionName 으로 바꿔야 함
			const newSection:any = OrgSectionArray.find((section: any) => section.SECT_NAME === value);
			newSection.SECT_NAME = newSectionName;
			let New_Sect_J = newSection.SECT_BEFORE.SECT_I
			let New_Sect_I = newSection.SECT_BEFORE.SECT_J
			newSection.SECT_BEFORE.SECT_I = New_Sect_I
			newSection.SECT_BEFORE.SECT_J = New_Sect_J
			NewSectionJson[ID] = newSection;
			ID = ID + 1

		})
		const Result = dbCreateTaperedSection(NewSectionJson)
		if ("error" in Result) {
			enqueueSnackbar(Result.error, {variant: 'error', autoHideDuration: 3000, style: {width: '220px', padding: 10, fontSize: 12}})
			return
		}
		else{
			getTaperedSection()
			enqueueSnackbar('New Section Created', {variant: 'success', autoHideDuration: 3000, style: {width: '220px', padding: 10, fontSize: 12}})
		}
	}
	return (
		<GuideBox width={235} spacing={1} padding={1}>
			<GuideBox row width={220} horSpaceBetween verCenter>
				<Typography variant='h1'> Tapered Section List </Typography>
				<IconButton onClick={handleRefresh} transparent><Icon iconName="Refresh" /></IconButton>
			</GuideBox>
			<Panel>
			<Box sx={{width: 200, height : 200, overflow:'auto'}} >
				<List dense={true} disablePadding={true} >
					{sectionList.map((value:any, index:any) => {
						return(
							<ListItem
								key={index}
								secondaryAction={<Check checked={sectionList[index].checked} />}
								onClick={() => handleListItemClick(index)}
							>
								<ListItemButton padding={0.8}>
									<Typography marginLeft={1}>{value.name}</Typography>
								</ListItemButton>
							</ListItem>
						)
					})}
					{sectionList.map((value:any, index:any) => (<Typography key={index} center></Typography>))}
				</List>
			</Box>
			</Panel>
			<GuideBox row width={220} horSpaceBetween verCenter>
				<Typography variant='h1'> New Section Name Tag </Typography>
				<TextField 
				width={70} 
				placeholder='_Mirror'
				onChange={(e) => setNameTag(e.target.value)}
				/>
			</GuideBox>
			<Button 
				variant='outlined'
				width='220px'
				onClick={handleGenerateSection}
			>Generate</Button>

		</GuideBox>
	);
}

export default App;