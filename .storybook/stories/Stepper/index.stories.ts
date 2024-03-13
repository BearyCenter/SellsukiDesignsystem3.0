import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/stepper";
import "../../../src/elements/badge";
import "../../../src/elements/text";
import { Stepper } from "../../../src/components/stepper";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";


type StepperWithLabel = AutoLitProperty<Stepper> & { labels: string };

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
    title: "Example/Stepper",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`
        <ssk-stepper ${spread({ ...args })}>
        </ssk-stepper>
        `;
    },

    argTypes: {
        
    },
} satisfies Meta<StepperWithLabel>;

export default meta;

type Story = StoryObj<StepperWithLabel>;

export const Default: Story = {
    args: {
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2402-94154&mode=design&t=wTjsRFcYUIkEJHSz-0",
        },
    },
};
