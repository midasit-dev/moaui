import type { Meta, StoryObj } from '@storybook/react';
import Color from ".";
import Sample from "./Sample";

const meta = {
  title: 'Components/Color',
	component: Sample,
  parameters: { layout: 'centered', },
  tags: ['autodocs'],
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryMain: Story = { args: { backgroundColor: Color.primary.main } }
export const PrimaryEnable: Story = { args: { backgroundColor: Color.primary.enable } }
export const PrimaryEnableStrock: Story = { args: { backgroundColor: Color.primary.enable_strock } }
export const PrimaryFocus: Story = { args: { backgroundColor: Color.primary.focus } }
export const PrimaryHover: Story = { args: { backgroundColor: Color.primary.hover } }
export const PrimaryWhite: Story = { args: { backgroundColor: Color.primary.white } }

export const PrimaryNegativeMain: Story = { args: { backgroundColor: Color.primaryNegative.main } }
export const PrimaryNegativeEnable: Story = { args: { backgroundColor: Color.primaryNegative.enable } }
export const PrimaryNegativeEnableStrock: Story = { args: { backgroundColor: Color.primaryNegative.enable_strock } }
export const PrimaryNegativeFocus: Story = { args: { backgroundColor: Color.primaryNegative.focus } }
export const PrimaryNegativeHover: Story = { args: { backgroundColor: Color.primaryNegative.hover } }
export const PrimaryNegativeWhite: Story = { args: { backgroundColor: Color.primaryNegative.white } }

export const SecondaryMain: Story = { args: { backgroundColor: Color.secondary.main } }

export const TextPrimary: Story = { args: { backgroundColor: Color.text.primary } }
export const TextSecondary: Story = { args: { backgroundColor: Color.text.secondary } }	
export const TextThird: Story = { args: { backgroundColor: Color.text.third } }
export const TextDisable: Story = { args: { backgroundColor: Color.text.disable } }

export const TextNegativePrimary: Story = { args: { backgroundColor: Color.textNegative.primary } }
export const TextNegativeSecondary: Story = { args: { backgroundColor: Color.textNegative.secondary } }
export const TextNegativeThird: Story = { args: { backgroundColor: Color.textNegative.third } }
export const TextNegativeDisable: Story = { args: { backgroundColor: Color.textNegative.disable } }

export const ComponentGray: Story = { args: { backgroundColor: Color.component.gray } }
export const ComponentGray01: Story = { args: { backgroundColor: Color.component.gray_01 } }
export const ComponentGray02: Story = { args: { backgroundColor: Color.component.gray_02 } }
export const ComponentGrayLight: Story = { args: { backgroundColor: Color.component.gray_light } }
export const ComponentGrayDark: Story = { args: { backgroundColor: Color.component.gray_dark } }
