import type { Meta, StoryObj } from '@storybook/react';
import Button from "..";
import Explore from "./Explore.mdx";

import { createLiveEditStory } from 'storybook-addon-code-editor';
import CodeComposite from './Code/Composite.source.tsx?raw';
import createLiveEditOptions from '../../../Common/Storybook/CreateLiveEditOptions';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { 
		layout: 'centered', 
		docs: { page: Explore },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composite = createLiveEditStory(createLiveEditOptions(CodeComposite));
Composite.parameters.viewMode = 'story';

export const Sample: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "contained",
		disabled: false,
		width: "auto",
		color: "normal",
  }
};
