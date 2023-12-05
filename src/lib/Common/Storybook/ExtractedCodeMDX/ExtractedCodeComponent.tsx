import { useEffect, useState } from 'react';
import { Source } from '@storybook/blocks';
import { extract } from "../CodeExtractor";

const SourceComponentBundle = (props: any) => {
	const { importCodes, functionalComponentName, functionalComponentCode } = extract(props.code);

	return (
		<>
			<h1>{functionalComponentName}</h1>
			{importCodes.map((code, index) => <Source key={index} code={code} language="ts" dark />)}
			<Source code={functionalComponentCode} language="ts" dark />
		</>
	)
};

const App = () => {
	const [codes, setCodes] = useState<any[]>([]);

	useEffect(() => {
		const asyncFunction = async () => {
			const rawCodes: string[] = [];
			rawCodes.push(await import("../../../Authentication/VerifyDialog/Code/Default.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Button/Code/Composite.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Button/Code/Contained.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Button/Code/Negative.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Button/Code/Normal.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Button/Code/Outlined.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Button/Code/Text.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Button/Code/Width.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Check/Code/NotRequired.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Check/Code/Required.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/CheckGroup/Code/Text.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/CodeBlock/Code/Javascript.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/CodeBlock/Code/Typescript.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/DataGrid/Code/Pagination.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/DropList/Code/Dropdown.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Grid/Code/Column.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Grid/Code/Items.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Grid/Code/Row.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Icon/Code/Add.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Icon/Code/Close.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/IconButton/Code/Add.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/IconButton/Code/Close.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Panel/Code/Box.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Panel/Code/Shadow.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Panel/Code/Strock.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Radio/Code/Name.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/RadioGroup/Code/Controlled.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/RadioGroup/Code/UnControlled.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Seperator/Code/Horizontal.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Seperator/Code/Vertical.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Stack/Code/Column.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Stack/Code/Row.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Switch/Code/Label.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/SwitchGroup/Code/Controlled.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/SwitchGroup/Code/UnControlled.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Tab/Code/Label.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/TabGroup/Code/Horizontal.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/TabGroup/Code/Vertical.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Table/Code/Body.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Table/Code/Bundle.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Table/Code/Cell.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Table/Code/Header.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Table/Code/Row.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/TextField/Code/Error.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/TextField/Code/Label.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/TextField/Code/Left.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/TextField/Code/Right.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Typography/Code/Body1.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Typography/Code/Body2.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Typography/Code/Body3.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/Typography/Code/H1.code.tsx?raw"));
			rawCodes.push(await import("../../../Components/TypographyGroup/Code/Text.code.tsx?raw"));
			setCodes(rawCodes);
		}

		asyncFunction();
	}, []);
	
	return (
		<>
			{codes.map((code, index) => <SourceComponentBundle key={index} code={code.default} />)}
		</>
	)
}

export default App;