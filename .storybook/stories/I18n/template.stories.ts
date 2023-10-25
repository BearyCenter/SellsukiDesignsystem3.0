import { spreadProps } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/contexts/i18n";
import "../../../src/elements/i18n/template";
import { Template } from "../../../src/elements/i18n/template";

type TemplateArgs = {} & Template;

const meta = {
  title: "Example/I18n/Template",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <ssk-i18n-template ${spreadProps(args)} />`;
  },
  argTypes: {
    key: {
      control: {
        type: "text",
      },
    },
    data: {
      control: {
        type: "object",
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
} satisfies Meta<TemplateArgs>;

export default meta;

type Story = StoryObj<TemplateArgs>;

export const Default: Story = {
  args: {
    key: "greeting",
    lang: "en",
    data: {
      name: "John",
      place: "Paris",
    },
  },
  parameters: {},
};
