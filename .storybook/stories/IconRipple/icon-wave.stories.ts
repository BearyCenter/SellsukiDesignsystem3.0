import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/misc-icon";
import { MiscIcon } from "../../../src/components/misc-icon";
import { Icon } from "../../../src/elements/icon";
import { baseArgsTypes } from "../helper";
import "../../../src/components/wave-icon";
import "../../../src/elements/text";

type IconArgs = {} & MiscIcon;

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
    ...baseArgsTypes,
  },
} satisfies Meta<IconArgs>;

export default meta;

type Story = StoryObj<IconArgs>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    iconName: "outline-academic-cap",
    themeColor: "primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=22197-9512&p=f&t=bXnjsEpjLmaORk1E-0",
    },
  },
};
