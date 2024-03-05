import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/tabs";
import { Tabs } from "../../../src/components/tabs";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";


type TabsWithLabel = AutoLitProperty<Tabs> & { labels: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
    title: "Example/Tabs",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`
        <ssk-tabs ${spread({ ...args })}>
        </ssk-tabs>
    `;
    },
    argTypes: {
        variant: {
            options: ["primary", "secondary"],
            description: "The type of button",
            control: {
                type: "inline-radio",
            },
            table: {
                category: "Props",
                defaultValue: {
                    summary: "primary",
                },
                type: {
                    summary: "string",
                },
            },
        },
        tabSize: {
            options: ["sm", "md"],
            control: "select",
            table: {
                category: "Props",
            }
        },
    },
} satisfies Meta<TabsWithLabel>;

export default meta;

type Story = StoryObj<TabsWithLabel>;

export const Default: Story = {
    args: {
        ".labels": ['Tab items 1', 'Tab items 2'],
        ".panel": ['this is content from 1', 'this is content from 2'],
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2260-34872&mode=design&t=7zLQqFkUWnN3q4pJ-0",
        },
    },
};
