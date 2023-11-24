import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import DocsTemplate from "./moaui-autodocs-template"

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
			page: DocsTemplate,
			toc: {
				theme: themes.light,
				contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: true,
				},
			},
		}
  },
};

export default preview;