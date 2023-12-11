import type { Meta } from "@storybook/react";

import LiveEditStory from "../../../Common/Storybook/LiveEditStory";
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";
import { 
	CompositeCode, 
	UpdateButtonCode,
	ListCode,
	SelectButtonCode,
	HelpIconButtonCode,
	BottomButtonsCode,
} from "../Code";

const meta = {
  title: "Templates/TendonProfileConverter",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<JSX.Element>;

export default meta;

export const S_Composite = LiveEditStory(cleanMask(CompositeCode));
export const C_UpdateButton = LiveEditStory(cleanMask(UpdateButtonCode));
export const C_List = LiveEditStory(cleanMask(ListCode));
export const C_SelectButton = LiveEditStory(cleanMask(SelectButtonCode));
export const C_HelpIconButton = LiveEditStory(cleanMask(HelpIconButtonCode));
export const C_BottomButtons = LiveEditStory(cleanMask(BottomButtonsCode));
