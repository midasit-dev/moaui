import React from 'react';
import { Title, Description, Controls, Canvas, ArgTypes, Stories } from '@storybook/blocks';

const DocsTemplate = () => {
	return (
		<>
			<blockquote><p>default docs template.</p></blockquote>
			<br />

			<Title />
			<Description />

			<h2>🔫 Preview</h2>
			<p>Displaying the rendered component with the trying props.</p>
			<Canvas sourceState="shown" withToolbar />

			<h2>⚽ Try</h2>
			<p>Try to change the props of the component.</p>
			<Controls 
				exclude={[
					'onClick',
					'onChange',
				]}
			/>

			<h2>📝 Props</h2>
			<p>The component has the following props.</p>
			<ArgTypes />

			<h2>📚 Stories</h2>
			<p>Experience a variety of components in advance.</p>
			<Stories />
		</>
	)
}

export default DocsTemplate;