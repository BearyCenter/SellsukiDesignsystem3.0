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
            <div style="display: flex; gap: 10px;">
                <ssk-stepper ${spread({ ...args })}>
                    <p slot="description-error-slot"> this is description of error </p>
                    <p slot="description-in-progress-slot"> this is description of in progress </p>
                    <p slot="description-finished-slot"> this is description of finished</p>
                    <p slot="description-waiting-slot"> this is description of waiting </p>
                </ssk-stepper>
            </div>
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
        }
    },
} satisfies Meta<StepperWithLabel>;

export default meta;

type Story = StoryObj<StepperWithLabel>;

export const Default: Story = {
    args: {
        ".steps": [
            1,2,3
        ],
        percent : 10
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2402-94154&mode=design&t=wTjsRFcYUIkEJHSz-0",
        },
    },
};