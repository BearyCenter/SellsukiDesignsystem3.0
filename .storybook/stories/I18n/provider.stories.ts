import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { until } from "lit/directives/until.js";
import "../../../src/contexts/i18n";
import "../../../src/elements/button";
import "../../../src/elements/i18n/translate";

const meta = {
  title: "Components/Utility/i18n/Provider",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<style>
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80dvh;
          width: 100%;
          gap: 1rem;
          padding: 0;
          margin: 0;
        }

        .actions {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        textarea {
          width: 100%;
          height: 100%;
        }
      </style>
      <main>
        <textarea
          id="store"
          rows="10"
          .value=${until(
            window.__SSK_I18N_STORE__
              .getAll()
              .then((s) => JSON.stringify(s, null, 2))
          )}
        ></textarea>
        <div class="actions">
          <ssk-button
            size="sm"
            themeColor="success"
            @click=${async () => {
              await window.__SSK_I18N_STORE__.bulkSet({
                hello: {
                  en: "Hello",
                  fr: "Bonjour",
                  es: "Hola",
                  de: "Hallo",
                  it: "Ciao",
                  pt: "Olá",
                  ru: "Привет",
                  zh: "你好",
                  ja: "こんにちは",
                  ko: "안녕하세요",
                  th: "สวัสดี",
                },
                greeting: {
                  en: "Hello, {{name}} welcome to {{place}}",
                  fr: "Bonjour, {{name}} bienvenue à {{place}}",
                  es: "Hola, {{name}} bienvenido a {{place}}",
                  de: "Hallo, {{name}} willkommen in {{place}}",
                  it: "Ciao, {{name}} benvenuto a {{place}}",
                  pt: "Olá, {{name}} bem-vindo a {{place}}",
                  ru: "Привет, {{name}} добро пожаловать в {{place}}",
                  zh: "你好，{{name}} 欢迎来到 {{place}}",
                  ja: "こんにちは、{{name}} {{place}}へようこそ",
                  ko: "안녕하세요, {{name}} {{place}}에 오신 것을 환영합니다",
                  th: "สวัสดี {{name}} ยินดีต้อนรับสู่ {{place}}",
                },
              });
              location.reload();
            }}
          >
            Load sample
          </ssk-button>
          <ssk-button
            size="sm"
            themeColor="primary"
            @click=${async () => {
              try {
                const t = document.getElementById(
                  "store"
                ) as HTMLTextAreaElement;
                await window.__SSK_I18N_STORE__.bulkSet(JSON.parse(t.value));
                location.reload();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Save
          </ssk-button>
          <ssk-button
            size="sm"
            themeColor="danger"
            @click=${async () => {
              await window.__SSK_I18N_STORE__.clear();
              location.reload();
            }}
          >
            Clear
          </ssk-button>
        </div>
        <div class="preview">
          <ssk-i18n-translate key="hello"></ssk-i18n-translate>
          <ssk-i18n-template
            key="greeting"
            .data=${{ name: "John", place: "Paris" }}
          ></ssk-i18n-template>
        </div>
      </main>`;
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {},
  parameters: {},
};
