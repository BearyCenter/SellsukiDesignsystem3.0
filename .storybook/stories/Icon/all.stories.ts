import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "../../../src/components/icon/index.ts";
import * as Icons from "../../../src/components/icon/index.ts";

const meta = {
  title: "Example/Icon/Showcase",
  tags: [],
  render: () => {
    return html` <style>
        main {
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          gap: 1rem;
        }

        .icon-card {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          gap: 0.5rem;
          max-width: 10rem;
        }
      </style>
      <main>
        ${Object.entries(Icons).map(([name, component]) =>
          unsafeHTML(`<${component.registeredName} />`)
        )}
      </main>`;
  },
} satisfies Meta<Icons.IconOutlineAcademicCap>;

export default meta;

type Story = StoryObj<Icons.IconOutlineAcademicCap>;

export const ShowCase: Story = {
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
