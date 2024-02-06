import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	JavascriptCode,
	TypescriptCode,
	BackgroundColorCode,
	PaddingCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  parameters: { 
		layout: 'centered',
		docs: { page: Explore, },
	},
  tags: ['autodocs'],
  argTypes: {
	},
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Javascript = LiveEditStory(cleanMask(JavascriptCode));
export const Typescript = LiveEditStory(cleanMask(TypescriptCode));
export const BackgroundColor = LiveEditStory(cleanMask(BackgroundColorCode));
export const Padding = LiveEditStory(cleanMask(PaddingCode));

export const Sample: Story = {
	args: {
		children: `// JavaScript 코드로 별 찍기
for (let i = 0; i < 5; i++) {
	document.write('* ');
}`,
		language: "typescript",
		title: "Code Block"
	},
	render: ({ children, language, title }) => {
		return (
			<CodeBlock language={language} title={title}>
				{children}
			</CodeBlock>
		)
	}
}
