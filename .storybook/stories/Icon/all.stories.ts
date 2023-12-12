import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import { Icon } from "../../../src/elements/icon";
import { baseArgsTypes, genericEvents } from "../helper";

type IconArgs = Omit<Icon, "name">;

const meta = {
  title: "Example/Icon",
  tags: [],
  render: ({ ...args }) => {
    return html` <style>
        main {
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
      </style>
      <main>
        ${Object.keys(Icon.svgs).map(
          (name) => html`<ssk-icon ${spread(args)} name=${name} />`,
        )}
      </main>`;
  },
  argTypes: {
    "@click": genericEvents["@click"],
    "?spin": {
      description: "When true gives the icon a spinner apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<IconArgs>;

export default meta;

type Story = StoryObj<IconArgs>;

export const All: Story = {
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2012-9914",
    },
  },
};
