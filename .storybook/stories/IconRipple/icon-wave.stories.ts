import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/misc-icon";
import { Icon } from "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";
import "../../../src/components/wave-icon";
import type { WaveIcon } from "../../../src/components/wave-icon";
import "../../../src/elements/text";
import { ColorName, ColorRole } from "../../../src/types/theme";

type IconArgs = {} & WaveIcon;

const customColors: (string | undefined)[] = [
  "primary.500",
  "primary.300",
  "primary.700",
  "secondary.500",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ff00ff",
  "#00ffff",
  "#ffff00",
  "#000000",
  "#ffffff",
  "rgb(1,12,123)",
  "rgba(0,0,0,0.5)",
  "rgba(1,255,33,0.5)",
  "hsl(0, 100%, 50%)",
  "hsla(0, 100%, 50%, 0.5)",
  "hwb(0, 0%, 0%)",
  "hwb(0, 0%, 0%, 0.5)",
  undefined,
];

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Misc Icon/Wave Icon",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <style>
        .message {
          text-align: center;
        }
      </style>

      <ssk-wave-icon ${spread(args)}>
        <div class="message">
          <ssk-text size="xl" color="gray.800">
            Slot for custom text in Wave Icon
          </ssk-text>
          <ssk-text color="gray.500">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </ssk-text>
        </div>
      </ssk-wave-icon>`;
  },
  argTypes: {
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
      options: [...customColors],
      description: "Color of inner icon (falls back to themeColor)",
      control: "select",
      table: {
        category: "Base props",
      },
    },
    waveColor: {
      options: [...customColors],
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
