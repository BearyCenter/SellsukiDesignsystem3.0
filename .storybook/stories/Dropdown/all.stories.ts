import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../src/components/dropdown";
import { Dropdown } from "../../../src/components/dropdown";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type DropdownWithLabel = AutoLitProperty<
  Omit<Dropdown, "disabled" | "size">
> & {
  placeholder: string;
};

const size: Dropdown["size"][] = ["lg", "md", "sm"];

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

const meta = {
  title: "Example/Dropdown",
  tags: [],
  render: ({ ...args }) => {
    const [{}, updateArgs] = useArgs();
    return html`<style>
        main.showcase {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 2rem;
          flex-flow: column wrap;
        }

        section.size {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        div.row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5em;
        }
      </style>
      <main class="showcase">
        ${size.map(
          (s) => html`<section class="size">
            <label>Size: ${s}</label>
            <div class="row">
              <ssk-dropdown
                testId=${`dropdown-${s}`}
                size="${s}"
                @change=${(e: any) => {
                  action("@change")(e);
                  updateArgs({ value: e.target.value });
                }}
              >
                <ssk-dropdown-preview
                  value=${ifDefined(args["value"])}
                  slot="selected"
                >
                  <ssk-icon
                    name=${ifDefined(args["value"])}
                    slot="prefix"
                    size=${s}
                  ></ssk-icon>
                  ${args["value"] || args["placeholder"]}
                </ssk-dropdown-preview>
                ${options.map((option) => {
                  return html`<ssk-dropdown-option value=${option}>
                    <ssk-icon name=${option} slot="prefix"></ssk-icon>
                    ${option}</ssk-dropdown-option
                  >`;
                })}
              </ssk-dropdown>

              <ssk-dropdown
                testId=${`dropdown-${s}-disabled`}
                size=${s}
                disabled
                @change=${(e: any) => {
                  action("@change")(e);
                  updateArgs({ value: e.target.value });
                }}
              >
                <ssk-dropdown-preview
                  value=${ifDefined(args["value"])}
                  slot="selected"
                >
                  <ssk-icon
                    name=${ifDefined(args["value"])}
                    slot="prefix"
                    size=${s}
                  ></ssk-icon>
                  ${args["value"] || args["placeholder"]}
                </ssk-dropdown-preview>
                ${options.map((option) => {
                  return html`<ssk-dropdown-option
                    value=${option}
                    slot="prefix"
                  >
                    <ssk-icon name=${option}></ssk-icon>
                    ${option}</ssk-dropdown-option
                  >`;
                })}
              </ssk-dropdown>

              <ssk-dropdown
                testId=${`dropdown-${s}-error`}
                size=${s}
                error
                @change=${(e: any) => {
                  action("@change")(e);
                  updateArgs({ value: e.target.value });
                }}
              >
                <ssk-dropdown-preview
                  value=${ifDefined(args["value"])}
                  slot="selected"
                >
                  <ssk-icon
                    name=${ifDefined(args["value"])}
                    slot="prefix"
                    size=${s}
                  ></ssk-icon>
                  ${args["value"] || args["placeholder"]}
                </ssk-dropdown-preview>
                ${options.map((option) => {
                  return html`<ssk-dropdown-option
                    value=${option}
                    slot="prefix"
                  >
                    <ssk-icon name=${option}></ssk-icon>
                    ${option}</ssk-dropdown-option
                  >`;
                })}
              </ssk-dropdown>
            </div>
          </section>`
        )}
      </main>`;
  },
  argTypes: {
    label: {
      description: "The content of the dropdown",
      control: "text",
    },
    helperText: {
      description: "",
      control: "text",
    },
    hidden: {
      control: {
        type: "boolean",
      },
    },
    value: {
      description: "",
      control: "text",
    },
    ...baseArgsTypes,
  },
} satisfies Meta<DropdownWithLabel>;

export default meta;

type Story = StoryObj<DropdownWithLabel>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
    label: "Dropdown",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=806-59103&mode=design&t=PKQdplu46xZs3gqY-0",
    },
  },
};
