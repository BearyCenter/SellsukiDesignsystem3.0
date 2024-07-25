import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/calendar";
import { Calendar } from "../../../src/components/calendar";
import { AutoLitProperty, baseArgsTypes } from "../helper";
import { format } from "date-fns";
type CalendarArgs = AutoLitProperty<Calendar>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Calendar",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-calendar ${spread(args)}>
      <ssk-button
        slot="footer-today"
        size=${args.size}
        variant="ghost"
        themeColor=${args.themeColor}
      >
        ตอนนี้
      </ssk-button>
      <ssk-button
        slot="footer-ok"
        size=${args.size}
        themeColor=${args.themeColor}
      >
        ตกลง
      </ssk-button>
    </ssk-calendar>`;
  },
  argTypes: {
    year: {
      description: "Year on title calendar",
      control: "text",
      table: {
        category: "Props",
      },
    },
    month: {
      description: "Month on title calendar",
      control: "text",
      table: {
        category: "Props",
      },
    },
    "?enableYearChange": {
      description: "When true gives the calendar can change year",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "?enableMonthChange": {
      description: "When true gives the calendar can change month",
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
      description: "When true gives the calendar will show go-today section",
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
      description: "When true gives the calendar will show ok section",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    ".yearsList": {
      description: "Array of year items",
      control: {
        type: "array",
      },
      defaultValue: [1997, 1998, 1999, 2000],
    },
    ...baseArgsTypes,
  },
} satisfies Meta<CalendarArgs>;

export default meta;

type Story = StoryObj<CalendarArgs>;

export const BasicCalendar: Story = {
  args: {
    year: "2024",
    month: "01",
    size: "md",
    themeColor: "primary",
    "?enableYearChange": true,
    "?enableMonthChange": true,
    "?displayGoToday": true,
    "?displayOk": true,
    ".yearsList": [1997, 1998, 1999, 2000],
    min: parseInt(format("02/01/2024", "t"), 10),
    max: parseInt(format("06/01/2024", "t"), 10),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};
