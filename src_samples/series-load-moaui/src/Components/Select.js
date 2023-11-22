import * as React from 'react';
import MoaDropList from '@midasit-dev/moaui/DropList';
import MoaStack from '@midasit-dev/moaui/Stack';
import MoaTypography from '@midasit-dev/moaui/Typography';


export default function SelectVariants(title, preSetList, preListNb, setPreListNb) {
	const convertKeyValuePair = React.useCallback((key) => {
		return [preSetList[key], key];
	}, [preSetList]);
	
	const values = new Map([
		convertKeyValuePair(10),
		convertKeyValuePair(20),
		convertKeyValuePair(30),
		convertKeyValuePair(40),
		convertKeyValuePair(50),
	]);

	return (
		<MoaStack
			direction="row"
			component="form"
			spacing={2}
			justifyContent="space-between"
			marginX={2}
		>
			<MoaTypography>{title}</MoaTypography>
			<MoaDropList
				itemList={values}
				value={preListNb}
				onChange={(e) => setPreListNb(e.target.value)}
			/>
		</MoaStack>
	);
}
