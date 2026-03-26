import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card-expandable";
import { spread } from "@open-wc/lit-helpers";

const meta: Meta = {
    title: "Components/Data Display/CardExpandable/ExpandFromHeader",
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["outlined", "elevated"],
            table: {
                defaultValue: { summary: "card" },
            },
            description: "The variant style of the expandable card",
        },
        type: {
            control: { type: "select" },
            options: ["expand-header", "expand-footer"],
            table: {
                defaultValue: { summary: "expand-header" },
            },
            description: "The type of the expandable card",
        },
        title: {
            control: { type: "text" },
            defaultValue: "Product name Product name Product name",
            description: "The title(optional)  of the expandable card if didn't sent will not display",
        },
        subtitle: {
            control: { type: "text" },
            defaultValue: "100 baht",
            description: "The subtitle(optional) of the expandable card if didn't sent will not display",
        },
        radius: {
            control: { type: "text" },
            table: {
                defaultValue: { summary: "8px" },
            },
            description: "The radius of the expandablecard",
        },
        width: {
            control: { type: "text" },
            table: {
                defaultValue: { summary: '366px' },
            },
            description: "The width of the expandable card can use px, %, em, rem",
        },
        height: {
            control: { type: "text" },
            table: {
                defaultValue: { summary: 'auto' },
            },
            description: "The height of the expandable card can use px, %, em, rem",
        },
        "hideToggle?": {
            description: "Hide the expand/collapse toggle icon in Header",
            table: {
                defaultValue: { summary: false },
            },
            control: { disable: true },
        },
        "slot:toggle": {
            description: "Change the toggle icon of the expandable card",
            table: { category: "slots" },
            control: { disable: true },
        },
        "slot:header": {
            description: "Content in front of title and subtitle that's can custom in header of the expandable card (space to display: 48px * 48px)",
            table: { category: "slots" },
            control: { disable: true },
        },
        "slot:content": {
            description: "Content that's can custom in header of the expandable card",
            table: { category: "slots" },
            control: { disable: true },
        },
        "slot:expand": {
            description: "Content to be shown when the card is expanded",
            table: { category: "slots" },
            control: { disable: true },
        },
    }
};
export default meta;

type Story = StoryObj;

export const CardExpandOutlinedHeaderWithTitleAndSubtitle: Story = {
    args: {
        width: "366px",
        title: "Text 1",
        subtitle: "Text 2",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
        },
    },
    render: ({ ...args }) => {
        return html`
      <ssk-expandable-card ${spread({ ...args })}>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandOutlinedHeaderWithTitle: Story = {
    args: {
        width: "366px",
        title: "Text 1",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
        },
    },
    render: ({ ...args }) => {
        return html`
      <ssk-expandable-card ${spread({ ...args })}>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandOutlinedHeaderWithTitleSubtitleAndSlot: Story = {
    args: {
        width: "366px",
        title: "Text 1",
        subtitle: "Text 2",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
        },
    },
    render: ({ ...args }) => {
        return html`
      <ssk-expandable-card ${spread({ ...args })}>
        <div slot="header" style="width: 366px; height: 366px; display:flex; align-items:center; justify-content:center; background:#eef; ">
          <ssk-icon name="solid-cube"></ssk-icon>
        </div>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandEvalatedHeaderWithTitleAndSubtitle: Story = {
    args: {
        width: "366px",
        title: "Text 1",
        subtitle: "Text 2",
        variant: "elevated",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
        },
    },
    render: ({ ...args }) => {
        return html`
      <ssk-expandable-card ${spread({ ...args })}>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandEvalatedHeaderWithTitle: Story = {
    args: {
        width: "366px",
        title: "Text 1",
        variant: "elevated",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
        },
    },
    render: ({ ...args }) => {
        return html`
      <ssk-expandable-card ${spread({ ...args })}>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandEvalatedHeaderWithTitleSubtitleAndSlot: Story = {
    args: {
        width: "366px",
        title: "Text 1",
        subtitle: "Text 2",
        variant: "elevated",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
        },
    },
    render: ({ ...args }) => {
        return html`
      <ssk-expandable-card ${spread({ ...args })}>
        <div slot="header" style="width: 366px; height: 366px; display:flex; align-items:center; justify-content:center; background:#eef; ">
          <ssk-icon name="solid-cube"></ssk-icon>
        </div>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandHeaderLoading: Story = {
    args: {
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1881-53250&p=f&t=XTJhz0YZzlN5r0rX-0",
        },
    },
    render: ({ ...args }) => {
        return html`
      <ssk-expandable-card ${spread({ ...args })} loading>
      </ssk-expandable-card>
    `;
    },
};