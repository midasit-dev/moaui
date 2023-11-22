import React from "react";
import { Button } from '@midasit-dev/moaui';

export default function MoaButtonCompo(): React.ReactElement {

	return (
		<Button
			variant={"contained"}
			color={"normal"}
			width={"auto"}
			disabled={false}
		>
			MoaButton
		</Button>
	);
}