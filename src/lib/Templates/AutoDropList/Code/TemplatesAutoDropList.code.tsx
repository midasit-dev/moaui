import React from 'react';/**${comma}*/
import { GuideBox, AutoDropList } from "@midasit-dev/moaui";/**${comma}*/

const TemplatesAutoDropList = ({
	width = 300,/**${props-separator}*/
	height = 30,/**${props-separator}*/
	db = "node",/**${props-separator}*/
	filter = "X",/**${props-separator}*/
	value = undefined,/**${props-separator}*/
	onChange = undefined,/**${props-separator}*/
	show = false,/**${props-separator}*/
}: any) => {

	return (
		<GuideBox show={show} width={width} height={height} row horSpaceBetween>
			<AutoDropList db={db} filter={filter} value={value} onChange={onChange} />
		</GuideBox>
	)
};/**${comma}*/

export default TemplatesAutoDropList;