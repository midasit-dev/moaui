import React from 'react';
import { Title, Description, Controls, Canvas, ArgTypes, Primary } from '@storybook/blocks';

const DocsTemplate = () => {
	return (
		<>
			<Title />
			<Description />
			Default docs template.
			<br />

			<h2>🔫 Preview</h2>
			Displaying the rendered component with the trying props.
			<Canvas sourceState="shown" withToolbar />

			<h2>⚽ Try</h2>
			Try to change the props of the component.
			<Controls 
				exclude={[
					'onClick'
				]}
			/>

			<h2>📝 Props</h2>
			The component has the following props.
			<ArgTypes />
		</>
	)
}

export default DocsTemplate;