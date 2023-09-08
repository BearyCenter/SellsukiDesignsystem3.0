import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/context-i18n";
import { IdbI18nStore } from "../src/components/context-i18n/idb";
import "../src/components/context-theme";

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
      window.__SSK_I18N_STORE__ = new IdbI18nStore("storybook-i18n-store"); // isolate the store from the app

      const h = html`
      <ssk-theme-provider>
        <ssk-i18n-provider .store=${globalThis.__SSK_I18N_STORE__}>
          ${story()}
        </ssk-i18n-provider>
      </s-theme-provider>`;

      return h;
    },
  ],
};

// add type for globalThis.__SSK_I18N_STORE__
declare global {
  interface Window {
    __SSK_I18N_STORE__: IdbI18nStore;
  }
}

export default preview;
