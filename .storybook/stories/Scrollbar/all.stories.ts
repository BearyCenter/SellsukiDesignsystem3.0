import { AutoLitProperty, baseArgsTypes } from "../helper";
import { Scrollbar } from "../../../src/elements/scrollbar";
import { html } from "lit";
import "../../../src/elements/scrollbar";
import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";

type ScrollbarArgs = AutoLitProperty<Scrollbar>;

const size: Scrollbar["size"][] = ["md", "sm"];

const meta = {
  title: "Example/Scrollbar",
  tags: [],
  render: ({ ...args }) => {
    return html`<style>
        main.showcase {
          display: flex;
          justify-content: space-between;
          align-items: start;
        }

        section.size {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

      </style>

      <main class="showcase">
      ${size.map(
        (s) => html` <section class="size">
          <label>Size: ${s}</label>
          <ssk-scrollbar size=${s} ${spread(args)}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              lacinia risus non ligula vestibulum bibendum. Ut vestibulum nec
              elit quis tristique. Donec volutpat tellus sit amet nunc gravida,
              quis elementum felis vehicula. Nulla ornare tellus a urna volutpat
              rutrum. Integer suscipit vehicula lacus non efficitur. In nec
              risus diam. Suspendisse nec nisl commodo nulla fringilla
              scelerisque. Donec sit amet nulla ut est sodales vulputate. Fusce
              non justo ac risus vehicula euismod at auctor purus. Pellentesque
              aliquet eleifend neque, maximus pharetra diam lacinia at.
              djkshfdjkshjksdghfjkdsgfhjsdfghjsfghjsdgfjhd sgfjh
            </p>
          </ssk-scrollbar>
        </section>`,
      )}
       
      </div>`;
  },
  argTypes: {
    size: baseArgsTypes.size,
  },
} satisfies Meta<ScrollbarArgs>;

export default meta;

type Story = StoryObj<ScrollbarArgs>;

export const ShowCase: Story = {
  args: {
    width: "200px",
    height: "200px",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=8449-17125&mode=design&t=GQ4GjSmgfsSzOmzQ-0",
    },
  },
};
