import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card";
import { Card } from "../../../src/components/card";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type CardComponentArgs = AutoLitProperty<Card> & { label: string };

const meta: Meta<Card> = {
  title: "Example/Card",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <div style="display: flex; flex-direction: column; gap: 20px; flex-wrap: wrap;">
        <h2>Card</h2>

        <ssk-card ${spread(args)}>
          <div slot="content">
            <ssk-text>This is some additional content inside the card.</ssk-text>
            <ssk-text size="sm" color="gray.500">This is some additional content inside the card.</ssk-text>
          </div>
        </ssk-card>

       <ssk-card
          type="horizontal"
          variant="elevated"
          title="Product name"
          subtitle="Subset"
          image="https://picsum.photos/200/200?2"
          width="360px"
        >
          <ssk-icon slot="icon" name="solid-x-mark" size="lg"></ssk-icon>
          <span slot="meta">฿1,290</span>
          <ssk-button slot="actions">⋯</ssk-button>
        </ssk-card>


        <ssk-card imageWidth="280px" image="https://hnsgsfp.imgix.net/4/images/detailed/145/Slide1_14bi-41.JPG?fit=fill&bg=0FFF&w=1536&h=901&auto=format,compress">
          <div slot="content">
            <ssk-text>This is some additional content inside the card.</ssk-text>
            <ssk-text size="sm" color="gray.500">This is some additional content inside the card.</ssk-text>
          </div>
        </ssk-card>

        <ssk-card loading variant="outlined">
        </ssk-card>

        <ssk-card loading variant="elevated">
        </ssk-card>

      </div>
    `;
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "elevated"],
      table: {
        defaultValue: { summary: "card" },
      },
    },
    type: {
      control: { type: "select" },
      options: ["stacked", "horizontal"],
      table: {
        defaultValue: { summary: "stacked" },
      },
    },
    title: {
      control: { type: "text" },
      defaultValue: "Product name Product name Product name",
      description: "The title of the card",
    },
    subtitle: {
      control: { type: "text" },
      defaultValue: "100 baht",
      description: "The subtitle of the card",
    },
    width: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<CardComponentArgs>;

export const Default: Story = {
  args: {
    
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
    },
  },
};