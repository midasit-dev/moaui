import * as React from "react";
import MoaTextField from "@midasit-dev/moaui/TextField";
import MoaStack from "@midasit-dev/moaui/Stack";

export default function TextFieldInput(title = NaN, values, SetValue, Display) {
	return (
		<MoaStack
			direction="row"
			component="form"
			spacing={2}
			justifyContent="space-between"
			width="10rem"
		>
			<MoaTextField
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
							marginLeft: "5px",
						},
					},
					inputProps: {
						step: 1,
					},
				}}
			/>
		</MoaStack>
	);
}
