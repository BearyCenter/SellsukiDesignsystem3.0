import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/badge";
import { Badge } from "../../../src/elements/badge";
import { addPrefixToObject, baseArgsTypes } from "../helper";

type BadgeWithLabel = Badge &
  addPrefixToObject<Badge, "?"> &
  addPrefixToObject<Badge, "@"> & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
  title: "Example/Badge",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return html`<ssk-badge ${spread(args)}>${label}</ssk-badge>`;
  },
  argTypes: {
    label: {
      description: "The content of the badge",
      control: "text",
      table: {
        category: "Props",
      },
    },

    variant: {
      options: ["solid", "outline", "subtle"],
      description: "The type of badge",
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
} satisfies Meta<BadgeWithLabel>;

export default meta;

type Story = StoryObj<BadgeWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const SolidBadge: Story = {
  args: {
    variant: "solid",
    size: "md",
    label: "solid badge",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const OutlineBadge: Story = {
  args: {
    variant: "outline",
    label: "Outline Badge",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};

export const SubtleBadge: Story = {
  args: {
    variant: "subtle",
    label: "Ghost Badge",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1103%3A78477",
    },
  },
};
