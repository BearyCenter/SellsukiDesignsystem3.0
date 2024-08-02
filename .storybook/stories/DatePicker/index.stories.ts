import {
  addPrefixToObject,
  AutoLitProperty,
  baseArgsTypes,
  genericEvents,
} from "../helper";
import {
  DatePicker,
  RangeDatePicker as RDatePicker,
} from "../../../src/components/date-picker";
import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../../../src/components/date-picker";
import { addDays, startOfDay } from "date-fns";

type DatePickerArgs = AutoLitProperty<DatePicker> &
  AutoLitProperty<RDatePicker>;
type DatePickerEventArgs = addPrefixToObject<Omit<DatePickerArgs, "name">, "@">;

const meta = {
  title: "Example/DatePicker",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html` <ssk-date-picker ${spread(args)}> </ssk-date-picker> `;
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
    "?singleDate": {
      description: "When true gives the calendar can selected single date",
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
      description: "When true gives the footer calendar will show ok button",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "?displayGoToday": {
      description:
        "When true gives the footer calendar will show go-today button",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "@change": genericEvents["@change"],
    ...baseArgsTypes,
  },
} satisfies Meta<DatePickerEventArgs>;

export default meta;
type Story = StoryObj<DatePickerEventArgs>;
const today = startOfDay(new Date());

export const BasicDatePicker: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    "?displayGoToday": true,
    "?displayOk": true,
    ".value": today,
    "?singleDate": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const CustomFooterDatePicker: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".value": today,
    "?singleDate": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
  render: ({ ...args }) => {
    return html` <ssk-date-picker ${spread(args)}>
      <div slot="footer">
        <ssk-button
          size=${args.size}
          variant="ghost"
          @click=${() => console.log("click")}
        >
          คลิกเลย จะมี log
        </ssk-button>
      </div>
    </ssk-date-picker>`;
  },
};

export const RangeDatePicker: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".valueFrom": today,
    ".valueTo": addDays(today, 32),
    "?singleDate": false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
  render: ({ ...args }) => {
    return html` <ssk-range-date-picker ${spread(
      args,
    )}></ssk-range-date-picker`;
  },
};
