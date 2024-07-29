import type { Meta } from '@storybook/react';

import LiveEditStory from '../../../Common/Storybook/LiveEditStory';
import { 
	DefaultCode,
} from '../Code';
import { cleanMask } from "../../../Common/Storybook/CodeExtractor";

const meta = {
  title: 'Experimental/LanguageDropList',
  parameters: { 
		layout: 'centered', 
	},
} satisfies Meta<JSX.Element>;

export default meta;

export const Default = LiveEditStory(cleanMask(DefaultCode));