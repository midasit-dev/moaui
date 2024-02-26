import type { Meta } from "@storybook/react";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	ValidCheckDialogCode,
	DataGridWithClipboardCode,
	UploadButtonCode,
	DownloadButtonCode,
} from "../Code";

const meta = {
  title: "Templates/FuntionalComponents",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<JSX.Element>;

export default meta;

export const ValidCheckDialog = LiveEditStory(cleanMask(ValidCheckDialogCode));
export const DataGridWithClipboard = LiveEditStory(cleanMask(DataGridWithClipboardCode));
export const UploadButton = LiveEditStory(cleanMask(UploadButtonCode));
export const DownloadButton = LiveEditStory(cleanMask(DownloadButtonCode));
