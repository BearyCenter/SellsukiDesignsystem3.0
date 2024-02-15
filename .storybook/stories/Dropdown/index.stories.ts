import { spread } from "@open-wc/lit-helpers";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../src/components/dropdown";
import { Dropdown } from "../../../src/components/dropdown";
import "../../../src/elements/icon";
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
  title: "Example/Dropdown",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    const [{}, updateArgs] = useArgs();

    return html`<ssk-dropdown
      ${spread({ ...args })}
      @change=${(e: any) => {
        action("@change")(e);
        updateArgs({ value: e.target.value });
      }}
    >
      <ssk-dropdown-button slot="selected">
        <ssk-dropdown-preview value=${ifDefined(args["value"])}>
          <ssk-icon slot="prefix" name=${ifDefined(args["value"])}></ssk-icon>
          ${args["value"] || args["placeholder"]}
        </ssk-dropdown-preview>
      </ssk-dropdown-button>
      ${options.map((option) => {
        return html`<ssk-dropdown-option value=${option}>
          <ssk-icon name=${option} slot="prefix"></ssk-icon>
          ${option}
        </ssk-dropdown-option>`;
      })}
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
    "?disabled": {
      control: {
        type: "boolean",
      },
    },
    "?hidden": {
      control: {
        type: "boolean",
      },
    },
    "?required": {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<DropdownWithLabel>;

export default meta;

type Story = StoryObj<DropdownWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Medium: Story = {
  args: {
    size: "md",
    label: "Dropdown",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Dropdown",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Dropdown",
    placeholder: "Placeholder",
    helperText: "Helper text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};
