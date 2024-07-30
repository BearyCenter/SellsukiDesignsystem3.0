import { AutoLitProperty, baseArgsTypes } from "../helper";
import { DatePicker } from "../../../src/components/date-picker";
import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../../../src/components/date-picker";
import { startOfDay } from "date-fns";

type DatePickerArgs = AutoLitProperty<DatePicker>;

const meta = {
  title: "Example/DatePicker",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-date-picker ${spread(args)}>
        <ssk-button slot="today" size=${args.size} variant="ghost">
          ตอนนี้
        </ssk-button>
        <ssk-button slot="ok" size=${args.size}> ตกลง </ssk-button>
      </ssk-date-picker>
    `;
  },
  argTypes: {
    label: {
      description: "The title on date picker",
      control: "text",
      table: {
        category: "Props",
      },
    },
    ".value": {
      description: "The value on date picker",
      control: "date",
      table: {
        category: "Props",
      },
    },
    placeholder: {
      description: "The placeholder in date picker",
      control: "text",
      table: {
        category: "Props",
      },
    },
    "?noRange": {
      description: "When true gives the calendar cannot selected range date",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<DatePickerArgs>;

export default meta;
type Story = StoryObj<DatePickerArgs>;
const today = startOfDay(new Date());

export const BasicDatePicker: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".value": today,
    "?noRange": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const NoOkDatePicker: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".value": today,
    "?noRange": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
  render: ({ ...args }) => {
    return html` <ssk-date-picker ${spread(args)}>
      <ssk-button slot="today" size=${args.size} variant="ghost">
        ตอนนี้
      </ssk-button>
    </ssk-date-picker>`;
  },
};
