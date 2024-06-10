import * as React from "react";
import MoaTextFieldV2 from "@midasit-dev/moaui/Components/TextFieldV2";
import MoaStack from "@midasit-dev/moaui/Components/Stack";

export default function TextFieldInput(title = NaN, values, SetValue, Display) {
	return (
		<MoaStack
			direction="row"
			component="form"
			spacing={2}
			justifyContent="space-between"
			width="10rem"
		>
			<MoaTextFieldV2
				variant="standard"
				type="number"
				size="small"
				title={title}
				value={values}
				onChange={(e) => SetValue(e.target.value)}
				InputProps={{
					sx: {
						"& input": {
							textAlign: "right",
						},
						"& input[type=number]::-webkit-inner-spin-button": {
							//'-webkit-appearance': 'none',
							opacity: 1,
							margin: 0,
							marginLeft: "2px",
						},
					},
				}}
				numberOptions={{
					min: 1,
					step: 1,
					onlyInteger: true,
					condition: {
						min: "greaterEqual",
					}
				}}
			/>
		</MoaStack>
	);
}
