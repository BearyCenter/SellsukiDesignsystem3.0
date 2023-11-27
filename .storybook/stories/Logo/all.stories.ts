import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/logo";
import { Logo } from "../../../src/elements/logo";
import { baseArgsTypes } from "../helper";

type LogoArgs = {} & Logo;

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Logo",
  tags: [],
  render: ({ ...args }) => {
    return html`
      <style>
        main {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 2rem;
          flex-flow: column wrap;
        }

        section {
          display: flex;
          flex-direction: column;
        }

        div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5em;
        }
      </style>
      <main>
        <section>
          <label>Short Logo</label>
          <div>
            <ssk-logo ${spread(args)}></ssk-logo>
          </div>
        </section>
        <section>
          <label>Full Logo</label>
          <div>
            <ssk-logo ${spread(args)} fullLogo></ssk-logo>
          </div>
        </section>
      </main>
    `;
  },
  argTypes: {
    srcLogo: {
      control: {
        type: "text",
      },
    },
    altLogo: {
      control: {
        type: "text",
      },
    },
    srcLogoName: {
      control: {
        type: "text",
      },
    },
    altLogoName: {
      control: {
        type: "text",
      },
    },
    boxSize: {
      control: {
        type: "text",
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<LogoArgs>;

export default meta;

type Story = StoryObj<LogoArgs>;

export const ShowCase: Story = {
  args: {
    srcLogo: "https://placehold.co/72x72",
    altLogo: "demo brand logo",
    srcLogoName: "https://placehold.co/72x72",
    altLogoName: "demo brand name",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1230-75136&mode=design&t=msssbAIeiiWmkqdQ-0",
    },
  },
};
