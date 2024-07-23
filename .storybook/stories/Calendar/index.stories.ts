import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/calendar";
import { Calendar } from "../../../src/elements/calendar";
import { baseArgsTypes } from "../helper";
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
  },
};
