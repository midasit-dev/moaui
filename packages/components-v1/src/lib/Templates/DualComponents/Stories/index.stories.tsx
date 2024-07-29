import type { Meta } from "@storybook/react";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	TypographyDropListSpaceBetweenCode,
	TypographyTextFieldSpaceBetweenCode,
} from "../Code";

const meta = {
  title: "Templates/DualComponents",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<JSX.Element>;

export default meta;

export const TypographyDropListSpaceBetween = LiveEditStory(cleanMask(TypographyDropListSpaceBetweenCode));
export const TypographyTextFieldSpaceBetween = LiveEditStory(cleanMask(TypographyTextFieldSpaceBetweenCode));
