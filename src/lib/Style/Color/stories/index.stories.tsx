import type { Meta, StoryObj } from '@storybook/react';
import Sample from "../Sample";

const meta = {
  title: 'Style/Color',
	component: Sample,
  parameters: { layout: 'centered', },
  tags: ['autodocs'],
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryMain: Story = { args: { backgroundColorName: "Color.primary.main" } }
export const PrimaryEnable: Story = { args: { backgroundColorName: "Color.primary.enable" } }
export const PrimaryEnableStrock: Story = { args: { backgroundColorName: "Color.primary.enable_strock" } }
export const PrimaryFocus: Story = { args: { backgroundColorName: "Color.primary.focus" } }
export const PrimaryHover: Story = { args: { backgroundColorName: "Color.primary.hover" } }
export const PrimaryWhite: Story = { args: { backgroundColorName: "Color.primary.white" } }

export const PrimaryNegativeMain: Story = { args: { backgroundColorName: "Color.primaryNegative.main" } }
export const PrimaryNegativeEnable: Story = { args: { backgroundColorName: "Color.primaryNegative.enable" } }
export const PrimaryNegativeEnableStrock: Story = { args: { backgroundColorName: "Color.primaryNegative.enable_strock" } }
export const PrimaryNegativeFocus: Story = { args: { backgroundColorName: "Color.primaryNegative.focus" } }
export const PrimaryNegativeHover: Story = { args: { backgroundColorName: "Color.primaryNegative.hover" } }
export const PrimaryNegativeWhite: Story = { args: { backgroundColorName: "Color.primaryNegative.white" } }

export const SecondaryMain: Story = { args: { backgroundColorName: "Color.secondary.main" } }

export const TextPrimary: Story = { args: { backgroundColorName: "Color.text.primary" } }
export const TextSecondary: Story = { args: { backgroundColorName: "Color.text.secondary" } }	
export const TextThird: Story = { args: { backgroundColorName: "Color.text.third" } }
export const TextDisable: Story = { args: { backgroundColorName: "Color.text.disable" } }

export const TextNegativePrimary: Story = { args: { backgroundColorName: "Color.textNegative.primary" } }
export const TextNegativeSecondary: Story = { args: { backgroundColorName: "Color.textNegative.secondary" } }
export const TextNegativeThird: Story = { args: { backgroundColorName: "Color.textNegative.third" } }
export const TextNegativeDisable: Story = { args: { backgroundColorName: "Color.textNegative.disable" } }

export const ComponentGray: Story = { args: { backgroundColorName: "Color.component.gray" } }
export const ComponentGray01: Story = { args: { backgroundColorName: "Color.component.gray_01" } }
export const ComponentGray02: Story = { args: { backgroundColorName: "Color.component.gray_02" } }
export const ComponentGrayLight: Story = { args: { backgroundColorName: "Color.component.gray_light" } }
export const ComponentGrayDark: Story = { args: { backgroundColorName: "Color.component.gray_dark" } }
