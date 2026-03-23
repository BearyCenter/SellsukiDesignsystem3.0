import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/time";
import { Time } from "../../../src/components/time";
import {
  addPrefixToObject,
  AutoLitProperty,
  baseArgsTypes,
  genericEvents,
} from "../helper";

type TimeWithArgs = AutoLitProperty<Time>;
type TimeEventArgs = addPrefixToObject<Omit<TimeWithArgs, "name">, "@">;

const meta = {
  title: "Components/Data Display/Time",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<style>
        .time-container {
          background-color: white;
          border: 1px solid var(--ssk-colors-gray-200);
          border-radius: 4px;
          width: 217px;
        }

        ssk-time {
          --max-height: 300px;
        }
      </style>
      <div class="time-container">
        <ssk-time ${spread(args)}></ssk-time>
      </div>`;
  },
  argTypes: {
    footerStyle: {
      options: ["between", "middle", "right", "left"],
      description: "The type of footer Calendar style",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "between",
        },
        type: {
          summary: "string",
        },
      },
    },
    locale: {
      options: ["th", "en", "fr"],
      description: "The type of Time Zone",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "th",
        },
        type: {
          summary: "string",
        },
      },
    },
    format: {
      options: ["hms", "hm", "timeEvery30"],
      description: "The type of Format Time",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "hms",
        },
        type: {
          summary: "string",
        },
      },
    },
    "?displayGoNow": {
      description: "When true gives the time will show go-now section",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "?displayOk": {
      description: "When true gives the time will show ok section",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "@time-changed": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<TimeEventArgs>;

export default meta;

type Story = StoryObj<TimeEventArgs>;

export const DefaultTime: Story = {
  args: {
    locale: "th",
    format: "hms",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=854-61162&t=wSZgMRvCeLvJQ3i7-0",
    },
  },
};

export const HourMinuteFormat: Story = {
  args: {
    locale: "th",
    format: "hm",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=854-61162&t=wSZgMRvCeLvJQ3i7-0",
    },
  },
};

export const TimeEvery30Minutes: Story = {
  args: {
    locale: "en",
    format: "timeEvery30",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=854-61162&t=wSZgMRvCeLvJQ3i7-0",
    },
  },
};

export const ShowTodayAndOkDefaultFooter: Story = {
  args: {
    locale: "en",
    format: "hms",
    displayGoNow: true,
    displayOk: true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=854-61162&t=wSZgMRvCeLvJQ3i7-0",
    },
  },
};
