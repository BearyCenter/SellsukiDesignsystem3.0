import type { StorybookConfig } from "@storybook/web-components-vite";
import type { InlineConfig } from "vite";

const config: StorybookConfig = {
  viteFinal: async (config: InlineConfig) => {
    config.plugins = (config.plugins ?? []).filter(
      (p) => p && !Array.isArray(p) && (p as any).name !== "vite:dts"
    );
    return config;
  },
  stories: [
    "../.storybook/stories/**/*.mdx",
    "../.storybook/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-designs",
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
