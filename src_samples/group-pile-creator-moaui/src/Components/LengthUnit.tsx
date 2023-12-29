import React from 'react';
import { useRecoilState } from 'recoil';
import { VarSpacingStyleInt } from './variables';
import { GuideBox, Typography, DropList } from '@midasit-dev/moaui';

const CompLengthUnit = () => {
	const [value, setValue] = useRecoilState(VarSpacingStyleInt);
	return (
		<GuideBox width="100%" row horSpaceBetween>
			<GuideBox width="inherit" row horSpaceBetween verCenter height={30}>
				<Typography flexItem textAlign="center" height={30}>Length Unit</Typography>
				<DropList
					width={200}
					itemList={new Map<string, number>([
						['D', 1],
						['L', 2],
					])}
					defaultValue={value}
					value={value}
					onChange={(e: any) => setValue(e.target.value)}
				/>
			</GuideBox>
		</GuideBox>
	);
}

export default CompLengthUnit;