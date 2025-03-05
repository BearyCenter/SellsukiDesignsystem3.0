import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/date-display";
import { DateDisplay } from "../../../src/elements/date-display";

type DateDisplayArgs = {} & Omit<DateDisplay, "level">;
const sizes: DateDisplay["size"][] = ["xs", "sm", "md", "lg", "xl", "2xl"];
const locales: string[] = ["th", "en", "fr", "de"];

const meta = {
  title: "Example/DateDisplay",
  tags: [],
  render: ({ ...args }) => {
    return html`
      <style>
        .show-case {
          display: grid;
          grid-template-columns: repeat(${sizes.length + 1}, minmax(0, 1fr));
          grid-gap: 1rem;
        }

        section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      </style>
      <main>
        <section class="show-locales">
          <h3>Different Variant</h3>
          <div class="show-case">

            <ssk-tag variant="subtle" themeColor="primary">
            Locale/Size
            </ssk-tag>

            ${sizes.map(
              (size) =>
                html`<ssk-tag variant="subtle" themeColor="primary"
                  >${size}</ssk-tag
                >`
            )}

            ${locales.map(
              (locale) => html`
                <ssk-tag variant="subtle" themeColor="primary"
                  >${locale}</ssk-tag
                >
                ${sizes.map(
                  (size) => html`
                    <ssk-date-display
                      ${spread(args)}
                      .locale=${locale}
                      .size=${size}
                    ></ssk-date-display>
                  `
                )}
              `
            )}
          <div>
        </section>
      </main>
    `;
  },
  argTypes: {},
} satisfies Meta<DateDisplayArgs>;

export default meta;

type Story = StoryObj<DateDisplayArgs>;

export const ShowCase: Story = {
  args: {
    date: "2025-03-05T14:47:00+07:00",
    locale: "en",
    size: "md",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=854-63033&mode=design&t=PnxCQWfQJ1iyEePz-0",
    },
  },
};
