import React from 'react';/**${comma}*/
import { GuideBox, Typography, DropList } from "@midasit-dev/moaui";/**${comma}*/

const TemplatesDualComponentsTypographyDropListSpaceBetween = ({
	width = 300,/**${props-seperator}*/
	height = 30,/**${props-seperator}*/
	title = 'Title',/**${props-seperator}*/
	dropListwidth = 150,/**${props-seperator}*/
	items = [ 
		['Korean', 	 1],
		['American', 2],
		['Asia', 		 3],
		['Midas', 	 4],
	],/**${props-seperator}*/
	defaultValue = 1,/**${props-seperator}*/
	value = undefined,/**${props-seperator}*/
	onChange = undefined,/**${props-seperator}*/
	show = false,/**${props-seperator}*/
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	const itemsMap = new Map<string, number>(items as [string, number][]);
	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<Typography flexItem textAlign='center' height={height}>{title}</Typography>
			<DropList 
				itemList={itemsMap} 
				width={dropListwidth} 
				defaultValue={defaultValue}
				value={value || valueLocal}
				onChange={onChange || onChangeLocal}
			/>
		</GuideBox>
	)
};/**${comma}*/

export default TemplatesDualComponentsTypographyDropListSpaceBetween;