import { spread } from "@open-wc/lit-helpers";
import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/dropdown";
import { Dropdown } from "../../../src/components/dropdown";
import "../../../src/elements/avatar";
import "../../../src/elements/divider";
import "../../../src/elements/icon";
import "../../../src/elements/text";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type DropdownWithLabel = AutoLitProperty<Dropdown> & {
  placeholder: string;
};

const options = [
  "outline-academic-cap",
  "outline-briefcase",
  "outline-ellipsis-horizontal",
  "outline-phone",
  "solid-adjustments-horizontal",
  "solid-bug-ant",
  "solid-ellipsis-vertical",
  "solid-photo",
  "outline-adjustments-vertical",
  "solid-building-library",
  "outline-envelope-open",
  "solid-play-circle",
  "solid-archive-box-arrow-down",
  "solid-building-office-2",
  "outline-envelope",
  "solid-play-pause",
  "solid-archive-box-x-mark",
  "solid-building-office",
  "outline-exclamation-circle",
  "solid-play",
  "solid-archive-box",
  "solid-building-storefront",
  "outline-exclamation-triangle",
  "solid-plus-circle",
  "outline-arrow-down-circle",
  "outline-cake",
  "outline-eye-dropper",
  "solid-plus-small",
  "outline-arrow-down-left",
  "solid-calculator",
  "outline-eye-slash",
  "solid-plus",
  "solid-arrow-down-on-square-stack",
  "outline-calendar-days",
  "outline-eye",
  "outline-point-3x3",
  "solid-arrow-down-on-square",
  "solid-calendar",
  "outline-face-frown",
  "solid-power",
  "outline-archive-box-x-mark",
  "solid-calendar",
  "outline-eye",
  "outline-point-3x3",
  "outline-arrow-down-right",
  "solid-camera",
  "outline-face-smile",
  "solid-presentation-chart-bar",
  "outline-arrow-down-tray",
  "solid-chart-bar-square",
  "solid-film",
  "solid-presentation-chart-line",
  "outline-arrow-down",
  "solid-chart-bar",
  "solid-finger-print",
  "solid-printer",
  "outline-arrow-left-circle",
  "solid-chart-pie",
  "solid-fire",
  "solid-puzzle-piece",
];

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Dropdown/Menu",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    const [{}, updateArgs] = useArgs();

    return html`<ssk-dropdown
      themeColor="primary"
      optionsWidth="auto"
      ${spread({ ...args })}
    >
      <ssk-avatar
        slot="selected"
        src="/Avatar.png"
        alt="demo avatar"
        shape="circle"
        boxsize="40px"
      ></ssk-avatar>
      Account
      <ssk-dropdown-option>
        <ssk-icon slot="prefix" size="sm" name="outline-envelope"></ssk-icon>
        <ssk-text size="sm">{userProfile?.data?.email}</ssk-text>
      </ssk-dropdown-option>
      <ssk-divider size="xs"></ssk-divider>
      <ssk-dropdown-option>
        <ssk-icon
          slot="prefix"
          size="sm"
          name="solid-arrow-right-on-rectangle"
        ></ssk-icon>
        <ssk-text size="sm">Sign out</ssk-text>
        <ssk-icon slot="postfix" size="sm" name="solid-arrow-right"></ssk-icon>
      </ssk-dropdown-option>
    </ssk-dropdown>`;
  },
  argTypes: {
    ...baseArgsTypes,
    value: {
      description: "The value of the dropdown",
      control: {
        type: "select",
      },
      options: options,
    },
    label: {
      description: "The content of the dropdown",
      control: "text",
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    hidden: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<DropdownWithLabel>;

export default meta;

type Story = StoryObj<DropdownWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Menu: Story = {
  args: {
    size: "md",
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};
