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
            description: "All step",
        },
    },
} satisfies Meta<StepperWithLabel>;

export default meta;

type Story = StoryObj<StepperWithLabel>;

export const Default: Story = {
    args: {
        ".steps": [
            {
                "title": "Start",
                "description": "This is the start step",
                "status" : "wait",
                "progress": 15,
            },
            {
                "title": "Step 2",
                "description": "This is the 2nd step with icon",
                "status" : "finish",
                "progress": 70,
                "icon": "solid-wallet"
            },
            {
                "title": "Step 3",
                "description": "This is the 3rd step error with icon",
                "status" : "error",
                "progress": 50,
            },
            {
                "title": "Step final",
                "description": "This is the final step",
                "status" : "wait",
                "progress": 100,
            }
        ],
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2402-94154&mode=design&t=wTjsRFcYUIkEJHSz-0",
        },
    },
};