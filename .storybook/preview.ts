import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/contexts/i18n";
import { IdbI18nStore } from "../src/contexts/i18n/idb";
import "../src/contexts/theme";
import "../src/contexts/toast";
import { ToastStore } from "../src/contexts/toast";
import { InMemoryToastStore } from "../src/contexts/toast/in-memory";
// import '../src/components/grid-container/gs/gridstack.css';
window.__SSK_I18N_STORE__ = new IdbI18nStore("storybook-i18n-store"); // isolate the store from the app
window.__SSK_TOAST_STORE__ = new InMemoryToastStore();

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

      const h = html`<style>
          #main-container {
            min-height: 100%;
          }
        </style>

        <ssk-theme-provider>
          <ssk-i18n-provider .store=${globalThis.__SSK_I18N_STORE__} lang="th">
            <ssk-toast-provider .toast=${window.__SSK_TOAST_STORE__}>
              <div id="main-container">${story()}</div>
            </ssk-toast-provider>
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
    __SSK_TOAST_STORE__: ToastStore;
  }
}

export default preview;
