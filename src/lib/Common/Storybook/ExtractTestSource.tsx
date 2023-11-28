import { Source } from '@storybook/blocks';
import { extract } from "./CodeExtractor";

const ExtractTestSource = (props: any) => {
	const { importCodes, functionalComponentName, functionalComponentCode } = extract(props.code);

	return (
		<>
			{importCodes.map((code, index) => <Source key={index} code={code} language="ts" dark />)}
			<Source code={functionalComponentName} language="ts" dark />
			<Source code={functionalComponentCode} language="ts" dark />
		</>
	)
};

export default ExtractTestSource;