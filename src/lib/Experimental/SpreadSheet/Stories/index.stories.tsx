import type { Meta } from '@storybook/react';

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	ColumnLabelsCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Experimental/SpreadSheet',
  parameters: { 
		layout: 'centered', 
	},
} satisfies Meta<JSX.Element>;

export default meta;

export const ColumnLabels = LiveEditStory(cleanMask(ColumnLabelsCode));
