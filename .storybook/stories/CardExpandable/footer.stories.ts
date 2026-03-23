import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/card-expandable";
import { spread } from "@open-wc/lit-helpers";
import { de } from "date-fns/locale";

const meta: Meta = {
    title: "Components/Data Display/CardExpandable/ExpandFromFooter",
    tags: ["autodocs"],
    argTypes: {
        "hideText?": {
            description: "Hide the text 'view more/ view less' in the footer",
            table: {
                defaultValue: { summary: false },
            },
            control: { disable: true },
        },
        "hideToggle?": {
            description: "Hide the expand/collapse toggle icon in the footer",
            table: {
                defaultValue: { summary: false },
            },
            control: { disable: true },
        },
        "slot:content": {
            description: "Main content of the card (displayed when not expanded)",
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

export const CardExpandOutlinedFooterWithContent: Story = {
    args: {
        width: "366px",
        type: "expand-footer",
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
        <div slot="content" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
            <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Expand</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandEvalatedFooterWithContent: Story = {
    args: {
        width: "366px",
        type: "expand-footer",
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
        <div slot="content" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
            <ssk-text size="md" fontWeight="medium">Content</ssk-text>
        </div>
        <div slot="expand" style="display:flex; align-items:center; justify-content:center; padding: 16px;">
          <ssk-text size="md" fontWeight="medium">Expand</ssk-text>
        </div>
      </ssk-expandable-card>
    `;
    },
};

export const CardExpandFooterLoading: Story = {
    args: {
        type: "expand-footer",
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