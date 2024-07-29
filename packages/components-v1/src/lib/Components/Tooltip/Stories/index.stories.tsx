import type { Meta, StoryObj } from "@storybook/react";
import { GuideBox, Tooltip, IconButton, Icon } from "../../../index";
import Explore from "./Explore.mdx";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { 
	RightCode, 
	ArrowBorderCode,
} from "../Code";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: { page: Explore },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right = LiveEditStory(cleanMask(RightCode));
export const ArrowBorder = LiveEditStory(cleanMask(ArrowBorderCode));

export const Sample: Story = {
  args: {
		title: <img src="https://raw.githubusercontent.com/midasit-dev/moaui-fixed-repo/main/svg/logo_circle.svg" alt="Logo" />,
		placement: 'right',
  },
	render: ({title, placement}) => {
		return (
			<GuideBox>
				<Tooltip 
					title={title}
					placement={placement}
				>
					<IconButton transparent>
						<Icon iconName="PlayArrow" />
					</IconButton>
				</Tooltip>
			</GuideBox>
		)
	}
};
