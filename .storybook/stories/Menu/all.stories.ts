import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../../../src/elements/menu/items";
import "../../../src/elements/menu/group";
import "../../../src/elements/icon";
import { MenuItems } from "../../../src/elements/menu/items";
import { MenuGroup } from "../../../src/elements/menu/group";

type MenuArgs = {} & Omit<
  MenuItems & MenuGroup,
  "size" | "disabled" | "active" | "min" | "variant"
>;
const variant: MenuItems["variant"][] = ["solid", "outline"];
const size: MenuItems["size"][] = ["xs", "sm", "md", "lg"];
const state = [
  {
    "?active": true,
  },
  {
    "?disabled": true,
  },
  {
    "?active": false,
  },
];

const stateMin = [
  {
    "?min": false,
  },
  {
    "?min": true,
  },
];

const stateGroup = [
  {
    "?isOpen": false,
    "?hiddenIcon": false,
  },
  {
    "?isOpen": true,
    "?hiddenIcon": false,
  },
  {
    "?isOpen": false,
    "?hiddenIcon": true,
  },
  {
    "?isOpen": true,
    "?hiddenIcon": true,
  },
];
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Menu",
  tags: [],
  render: ({ label, ...args }) => {
    return html`
      <style>
        main {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-flow: column wrap;
        }

        section {
          display: flex;
          flex-direction: column;
          flex-flow: row nowrap;
        }

        div.container {
          display: grid;
          grid-template-columns: repeat(${state.length}, auto);
          gap: 0.5em;
        }

        div.group {
          display: grid;
          grid-template-columns: repeat(${stateGroup.length}, auto);
          gap: 0.5em;
        }
      </style>
      <main>
        ${variant.map(
          (v) => html`<section>
            <div class="container">
              ${stateMin.map(
                (m) => html` <section>
                  <div class="container">
                    ${size.map((s) =>
                      state.map((st) => {
                        return html` <section>
                          <div class="container">
                            <ssk-menu-items
                              variant=${v}
                              testId=${`item-${v}-${m["?min"]}-${s}-${st["?disabled"]}-${st["?active"]}`}
                              ${spread({ ...args, ...st, ...m, size: s })}
                            >
                              <ssk-icon
                                slot="prefix"
                                name="outline-ellipsis-horizontal-circle"
                                size="${s}"
                              ></ssk-icon>
                              ${label}
                              <ssk-icon
                                slot="postfix"
                                name="solid-chevron-down"
                                size="${s}"
                              ></ssk-icon>
                            </ssk-menu-items>
                          </div>
                        </section>`;
                      }),
                    )}
                  </div>
                </section>`,
              )}
            </div>
          </section>`,
        )}

        <div class="group">
          ${stateGroup.map(
            (sg) => html`
              <ssk-menu-group
                ${spread({ ...args, ...sg })}
                header=${sg["?hiddenIcon"]
                  ? "Group menu hidden icon"
                  : "Group menu"}
                size="md"
              >
                <ssk-menu-items ${spread(args)}>
                  <ssk-icon
                    slot="prefix"
                    name="outline-ellipsis-horizontal-circle"
                    size="md"
                  ></ssk-icon>
                  ${label}
                  <ssk-icon
                    slot="postfix"
                    name="solid-chevron-down"
                    size="md"
                  ></ssk-icon>
                </ssk-menu-items>
                <ssk-menu-items ${spread(args)}variant="solid" active>
                  <ssk-icon
                    slot="prefix"
                    name="outline-ellipsis-horizontal-circle"
                    size="md"
                  ></ssk-icon>
                  ${label}
                  <ssk-icon
                    slot="postfix"
                    name="solid-chevron-down"
                    size="md"
                  ></ssk-icon>
                </ssk-menu-items>
                <ssk-menu-items ${spread(args)} variant="outline" active>
                  <ssk-icon
                    slot="prefix"
                    name="outline-ellipsis-horizontal-circle"
                    size="md"
                  ></ssk-icon>
                  ${label}
                  <ssk-icon
                    slot="postfix"
                    name="solid-chevron-down"
                    size="md"
                  ></ssk-icon>
                </ssk-menu-items>
              </ssk-menu-group>
            `,
          )}
        </div>
      </main>
    `;
  },
  argTypes: {},
} satisfies Meta<MenuArgs>;

export default meta;

type Story = StoryObj<MenuArgs>;

export const ShowCase: Story = {
  args: {
    label: "item",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=VlH5Gt972cRnvCwy-0",
    },
  },
};
