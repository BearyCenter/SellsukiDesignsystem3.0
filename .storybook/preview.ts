import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../main";
import { IdbI18nStore } from "../src/contexts/i18n/idb";
import { ToastStore } from "../src/contexts/toast";
import { InMemoryToastStore } from "../src/contexts/toast/in-memory";

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
          body.sb-main-padded.sb-show-main {
            /* margin: 0;
            padding: 0; */
            background: repeating-conic-gradient(
                #d3d3d3 0% 25%,
                transparent 0% 50%
              )
              50% / 20px 20px;
          }

          #main-container {
            min-height: 100dvh;
          }
        </style>

        <ssk-provider
          .i18nStore=${globalThis.__SSK_I18N_STORE__}
          .toastStore=${window.__SSK_TOAST_STORE__}
          i18nDefaultLang="en"
        >
          <div id="main-container">${story()}</div>
        </ssk-provider>`;

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
