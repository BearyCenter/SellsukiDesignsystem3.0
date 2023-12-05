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
  "size" | "disabled" | "active" | "min"
>;
const size: MenuItems["size"][] = ["xs", "sm", "md", "lg"];
const stateActive = [
  {
    "?active": true,
  },
  {
    "?active": false,
  },
];
const state = [
  {
    "?disabled": true,
  },
  {
    "?disabled": false,
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
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Menu",
  tags: [],
  render: ({ label, header, ...args }) => {
    return html`
      <style>
        main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        }

        section {
          display: flex;
          flex-direction: column;
          flex-flow: row nowrap;
        }

        div.container {
          display: grid;
          grid-template-columns: repeat(${stateMin.length}, auto);
          gap: 0.5em;
        }
      </style>
      <main>
        ${stateMin.map(
          (m) => html` <section>
            <div class="container">
              ${size.map((s) =>
                state.map(
                  (st) => html` <section>
                    <div class="container">
                      ${stateActive.map((sa) => {
                        const combinedArgs = {
                          ...args,
                          ...st,
                          ...m,
                          ...sa,
                          size: s,
                        };

                        if (
                          combinedArgs["?disabled"] &&
                          combinedArgs["?active"]
                        ) {
                          return nothing;
                        }
                        return html`
                          <ssk-menu-items
                            testId=${`button-${m["?min"]}-${s}-${st["?disabled"]}-${sa["?active"]}`}
                            ${spread(combinedArgs)}
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
                        `;
                      })}
                    </div>
                  </section>`,
                ),
              )}
            </div>
          </section>`,
        )}

        <div class="container">
          <ssk-menu-group ${spread(args)} header=${header} size="md">
            <ssk-icon
              slot="icon-closed"
              name="solid-chevron-down"
              size="md"
            ></ssk-icon>
            <ssk-icon
              slot="icon-open"
              name="solid-chevron-up"
              size="md"
            ></ssk-icon>

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
            <ssk-menu-items ${spread(args)} active>
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
    header: "menu",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1259-74722&mode=design&t=VlH5Gt972cRnvCwy-0",
    },
  },
};
