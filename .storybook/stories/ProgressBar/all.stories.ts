import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/modal";
import "../../../src/components/progress-bar";
import { ProgressBar } from "../../../src/components/progress-bar";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type ProgressBarWithLabel = AutoLitProperty<ProgressBar> & { label: string };

const meta: Meta<ProgressBarWithLabel> = {
    title: "Components/Feedback & Loading/ProgressBar",
    tags: [""],
    render: ({ label, ...args }) => {
        return html`
        <ssk-text size="lg">
                    ---------------------{ Progress bar label bottom }---------------------
        </ssk-text>
        <div class="all" style="display: flex;">
            <div class="md" style="display: flex; flex-direction: column; align-items: center;">
                <ssk-text size="md">
                    size md
                </ssk-text>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="0"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="10"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="30"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="50"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="70"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="100"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="success"
                    value="100"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="success"
                    value="100"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="error"
                    value="50"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="error"
                    value="58"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
            </div>
            <div class="sm" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                <ssk-text size="md">
                    size sm
                </ssk-text>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="0"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="10"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="30"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="50"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="70"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="100"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="success"
                    value="100"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="success"
                    value="100"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="error"
                    value="50"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="error"
                    value="58"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
            </div>
        </div>
        <ssk-text size="lg">
                    ---------------------{ Progress bar label top }---------------------
        </ssk-text>
        <div class="all" style="display: flex;">
            <div class="md" style="display: flex; flex-direction: column; align-items: center;">
                <ssk-text size="md">
                    size md
                </ssk-text>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="0"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="10"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="30"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="50"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="70"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="100"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="success"
                    value="100"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="success"
                    value="100"
                    labelPosition="top"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="error"
                    value="50"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="error"
                    value="58"
                    labelPosition="top"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
            </div>
            <div class="sm" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                <ssk-text size="md">
                    size sm
                </ssk-text>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="0"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="10"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="30"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="50"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="70"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="100"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="success"
                    value="100"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="success"
                    value="100"
                    styleOfProgress="icon"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="error"
                    value="50"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="error"
                    value="58"
                    styleOfProgress="icon"
                    labelPosition="top"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
            </div>
        </div>
        <ssk-text size="lg">
                    ---------------------{ Progress bar label right }----------------------------
        </ssk-text>
        <div class="all"">
            <div class="md" style="display: flex; flex-direction: column;">
                <ssk-text size="md">
                    size md
                </ssk-text>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="0"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="10"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="30"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="50"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="70"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="in-progress"
                    value="100"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="success"
                    value="100"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="success"
                    value="100"
                    labelPosition="right"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="error"
                    value="50"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="md"
                    status="error"
                    value="58"
                    labelPosition="right"
                    styleOfProgress="icon"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
            </div>
            <div class="sm" style="display: flex; flex-direction: column; justify-content: space-between;">
                <ssk-text size="md">
                    size sm
                </ssk-text>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="0"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="10"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="30"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="50"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="70"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="in-progress"
                    value="100"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="success"
                    value="100"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="success"
                    value="100"
                    styleOfProgress="icon"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="error"
                    value="50"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
                <ssk-progress-bar 
                    label="${label}" 
                    size="sm"
                    status="error"
                    value="58"
                    styleOfProgress="icon"
                    labelPosition="right"
                    ${spread({ ...args })}
                >
                </ssk-progress-bar>
            </div>
        </div>
        `;
    },
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Progress label'
        },
        size: {
            options: ['sm', 'md'],
            control: { type: 'select' },
            description: 'Size of the progress bar'
        },
        value: {
            control: { type: 'number' },
            description: 'Progress percentage (0-100)'
        },
        labelPosition: {
            options: ['top', 'bottom', 'right'],
            control: {
                type: "select",
            },
            description: 'Position of the label relative to the progress bar'
        },
        status: {
            options: ['in-progress', 'error', 'success'],
            control: { type: 'select' },
            description: 'Current status of the progress bar'
        },
        styleOfProgress: {
            options: ['text', 'icon'],
            control: { type: 'select' },
            description: 'Style of the progress display'
        },
        themeColor: baseArgsTypes.themeColor,
        color: baseArgsTypes.color,
    },
};

export default meta;

type Story = StoryObj<ProgressBarWithLabel>;

export const ShowCase: Story = {
    args: {
        label: "Loading Data...",
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=10732-22494",
        },
    },
};
