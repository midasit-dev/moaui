import type { Meta } from '@storybook/react';

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	DefaultCode,
	GridCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Experimental/Polygon',
  parameters: { 
		layout: 'centered', 
	},
} satisfies Meta<JSX.Element>;

export default meta;

export const Default = LiveEditStory(cleanMask(DefaultCode));
export const Grid = LiveEditStory(cleanMask(GridCode));