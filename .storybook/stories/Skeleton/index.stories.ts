import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/skeleton";
import { Skeleton } from "../../../src/components/skeleton";
import { AutoLitProperty } from "../helper";

type SkeletonArgs = AutoLitProperty<Skeleton>;

const meta: Meta<Skeleton> = {
  title: "Example/Skeleton",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
     <ssk-skeleton ${spread({ ...args })}></ssk-skeleton>
    `;
  },
  argTypes: {
    skeletonShape: {
      control: { type: 'select' },
      options: ['rectangle', 'circle', 'square'],
      description: 'Shape of the skeleton loader (default: rectangle).\n\n**Note:** When no width is provided, the shape adapts to maintain aspect ratio.\n\n**For example**, a "rectangle" shape without width will render as a circular loader with a default size. This design provides flexibility across different use cases and layouts.',
      defaultValue: 'rectangle'
    },
    skeletonSize: {
      control: { type: 'select' },
      options: [ 
        '', 'xs3', 'xs2', 'xs', 'md', 'xl', 
        'xl2', 'xl3', 'xl4', 'xl5', 
        'xl6', 'xl7', 'xl8', 'xl9'
      ],
      description: 'Size of the skeleton loader',
      defaultValue: 'md'
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width of the skeleton loader',
    },
    height: {
      control: { type: 'text' },
      description: 'Custom height of the skeleton loader',
    },
    animationDuration: {
      control: { type: 'number', min: 100, step: 100 },
      description: 'Animation duration in milliseconds',
      defaultValue: 800
    },
  }
};

export default meta;

type Story = StoryObj<SkeletonArgs>;

export const DefaultMedium: Story = {
  args: {
    
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=19205-8618",
    },
  },
};