import type { Meta, StoryObj } from '@storybook/react';
import Button from "../";
import Explore from "./Explore.mdx";

//for Live Code Editor
import { createLiveEditStory } from 'storybook-addon-code-editor';
import * as Moaui from '../../../';
import EditableCode from './index.source.tsx?raw';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { 
		layout: 'centered', 
		docs: { page: Explore },
	},
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

//for Live Code Editor
export const Sandbox = createLiveEditStory({
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
Sandbox.parameters.viewMode = 'story';

export const Sample: Story = {
  args: {
		children: "Button",
		onClick: () => {},
		variant: "contained",
		disabled: false,
		width: "auto",
		color: "normal",
  }
};
