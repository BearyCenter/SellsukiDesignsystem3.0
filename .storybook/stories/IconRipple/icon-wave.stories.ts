import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/misc-icon";
import { Icon } from "../../../src/elements/icon";
import {
  AutoLitProperty,
  baseArgsTypes,
  colors,
  customColors,
} from "../helper";
import "../../../src/components/wave-icon";
import type { WaveIcon } from "../../../src/components/wave-icon";
import "../../../src/elements/text";

type IconArgs = AutoLitProperty<WaveIcon> & { label: string; subLabel: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Misc Icon/Wave Icon",
  tags: ["autodocs"],
  render: ({ label, subLabel, ...args }) => {
    return html` <style>
        .message {
          text-align: center;
        }
      </style>

      <ssk-wave-icon ${spread(args)}>
        <div class="message">
          <ssk-text size="xl" color="gray.800"> ${label} </ssk-text>
          <ssk-text color="gray.500"> ${subLabel} </ssk-text>
        </div>
      </ssk-wave-icon>`;
  },
  argTypes: {
    label: {
      description: "The main label text",
      control: "text",
      table: { category: "Props" },
    },
    subLabel: {
      description: "The sub label text",
      control: "text",
      table: { category: "Props" },
    },
    iconName: {
      description: "The icon's name",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "string",
        },
      },
      options: Object.keys(Icon.svgs),
      control: {
        type: "select",
      },
    },
    size: {
      description: "Wave icon size (icon + ripple)",
      table: {
        category: "Props",
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
      },
      options: ["sm", "md", "lg", "xl"],
      control: { type: "inline-radio" },
    },
    iconColor: {
      options: [...colors, ...customColors],
      description: "Color of inner icon (falls back to themeColor)",
      control: "select",
      table: {
        category: "Base props",
      },
    },
    waveColor: {
      options: [...colors, ...customColors],
      description: "Color of ripple circles (falls back to themeColor)",
      control: "select",
      table: {
        category: "Base props",
      },
    },
    themeColor: baseArgsTypes.themeColor,
    "?hidden": baseArgsTypes["?hidden"],
  },
} satisfies Meta<IconArgs>;

export default meta;

type Story = StoryObj<IconArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    label: "Main Label",
    subLabel: "Sub Label",
    iconName: "outline-academic-cap",
    themeColor: "primary",
    size: "xl",
    iconColor: "",
    waveColor: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=22197-9512&p=f&t=bXnjsEpjLmaORk1E-0",
    },
  },
};
