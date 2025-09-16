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
    subtitle: { control: "text" },
    image: { control: "text" },
    styleCard: { control: "select", options: ["outlined", "elevated"] },
    type: { control: "select", options: ["stacked", "horizontal"] },
    loading: { control: "boolean" },
    testId: { control: "text" },
    width: { control: "text" },
    height: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    image: "https://placehold.co/600x400",
    title: "Premium Headphones my name is brian i'm 24 years old, i'm from korea",
    subtitle: "฿3,500",
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
    subtitle: "Price",
    styleCard: "outlined",
    testId: "test-id",
    type: "stacked",
  },
};
export const StackedElevatedDefault: Story = {
  args: {
    title: "Product name Product name Product name Product nameeeProduct name Product name",
    subtitle: "Price",
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
    subtitle: "Price",
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
    subtitle: "Price",
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
    subtitle: "฿100.00",
    testId: "test-id",
    type: "stacked",
    image: "https://placehold.co/600x400",
  },
};
export const HorizontalProductCardDefault: Story = {
  args: {
    image: "https://placehold.co/200x300",
    styleCard: "outlined",
    title: "CAT001",
    subtitle: "฿100.00",
    testId: "test-id",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" color="red" name="outline-trash" size="md"></ssk-icon>
      <div slot="footer">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <ssk-icon name="solid-plus" size="xs" margin="0 0 8px 0"></ssk-icon>
          <div style="border: 1px solid #ccc; border-radius: 4px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
            <ssk-text size="md">1</ssk-text>
          </div>
          <ssk-icon name="solid-minus" size="xs"></ssk-icon>
        </div>
      </div>
    </ssk-card>
  `,
};

export const HorizontalProductCardFull: Story = {
  args: {
    image: "https://placehold.co/200x300",
    styleCard: "outlined",
    title: `iPhone 16 Silicone Case with MagSafe – Ultramarine`,
    subtitle: "฿1990.00",
    description: "ตัวเลือก:Subtext",
    testId: "test-id",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" color="red" name="outline-trash" size="md"></ssk-icon>
      <div slot="footer">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <ssk-icon name="solid-plus" size="xs" margin="0 0 8px 0"></ssk-icon>
          <div style="border: 1px solid #ccc; border-radius: 4px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
            <ssk-text size="md">1</ssk-text>
          </div>
          <ssk-icon name="solid-minus" size="xs"></ssk-icon>
        </div>
      </div>
    </ssk-card>
  `,
};
export const HorizontalProductCardWithOutButton: Story = {
  args: {
      image: "https://placehold.co/200x300",
    styleCard: "outlined",
    title: "CAT0001",
    subtitle: "฿100.00",
    testId: "test-id",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <div slot="footer">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <ssk-icon name="solid-plus" size="xs" margin="0 0 8px 0"></ssk-icon>
          <div style="border: 1px solid #ccc; border-radius: 4px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
            <ssk-text size="md">1</ssk-text>
          </div>
          <ssk-icon name="solid-minus" size="xs"></ssk-icon>
        </div>
      </div>
    </ssk-card>
  `,
};

export const HorizontalProductCardNoSlotSubtextOnly: Story = {
  args: {
    image: "https://placehold.co/200x300",
    styleCard: "outlined",
    title: "iPhone 16 Silicone Case with MagSafe – Ultramarine",
    description: "ตัวเลือก:Subtext",
    testId: "test-id",
    type: "horizontal",
  },
};
export const HorizontalProductCardNoSlotPriceOnly: Story = {
  args: {
    image: "https://placehold.co/200x300",
    styleCard: "outlined",
    testId: "test-id",
    type: "horizontal",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <div slot="content">
        <content-section>
            <ssk-text size="sm">iPhone 16 Silicone Case with MagSafe – Ultramarine</ssk-text>
            <ssk-text size="md" color="info.500">1,990.00</ssk-text>
          </content-section>
      </div>
    </ssk-card>
  `,
};


