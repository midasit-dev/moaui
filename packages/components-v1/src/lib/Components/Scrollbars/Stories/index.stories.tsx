import type { Meta, StoryObj } from '@storybook/react';
import { Scrollbars, Check, Stack } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { CheckGroupCode, ListCode } from '../Code';

const meta = {
  title: 'Components/Scrollbars',
  component: Scrollbars,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Explore },
		layout: 'centered',
	},
} satisfies Meta<typeof Scrollbars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckGroup = LiveEditStory(cleanMask(CheckGroupCode));
export const List = LiveEditStory(cleanMask(ListCode));

export const Sample: Story = {
	args: {
		panelProps: {
			variant: 'shadow2',
		},
		width: 200,
		height: 150,
		title: 'Scrollbars Title Text',
		titleVariant: 'body1',
		titleColor: 'disable',
	},
	render: ({panelProps, width, height, title, titleVariant, titleColor}) => {
		return (
      <Scrollbars
				panelProps={panelProps}
				width={width}
				height={height}
				title={title}
				titleVariant={titleVariant}
				titleColor={titleColor}
      >
				<Stack direction='column' spacing={1}>
					<Check name="Check 1" />
					<Check name="Check 2" />
					<Check name="Check 3" />
					<Check name="Check 4" />
					<Check name="Check 5" />
					<Check name="Check 6" />
					<Check name="Check 7" />
				</Stack>
			</Scrollbars>
		)
	}
};
