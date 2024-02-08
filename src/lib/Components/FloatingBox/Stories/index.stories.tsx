import type { Meta, StoryObj } from "@storybook/react";
import { FloatingBox, Panel, Typography } from "../../../";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import {
	WithPanelCode,
	GuideBoxPropsCode,
	MouseEventsCode,
} from "../Code";

const meta = {
  title: "Components/FloatingBox",
  component: FloatingBox,
  parameters: {
    layout: "centered",
		docs: { page: Explore }
  },
	tags: ['autodocs'],
} satisfies Meta<typeof FloatingBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPanel = LiveEditStory(cleanMask(WithPanelCode));
export const GuideBoxProps = LiveEditStory(cleanMask(GuideBoxPropsCode));
export const MouseEvents = LiveEditStory(cleanMask(MouseEventsCode));

export const Sample: Story = {
  args: {
		x: 16,
		y: 16,
		width: 150,
		height: 150,
		show: true,
		fill: '2',
  },
	render: ({ x, y, width, height, show, fill }) => {
		return (
			<Panel
				width={Number(width) * 1.5}
				height={Number(height) * 1.5}
			>
				<FloatingBox 
					x={x}
					y={y}
					width={width}
					height={height}
					show={show} 
					fill={fill}
					guideBoxProps={{
						padding: 2,
					}}
				>
					<Typography>{`x: ${x}`}</Typography>
					<Typography>{`y: ${y}`}</Typography>
					<Typography>{`width: ${width}`}</Typography>
					<Typography>{`height: ${height}`}</Typography>
					<Typography>{`show: ${show}`}</Typography>
					<Typography>{`fill: ${fill}`}</Typography>
				</FloatingBox>
			</Panel>
		);
	}
};