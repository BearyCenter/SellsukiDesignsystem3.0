import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import "../../../src/elements/widget-example";
import { WidgetExample } from "../../../src/elements/widget-example";
import { baseArgsTypes } from "../helper";

type WidgetExampleArgs = {} & WidgetExample;

const meta = {
    title: "Example/WidgetExample",
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
        <ssk-widget-example ${spread(args)}>
        </ssk-widget-example>
    `;
    },
    args: {
        testId: 'storybook-test-id',
    },
    argTypes: {
        testId: { control: 'text', description: 'Test ID for testing' },
        ...baseArgsTypes,
    },
} satisfies Meta<WidgetExampleArgs>;

export default meta;

type Story = StoryObj<WidgetExampleArgs>;

export const Default: Story = {
    args: {
        testId: "001",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1207-74259&mode=design&t=MziV72cf9HzxkHHr-0",
        },
    },
};
