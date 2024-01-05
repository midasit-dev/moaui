import type { Meta, StoryObj } from "@storybook/react";
import ChartLine from "..";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { 
	AxisTopRightCode, 
	AxisPointSizeCode,
	AxisLegendCode,
	DecimalsCode,
} from "../Code";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Components/ChartLine",
  component: ChartLine,
  parameters: {
    layout: "centered",
    docs: { page: Explore },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AxisTopRight = LiveEditStory(cleanMask(AxisTopRightCode));
export const AxisPointSize = LiveEditStory(cleanMask(AxisPointSizeCode));
export const AxisLegend = LiveEditStory(cleanMask(AxisLegendCode));
export const Decimals = LiveEditStory(cleanMask(DecimalsCode));

export const Sample: Story = {
  args: {
		data: [
			{
				'id': 'TempHeating',
				'color': '#f47560',
				'data': [
					{ 'x': 23.0, 'y': 0.0 },
					{ 'x': 6.0, 'y': -100.0 },
					{ 'x': 0.0, 'y': -400.0 },
					{ 'x': 0.0, 'y': -2130.0 },
					{ 'x': 3.0, 'y': -2330.0 },
				],
			},
			{
				'id': 'TempCooling',
				'color': '#1f78b4',
				'data': [
					{ 'x': -4.6, 'y': 0.0 },
					{ 'x': -1.2, 'y': -100.0 },
					{ 'x': 0.0, 'y': -400.0 },
					{ 'x': 0.0, 'y': -2130.0 },
					{ 'x': -3.0, 'y': -2330.0 },
				],
			},
			{
				'id': 'Girder',
				'color': '#333333',
				'data': [
					{ 'x': 0.0, 'y': 0.0 },
					{ 'x': 0.0, 'y': -2330.0 },
				],
			},
		],
		axisTop: true,
		axisTopTickValues: 5,
		axisTopDecimals: 2,
		axisTopTickRotation: -30,
		axisRight: true,
		axisRightTickValues: 5,
		axisRightDecimals: 2,
		axisRightTickRotation: -30,
		width: 400,
	},
};
