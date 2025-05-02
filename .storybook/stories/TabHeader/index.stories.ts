import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/badge";
import "../../../src/elements/tab-header";
import { TabHeader } from "../../../src/elements/tab-header";
import "../../../src/elements/text";
import { AutoLitProperty } from "../helper";

type ButtonArgs = {
  buttonWidth: string;
};

type TabsArgs = AutoLitProperty<TabHeader & ButtonArgs>;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/TabHeader",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-tab-header ${spread({ ...args })}>
        <ssk-tab-button
          active
          ${spread({ ...args })}
          width="${args.buttonWidth}"
        >
          content 1
          <ssk-badge variant="subtle" size="sm"> 2 </ssk-badge>
        </ssk-tab-button>
        <ssk-tab-button ${spread({ ...args })} width="${args.buttonWidth}">
          content 2
        </ssk-tab-button>
        <ssk-tab-button ${spread({ ...args })} width="${args.buttonWidth}">
          content 3
        </ssk-tab-button>
      </ssk-tab-header>
    `;
  },

  argTypes: {
    variant: {
      options: ["inline", "button"],
      description: "The type of tabs",
      control: {
        type: "inline-radio",
      },
    },
    size: {
      options: ["sm", "md"],
      description: "The size of tabs",
      control: "select",
    },
    align: {
      options: ["left", "center", "right"],
      description: "The alignment of tabs",
      control: "select",
    },
    color: {
      description: "The color of tabs",
    },
    buttonWidth: {
      description: "Width of tabs",
      table: {
        category: "Button props",
        priority: 0,
      },
    },
  },
} satisfies Meta<TabsArgs>;

export default meta;

type Story = StoryObj<TabsArgs>;

export const Default: Story = {
  args: {
    variant: "button",
    size: "md",
    align: "left",
    color: "primary",
    buttonWidth: "auto",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=2260-34872&p=f&t=mq4JAueJwMhllnA9-0",
    },
  },
};

export const AllCombinations: Story = {
  render: (args) => {
    const variants: TabHeader["variant"][] = ["inline", "button"];
    const sizes: TabHeader["size"][] = ["sm", "md"];
    const aligns: TabHeader["align"][] = ["left", "center", "right"];
    const buttonWidths = ["auto", "full"];

    return html`
      <div style="display: grid; gap: 2rem;">
        ${variants.map(
          (variant) => html`
            <div>
              <h3>Variant: ${variant}</h3>
              ${sizes.map(
                (size) => html`
                  <div>
                    <h4>Size: ${size}</h4>
                    ${aligns.map(
                      (align) => html`
                        <div>
                          <h5>Align: ${align}</h5>
                          <div
                            style="display: flex; flex-direction: column; gap: 1rem;"
                          >
                            ${buttonWidths.map(
                              (buttonWidth) => html`
                                <div>
                                  <p>
                                    <strong>buttonWidth: ${buttonWidth}</strong>
                                  </p>
                                  <ssk-tab-header
                                    variant=${variant}
                                    size=${size}
                                    align=${align}
                                    color=${args.color!}
                                  >
                                    <ssk-tab-button
                                      active
                                      variant=${variant}
                                      width=${buttonWidth}
                                      color=${args.color!}
                                    >
                                      content 1
                                      <ssk-badge variant="subtle" size="sm"
                                        >2</ssk-badge
                                      >
                                    </ssk-tab-button>
                                    <ssk-tab-button
                                      variant=${variant}
                                      width=${buttonWidth}
                                      color=${args.color!}
                                    >
                                      content 2
                                    </ssk-tab-button>
                                    <ssk-tab-button
                                      variant=${variant}
                                      width=${buttonWidth}
                                      color=${args.color!}
                                    >
                                      content 3
                                    </ssk-tab-button>
                                  </ssk-tab-header>
                                </div>
                              `
                            )}
                          </div>
                        </div>
                      `
                    )}
                  </div>
                `
              )}
            </div>
          `
        )}
      </div>
    `;
  },
  args: {
    color: "primary",
  },
};

export const DynamicHeaderContent: Story = {
  render: (args) => {
    return html`
      <ssk-tab-header ${spread({ ...args })}>
        <ssk-tab-button
          active
          ${spread({ ...args })}
          width="${args.buttonWidth}"
        >
          <ssk-dropdown
            themeColor="primary"
            optionsWidth="auto"
            ${spread({ ...args })}
          >
            <ssk-dropdown-preview slot="selected">
              Dropdown item

              <ssk-icon
                slot="postfix"
                size="sm"
                name="outline-chevron-down"
              ></ssk-icon>
            </ssk-dropdown-preview>
            <ssk-dropdown-option>
              <ssk-icon
                slot="prefix"
                size="sm"
                name="outline-envelope"
              ></ssk-icon>
              <ssk-text size="sm">Dropdown item</ssk-text>
            </ssk-dropdown-option>
            <ssk-divider size="xs"></ssk-divider>
            <ssk-dropdown-option>
              <ssk-icon
                slot="prefix"
                size="sm"
                name="solid-arrow-right-on-rectangle"
              ></ssk-icon>
              <ssk-text size="sm">Sign out</ssk-text>
              <ssk-icon
                slot="postfix"
                size="sm"
                name="solid-arrow-right"
              ></ssk-icon>
            </ssk-dropdown-option>
          </ssk-dropdown>
        </ssk-tab-button>
        <ssk-tab-button ${spread({ ...args })} width="${args.buttonWidth}">
          content 2
        </ssk-tab-button>
        <ssk-tab-button ${spread({ ...args })} width="${args.buttonWidth}">
          content 3
        </ssk-tab-button>
      </ssk-tab-header>
    `;
  },
  args: {
    variant: "button",
    size: "md",
    align: "left",
    color: "primary",
    buttonWidth: "auto",
  },
};
