import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card";
import { baseArgsTypes } from "../helper";
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
    title: { 
      control:{
        type: "text"
      },
      description: "The title of the card",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
      
    },
    subtitle: { 
      control: {
        type: "text"
      },
      description: "The subtitle of the card",
      table: {
        category: "Props",
        type: {
          summary: "string",
        },
      },
     },
    image: { 
      control: {
        type: "text"
      },
      description: "The image of the card",
      table: {
        category: "Props",
      },
    },
    variant: { 
      control: {
        type: "select"
      },
      options: ["outlined", "elevated"],
      description: "The style of the card",
      table: {
        category: "Props",
        defaultValue: {
          summary: "outlined",
        },
        type: {
          summary: "string",
        },
      },
    },
    type: { 
      control: {
        type: "select"
      },
      options: ["stacked", "horizontal"],
      description: "The type layout of the card",
      table: {
        category: "Props",
        defaultValue: {
          summary: "stacked",
        },
      },
    },
    loading: { 
      control: {
        type: "boolean"
      },
      description: "The loading of the card",
      table: {
        category: "Props",
        defaultValue: {
          summary: false,
        },
        type: {
          summary: "boolean",
        },
      },
    },
    testId: { 
      control: {
        type: "text"
      },
      description: "The test ID for the card",
      table: {
        category: "Props",
        defaultValue: {
          summary: "test-id",
        },
        type: {
          summary: "string",
        },
      },
    },
    width: { 
      control: {
        type: "text"
      },
      description: "The width of the card",
      table: {
        category: "Props",
        defaultValue: {
          summary: "376px",
        },
        type: {
          summary: "string",
        },
      }
    },
    description: { control: {
      type: "text"
      },
      description: "The description of the card",
      table: {
        category: "Props",
        defaultValue: {
          summary: "subtext",
        },
        type: {
          summary: "string",
        },
    }
  },
  color: baseArgsTypes.color,
    
    "slot:icon": { 
      description: "The icon of the card horizontal",
      table:{category: "Slots"},
    },
    "slot:content": { 
      description: "Choose either props or slot, not both. Use this slot only if no props (title, subtitle, description) are set.",
      table:{category: "Slots"},
    },
    "slot:footer": { 
      description: "The slot for the footer of layout horizontal",
      table:{category: "Slots"},
    },
  } as any,
  
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    image: "https://placehold.co/600x400",
    title: "CAT001",
    subtitle: "฿100.00",
    variant: "outlined",
    testId: "test-id",
    type: "stacked",
    description: "subtext",
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
    variant: "outlined",
    testId: "test-id",
    type: "stacked",
  },
};
export const StackedElevatedDefault: Story = {
  args: {
    title: "Product name Product name Product name Product nameeeProduct name Product name",
    subtitle: "Price",
    variant: "elevated",
    testId: "test-id",
    type: "stacked",
  },
};
export const StackedOutlinedLoading: Story = {
  args: {
    loading: true,
    variant: "outlined", 
    testId: "loading-card",
  },
};

export const ElevatedOutlinedLoading: Story = {
  args: {
    loading: true,
    variant: "elevated", 
    testId: "loading-card",
  },
};
export const HorizontalOutlinedDefault: Story = {
  args: {
    variant: "outlined",
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
    variant: "elevated",  
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
    variant: "outlined", 
    testId: "loading-card",
    type: "horizontal",
  },
};

export const HorizontalElevatedLoading: Story = {
  args: {
    loading: true,
    variant: "elevated", 
    testId: "loading-card",
    type: "horizontal",
  },
};
export const HorizontalProductCardDefault: Story = {
  args: {
    image: "https://placehold.co/200x300",
    variant: "outlined",
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
          <div style="display: flex; flex-direction: column; align-items: center; width:56px">
            <ssk-icon name="solid-plus" size="xs" margin="0 0 8px 0" cursor="pointer"></ssk-icon>
            <div style="border: 1px solid #ccc; border-radius: 4px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
              <ssk-text size="md">1</ssk-text>
            </div>
            <ssk-icon name="solid-minus" size="xs" cursor="pointer"></ssk-icon>
          </div>
      </div>
    </ssk-card>
  `,
};

export const HorizontalProductCardFull: Story = {
  args: {
    image: "https://placehold.co/200x300",
    variant: "outlined",
    title: `iPhone 16 Silicone Case with MagSafe – Ultramarine`,
    subtitle: "฿1990.00",
    description: "ตัวเลือก:Subtext",
    testId: "test-id",
    type: "horizontal",
    color: "primary",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <ssk-icon slot="icon" color="red" name="outline-trash" size="md"></ssk-icon>
      <div slot="footer">
        <div style="display: flex; flex-direction: column; align-items: center; width:56px ">
          <ssk-icon name="solid-plus" size="xs" margin="0 0 8px 0" cursor="pointer"></ssk-icon>
          <div style="border: 1px solid #ccc; border-radius: 4px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
            <ssk-text size="md">1</ssk-text>
          </div>
          <ssk-icon name="solid-minus" size="xs" cursor="pointer"></ssk-icon>
        </div>
      </div>
    </ssk-card>
  `,
};
export const HorizontalProductCardWithOutButton: Story = {
  args: {
      image: "https://placehold.co/200x300",
    variant: "outlined",
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
          <ssk-icon name="solid-plus" size="xs" margin="0 0 8px 0" cursor="pointer"></ssk-icon>
          <div style="border: 1px solid #ccc; border-radius: 4px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
            <ssk-text size="md">1</ssk-text>
          </div>
          <ssk-icon name="solid-minus" size="xs" cursor="pointer"></ssk-icon>
        </div>
      </div>
    </ssk-card>
  `,
};

export const HorizontalProductCardNoSlotSubtextOnly: Story = {
  args: {
    image: "https://placehold.co/200x300",
    variant: "outlined",
    title: "iPhone 16 Silicone Case with MagSafe – Ultramarine",
    description: "ตัวเลือก:Subtext",
    testId: "test-id",
    type: "horizontal",
  },
};
export const HorizontalProductCardNoSlotPriceOnly: Story = {
  args: {
    image: "https://placehold.co/200x300",
    variant: "outlined",
    testId: "test-id",
    type: "horizontal",
  },
  render: ({...args}) => html`
  <div style="cursor: pointer;">
    <ssk-card
     ${spread({...args})}
    >
      <div slot="content">
            <ssk-text size="sm">iPhone 16 Silicone Case with MagSafe – Ultramarine</ssk-text>
            <ssk-text size="md" color="info.500">1,990.00</ssk-text>
      </div>
    </ssk-card>
  </div>
  `,      
};

export const StackedSlotContent: Story = {
  args: {
    image: "https://placehold.co/200x300",
    variant: "outlined",
    testId: "test-id",
    type: "stacked",
  },
  render: ({...args}) => html`
    <ssk-card
     ${spread({...args})}
    >
      <div slot="content">
        <div style="padding: 12px 16px;">
            <ssk-text size="sm">iPhone 16 Silicone Case with MagSafe – Ultramarine</ssk-text>
            <ssk-text size="md" color="info.500">1,990.00</ssk-text>
          </div>
      </div>
    </ssk-card>
  `,
};


