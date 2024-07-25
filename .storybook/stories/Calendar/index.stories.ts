import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/calendar";
import { Calendar } from "../../../src/components/calendar";
import { baseArgsTypes } from "../helper";
import { format } from "date-fns";
type CalendarArgs = {} & Calendar;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Calendar",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<ssk-calendar ${spread(args)}></ssk-calendar>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<CalendarArgs>;

export default meta;

type Story = StoryObj<CalendarArgs>;

export const BasicCalendar: Story = {
  args: {
    year: "2024",
    month: "01",
    enableYearChange: true,
    enableMonthChange: true,
    displayGoToday: true,
    min: parseInt(format("02/01/2024", "t"), 10),
    max: parseInt(format("06/01/2024", "t"), 10),
  },
};
