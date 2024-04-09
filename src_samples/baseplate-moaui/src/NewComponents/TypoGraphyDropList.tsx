import React from 'react';/**${comma}*/
import { GuideBox, Typography, DropList } from "@midasit-dev/moaui";/**${comma}*/

const TypoGraphyDropList = ({
	width = 300,/**${props-separator}*/
	height = 30,/**${props-separator}*/
	title = 'Title',/**${props-separator}*/
	dropListwidth = 180,/**${props-separator}*/
	droplistDisabled = false,/**${props-separator}*/
	items = [ 
		['Korean', 	 0],
		['American', 1],
		['Asia', 		 2],
		['Midas', 	 3],
	],/**${props-separator}*/
	defaultValue = 0,/**${props-separator}*/
	value = undefined,/**${props-separator}*/
	onChange = undefined,/**${props-separator}*/
	show = false,/**${props-separator}*/
}: any) => {
	const [valueLocal, setValueLocal] = React.useState(defaultValue);
	let onChangeLocal = (e: any) => {
		setValueLocal(e.target.value);
	}

	return (
    <GuideBox show={show} width={width} height={height} row horSpaceBetween verCenter>
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

export default TypoGraphyDropList;