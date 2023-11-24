import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/avatar";
import { Avatar } from "../../../src/elements/avatar";
import { baseArgsTypes } from "../helper";

type AvatarArgs = {} & Avatar;
const shape: Avatar["shape"][] = ["circle", "rounded"];
const boxSize: Avatar["boxSize"][] = ["24px", "40px", "56px", "72px"];
const size: Avatar["size"][] = ["xl", "lg", "md", "sm", "xs"];

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Avatar",
  tags: [],
  render: ({ ...args }) => {
    return html`<style>
        main {
          display: flex;
          justify-content: space-between;
          align-items: start;
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
          grid-template-columns: repeat(${boxSize.length}, auto);
          gap: 0.5em;
        }
      </style>
      <main>
        <section>
          <div class="container">
            ${shape.map(
              (v) => html`<section>
                <div class="container">
                  ${boxSize.map(
                    (s) => html` <ssk-avatar
                      ${spread({ ...args, shape: v, boxSize: s })}
                    ></ssk-avatar>`,
                  )}
                </div>
              </section>`,
            )}
          </div>
        </section>
        <section>
          <div class="container">
            ${shape.map(
              (v) => html`<section>
                <div class="container">
                  ${boxSize.map(
                    (bs) => html` <ssk-avatar
                      ${spread({
                        ...args,
                        shape: v,
                        boxSize: bs,
                        src: "",
                        initials: "ww",
                      })}
                    ></ssk-avatar>`,
                  )}
                </div>
              </section>`,
            )}
          </div>
        </section>
      </main>`;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<AvatarArgs>;

export default meta;

type Story = StoryObj<AvatarArgs>;

export const ShowCase: Story = {
  args: {
    src: "https://placehold.co/400x400",
    alt: "demo avatar",
    backgroundColor: "#32A9FF",
    color: "white",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1223-74500&mode=design&t=yXcQnF7GyIy2CKb6-0",
    },
  },
};
