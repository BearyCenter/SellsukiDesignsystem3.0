import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/icon";
import "../../../src/elements/input-tag";
import { Inputtag } from "../../../src/elements/input-tag";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type InputTagWithLabel = AutoLitProperty<Inputtag> & { label: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
    title: "Example/InputTag",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`<ssk-input-tag ${spread({ ...args })}> </ssk-input-tag>`;
    },
    argTypes: {
        label: {
            description: "The content of the input tag",
            control: "text",
        },
        hidden: {
            control: {
                type: "boolean",
            },
        },
        multiline: {
            control: {
                type: "boolean",
            },
        },
        ".tags": {
            description: "Array of tags",
            control: {
                type: "array",
            },
        },
        "@click": genericEvents["@click"],
        "@input": genericEvents["@input"],
        "@change": genericEvents["@change"],
        ...baseArgsTypes,
    },
} satisfies Meta<InputTagWithLabel>;
export default meta;

type Story = StoryObj<InputTagWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const InputTag: Story = {
    args: {
        label: "InputTag",
        placeholder: "Placeholder",
        helperText: "Helper text",
        limit: 69,
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
        },
    },
};

export const InputTagWithMultiline: Story = {
    args: {
        label: "InputTag",
        placeholder: "Placeholder",
        helperText: "Helper text",
        limit: 69,
        ".tags": ["product", "dashboard", "code"],
        multiline: true,

    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=1123-65244",
        },
    },
};
