import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card";
import { Card } from "../../../src/components/card";
import { spread } from "@open-wc/lit-helpers";

const meta: Meta<Card> = {
  title: "Example/Card",
  component: "ssk-card",
  tags: ["autodocs"],
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
    </ssk-card>

  `,
  argTypes: {
    productName: { control: "text" },
    productPrice: { control: "text" },
    productImage: { control: "text" },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    styleCard: { control: "select", options: ["outlined", "elevated"] },
    type: { control: "select", options: ["stacked", "horizontal"] },
    loading: { control: "boolean" },
    testId: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    productDescription: { control: "text" },
    icons: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    productImage: "https://i.pinimg.com/736x/6e/17/23/6e17234aac711f5d2de3ec7ba56a8c4b.jpg",
    productName: "Premium Headphones",
    productPrice: "฿3,500",
    styleCard: "outlined",
    size: "md",
    testId: "test-id",
    type: "stacked",
    productDescription: "wasdsadwdsawds",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25254-127368&t=iFV03SnDp3IkUdmJ-4",
    },
  }
};

export const WithoutImage: Story = {
  args: {
    productName: "No Product",
    productPrice: "-",
    styleCard: "outlined",
    size: "md",
    testId: "test-id",
    type: "stacked",
  },
};     

export const OutlinedStyle: Story = {
    args: {
      productImage: "https://i.pinimg.com/736x/6e/17/23/6e17234aac711f5d2de3ec7ba56a8c4b.jpg",
      productName: "Outlined Card Style",
      productPrice: "฿2,500",
      styleCard: "outlined",
      size: "md",
      testId: "test-id",
      type: "stacked",
    },
};
  
export const ElevatedStyle: Story = {
    args: {
      productImage: "https://i.pinimg.com/736x/6e/17/23/6e17234aac711f5d2de3ec7ba56a8c4b.jpg",
      productName: "Elevated Card Style", 
      productPrice: "฿3,500",
      styleCard: "elevated",
      size: "md",
      testId: "test-id",
      type: "stacked",
    },
};

export const Loading: Story = {
    args: {
      loading: true,
      styleCard: "outlined", 
      size: "md",
      testId: "loading-card",
    },
  };
export const ContentSlot: Story = {
  args: {
    productName: "Content Slot",
    productPrice: "฿4,500",
    styleCard: "outlined",
    size: "md",
    testId: "test-id",
    type: "stacked",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <div slot="content">Content Slot</div>
    </ssk-card>
  `,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25254-127368&t=iFV03SnDp3IkUdmJ-4",
    },
  },
};
export const HorizontalWithSlotAndIcon: Story = {
  args: {
    productImage: "https://i.pinimg.com/736x/6e/17/23/6e17234aac711f5d2de3ec7ba56a8c4b.jpg",
    productName: "Horizontal Card with Icon",
    productPrice: "฿2,999",
    productDescription: "This is a horizontal",
    styleCard: "outlined",
    size: "md",
    testId: "horizontal-card-with-slot",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" name="outline-trash" size="md"></ssk-icon>
      <div slot="content">
        <ssk-button size="sm" variant="secondary">Edit</ssk-button>
      </div>
    </ssk-card>
  `,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25254-127368&t=iFV03SnDp3IkUdmJ-4",
    },
  },
};