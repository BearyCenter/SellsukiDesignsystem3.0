import { spread } from "@open-wc/lit-helpers";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import "../../../src/elements/widget-user-detail";
import { WidgetUserDetail, sectionItem } from "../../../src/elements/widget-user-detail";
import { baseArgsTypes } from "../helper";

const onClickAction = action('click');

const mockRowItems: sectionItem[] = [
    {
        id: 1,
        label: 'Sales Revenue',
        description: '$1,250,450.75',
        showButton: false,
        buttonIcon: 'solid-chart-bar',
        showTooltip: true,
        tooltipText: 'View sales details',
        buttonColor: 'primary',
    },
    {
        id: 2,
        label: 'New Customers',
        description: '1,320',
        showButton: true,
        buttonIcon: 'solid-user-plus',
        showTooltip: false,
        buttonColor: 'primary',
    },
    {
        id: 3,
        label: 'Very Long Label Text to Test The Truncation Feature on The UI',
        description: 'Very Long Description Text to Ensure Ellipsis Works as Expected',
        showButton: true,
        buttonIcon: 'solid-home',
        buttonColor: 'primary',
    },
    {
        id: 4,
        label: 'Conversion Rate',
        description: '25.7%',
        showButton: true,
        buttonIcon: 'solid-cursor-arrow-rays',
        showTooltip: false,
        tooltipText: 'Analyze conversion funnel',
        disabledButton: true,
        buttonColor: 'primary',
    },
    {
        id: 5,
        label: 'Avg. Order Value',
        description: '$85.40',
        showButton: true,
        buttonIcon: 'solid-shopping-cart',
        showTooltip: true,
        tooltipText: 'See value trends',
        buttonColor: 'primary',
    },
    {
        id: 6,
        label: 'Server Uptime',
        description: '99.98%',
        showButton: true,
        buttonColor: 'primary',
    },
    {
        id: 7,
        label: 'Support Tickets',
        description: '25 Unresolved',
        showButton: true,
        buttonIcon: 'solid-inbox-stack',
        showTooltip: true,
        tooltipText: 'Go to support queue',
        disabledButton: false,
        buttonColor: 'success',
    },
    {
        id: 8,
        label: 'This item should not be visible if height is 6',
        description: 'Extra Item',
        showButton: false,
    },
];

const comprehensiveMockItems: sectionItem[] = [
    {
        id: 'comp-1',
        label: 'Status',
        description: 'Completed',
        showButton: true,
        buttonIcon: 'solid-check-circle',
        buttonColor: 'success',
        showTooltip: true,
        tooltipText: 'Mark as pending'
    },
    {
        id: 'comp-2',
        label: 'Very Long Label to Showcase Ellipsis Truncation text',
        description: 'This is a very long description to showcase how the text truncates',
        showButton: false,
    }
];

type WidgetUserDetailArgs = {
    rowItems?: sectionItem[];
} & WidgetUserDetail;

const meta = {
    title: "Example/WidgetUserDetail",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`
        <ssk-widget-user-detail
            ${spread(args)}
            .showSubtext=${args.showSubtext}
            .showImage=${args.showImage}
            .showButtonIcon=${args.showButtonIcon}
            .showButtonTooltip=${args.showButtonTooltip}
            .rowItems=${args.rowItems} 
            .disabledButton=${args.disabledButton}
            @click=${(e: Event) => onClickAction(e)}>
        </ssk-widget-user-detail>
    `;
    },
    args: {
        testId: 'storybook-test-id',
        label: "Total Sales",
        subText: "Compared to last month",
        showSubtext: true,
        showButtonIcon: true,
        buttonIcon: "solid-pencil",
        rowItems: [],
    },
    argTypes: {
         // --- Data Properties ---
        label: { control: "text", table: { category: "Data" } },
        subText: { control: "text", table: { category: "Data" } },
        imgUrl: { control: "text", table: { category: "Data" } },
        buttonTooltipText: { control: "text", table: { category: "Data" } },
        rowItems: {
            control: "object",
            description: "Array of items to display in the bottom section.",
            table: { category: "Data" },
        },
        buttonText: { control: "text", table: { category: "Data" } },

         // --- Display Control Properties ---
        showSubtext: { control: "boolean", table: { category: "Display Control" } },
        showImage: { control: "boolean", table: { category: "Display Control" } },
        showButtonIcon: { control: "boolean", table: { category: "Display Control" } },
        disabledButton: { control: "boolean", table: { category: "Display Control" } },
        showButtonTooltip: { control: "boolean", table: { category: "Display Control" } },
        
        // --- Style & Layout Properties ---
        widgetHeight: {
            control: { type: 'select' },
            options: ['3', '4', '6'],
            table: { category: "Style & Layout" },
        },
        imageShape: {
            control: { type: 'select' },
            options: ['circle', 'rounded'],
            table: { category: "Style & Layout" },
        },
        buttonColor: { control: "text", table: { category: "Style & Layout" } },
        buttonVariant: {
            control: { type: 'select' },
            options: ['outline', 'solid', 'ghost', 'solid-light'],
            table: { category: "Style & Layout" },
        },
        buttonIcon: { control: "text", table: { category: "Style & Layout" } },
        testId: { control: 'text', table: { category: 'Testing' } },
        ...baseArgsTypes,
    },
} satisfies Meta<WidgetUserDetailArgs>;

export default meta;

type Story = StoryObj<WidgetUserDetailArgs>;

export const Default: Story = {
    args: {
        testId: "001",
        label: "Sales Report",
        subText: "Data from last month",
        showButtonIcon: true,
        showImage: true,
        imgUrl: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        showButtonTooltip: true,
    },

};

export const ComprehensiveExample: Story = {
    name: "Comprehensive Example",
    args: {
        widgetHeight: '3',
        label: "Project Alpha",
        subText: "Last updated 2 hours ago",
        showImage: true,
        showSubtext: true,
        imgUrl: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        showButtonIcon: true,
        buttonIcon: "solid-pencil",
        showButtonTooltip: true,
        buttonTooltipText: "Edit Project Details",
        disabledButton: false,

        rowItems: comprehensiveMockItems,
    },
};

export const WithrowItemsHeight3: Story = {
    name: "With Items (3:4)",
    args: {
        widgetHeight: '3',
        rowItems: mockRowItems,
    },
};

export const WithButtonItemsHeight4: Story = {
    name: "With Items (4:4)",
    args: {
        widgetHeight: '4',
        showImage: true,
        imgUrl: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        rowItems: mockRowItems,
    },
};

export const WithButtonItemsHeight6: Story = {
    name: "With Items (6:4)",
    args: {
        widgetHeight: '6',
        showImage: true,
        imgUrl: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        rowItems: mockRowItems,
        buttonText: 'add',
        buttonIcon: ''
    },
};