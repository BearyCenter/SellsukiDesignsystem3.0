import { spread } from "@open-wc/lit-helpers";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/client-api";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { Dropdown } from "../../../src/components/dropdown";
import "../../../src/main";
import { AutoLitProperty, baseArgsTypes } from "../helper";
import "../../../src/elements/checkbox";

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
    const [{ }, updateArgs] = useArgs();

    return html` <style lang="css">
        .container {
          display: grid;
          place-items: center;
          width: 200dvw;
          height: 200dvh;
        }

        .note {
          background-color: red;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          font-size: 2rem;
        }
        .option-row {
          display: flex;
          align-items: center;
          cursor: pointer;
          gap: 0.2rem;
        }
      
        ssk-dropdown-option {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .lables {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
        }
      </style>

      <div class="note">
        Dropdown On the bottom-right of the screen use scrollbar for demo auto
        container options position
      </div>
      <div class="container">
        <ssk-dropdown
          ${spread({ ...args })}
          @change=${(e: any) => {
        action("@change")(e);
        updateArgs({ value: e.target.value });
      }}
        >
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview value=${ifDefined(args["multiSelect"]
        ? Array.isArray(args["value"]) && args["value"].length > 0
          ? args["value"].join(", ")
          : args["placeholder"]
        : args["value"] || args["placeholder"])}>
              ${args["multiSelect"]
        ? html`
                    ${Array.isArray(args["value"]) && args["value"].length > 0
            ? args["value"].join(", ")
            : args["placeholder"]}
                  `
        : html`
                    <ssk-icon
                      slot="prefix"
                      name=${args["value"] || ""}
                    ></ssk-icon>
                    ${args["value"] || args["placeholder"]}
                  `}
            </ssk-dropdown-preview>
          </ssk-dropdown-button>
          ${options.map((option) => {
          const selectedValues = Array.isArray(args.value) ? args.value : [];
          return html`
            <ssk-dropdown-option value=${option}>
              <div class="option-row">
              ${args.multiSelect
              ? html`
                    <ssk-checkbox
                      .checked="${selectedValues.includes(option)}"
                      @click="${(e: MouseEvent) => {
                  e.stopPropagation();
                  const newSelectedValues = selectedValues.includes(option)
                    ? selectedValues.filter((v: string) => v !== option)
                    : [...selectedValues, option];
                  updateArgs({ value: newSelectedValues });
                }}"
                    ></ssk-checkbox>`
              : nothing}
                  <ssk-icon name=${option} slot="prefix"></ssk-icon>
                  <div class="lables">
                    ${option}
                  </div>
                </div>
              </ssk-dropdown-option>`;
        })}
        </ssk-dropdown>
      </div>`;
  },
  argTypes: {
    maxOptionsHeight: {
      control: {
        type: "range",
        min: 0,
        max: 1000,
      },
    },
    optionsAnchor: {
      control: {
        type: "select",
      },
      options: ["top", "bottom"],
    },
    optionsAlign: {
      control: {
        type: "select",
      },
      options: ["left", "right"],
    },
    optionsWidth: {
      control: {
        type: "select",
      },
      options: ["auto", "full"],
    },
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
    "?multiSelect": {
      control: {
        type: "boolean",
      },
    },
    "?clearValue": {
      control: {
        type: "boolean",
      },
    },
    "?allowUnselect": {
      control: {
        type: "boolean",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<DropdownWithLabel>;

export default meta;

type Story = StoryObj<DropdownWithLabel>;

export const AutoDirection: Story = {
  args: {
    size: "md",
    label: "Dropdown",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: "",
    width: "220px",
    optionsWidth: "auto",
    maxOptionsHeight: 200,
    optionsAnchor: "bottom",
    optionsAlign: "left",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};

export const DropdownSelect: Story = {
  args: {
    size: "md",
    label: "Dropdown Select",
    placeholder: "Placeholder",
    helperText: "Helper text",
    value: [],
    multiSelect: true,
    clearValue: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
    },
  },
};

export const DropdownSingle: Story = {
  render: ({ ...args }) => {
    const [{ }, updateArgs] = useArgs();




    return html`
      <div class="container">
        <ssk-dropdown
          ${spread({ ...args })}
          @change=${(e: any) => {
        updateArgs({ value: e.detail });
      }}
        >
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview
              value=${ifDefined(args["value"] || args["placeholder"])}
            >
              <ssk-icon slot="prefix" name=${args["value"] || ""}></ssk-icon>
              ${args["value"] || args["placeholder"]}
            </ssk-dropdown-preview>
          </ssk-dropdown-button>

          ${options.map(
        (option) => html`
              <ssk-dropdown-option value=${option}>
                <ssk-icon name=${option} slot="prefix"></ssk-icon>
                <div class="lables">${option}</div>
              </ssk-dropdown-option>
            `
      )}
        </ssk-dropdown>
      </div>
    `;
  },
  args: {
    size: "md",
    label: "Dropdown Select Single",
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

export const DropdownMulti: Story = {
  render: ({ ...args }) => {
    const [{ }, updateArgs] = useArgs();

    const selectedValues = Array.isArray(args.value) ? args.value : [];

    const label =
      selectedValues.length > 0
        ? selectedValues.join(", ")
        : args.placeholder;

    return html`
      <div class="container">
        <ssk-dropdown
           ${spread({ ...args })}
          @change=${(e: any) => {
        updateArgs({ value: e.detail });
      }}
        >
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview value=${label}>
              ${label}
            </ssk-dropdown-preview>
          </ssk-dropdown-button>

          ${options.map((option) => html`
            <ssk-dropdown-option value=${option} >
              <ssk-icon name=${option} slot="prefix"></ssk-icon>
              <div class="lables">${option}</div>
            </ssk-dropdown-option>
          `)}
        </ssk-dropdown>
      </div>
    `;
  },
  args: {
    size: "md",
    label: "Dropdown Select Multi",
    placeholder: "Placeholder",
    helperText: "Helper text",
    multiSelect: true,
    value: [],
  },
};
