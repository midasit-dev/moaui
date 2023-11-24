import type { Meta, StoryObj } from '@storybook/react';
import CodeBlobk from "..";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlobk,
  parameters: { 
		layout: 'centered',
		docs: { page: Docs, },
	},
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof CodeBlobk>;

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
			<CodeBlobk language={language} title={title}>
				{children}
			</CodeBlobk>
		)
	}
}
