import type { Meta, StoryObj } from "@storybook/react";
import Explore from "./Explore.mdx";

const TempComponent = () => <></>;
const meta = {
  title: "Components/Snackbar",
	component: TempComponent,
  parameters: {
    layout: "centered",
		docs: { page: Explore }
  },
	tags: [ 'autodocs' ]
} satisfies Meta<typeof TempComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {};