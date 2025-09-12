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
    title: { control: "text" },
    subTitle: { control: "text" },
    productImage: { control: "text" },
    styleCard: { control: "select", options: ["outlined", "elevated"] },
    type: { control: "select", options: ["stacked", "horizontal"] },
    loading: { control: "boolean" },
    testId: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    description: { control: "text" },
    icons: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    productImage: "https://i.pinimg.com/736x/6e/17/23/6e17234aac711f5d2de3ec7ba56a8c4b.jpg",
    title: "Premium Headphones my name is brian i'm 24 years old, i'm from korea",
    subTitle: "฿3,500",
    styleCard: "outlined",
    testId: "test-id",
    type: "stacked",
    description: "wasdsadwdsawds",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25254-127368&t=iFV03SnDp3IkUdmJ-4",
    },
  }
};

export const StackedOutlinedDefault: Story = {
  args: {
    title: "Product name Product name Product name Product nameeeProduct name Product name",
    subTitle: "Price",
    styleCard: "outlined",
    testId: "test-id",
    type: "stacked",
  },
};
export const StackedElevatedDefault: Story = {
  args: {
    title: "Product name Product name Product name Product nameeeProduct name Product name",
    subTitle: "Price",
    styleCard: "elevated",
    testId: "test-id",
    type: "stacked",
  },
};
export const StackedOutlinedLoading: Story = {
  args: {
    loading: true,
    styleCard: "outlined", 
    testId: "loading-card",
  },
};

export const ElevatedOutlinedLoading: Story = {
  args: {
    loading: true,
    styleCard: "elevated", 
    testId: "loading-card",
  },
};
export const HorizontalOutlinedDefault: Story = {
  args: {
    styleCard: "outlined",
    title: "Product name Product name Product name Product nameeeProduct name Product name",
    subTitle: "Price",
    description: "subtext",
    testId: "horizontal-card-with-slot",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" color="red" name="outline-trash" size="md"></ssk-icon>
    </ssk-card>
  `,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25254-127368&t=iFV03SnDp3IkUdmJ-4",
    },
  },
};

export const HorizontalElevatedDefault: Story = {
  args: {
    styleCard: "elevated",
    title: "Product name Product name Product name Product nameeeProduct name Product name",
    subTitle: "Price",
    description: "subtext",
    testId: "horizontal-card-with-slot",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" color="red" name="outline-trash" size="md"></ssk-icon>
    </ssk-card>
  `,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25254-127368&t=iFV03SnDp3IkUdmJ-4",
    },
  },
};
export const HorizontalOutlinedLoading: Story = {
  args: {
    loading: true,
    styleCard: "outlined", 
    testId: "loading-card",
    type: "horizontal",
  },
};

export const HorizontalElevatedLoading: Story = {
  args: {
    loading: true,
    styleCard: "elevated", 
    testId: "loading-card",
    type: "horizontal",
  },
};

export const StackedProductCard: Story = {
  args: {
    styleCard: "outlined",
    title: "CAT001",
    subTitle: "฿100.00",
    testId: "test-id",
    type: "stacked",
  },
};
export const HorizontalProductCardDefault: Story = {
  args: {
    styleCard: "outlined",
    title: "CAT001",
    subTitle: "฿100.00",
    testId: "test-id",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" color="red" name="outline-trash" size="md"></ssk-icon>
      <div slot="content">
        <ssk-button size="sm" variant="secondary">Edit</ssk-button>
      </div>
    </ssk-card>
  `,
};

export const HorizontalProductCardFull: Story = {
  args: {
    styleCard: "outlined",
    title: "iPhone 16 Silicone Case with MagSafe – Ultramarine",
    subTitle: "฿1990.00",
    description: "ตัวเลือก:Subtext",
    testId: "test-id",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" color="red" name="outline-trash" size="md"></ssk-icon>
      <div slot="content">
        <ssk-button size="sm" variant="secondary">Edit</ssk-button>
      </div>
    </ssk-card>
  `,
};
export const HorizontalWithSlotAndIcon: Story = {
  args: {
    productImage: "https://i.pinimg.com/736x/6e/17/23/6e17234aac711f5d2de3ec7ba56a8c4b.jpg",
    styleCard: "outlined",
    testId: "horizontal-card-with-slot",
    type: "horizontal",
    title: "Product name Product name Product name Product nameeeProduct name Product name",
    subTitle: "Price",
    description: "subtext",
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
