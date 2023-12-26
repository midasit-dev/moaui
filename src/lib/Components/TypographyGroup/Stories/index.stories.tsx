import type { Meta, StoryObj } from '@storybook/react';
import TypographyGroup from "..";
import Explore from "./Exlpore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { TextCode } from '../Code';

const meta = {
  title: 'Components/TypographyGroup',
  component: TypographyGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof TypographyGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text = LiveEditStory(cleanMask(TextCode));

export const Sample: Story = {
	args: {
		titleText: "title",
		bodyText: "body",
	},
	render: ({titleText, bodyText}) => {
		return (
			<TypographyGroup titleText={titleText} bodyText={bodyText} />
		)
	}
};