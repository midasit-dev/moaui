import type { Meta } from "@storybook/react";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	ValidCheckDialogCode,
	DataGridWithClipboardOptionCode,
	DataGridWithClipboardOptionSampleCode,
} from "../Code";

const meta = {
  title: "Templates/FuntionalComponents",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<JSX.Element>;

export default meta;

export const ValidCheckDialog = LiveEditStory(cleanMask(ValidCheckDialogCode));
export const DataGridWithClipboardOption = LiveEditStory(cleanMask(DataGridWithClipboardOptionCode));
export const DataGridWithClipboardOptionSample = LiveEditStory(cleanMask(DataGridWithClipboardOptionSampleCode));
