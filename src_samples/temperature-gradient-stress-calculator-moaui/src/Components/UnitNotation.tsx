import React from 'react';
import { GuideBox, Typography } from "@midasit-dev/moaui"
import { getUnitNotation } from '../pyscript_utils';

const CompUnitNotation = () => {
	return (
		<GuideBox width={100} horRight>
			<Typography>{getUnitNotation()}</Typography>
		</GuideBox>
	)
}

export default CompUnitNotation;