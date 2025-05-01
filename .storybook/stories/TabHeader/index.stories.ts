import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/badge";
import "../../../src/elements/tab-header";
import { TabHeader } from "../../../src/elements/tab-header";
import "../../../src/elements/text";
import { AutoLitProperty } from "../helper";

type ButtonArgs = {
  buttonWidth: string;
};

type TabsArgs = AutoLitProperty<TabHeader & ButtonArgs>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/TabHeader",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-tab-header ${spread({ ...args })}>
        <ssk-tab-button
          active
          ${spread({ ...args })}
          width="${args.buttonWidth}"
        >
          content 1
          <ssk-badge variant="subtle" size="sm"> 2 </ssk-badge>
        </ssk-tab-button>
        <ssk-tab-button ${spread({ ...args })} width="${args.buttonWidth}">
          content 2
        </ssk-tab-button>
        <ssk-tab-button ${spread({ ...args })} width="${args.buttonWidth}">
          content 3
        </ssk-tab-button>
      </ssk-tab-header>
    `;
  },

  argTypes: {
    variant: {
      options: ["inline", "button"],
      description: "The type of tabs",
      control: {
        type: "inline-radio",
      },
    },
    size: {
      options: ["sm", "md"],
      description: "The size of tabs",
      control: "select",
    },
    align: {
      options: ["left", "center", "right"],
      description: "The alignment of tabs",
      control: "select",
    },
    color: {
      description: "The color of tabs",
    },
    buttonWidth: {
      description: "Width of tabs",
      table: {
        category: "Button props",
        priority: 0,
      },
    },
  },
} satisfies Meta<TabsArgs>;

export default meta;

type Story = StoryObj<TabsArgs>;

export const Default: Story = {
  args: {
    variant: "button",
    size: "md",
    align: "left",
    color: "primary",
    buttonWidth: "auto",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2260-34872&mode=design&t=7zLQqFkUWnN3q4pJ-0",
    },
  },
};
