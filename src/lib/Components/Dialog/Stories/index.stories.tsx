import React from 'react';
import type { Meta } from "@storybook/react";
import { Dialog } from "../../../index";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	HelpCode,
	HelpButtonCode, 
	HelpIconButtonCode,
	DialogButtonCode,
	OnCloseCode,
} from "../Code";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>;

export default meta;

export const Help = LiveEditStory(cleanMask(HelpCode));
export const HelpButton = LiveEditStory(cleanMask(HelpButtonCode));
export const HelpIconButton = LiveEditStory(cleanMask(HelpIconButtonCode));
export const DialogButton = LiveEditStory(cleanMask(DialogButtonCode));
export const OnClose = LiveEditStory(cleanMask(OnCloseCode));