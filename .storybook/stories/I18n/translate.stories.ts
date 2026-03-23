import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/contexts/i18n";
import "../../../src/elements/i18n/translate";
import { Translate } from "../../../src/elements/i18n/translate";

type TranslateArgs = {} & Translate;

const meta = {
  title: "Components/Utility/i18n/Translate",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <ssk-i18n-translate ${spread(args)} />`;
  },
  argTypes: {
    key: {
      control: {
        type: "text",
      },
    },
    lang: {
      options: [
        "en",
        "fr",
        "es",
        "de",
        "it",
        "pt",
        "ru",
        "zh",
        "ja",
        "ko",
        "th",
        "xxx",
      ],
      control: {
        type: "select",
      },
    },
    fallbackLang: {
      options: [
        "en",
        "fr",
        "es",
        "de",
        "it",
        "pt",
        "ru",
        "zh",
        "ja",
        "ko",
        "th",
      ],
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<TranslateArgs>;

export default meta;

type Story = StoryObj<TranslateArgs>;

export const Default: Story = {
  args: {
    key: "hello",
    lang: "en",
  },
  parameters: {},
};
