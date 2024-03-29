import type { Meta } from '@storybook/react';

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	SampleCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Experimental/Polygons',
  parameters: { 
		layout: 'centered', 
	},
} satisfies Meta<JSX.Element>;

export default meta;

export const Sample = LiveEditStory(cleanMask(SampleCode));