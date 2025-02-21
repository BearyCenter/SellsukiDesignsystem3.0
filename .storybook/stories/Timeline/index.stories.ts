import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";

import { html } from "lit";
import "../../../src/components/timeline";
import { Timeline } from "../../../src/components/timeline";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";

type TimelineItem = AutoLitProperty<Timeline> & { title : string} &{ description: string};
// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta = {
    title: "Example/Timeline",
    tags: ["autodocs"],
    render: ({ title, ...args }) => {
        
        return html`
                <ssk-timeline ${spread({ ...args })}>
                </ssk-timeline>
                `;
            },
    argTypes: {
        ".Items": {
            description: "All Items",
        },
        display: {
            description: "The orientations for a timeline",
            options: [ "vertical", "horizontal"],
            table: {
                category: "Props",
                defaultValue: {
                    summary: "vertical",
                },
                type: {
                    summary: "string",
                },
            },
            control: {
                type: "inline-radio",
            },
        },
    },
} satisfies Meta<TimelineItem>;

export default meta;

type Story = StoryObj<TimelineItem>;

export const Default: Story = {
    args: {
        ".Items": [
            {
                "title": "Ordered",
                "description": "This is the start step ",
                "status" : "completed",
                "subTitle": '19 ส.ค. 2567 - 18:20:00',
            },
            {
                "title": "Shipped",
                "description": "This is the 2nd step description",
                "status" : "in-progress",
                "subTitle": '20 ส.ค. 2567 - 14:30:30',
            },
            {
                "title": "Out for delivery",
                "description": "This is the 3nd step description",
                "status" : "pending",
                "subTitle": '21 ส.ค. 2567 - 09:30:30',
            },
            {
                "title": "Delivered",
                "description": "This is the final description",
                "status" : "pending",
                "subTitle": 'Estimated delivery by 19:00:00',
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