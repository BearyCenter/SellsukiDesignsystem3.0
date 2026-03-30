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
  disabledOptions: Record<string, string>;
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

const testOptions2 = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
  "item7",
  "item8longtextxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxt",
  "item9",
];

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Form & Input/Dropdown",
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
      options: ["top", "bottom","right","left"],
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
    disabledOptions: {
      description: "Options that are disabled",
      control: {
        type: "object",
      },
      },
      hideCheckIcon: {
        description: "Whether to hide the check icon",
        control: {
          type: "boolean",
        },
      },
      hideErrorIcon: {
        description: "Whether to hide the error icon",
        control: {
          type: "boolean",
        },
      },
      hideSuccessIcon: {
        description: "Whether to hide the success icon",
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

    const disabledOption: Record<string, string> = args["disabledOptions"] ?? {};

    const selectedValue = typeof args["value"] === "string" ? args["value"] : "";
    const disabledError = selectedValue.length > 0 && selectedValue in disabledOption;

    const displayLabel = selectedValue?.length
      ? selectedValue in disabledOption
        ? `${selectedValue} ${disabledOption[selectedValue]}`
        : selectedValue
      : args["placeholder"];

    return html`
    <style>
      .label {
        word-break: break-all;
        
      }
      ssk-dropdown-option[disabled] .label {
        opacity: 0.4;
      }
    </style>
      <div class="container">
        <ssk-dropdown
          ${spread({ ...args })}
          @change=${(e: any) => {
        updateArgs({ value: e.detail });
      }}
        ?error=${disabledError}
        >
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview
              value=${ifDefined(displayLabel)}
              ?disabled=${(selectedValue ?? "") in disabledOption}
            >
              <ssk-icon slot="prefix" name=${selectedValue || ""}></ssk-icon>
              ${selectedValue
                ? displayLabel
                : html`<span style="color: #9CA3AF">${displayLabel}</span>`}
            </ssk-dropdown-preview>
          </ssk-dropdown-button>

          ${options.map(
        (option) => html`
              <ssk-dropdown-option value=${option} ?disabled=${option in disabledOption}>
                <ssk-icon name=${option} slot="prefix" color=${option in disabledOption ? "gray" : ""}></ssk-icon>
                <div class="label">${option in disabledOption && disabledOption[option]
                    ? `${option} ${disabledOption[option]}`
                    : option}
                  </div>
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
    disabledOptions: {},
    hideErrorIcon: true,
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

    const disabledOptions: Record<string, string> = args["disabledOptions"] ?? {};
    const disabledError = selectedValues.some(v => v in disabledOptions);

    const label =
      selectedValues.length > 0
        ? selectedValues.join(", ")
        : args.placeholder;

        const renderSelectedLabel = (
          selectedValues: string[],
          disabledOptions: Record<string, string>,
          placeholder: string
        ) => {
          if (selectedValues.length === 0) {
            return html`<span style="color: #9CA3AF">${placeholder}</span>`;
          }
          if (Object.keys(disabledOptions).length === 0 && selectedValues.length === testOptions2.length) {
            return html`<span>แสดงทุกค่า</span>`;
          }
          return selectedValues.map((v, i) => html`
            <span style="color: ${v in disabledOptions ? '#9CA3AF' : '#1F2937'}">
              ${v in disabledOptions ? `${v} ${disabledOptions[v]}` : v}
            </span>${i < selectedValues.length - 1 ? ', ' : ''}
          `);
        };
    return html`
    <style>
      .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        cursor: pointer;
      }
      .disabled-checkbox-wrapper {
        
        cursor: not-allowed;
      }
      .labels {
          word-break: break-all;
        }

      .disabled-labels {
        opacity: 0.4;
      }

      .selected-values {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }

    </style>
      <div class="container">
        <ssk-dropdown
           ${spread({ ...args })}
          @change=${(e: any) => {
        updateArgs({ value: e.detail });
      }}
        ?error=${disabledError}
        
        >
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview value=${label}>
            <span class="selected-values">
              ${renderSelectedLabel(selectedValues, disabledOptions, args.placeholder)}
            </span>
            </ssk-dropdown-preview>
          </ssk-dropdown-button>

          ${testOptions2.map((option) => html`
            <ssk-dropdown-option value=${option} ?disabled=${option in disabledOptions} }>
              <div class="checkbox-wrapper ${option in disabledOptions ? 'disabled-checkbox-wrapper' : ''}" @click=${(e: Event) => {
                  if (option in disabledOptions && selectedValues.includes(option)) {
                    e.stopPropagation();
                    const sskDropdown = (e.currentTarget as HTMLElement).closest('ssk-dropdown');
                    if (sskDropdown) {
                      (sskDropdown as any).state.setValue(option);
                    }
                  }
                }}>
                <ssk-checkbox
                  slot="prefix"
                  .checked="${selectedValues.includes(option)}"
                  .disabled="${option in disabledOptions && !selectedValues.includes(option)}"
                ></ssk-checkbox>
                <div class="labels ${option in disabledOptions ? 'disabled-labels' : ''}">
                  ${option in disabledOptions && disabledOptions[option] 
                    ? `${option} ${disabledOptions[option]}` 
                    : option}
                </div>
              </div>
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
    width: "1000px",
    disabledOptions: {},
    hideErrorIcon: true,
    
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=31565-11658",
    },
  },
};


export const DropdownButton: Story = {
  render: ({ ...args }) => {
    const [{ optionsAnchor,isOpen }, updateArgs] = useArgs();
    function getChevronIcon() {
      if (optionsAnchor === "top") {
        return "up";
      } else if (optionsAnchor === "bottom") {
        return "down";
      }
      return optionsAnchor;
    }
    const disabledOption: Record<string, string> = args["disabledOptions"] ?? {};



    return html`
      <style>
        .container {
          width: 100%;
          height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .labels {
          word-break: break-all;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

      </style>
      <div class="container">
        
          <ssk-dropdown ${spread({ ...args })} label="Dropdown Placement">
            <ssk-button slot="selected">
              <ssk-text color="white">Dropdown</ssk-text>
              <ssk-icon slot="postfix" name="solid-chevron-${getChevronIcon() || "down"}"></ssk-icon>
            </ssk-button>
            ${testOptions2.map(
              (option) => html`
                <ssk-dropdown-option value=${option} ?disabled=${option in disabledOption}>
                <div class="labels">
                  <ssk-text color=${option in disabledOption ? "gray" : ""}>${option in disabledOption && disabledOption[option]
                    ? `${option} ${disabledOption[option]}`
                    : option}</ssk-text>
                  </div>
                </ssk-dropdown-option>
              `
            )}
          </ssk-dropdown>
          <ssk-dropdown 
            label="Dropdown with Chevron Toggle"
            ${spread({ ...args })}
            hideCheckIcon=${true}
              @change=${(e: any) => {
                updateArgs({ value: e.detail, isOpen: false });
            }} 
            width="153px">
            <ssk-button slot="selected" @click=${() => { updateArgs({ isOpen: !isOpen });}} width="full">
              <ssk-text color="white">Dropdown</ssk-text>
              <ssk-icon slot="postfix" name=${isOpen ? "solid-chevron-up" : "solid-chevron-down"}></ssk-icon>
            </ssk-button>
            ${testOptions2.map(
              (option) => html`
                <ssk-dropdown-option value=${option} >
                  <div class="labels">
                    <ssk-text>${option}</ssk-text>
                  </div>
                </ssk-dropdown-option>
              `
            )}
          </ssk-dropdown>

          <ssk-dropdown label="Dropdown with icon" width="153px">
          
            <ssk-button class="dropdown-button" slot="selected" width="full">
              <ssk-text color="white">Dropdown</ssk-text>
              <ssk-icon slot="postfix" name="solid-chevron-${getChevronIcon() || "down"}"></ssk-icon>
            </ssk-button>
            ${testOptions2.map(
              (option) => html`
                <ssk-dropdown-option value=${option} ?disabled=${option in disabledOption}>
                <div class="labels">
                  <ssk-icon slot="prefix" name="outline-user-circle" color=${option in disabledOption ? "gray" : ""}></ssk-icon>
                  <ssk-text color=${option in disabledOption ? "gray" : ""}>${option in disabledOption && disabledOption[option]
                    ? `${option} ${disabledOption[option]}`
                    : option}</ssk-text>
                  </div>
                </ssk-dropdown-option>
              `
            )}
          </ssk-dropdown>
      </div>
    `;
  },
  args: {
    size: "md",
    value: "",
    optionsWidth: "fit",
    disabledOptions: {},
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=31281-11014",
    },
  },
};

export const DropdownIcon: Story = {
  render: ({ ...args }) => {
    const disabledOption: Record<string, string> = args["disabledOptions"] ?? {};

    return html`
    <style>
      .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100dvh;
      }
      .labels {
        word-break: break-all;
        width: 200px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .labels ssk-avatar {
        flex-shrink: 0;
      }
      .dropdown-icon{
      width: fit-content;
      height: fit-content;
      }

    </style>
    <div class="container">
      <div class="dropdown-container">
        <span><ssk-text>Dropdown with icon user circle</ssk-text></span>
        <div class="dropdown-icon">
          <ssk-dropdown ${spread({ ...args })}>
        
            <ssk-icon  slot="selected" name="solid-ellipsis-vertical" ></ssk-icon>
          ${testOptions2.map(
            (option) => html`
              <ssk-dropdown-option value=${option} ?disabled=${option in disabledOption}>
              <div class="labels">
                <ssk-icon slot="prefix" name="outline-user-circle" color=${option in disabledOption ? "gray" : ""}></ssk-icon>
                <ssk-text color=${option in disabledOption ? "gray" : ""}>${option in disabledOption && disabledOption[option]
                  ? `${option} ${disabledOption[option]}`
                  : option}</ssk-text>
              </div>
              </ssk-dropdown-option>
            `
          )}
          </ssk-dropdown>
        </div>
      </div>

      <div class="dropdown-container">
        <span><ssk-text>Dropdown with avatar</ssk-text></span>
        <div class="dropdown-icon">
          <ssk-dropdown ${spread({ ...args })}>
            <ssk-icon  slot="selected" name="solid-ellipsis-vertical" ></ssk-icon>
          ${testOptions2.map(
            (option) => html`
              <ssk-dropdown-option value=${option} ?disabled=${option in disabledOption}>
              <div class="labels">
                <ssk-avatar slot="prefix" src="/Avatar.png" alt="demo avatar" shape="circle" size="sm"></ssk-avatar>
                <ssk-text color=${option in disabledOption ? "gray" : ""}>${option in disabledOption && disabledOption[option]
                  ? `${option} ${disabledOption[option]}`
                  : option}</ssk-text>
              </div>
              </ssk-dropdown-option>
            `
          )}
          </ssk-dropdown>
        </div>
      </div>
    </div>
    `;
  },

  args: {
    size: "md",
    optionsWidth: "auto",
    value: "",
    
    disabledOptions: {},
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=31545-37880",
    },
  },
};

export const DropdownRadio: Story = {
  render: ({ ...args }) => {
    const [{}, updateArgs] = useArgs();
    const disabledOptions: Record<string, string> = args["disabledOptions"] ?? {};
    const selectedValue = typeof args["value"] === "string" ? args["value"] : "";
    const displayLabel = selectedValue?.length
      ? selectedValue in disabledOptions
        ? `${selectedValue} ${disabledOptions[selectedValue]}`
        : selectedValue
      : args["placeholder"];


    return html`
      <style>
        .lables {
          word-break: break-all;
        }

      </style>
      <div class="container">
        <ssk-dropdown
          ${spread({ ...args })}
          @change=${(e: any) => {
            action("@change")(e);
            updateArgs({ value: e.detail });
          }}
          hideCheckIcon=${true}
        >
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview
              value=${ifDefined(displayLabel)}
              ?disabled=${(selectedValue ?? "") in disabledOptions}
            >
              ${displayLabel}
            </ssk-dropdown-preview>
          </ssk-dropdown-button>
          ${testOptions2.map(
            (option) => html`
              <ssk-dropdown-option
                value=${option}
                ?disabled=${option in disabledOptions}
                disabledMessage=${disabledOptions[option] ?? ""}
              >
                <ssk-radio
                  slot="prefix"
                  .checked="${args["value"] === option}"
                  ?disabled="${option in disabledOptions}"
                >
                  
                </ssk-radio>
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
    label: "Label",
    placeholder: "placeholder",
    helperText: "helper text",
    width: "300px",
    optionsWidth: "fit",
    value: "",
    optionsAnchor: "bottom",
    optionsAlign: "left",
    disabledOptions: {},
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=31556-42175",
    },
  },
};


export const DropdownEmpty: Story = {
  render: ({ ...args }) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return html`
      <style>
        .empty-dropdown-container {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 2rem;
          min-height: 100dvh;
        }
        .empty-data-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 24px;
          padding: 8px;
        }
      </style>
      <div class="empty-dropdown-container">
        <ssk-dropdown ${spread({ ...args })}>
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview value=${ifDefined(args["value"] || args["placeholder"])}>
            <ssk-text color="gray">${args["value"] || args["placeholder"]}</ssk-text>
            </ssk-dropdown-preview>
          </ssk-dropdown-button>
          <div class="empty-data-container">
            <ssk-icon color="gray.400" name="outline-user-circle" slot="prefix"></ssk-icon>
            <ssk-text color="gray.400">Empty Data</ssk-text>
          </div>
        </ssk-dropdown>

        <ssk-dropdown optionsWidth= "auto">
          <ssk-icon name="solid-ellipsis-vertical" slot="selected"></ssk-icon>
          <div class="empty-data-container" style="width: 112px">
          <ssk-text color="gray.400" >Empty Data</ssk-text>
          </div>
        </ssk-dropdown>

        <ssk-dropdown optionsWidth= "auto">
          <ssk-button slot="selected">
            <ssk-text color="white">Dropdown</ssk-text>
              <ssk-icon slot="postfix" name=${isOpen ? "solid-chevron-up" : "solid-chevron-down"}></ssk-icon>
          </ssk-button>
          <div class="empty-data-container" style="width: 112px">
          <ssk-text color="gray.400">Empty Data</ssk-text>
          </div>
        </ssk-dropdown>
      </div>
    `;
  },
  args: {
    size: "md",
    label: "label",
    placeholder: "placeholder",
    width: "300px",
    optionsWidth: "fit",
    helperText: "Empty state",
    maxOptionsHeight:80,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=31281-11731",
    },
  },
};
export const DropdownSlotUsage: Story = {
  render: ({ ...args }) => {
    return html`
      <style>
        .empty-dropdown-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          min-height: 100dvh;
        }
        .loading-container {
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 16px;
        }
      </style>
      <div class="empty-dropdown-container">
        <ssk-dropdown ${spread({ ...args })}>
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview value=${args["placeholder"]}>
              ${args["placeholder"]}
            </ssk-dropdown-preview>
          </ssk-dropdown-button>
          <div class="loading-container">
          <ssk-spinner size="44px"></ssk-spinner>
          <ssk-text>Loading...</ssk-text>
          </div>
        </ssk-dropdown>
      </div>
    `;
  },
  args: {
    size: "md",
    placeholder: "placeholder",
    label: "Label",
    width: "300px",
    optionsWidth: "fit",
    maxOptionsHeight:112,
    helperText: "Loading...",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=31518-82794",
    },
  },
};

export const DropdownLoading: Story = {
  render: ({ ...args }) => {
    return html`
      <style>
        .wait-data-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          min-height: 100dvh;
        }
      </style>
      <div class="wait-data-container">
        <ssk-dropdown ${spread({ ...args })}>
          <ssk-dropdown-button slot="selected">
            <ssk-dropdown-preview value=${args["placeholder"]}>
              ${args["placeholder"]}
            </ssk-dropdown-preview>
          </ssk-dropdown-button>
        </ssk-dropdown>
      </div>
    `;
  },
  args: {
    size: "md",
    placeholder: "placeholder",
    label: "Label",
    
    width: "328px",
    loading: true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1123-66711",
    },
  },
};

