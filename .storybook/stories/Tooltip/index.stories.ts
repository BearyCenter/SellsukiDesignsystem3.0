import { Tooltip } from "../../../src/components/tooltip";
import "../../../src/components/tooltip";
import "../../../src/elements/text";
import "../../../src/elements/image";
import "../../../src/elements/container";

import { spread } from "@open-wc/lit-helpers";
import { html } from "lit";
import { baseArgsTypes, genericEvents } from "../helper";
import { ArgTypes, Meta, StoryObj } from "@storybook/web-components";

type TooltipArgs = {} & Tooltip;

const meta = {
  title: "Example/Tooltip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
The \`<ssk-tooltip>\` component supports multiple ways of defining content:

---

### 1. **Using \`label\` Prop**

For simple text content:

\`\`\`html
<ssk-tooltip label="yeahhh!!">
  <ssk-text>Hover me</ssk-text>
</ssk-tooltip>
\`\`\`

---

### 2. **Using \`slot="content"\`**

For custom content (images, formatting, etc):

\`\`\`html
<ssk-tooltip>
  <ssk-text>Hover me</ssk-text>
  <div slot="content">
    <ssk-text>Tooltip body with <b>HTML</b></ssk-text>
  </div>
</ssk-tooltip>
\`\`\`

---

### 3. **Combining \`label\` and \`slot="content"\`**

Use \`label\` as a title, and \`slot="content"\` as a detailed body:

\`\`\`html
<ssk-tooltip label="Title">
  <ssk-text>Hover me</ssk-text>
  <div slot="content">
    <ssk-text>Additional details shown in the body.</ssk-text>
  </div>
</ssk-tooltip>
\`\`\`
`.trim(),
      },
    },
  },
  render: ({ ...args }) => {
    return html` <style>
        div.container {
          margin: auto;
          margin-top: 15%;
          width: 60%;
          display: flex;
          justify-content: center;
        }
      </style>

      <div class="container">
        <ssk-tooltip ${spread(args)}>
          <ssk-text>Hover me</ssk-text>
        </ssk-tooltip>
      </div>`;
  },
  argTypes: {
    placement: {
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "topleft",
        "topright",
        "bottomleft",
        "bottomright",
        "lefttop",
        "leftbottom",
        "righttop",
        "rightbottom",
      ],
      description: "The type of placement",
      control: "select",
      table: {
        category: "Props",
        defaultValue: {
          summary: "top",
        },
        type: {
          summary: "string",
        },
      },
    },
    "?hideArrow": {
      description: "When true gives the arrow of tooltips disapparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    "?hideCloseButton": {
      description:
        "When true gives the close button in tooltip will disapparence",
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
    },
    trigger: {
      options: ["hover", "click"],
      description: "The type of trigger for show tooltip",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "hover",
        },
        type: {
          summary: "string",
        },
      },
    },
    maxWidth: {
      control: {
        type: "text",
      },
      description: "Maximum width of tooltip",
      table: {
        category: "Props",
        defaultValue: {
          summary: "max-content",
        },
        type: {
          summary: "string",
        },
      },
    },
    themeColor: baseArgsTypes.themeColor,
    color: baseArgsTypes.color,
    size: baseArgsTypes.size,
  },
} satisfies Meta<TooltipArgs>;

export default meta;

type Story = StoryObj<TooltipArgs>;

export const Default: Story = {
  args: {
    size: "md",
    label: "yeahhh!!",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
};

export const NoCloseButton: Story = {
  args: {
    size: "md",
    "?hideCloseButton": true,
    label: "yeahhh!!",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
};

export const NoArrow: Story = {
  args: {
    size: "md",
    "?hideArrow": true,
    label: "yeahhh!!",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
};

export const MoreContent: Story = {
  args: {
    size: "md",
    label: "Text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2870-27764&mode=design&t=JZk8oYHsyfXqi2od-4",
    },
  },
  render: ({ ...args }) => {
    return html`<style>
        div.container {
          margin: auto;
          margin-top: 15%;
          width: 60%;
          display: flex;
          justify-content: center;
        }

        div.content {
          display: grid;
          justify-items: center;
          text-align: center;
        }
      </style>

      <div class="container">
        <ssk-tooltip ${spread(args)}>
          <ssk-text>Hover me</ssk-text>
          <div class="content" slot="content">
            <ssk-image
              src="https://example.com/404.jpg"
              fallbacksrc="https://placehold.co/200x100"
              alt="demo image"
            >
            </ssk-image>
            <ssk-text>
              Modal body goes here. <br/ >You have several styles to choose from
              just in case.
            </ssk-text>
          </div>
        </ssk-tooltip>
      </div>`;
  },
};
