import React from "react";
import { TextField } from '../../../index';

export default function MoaTextFieldCompo(): React.ReactElement {

	return (
		<TextField
			width={"auto"}
			placeholder={"Moa TextField"}
			title={"Title"}
			titlePosition={"left"}
			disabled={false}
			defaultValue={""}
			error={false}
		/>
	);
}