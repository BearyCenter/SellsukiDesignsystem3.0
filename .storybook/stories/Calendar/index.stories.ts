import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/calendar";
import { Calendar } from "../../../src/components/calendar";
import {
  addPrefixToObject,
  AutoLitProperty,
  baseArgsTypes,
  genericEvents,
} from "../helper";
import { getMonth, getYear, startOfDay } from "date-fns";
type CalendarArgs = AutoLitProperty<Calendar>;
type CalendarEventArgs = addPrefixToObject<Omit<CalendarArgs, "name">, "@">;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Calendar",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-calendar ${spread(args)}> </ssk-calendar>`;
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
    ".singleDate": {
      description: "When true gives the calendar cannot selected range date",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: true },
        type: { summary: "boolean" },
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
    "?disableYearChange": {
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
    "?disableMonthChange": {
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
      defaultValue: [],
    },
    "@date-from-changed": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<CalendarEventArgs>;

export default meta;

type Story = StoryObj<CalendarEventArgs>;
const today = startOfDay(new Date());
const year = getYear(today).toString();
const month = (getMonth(today) + 1).toString().padStart(2, "0");

export const BasicCalendar: Story = {
  args: {
    year: year,
    month: month,
    size: "md",
    themeColor: "primary",
    locale: "th",
    footerStyle: "right",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const RangeCalendar: Story = {
  args: {
    year: year,
    month: month,
    size: "md",
    themeColor: "primary",
    locale: "th",
    ".singleDate": false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const DisableYearChange: Story = {
  args: {
    size: "md",
    year: year,
    month: month,
    themeColor: "primary",
    "?disableYearChange": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const DisableMonthChange: Story = {
  args: {
    size: "md",
    year: year,
    month: month,
    themeColor: "primary",
    "?disableMonthChange": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const ShowTodayAndOkCalendar: Story = {
  args: {
    year: year,
    month: "04",
    size: "md",
    themeColor: "primary",
    "?displayGoToday": true, // will show if not current month / year
    "?displayOk": true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const DeclareYearsListCalendar: Story = {
  args: {
    size: "md",
    themeColor: "primary",
    ".yearsList": [2010, 2011, 2012, 2013, 2014, 2015, 2016],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
};

export const DisableScopeDays: Story = {
  args: {
    size: "md",
    year: year,
    month: month,
    themeColor: "primary",
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

export const CustomFooterCalendar: Story = {
  args: {
    size: "md",
    year: year,
    month: month,
    themeColor: "primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15147-13519&t=NW0y9ffIfYaozZ0D-0",
    },
  },
  render: ({ ...args }) => {
    return html`<ssk-calendar ${spread(args)}>
      <div slot="footer">
        <ssk-button @click=${() => console.log("click now")}>ตอนนี้</ssk-button>
        <ssk-button @click=${() => console.log("click ok")}>ตกลง</ssk-button>
      </div>
    </ssk-calendar>`;
  },
};
