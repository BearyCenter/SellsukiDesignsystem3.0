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
    "?rangeDate": {
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
    "?showTime": {
      description: "When true gives the calendar will show time",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    timeFormat: {
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
    locale: {
      options: ["en", "fr", "th"],
      description: "The type of Calendar language",
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
    alignCalendar: {
      options: ["left", "right"],
      description:
        "Determines the alignment of the calendar within the date picker.",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "left",
        },
        type: {
          summary: "string",
        },
      },
    },
    widthCalendar: {
      description:
        "Specifies the width of the calendar component. Can be set to any valid CSS width value (e.g., '100%', '300px', or 'fit-content').",
      control: {
        type: "text",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "fit-content",
        },
        type: {
          summary: "string",
        },
      },
    },
    "@change": genericEvents["@change"],
    ...baseArgsTypes,
  },
} satisfies Meta<DatePickerEventArgs>;

export default meta;
type Story = StoryObj<DatePickerEventArgs>;
const today = startOfDay(new Date("2024-01-01T00:00:00"));

export const BasicDatePicker: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".value": today,
    "?rangeDate": false,
    locale: "th",
    alignCalendar: "left",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const DatePickerDefaultFooter: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    "?displayGoToday": true,
    "?displayOk": true,
    ".value": today,
    "?rangeDate": false,
    locale: "th",
    alignCalendar: "left",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const DateTimePicker: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy HH:mm:ss",
    showTime: true,
    timeFormat: "hms",
    ".value": today,
    "?rangeDate": false,
    locale: "th",
    alignCalendar: "left",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const DateTimePickerDefaultFooter: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy HH:mm:ss",
    showTime: true,
    timeFormat: "hms",
    "?displayGoToday": true,
    "?displayOk": true,
    ".value": today,
    "?rangeDate": false,
    locale: "th",
    alignCalendar: "left",
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
    "?rangeDate": false,
    locale: "th",
    alignCalendar: "left",
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

export const DatePickerDisableScopeDays: Story = {
  args: {
    label: "Select date",
    placeholder: "Select date",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".value": today,
    "?rangeDate": false,
    locale: "th",
    alignCalendar: "left",
    ".disabledDate": (date: number) => {
      const dayOfWeek = startOfDay(date).getDay();
      return dayOfWeek === 0 || dayOfWeek === 6; // Sunday and Saturday
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const RangeDatePicker: Story = {
  args: {
    label: "Select date",
    placeholderFrom: "Select date from",
    placeholderTo: "Select date to",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".valueFrom": today,
    ".valueTo": addDays(today, 32),
    "?rangeDate": true,
    locale: "th",
    alignCalendar: "left",
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

export const RangeDateTimePicker: Story = {
  args: {
    label: "Select date",
    placeholderFrom: "Select date from",
    placeholderTo: "Select date to",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy HH:mm:ss",
    ".valueFrom": today,
    ".valueTo": addDays(today, 32),
    "?showTime": true,
    "?rangeDate": true,
    timeFormat: "hms",
    locale: "th",
    alignCalendar: "left",
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

export const RangeDateTimePickerDefaultFooter: Story = {
  args: {
    label: "Select date",
    placeholderFrom: "Select date from",
    placeholderTo: "Select date to",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy HH:mm:ss",
    ".valueFrom": today,
    ".valueTo": addDays(today, 32),
    "?showTime": true,
    "?rangeDate": true,
    "?displayGoToday": true,
    "?displayOk": true,
    timeFormat: "hms",
    locale: "th",
    alignCalendar: "left",
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

export const RangeDatePickerDisableScopeDays: Story = {
  args: {
    label: "Select date",
    placeholderFrom: "Select date from",
    placeholderTo: "Select date to",
    helperText: "Wrong format",
    size: "md",
    format: "dd-MM-yyyy",
    ".valueFrom": today,
    ".valueTo": addDays(today, 32),
    "?rangeDate": true,
    locale: "th",
    alignCalendar: "left",
    ".disabledDate": (date: number) => {
      const dayOfWeek = startOfDay(date).getDay();
      return dayOfWeek === 0 || dayOfWeek === 6; // Sunday and Saturday
    },
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
