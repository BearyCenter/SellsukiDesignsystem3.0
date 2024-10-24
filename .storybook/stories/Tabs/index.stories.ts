import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/tabs";
import "../../../src/elements/badge";
import "../../../src/elements/text";
import { Tabs } from "../../../src/components/tabs";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type TabsWithLabel = AutoLitProperty<Tabs> & { labels: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Tabs",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-tabs ${spread({ ...args })}>
        <ssk-badge slot="badge-slot-1" variant="outline"> 2 </ssk-badge>
        <ssk-text slot="content-slot-0"> content 1 </ssk-text>
        <ssk-text slot="content-slot-1"> content 2 </ssk-text>
      </ssk-tabs>
    `;
  },

  argTypes: {
    variant: {
      options: ["inline", "button"],
      description: "The type of tabs",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "inline",
        },
        type: {
          summary: "string",
        },
      },
    },
    tabSize: {
      options: ["sm", "md"],
      description: "The size of tabs",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "md",
        },
      },
    },
    widthTab: {
      options: ["false", "true"],
      description: "The width of tab items to fullWidth",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "false",
        },
        type: {
          summary: "boolean",
        },
      },
    },
    ".labels": {
      description: "The content of the tabs",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    "@change": {
      action: "@change",
      table: {
        category: "Events props",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<TabsWithLabel>;

export default meta;

type Story = StoryObj<TabsWithLabel>;

export const Default: Story = {
  args: {
    ".labels": ["Tab items 1", "Tab items 2"],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2260-34872&mode=design&t=7zLQqFkUWnN3q4pJ-0",
    },
  },
};
