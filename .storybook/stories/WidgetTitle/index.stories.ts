import { spread } from "@open-wc/lit-helpers";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import "../../../src/elements/widget-title";
import { WidgetTitle , DropdownItem} from "../../../src/elements/widget-title";
import { baseArgsTypes } from "../helper";

const onClickAction = action('click-button');
const onClickActionDropdown = action('click-dropdown');


type WidgetTitleArgs =   WidgetTitle & {
    dropdownOptions?: DropdownItem[];
};

const meta = {
    title: "Components/Widget/WidgetTitle",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`<style>
            div.container-title {
                margin: 15%;
            }
        </style>
        <div class="container-title">
            <ssk-widget-title
                ${spread(args)}
                .showSubtext=${args.showSubtext}
                .showButtonText=${args.showButtonText}
                .showButtonIcon=${args.showButtonIcon}
                .dropdownOptions=${args.dropdownOptions}
                .disabledButton=${args.disabledButton}
                @click-button=${(e: Event) => onClickAction(e)}
                @click-dropdown'=${(e: Event) => onClickActionDropdown(e)}>
            </ssk-widget-title>
        </div>
    `;
    },
    args: {
        testId: 'storybook-test-id',
        titleText: "Total Sales",
        subText: "Compared to last month",
        buttonText: "Details",
        showSubtext: true,
        showButtonIcon: true,
        showButtonText: true,
        buttonIcon: "solid-arrow-right-circle",
        actionType: "button",
        dropdownOptions : [],
    },
    argTypes: {
        // --- Data Properties ---
        titleText: {
            control: "text",
            description: "The main text label for the widget.",
            table: { category: "Data" },
        },
        subText: {
            control: "text",
            description: "The supporting subtext below the main label.",
            table: { category: "Data" },
        },
        buttonText: {
            control: "text",
            description: "The supporting text in button.",
            table: { category: "Data" },
        },
        dropdownOptions: {
            control: "object",
            description: "Array of items to display in Dropdown.",
            table: { category: "Data" },
        },

        // --- Display Control Properties ---
        actionType : {
            control: { type: 'select' },
            options: ['none', 'button', 'dropdown'],
            description: "action type for widget",
            table: { category: "Display Control" }
        },
        showSubtext: { control: "boolean", table: { category: "Display Control" } },
        showButtonText: { control: "boolean", table: { category: "Display Control" } },
        showButtonIcon: { control: "boolean", table: { category: "Display Control" } },
        disabledButton: { control: "boolean", table: { category: "Display Control" } },
        // --- Style & Layout Properties ---
        widgetWidth: {
            control: { type: 'select' },
            options: ['6', '8', '12'],
            description: "Controls the width of the widget container.",
            table: { category: "Style & Layout" },
        },
        buttonColor: { control: "text", description: "Theme color for the button.", table: { category: "Style & Layout" } },
        buttonVariant: {
            control: { type: 'select' },
            options: ['outline', 'solid', 'ghost', 'solid-light'],
            description: "Variant style for the button.",
            table: { category: "Style & Layout" },
        },
        buttonIcon: { control: "text", description: "Icon name for the button.", table: { category: "Style & Layout" } },
        // --- Base and Test Properties ---
        testId: { control: 'text', description: 'Test ID for testing', table: { category: 'Testing' } },
        ...baseArgsTypes,
    },
} satisfies Meta<WidgetTitleArgs>;

export default meta;

type Story = StoryObj<WidgetTitleArgs>;

export const Default: Story = {
    args: {
        testId: "001",
        titleText: "Dashboard",
        subText: "สรุปยอดขายประจำปี",
        buttonText: "Filters",
        buttonIcon: "outline-funnel",
        showButtonText: true,
        showButtonIcon: true,
        actionType: "button",
        
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25417-129570&p=f&t=XIXTFazUQ6frUs0i-0",
        },
    },
};

export const WithDropdownAction: Story = {
    args: {
        testId: "001",
        titleText: "Dashboard",
        subText: "สรุปยอดขายประจำปี",
        actionType: "dropdown",
        dropdownOptions: [
            {
                "label": "day",
                "value": "รายวัน",
            },
            {
                "label": "week",
                "value": "รายสัปดาห์",
            },
            {
                "label": "month",
                "value": "รายเดือน",
            },
            {
                "label": "year",
                "value": "รายปี",
            },
            {
                "label": "3year",
                "value": "3ปี",
            },
            {
                "label": "test long test",
                "value": "Dog and Cat Festival Winter Season 2025",
            }
        ],
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25417-129570&p=f&t=XIXTFazUQ6frUs0i-0",
        },
    },
};


