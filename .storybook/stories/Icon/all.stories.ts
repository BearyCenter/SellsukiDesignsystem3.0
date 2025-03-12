import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import { Icon } from "../../../src/elements/icon";
import { addPrefixToObject, baseArgsTypes, genericEvents } from "../helper";

type IconArgs = addPrefixToObject<Omit<Icon, "name">, "@">;

const meta = {
  title: "Example/Icon",
  tags: [],
  render: ({ ...args }) => {
    return html`<style>
        main {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          justify-content: space-between;
          gap: 1em;
        }

        .icon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          padding: 0.5em;
          border-radius: 8px;
          transition: transform 0.1s ease-in-out;
          background-color: #fff;
        }

        .icon-container:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .icon-name {
          margin-top: 0.5em;
          font-size: 0.8em;
          text-align: center;
          color: #333;
        }
      </style>
      <main>
        ${Object.keys(Icon.svgs).map(
          (name) =>
            html`<div class="icon-container">
              <ssk-icon ${spread(args)} name=${name}></ssk-icon>
              <div class="icon-name">${name}</div>
            </div>`,
        )}
      </main>`;
  },
  argTypes: {
    "@click": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<IconArgs>;

export default meta;

type Story = StoryObj<IconArgs>;

export const All: Story = {
  args: {
    size: "3xl",
    color: "#333",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2012-9914",
    },
  },
};
