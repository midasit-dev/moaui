import React from 'react';/**${comma}*/
import { GuideBox, Typography, DropList } from "@midasit-dev/moaui";/**${comma}*/

const TemplatesDualComponentsTypographyDropListSpaceBetween = ({
	width = 300,/**${props-separator}*/
	height = 30,/**${props-separator}*/
	title = 'Title',/**${props-separator}*/
	dropListwidth = 150,/**${props-separator}*/
	droplistDisabled = false,/**${props-separator}*/
	items = [ 
		['Korean', 	 1],
		['American', 2],
		['Asia', 		 3],
		['Midas', 	 4],
	],/**${props-separator}*/
	defaultValue = 1,/**${props-separator}*/
	value = undefined,/**${props-separator}*/
	onChange = undefined,/**${props-separator}*/
	show = false,/**${props-separator}*/
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<Typography center height={height}>{title}</Typography>
			<DropList 
				itemList={items} 
				width={dropListwidth} 
				disabled={droplistDisabled}
				defaultValue={defaultValue}
				value={value || valueLocal}
				onChange={onChange || onChangeLocal}
			/>
		</GuideBox>
	)
};/**${comma}*/

export default TemplatesDualComponentsTypographyDropListSpaceBetween;