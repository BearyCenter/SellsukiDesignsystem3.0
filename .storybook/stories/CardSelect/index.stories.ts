import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/card-select";
import "../../../src/elements/card-select/group";
import "../../../src/elements/text";
import { CardSelect } from "../../../src/elements/card-select";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type CardSelectDefault = AutoLitProperty<CardSelect> & { label: string } &
AutoLitProperty<CardSelect> & { supportText: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction

const meta = {
  title: "Components/Data Display/CardSelect",
  tags: ["autodocs"],
  render: ({ label,supportText, ...args }) => {
    return html`
    <style>
      .icon-style {
        padding-top: 0.5rem;
      }
      .text-lable {
        margin-top: 1rem;
      }
      .support-text {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
    </style>

    <ssk-card-select ${spread(args)}>
      <div class="icon-style">
        <ssk-icon name="outline-ellipsis-horizontal-circle" size="3xl"></ssk-icon>
      </div>
      <div class="text-lable">
        ${label}
      </div>
      <div class="support-text">
        <ssk-text size="sm" color="gray.500">${supportText}</ssk-text>
      </div>

    </ssk-card-select>
    `;
  },
  argTypes: {
    label: {
      description: "Label",
      control: "text",
      table: {
        category: "Props",
      },
    },
    supportText: {
      description: "Support Text",
      control: "text",
      table: {
        category: "Props",
      },
    },
    cardSize: {
      options: ["md", "sm",],
      description: "The type of CardSelect",
      control: {
        type: "inline-radio",
      },
      table: {
        category: "Props",
        defaultValue: {
          summary: "md",
        },
        type: {
          summary: "string",
        },
      },
    },
    "?disabled": {
      description: "When true gives the button a disabled apparence",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "?selected":{
      description: "When true gives the icon appearance",
      control: {
        type: "boolean",
      },
      table: {
        category: "Props",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    "@click": genericEvents["@click"],
    ...baseArgsTypes,
  },
} satisfies Meta<CardSelectDefault>;

export default meta;

type Story = StoryObj<CardSelectDefault>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const CardSelectSizeMD: Story = {
  args: {
    cardSize: "md",
    size: "md",
    label: "Label md ",
    supportText: "Support Text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=13326-4194&t=R5iTnTJwiduj6bpX-0",
    },
  },
};

export const CardSelectSizeSM: Story = {
  args: {
    cardSize: "sm",
    label: "Label sm",
    supportText: "Support Text",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=13326-4194&t=R5iTnTJwiduj6bpX-0",
    },
  },
};

export const CardShowSelect: Story = {
  args: {
    cardSize: "md",
    label: "Label",
    supportText: "Support Text",
    "?selected": true,

  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=13326-4194&t=R5iTnTJwiduj6bpX-0",
    },
  },
};

export const CardShowDisabled: Story = {
  args: {
    cardSize: "md",
    label: "Label",
    supportText: "Support Text",
    "?disabled": true,

  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=13326-4194&t=R5iTnTJwiduj6bpX-0",
    },
  },
};

export const CardSelectGroupStory: StoryObj = {
  args: {
    cards: [
      { id: 1, label: "Card 1", supportText: "Support Text 1", cardSize: "md", selected: true, disabled: false, icon: 'outline-ellipsis-horizontal-circle'},
      { id: 2, label: "Card 2", supportText: "Support Text 2", cardSize: "md", selected: false, disabled: false, icon: 'outline-user-circle'},
      { id: 3, label: "Card 3", supportText: "Support Text 3", cardSize: "md", selected: false, disabled: false, icon: 'outline-document-text'},
    ],
  },
  render: (args) => {
    return html`<ssk-card-group .cards=${args.cards}></ssk-card-group>`;
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=13326-4194&t=R5iTnTJwiduj6bpX-0",
    },
  },
};

