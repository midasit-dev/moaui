import type { Meta } from "@storybook/react";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	DataGridWithClipboardCode,
	DevToolsUICode,
	UploadDownloadCode,
} from "../Code";

const meta = {
  title: "Templates/Samples",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<JSX.Element>;

export default meta;

export const DataGridWithClipboard = LiveEditStory(cleanMask(DataGridWithClipboardCode));
export const DevToolsUI = LiveEditStory(cleanMask(DevToolsUICode));
export const UploadDownload = LiveEditStory(cleanMask(UploadDownloadCode));