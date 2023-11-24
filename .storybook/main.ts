import type { StorybookConfig } from "@storybook/react-webpack5";
import { getCodeEditorStaticDirs } from "storybook-addon-code-editor/getStaticDirs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
		"storybook-addon-code-editor",
		"@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
		defaultName: "Explore",
  },
	staticDirs: [
		...getCodeEditorStaticDirs(),
	],
};
export default config;
