import { Title, Description, Controls, Canvas, ArgTypes, Source } from '@storybook/blocks';
import { StoryAnnotations } from '@storybook/types';

type RegionType = 'Title' | 'Description' | 'Source' | 'Canvas' | 'Controls' | 'ArgTypes';
interface PresetProps {
	availableImport?: string | undefined;
	primaryStory?: StoryAnnotations<any, any> | undefined;
	hideRegions?: RegionType[] | undefined;
}

export const Preset = (props: PresetProps) => {
	const isHideRegion = (region: RegionType) => {
		if (props.hideRegions === undefined) return false;
		return props.hideRegions.includes(region);
	}

	return (
		<>
			{isHideRegion('Title') ? <></> : <Title />}
			{isHideRegion('Description') ? <></> : <Description />}
			{isHideRegion('Source') ? <></> : <SourceRegion {...props} />}
			{isHideRegion('Canvas') ? <></> : <CanvasRegion {...props} />}
			{isHideRegion('Controls') ? <></> : <ControlsRegion {...props} />}
			{isHideRegion('ArgTypes') ? <></> : <ArgTypesRegion {...props} />}
		</>
	)
}

export default Preset;

const SourceRegion = (props: PresetProps) => {
	if (props.availableImport === undefined) return <></>;
	return (
		<>
			<h2>💎 Import</h2>
			<p>Import the component to your project.</p>
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
			<p>Displaying the rendered component with the trying props.</p>
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
			<p>Try to change the props of the component.</p>
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
			<p>The component has the following props.</p>
			<Component />
		</>
	)
}