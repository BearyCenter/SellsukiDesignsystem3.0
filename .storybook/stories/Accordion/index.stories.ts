import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";
import "../../../src/elements/accordion";
import "../../../src/elements/icon";
import { Accordion } from "../../../src/elements/accordion";

type AccordionArgs = AutoLitProperty<Accordion>;

const meta = {
  title: "Example/Accordion",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-accordion
        mode=${args.mode}
        align=${args.align}
        variant=${args.variant}
        @change=${(e: Event) =>
          console.log("onChange", (e as CustomEvent).detail)}
      >
        <ssk-accordion-item id="1" title="Accordion Item 1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ssk-accordion-item>
        <ssk-accordion-item id="2" title="Accordion Item 2">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ssk-accordion-item>
        <ssk-accordion-item id="3" title="Accordion Item 3">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </ssk-accordion-item>
      </ssk-accordion>
    `;
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
    variant: {
      control: "select",
      options: ["clean", "bordered"],
    },
    "@click": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<AccordionArgs>;

export default meta;

type Story = StoryObj<AccordionArgs>;

export const Default: Story = {
  args: {
    mode: "single",
    align: "left",
  },
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
};

export const AllCombinations: Story = {
  render: (args) => {
    const modes: Accordion["mode"][] = ["single", "multiple"];
    const aligns: Accordion["align"][] = ["left", "center", "right"];
    const variants: Accordion["variant"][] = ["clean", "bordered"];

    return html`
      <div style="display: grid; gap: 2rem;">
        ${modes.map(
          (mode) => html`
            ${aligns.map(
              (align) => html`
                ${variants.map(
                  (variant) => html`
                    <div
                      style="
                        border: 1px solid #ddd;
                        padding: 1rem;
                        background: ${variant === "bordered"
                        ? "#fff"
                        : "#f9f9f9"};
                      "
                    >
                      <h3 style="margin-bottom: 0.5rem;">
                        Mode: <code>${mode}</code>, Align:
                        <code>${align}</code>, Variant: <code>${variant}</code>
                      </h3>

                      <ssk-accordion
                        mode=${mode}
                        align=${align}
                        variant=${variant}
                      >
                        ${[1, 2, 3].map(
                          (i) => html`
                            <ssk-accordion-item
                              id="${i}-${mode}-${align}-${variant}"
                              title="Accordion Item ${i}"
                              align=${align}
                            >
                              <ssk-icon
                                slot="icon-open"
                                name="solid-chevron-up"
                              ></ssk-icon>
                              <ssk-icon
                                slot="icon-close"
                                name="solid-chevron-down"
                              ></ssk-icon>
                              Content for item ${i}
                            </ssk-accordion-item>
                          `
                        )}
                      </ssk-accordion>
                    </div>
                  `
                )}
              `
            )}
          `
        )}
      </div>
    `;
  },
  args: {},
};
