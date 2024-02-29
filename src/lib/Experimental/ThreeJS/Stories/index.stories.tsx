import type { Meta } from '@storybook/react';

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	BoxCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Experimental/ThreeJS',
  parameters: { 
		layout: 'centered', 
	},
} satisfies Meta<JSX.Element>;

export default meta;

export const Box = LiveEditStory(cleanMask(BoxCode));
