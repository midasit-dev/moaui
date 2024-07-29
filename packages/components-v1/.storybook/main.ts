import type { StorybookConfig } from "@storybook/react-webpack5";
import { getCodeEditorStaticDirs } from "storybook-addon-code-editor/getStaticDirs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "storybook-addon-code-editor",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
		"@storybook/preset-create-react-app"
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
  webpackFinal: async (config:any) => { // 웹팩 설정 커스터마이징
    config.resolve.alias = {
      ...config.resolve.alias,
      '@midasit-dev/moaui-components-v1': path.resolve(__dirname, '../src/lib'), // 이건 *.code.*를 렌더링하기 위한 별칭임 (사용하지 말 것)
    };
    return config; // 수정된 설정 반환
  },
};
export default config;
