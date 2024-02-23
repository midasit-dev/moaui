import type { Meta } from "@storybook/react";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	DevToolsUICode,
} from "../Code";

const meta = {
  title: "Templates/Samples",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<JSX.Element>;

export default meta;


export const DevToolsUI = LiveEditStory(cleanMask(DevToolsUICode));
