import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/contexts/i18n";
import { IdbI18nStore } from "../src/contexts/i18n/idb";
import "../src/contexts/theme";

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
      // in real environment, the store should be created in the app
      // do not need to set to global
      // __SSK_I18N_STORE__ need to be access  in another story (./stories/I18n/provider.stories.ts)
      window.__SSK_I18N_STORE__ = new IdbI18nStore("storybook-i18n-store"); // isolate the store from the app

      const h = html`<ssk-theme-provider>
        <ssk-i18n-provider .store=${globalThis.__SSK_I18N_STORE__}>
          ${story()}
        </ssk-i18n-provider>
      </ssk-theme-provider>`;

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
