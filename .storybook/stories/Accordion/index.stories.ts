import { html } from "lit";
import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";
import "../../../src/elements/accordion";
import "../../../src/elements/icon";
import "../../../src/elements/checkbox";
import { Accordion } from "../../../src/elements/accordion";

type AccordionArgs = AutoLitProperty<Accordion>;

const accordionItems = [
  {
    id: "1",
    title: "Accordion Item 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    title: "Accordion Item 2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    title: "Accordion Item 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
];

const meta = {
  title: "Example/Accordion",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-accordion
        ${spread(args)}
        @change=${(e: Event) =>
          console.log("onChange", (e as CustomEvent).detail)}
      >
        ${accordionItems.map(
          (item) => html`
            <ssk-accordion-item id=${item.id} title=${item.title}>
              <ssk-icon slot="icon-open" name="solid-chevron-up"></ssk-icon>
              <ssk-icon slot="icon-close" name="solid-chevron-down"></ssk-icon>
              ${item.content}
            </ssk-accordion-item>
          `
        )}
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

export const WithCheckboxTwoColumns: StoryObj<AccordionArgs> = {
  render: (args) => html`
    <ssk-accordion ${spread(args)}>
      <ssk-accordion-item id="courier-company" title="บริษัทขนส่ง">
        <ssk-icon slot="icon-open" name="solid-chevron-up"></ssk-icon>
        <ssk-icon slot="icon-close" name="solid-chevron-down"></ssk-icon>
        <div>
          <div style="margin-bottom: 0.25rem;">Standard</div>
          <div
            style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem 1rem;"
          >
            <ssk-checkbox label="ไม่ระบุ"></ssk-checkbox>
            <ssk-checkbox label="KEX Express"></ssk-checkbox>
            <ssk-checkbox label="Flash Express"></ssk-checkbox>
            <ssk-checkbox label="Thailand Post"></ssk-checkbox>
            <ssk-checkbox label="J&T Express"></ssk-checkbox>
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <div style="margin-bottom: 0.25rem;">Sameday</div>
          <div
            style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem 1rem;"
          >
            <ssk-checkbox label="ไม่ระบุ"></ssk-checkbox>
            <ssk-checkbox label="Messenger"></ssk-checkbox>
            <ssk-checkbox label="Line Man"></ssk-checkbox>
            <ssk-checkbox label="Grab"></ssk-checkbox>
            <ssk-checkbox label="Lalamove"></ssk-checkbox>
            <ssk-checkbox label="Deliveree"></ssk-checkbox>
            <ssk-checkbox label="Skootar"></ssk-checkbox>
            <ssk-checkbox label="MakeSend"></ssk-checkbox>
          </div>
        </div>
      </ssk-accordion-item>
    </ssk-accordion>
  `,
  args: {
    mode: "single",
    align: "left",
    variant: "clean",
  },
};
