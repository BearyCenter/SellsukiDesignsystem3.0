import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import "../../../src/elements/widget-matric";
import { WidgetMatric } from "../../../src/elements/widget-matric";
import { baseArgsTypes } from "../helper";

type WidgetMatricArgs = {} & WidgetMatric;

const meta = {
    title: "Example/WidgetMatric",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`
        <style>
            .item-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
        </style>
        <ssk-widget-matric ${spread(args)}>
        </ssk-widget-matric>
    `;
    },
    args: {
        testId: 'storybook-test-id',
    },
    argTypes: {
        testId: { control: 'text', description: 'Test ID for testing' },
        ...baseArgsTypes,
    },
} satisfies Meta<WidgetMatricArgs>;

export default meta;

type Story = StoryObj<WidgetMatricArgs>;

export const Default: Story = {
    args: {
        testId: "001",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25417-129570&p=f&t=XIXTFazUQ6frUs0i-0",
        },
    },
};
