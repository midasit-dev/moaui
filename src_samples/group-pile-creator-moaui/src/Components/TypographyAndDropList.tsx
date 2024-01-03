import React from 'react';
import { GuideBox, Typography, DropList } from '@midasit-dev/moaui';

const CompTypographyAndDropList = (props: any) => {
	const {
		title,
		list,
		state,
		setState,
		disabled,
	} = props;

	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography center height={30}>{title}</Typography>
				<DropList
					width={200}
					itemList={new Map<string, number>(list as [string, number][])}
					defaultValue={state}
					value={state}
					onChange={(e: any) => setState(e.target.value)}
					disabled={disabled}
				/>
			</GuideBox>
		</GuideBox>
	)
}

export default CompTypographyAndDropList;