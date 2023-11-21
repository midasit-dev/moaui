import type { Preview } from "@storybook/react";

import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
		docs: {
			toc: {
				theme: themes.light,
				contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: true,
				},
			},
		}
  },
};

export default preview;