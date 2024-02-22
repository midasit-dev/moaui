import type { Meta } from "@storybook/react";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	TemplatesAutoDropList,
} from "../Code";

const meta = {
  title: "Templates/AutoDropList",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<JSX.Element>;

export default meta;

export const AutoDropList = LiveEditStory(cleanMask(TemplatesAutoDropList));
