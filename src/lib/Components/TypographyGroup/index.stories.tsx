import type { Meta, StoryObj } from '@storybook/react';
import TypographyGroup from ".";
import Docs from "./Docs.mdx";

const meta = {
  title: 'Components/TypographyGroup',
  component: TypographyGroup,
	tags: ['autodocs'],
  parameters: { 
		docs: { page: Docs },
		layout: 'centered',
	},
} satisfies Meta<typeof TypographyGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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