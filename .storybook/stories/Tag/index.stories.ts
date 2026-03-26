import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/tag";
import { Tag } from "../../../src/elements/tag";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type TagWithLabel = AutoLitProperty<Tag> & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Components/Data Display/Tag",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return html`<ssk-tag ${spread(args)}>${label}</ssk-tag>`;
  },
  argTypes: {
    label: {
      description: "The content of the tag",
      control: "text",
      table: {
        category: "Props",
      },
    },

    variant: {
      options: ["solid", "outline", "subtle"],
      description: "The type of tag",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "solid",
        },
        type: {
          summary: "string",
        },
      },
    },
    ...baseArgsTypes,
  },
} satisfies Meta<TagWithLabel>;

export default meta;

type Story = StoryObj<TagWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const SolidTag: Story = {
  args: {
    variant: "solid",
    size: "md",
    label: "solid tag",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const OutlineTag: Story = {
  args: {
    variant: "outline",
    label: "Outline Tag",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const SubtleTag: Story = {
  args: {
    variant: "subtle",
    label: "Ghost Tag",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
