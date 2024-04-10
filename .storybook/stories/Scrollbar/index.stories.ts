import { AutoLitProperty, baseArgsTypes } from "../helper";
import { Scrollbar } from "../../../src/elements/scrollbar";
import { html } from "lit";
import "../../../src/elements/scrollbar";
import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";

type ScrollbarArgs = AutoLitProperty<Scrollbar>;

const meta = {
  title: "Example/Scrollbar",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`<style>
        div.container {
          margin: auto;
          margin-top: 10%;
          display: flex;
          justify-content: center;
        }

        .grid-container {
          display: grid;
          grid-template-columns: auto auto auto auto;
          background-color: #2196f3;
          padding: 10px;
        }
        .grid-item {
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.8);
          padding: 20px;
          font-size: 30px;
          text-align: center;
        }
      </style>

      <div class="container">
        <ssk-scrollbar ${spread(args)}>
          <div class="grid-container">
            <div class="grid-item">1</div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
            <div class="grid-item">5</div>
            <div class="grid-item">6</div>
            <div class="grid-item">7</div>
            <div class="grid-item">8</div>
            <div class="grid-item">9</div>
            <div class="grid-item">10</div>
            <div class="grid-item">11</div>
            <div class="grid-item">12</div>
          </div>
        </ssk-scrollbar>
      </div>`;
  },
  argTypes: {
    size: baseArgsTypes.size,
  },
} satisfies Meta<ScrollbarArgs>;

export default meta;

type Story = StoryObj<ScrollbarArgs>;

export const Default: Story = {
  args: {
    size: "md",
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
