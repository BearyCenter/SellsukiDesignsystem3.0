import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: [
    "../.storybook/stories/**/*.mdx",
    "../.storybook/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-designs",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    {
      from: "../src/assets",
      to: "assets",
    },
    {
      from: "../public",
      to: "public",
    },
  ],
};

export default config;
