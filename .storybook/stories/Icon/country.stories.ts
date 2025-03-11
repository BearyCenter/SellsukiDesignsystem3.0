import { spread } from "@open-wc/lit-helpers";
import "../../../src/elements/icon";
import { CountryIcon } from "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";
import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

type CountryIconArgs = {} & CountryIcon;

const meta = {
  title: "Example/Icon/CountryIcon",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-country-icon ${spread(args)}></ssk-country-icon>`;
  },
  argTypes: {
    code: {
      description:
        "The country's ISO 3166-1 alpha-3 code (3-letter code). Example: 'THA' for Thailand, 'USA' for United States.",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "string",
        },
      },
      options: Object.keys(CountryIcon.svgs),
      control: {
        type: "select",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<CountryIconArgs>;

export default meta;

type Story = StoryObj<CountryIconArgs>;

export const Default: Story = {
  args: {
    code: "THA",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-27051&p=f&t=ZaidhcmyVhl1hW1b-0",
    },
  },
};
