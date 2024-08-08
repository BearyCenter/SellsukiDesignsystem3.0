import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/time";
import { Time } from "../../../src/components/time";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type TimeWithArgs = AutoLitProperty<Time>;

const meta = {
  title: "Example/Time",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<style>
        .time-container {
          background-color: white;
          border: 1px solid var(--ssk-colors-gray-200);
          border-radius: 4px;
          width: 217px;
          overflow: hidden;
        }
      </style>
      <div class="time-container">
        <ssk-time ${spread(args)}></ssk-time>
      </div>`;
  },
  argTypes: {
    selectedHour: {
      description: "Selected hour",
      control: "number",
      table: {
        category: "Props",
        defaultValue: {
          summary: new Date().getHours(),
        },
      },
    },
    selectedMinute: {
      description: "Selected minute",
      control: "number",
      table: {
        category: "Props",
        defaultValue: {
          summary: new Date().getMinutes(),
        },
      },
    },
    selectedSecond: {
      description: "Selected second",
      control: "number",
      table: {
        category: "Props",
        defaultValue: {
          summary: new Date().getSeconds(),
        },
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<TimeWithArgs>;

export default meta;

type Story = StoryObj<TimeWithArgs>;

export const DefaultTime: Story = {
  args: {
    selectedHour: new Date().getHours(),
    selectedMinute: new Date().getMinutes(),
    selectedSecond: new Date().getSeconds(),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
