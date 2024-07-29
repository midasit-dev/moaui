import type { Meta, StoryObj } from '@storybook/react';
import { SVG, SVGSample } from "../../../";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { SvgTestCode } from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Components/SVG',
  component: SVG,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof SVG>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SVGTest = LiveEditStory(cleanMask(SvgTestCode));

export const Sample: Story = {
	args: SVGSample,
};
