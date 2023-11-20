import type { Meta, StoryObj } from '@storybook/react';
import Component from "."

const meta = {
  title: 'Components/CodeBlock',
  component: Component,
  parameters: { layout: 'centered', },
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CodeBlock: Story = {
	args: {
		children: `// JavaScript 코드로 별 찍기
for (let i = 0; i < 5; i++) {
	document.write('* ');
}`,
		language: "js",
		title: "Code Block"
	},
	render: ({ children, language, title }) => {
		return (
			<Component language={language} title={title}>
				{children}
			</Component>
		)
	}
}
