import { spread } from "@open-wc/lit-helpers";
import "../../../src/elements/icon";
import { CountryIcon } from "../../../src/elements/icon";
import { addPrefixToObject, baseArgsTypes, genericEvents } from "../helper";
import { html } from "lit";
import { Meta, StoryObj } from "@storybook/web-components";

type CountryIconArgs = addPrefixToObject<Omit<CountryIcon, "name">, "@">;

const meta = {
  title: "Example/Icon/CountryIcon",
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
        ${Object.keys(CountryIcon.svgs).map(
          (name) =>
            html`<div class="icon-container">
              <ssk-country-icon ${spread(args)} name=${name}></ssk-country-icon>
              <div class="icon-name">${name}</div>
            </div>`,
        )}
      </main>`;
  },
  argTypes: {
    "@click": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<CountryIconArgs>;

export default meta;

type Story = StoryObj<CountryIconArgs>;

export const All: Story = {
  args: {
    size: "3xl",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-27051&p=f&t=ZaidhcmyVhl1hW1b-0",
    },
  },
};
