import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import "../../../src/elements/tag";
import { Tag } from "../../../src/elements/tag";
import { baseArgsTypes } from "../helper";

type TagWithLabel = Omit<Tag, "variant" | "disabled" | "loading" | "size"> & {
  label: string;
};

const variant: Tag["variant"][] = ["solid", "outline", "subtle"];

const size: Tag["size"][] = ["lg", "md", "sm"];

const meta = {
  title: "Components/Data Display/Tag",
  tags: [],
  render: ({ label, click, ...args }) => {
    return html` <style>
        main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-flow: row wrap;
        }

        section {
          display: flex;
          flex-direction: column;
          flex-flow: row nowrap;
        }

        div.container {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 0.5em;
        }
      </style>
      <main>
        ${variant.map(
          (v) => html`<section>
            <div class="container">
              ${size.map(
                (sz) => html`<ssk-tag
                    testId=${`tag-${v}-${sz}}`}
                    ${spread({ ...args, size: sz })}
                    variant=${v}
                  >
                    ${label}
                  </ssk-tag>

                  <ssk-tag
                    testId=${`tag-${v}-${sz}}`}
                    ${spread({ ...args, size: sz })}
                    variant=${v}
                  >
                    <ssk-icon
                      .size=${sz}
                      name="outline-magnifying-glass"
                    ></ssk-icon>
                    ${label}
                  </ssk-tag>

                  <ssk-tag
                    testId=${`tag-${v}-${sz}}`}
                    ${spread({ ...args, size: sz })}
                    variant=${v}
                  >
                    ${label}
                    <ssk-icon .size=${sz} name="outline-x-mark"></ssk-icon
                  ></ssk-tag>`
              )}
            </div>
          </section>`
        )}
      </main>`;
  },
  argTypes: {
    label: {
      description: "The content of the tag",
      control: "text",
    },
    ...baseArgsTypes,
  },
} satisfies Meta<TagWithLabel>;

export default meta;

type Story = StoryObj<TagWithLabel>;

export const ShowCase: Story = {
  args: {
    themeColor: "primary",
    label: "Tag",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
