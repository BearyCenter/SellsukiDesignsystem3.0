import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/theme-context";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (story: any) => {
      const h = html`<ssk-theme-provider>${story()}</s-theme-provider>`;

      return h;
    },
  ],
};

export default preview;
