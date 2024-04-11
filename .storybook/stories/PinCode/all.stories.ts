import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import "../../../src/elements/pin-code";
import { PinCode } from "../../../src/elements/pin-code";
import { baseArgsTypes, genericEvents } from "../helper";

type PinCodeProps = Omit<PinCode, "size">;

const size: PinCode["size"][] = ["sm", "md"];

const meta = {
  title: "Example/PinCode",
  tags: [],
  render: ({ ...args }) => {
    const updatePinCodeValue = (event: Event) => {
      const code = (event.target as PinCode).Value;
      const targetElement = event.target as HTMLElement;
      const pinCodeValue =
        targetElement.parentElement?.querySelector(".showValue");
      if (pinCodeValue) {
        pinCodeValue.textContent = `Pin Code Value: ${code}`;
      }
    };

    return html` <style>
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
          display: flex; /* Use flexbox for row layout */
          gap: 0.5em;
        }
      </style>
      <div>
        <main class="showcase">
          ${size.map(
            (s) => html`<section class="size">
              <label>Size: ${s}</label>
              <div class="row">
                <div>
                  <ssk-pin-code
                    size=${s}
                    testId=${`pin-code-${s}`}
                    ${spread({ ...args })}
                    @input=${updatePinCodeValue}
                  ></ssk-pin-code>
                  <p class="showValue" id="showValue-${s}">Pin Code Value:</p>
                </div>
              </div>
              <div class="row">
                <div>
                  <ssk-pin-code
                    size=${s}
                    testId=${`pin-code-${s}`}
                    ${spread({ ...args })}
                    @input=${updatePinCodeValue}
                    error
                  ></ssk-pin-code>
                  <p class="showValue" id="showValue-${s}-error">
                    Pin Code Value:
                  </p>
                </div>
              </div>
            </section>`,
          )}
        </main>
      </div>`;
  },
  argTypes: {
    length: {
      description: "Special format for the pin code input field",
      table: {
        category: "Props",
        defaultValue: { summary: 3 },
        type: {
          summary: "Number",
        },
      },
      control: {
        type: "number",
      },
    },
    placeholder: {
      description:
        "Text to display in each pin code input field when no value is entered",
      table: {
        category: "Props",
        defaultValue: { summary: "0" },
        type: {
          summary: "text",
        },
      },
      control: {
        type: "text",
      },
    },
    "?error": {
      description:
        "Indicates whether the pin code input field is in an error state",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?disabled": {
      description: "When true gives the pin code a disabled apparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    size: baseArgsTypes.size,
    width: baseArgsTypes.width,
    height: baseArgsTypes.height,
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    gap: baseArgsTypes.gap,
    padding: baseArgsTypes.padding,
    rounded: baseArgsTypes.rounded,
    borderColor: baseArgsTypes.borderColor,
    "?hidden": baseArgsTypes["?hidden"],
    "@input": genericEvents["@input"],
    "@change": genericEvents["@change"],
  },
} satisfies Meta<PinCodeProps>;

export default meta;

type Story = StoryObj<PinCodeProps>;

export const ShowCase: Story = {
  args: { length: 3 },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=3015-6907&mode=design&t=CCw6JU3hnioeOxuv-0",
    },
  },
};
