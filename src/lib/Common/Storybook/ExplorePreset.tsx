import { Title, Description, Controls, Canvas, ArgTypes, Source } from '@storybook/blocks';
import { StoryAnnotations } from '@storybook/types';

interface PresetProps {
	availableImport?: string;
	primaryStory?: StoryAnnotations<any, any>;
}

export const Preset = (props: PresetProps) => {
	return (
		<>
			<Title />
			<Description />
			<SourceRegion {...props} />
			<CanvasRegion {...props} />
			<ControlsRegion {...props} />
			<ArgTypesRegion {...props} />
		</>
	)
}

export default Preset;

const SourceRegion = (props: PresetProps) => {
	if (props.availableImport === undefined) return <></>;
	return (
		<>
			<h2>💎 Import</h2>
			Import the component to your project.
			<Source
				code={props.availableImport}
				language="tsx"
				dark
			/>
		</>
	)
}
const CanvasRegion = (props: PresetProps) => {
	const Component = () => 
		props.primaryStory !== undefined ? 
			<Canvas of={props.primaryStory} sourceState="shown" withToolbar /> : 
			<Canvas sourceState="shown" withToolbar />;
	return (
		<>
			<h2>🔫 Preview</h2>
			Displaying the rendered component with the trying props.
			<Component />
		</>
	)
}
const ControlsRegion = (props: PresetProps) => {
	const Component = () => 
		props.primaryStory ? 
			<Controls of={props.primaryStory} 
				exclude={[ 
					'onClick', 
					'onChange', 
				]} 
			/> : 
			<Controls 
				exclude={[ 
					'onClick', 'onChange', 
				]}
			/>;
	return (
		<>
			<h2>⚽ Try</h2>
			Try to change the props of the component.
			<Component />
		</>
	)
}
const ArgTypesRegion = (props: PresetProps) => {
	const Component = () => 
		props.primaryStory ? 
			<ArgTypes of={props.primaryStory} /> : 
			<ArgTypes />;
	return (
		<>
			<h2>📝 Props</h2>
			The component has the following props.
			<Component />
		</>
	)
}