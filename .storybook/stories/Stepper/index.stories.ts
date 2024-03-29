import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";

import { html } from "lit";
import "../../../src/components/stepper";
import { Stepper } from "../../../src/components/stepper";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";


type StepperWithLabel = AutoLitProperty<Stepper> & { description : string} &{ label: string};

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
    title: "Example/Stepper",
    tags: ["autodocs"],
    render: ({ label, ...args }) => {
        
        return html`
                <ssk-stepper ${spread({ ...args })}>
                </ssk-stepper>
                `;
            },
    argTypes: {
        ".steps": {
            description: "Number of step",
            table: {
                type: {
                    summary: "number",
                },
            }
        },
        percent: {
            description: "Number of percent",
            table: {
                type: {
                    summary: "number",
                },
            }
        },
        errorStep: {
            description: "where of error step",
            control: "number",
        },
        currentStep: { control: { type: 'number' } },
        // errorStep: { control: { type: 'array' } },
    },
} satisfies Meta<StepperWithLabel>;

export default meta;

type Story = StoryObj<StepperWithLabel>;

export const Default: Story = {
    args: {
        ".steps": [
            { name: 'start', description: 'this is the start step' },
            { name: 'second', description: 'this is the second step' },
            { name: 'third', description: 'this is the third step' },
        ],
        percent : 10,
        currentStep: 0,
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2402-94154&mode=design&t=wTjsRFcYUIkEJHSz-0",
        },
    },
};