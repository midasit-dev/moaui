import type { Meta, StoryObj } from '@storybook/react';
import Button from "../";
import Docs from "./Docs.mdx";

//for Live Code Editor
import { createLiveEditStory } from 'storybook-addon-code-editor';
import * as Moaui from '../../../';
import EditableCode from './index.source.tsx?raw';

import ContainedButton from "./contained.source";
import ContainedButtonCode from "./contained.source.tsx?raw";

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { 
		layout: 'centered', 
		docs: { page: Docs },
	},
  tags: ['autodocs'],
  argTypes: {
		onClick: { control: 'none' },
    color: { control: 'text' },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

//for Live Code Editor
export const LiveCode = createLiveEditStory({
	availableImports: { "@midasit-dev/moaui": Moaui },
	code: EditableCode,
	modifyEditor(monaco, editor) {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
    });
    monaco.editor.setTheme('vs-dark');
    editor.focus();
  },
})
LiveCode.parameters.viewMode = 'story';

export const LiveCodeContained = createLiveEditStory({
	availableImports: { "@midasit-dev/moaui": Moaui },
	code: ContainedButtonCode,
	modifyEditor(monaco, editor) {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
    });
    monaco.editor.setTheme('vs-dark');
    editor.focus();
  },
})
LiveCodeContained.parameters.viewMode = 'story';

export const Contained: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "contained",
		disabled: false,
		width: "auto",
		color: "normal",
  },
	// render: ContainedButton
};
Contained.storyName = 'ContainedTest';

export const Outlined: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "outlined",
		disabled: false,
		width: "auto",
		color: "normal",
  },
};

export const Text: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "text",
		disabled: false,
		width: "auto",
		color: "normal",
  },
};
