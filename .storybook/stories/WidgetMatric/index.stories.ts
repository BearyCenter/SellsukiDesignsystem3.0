import { spread } from "@open-wc/lit-helpers";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/elements/button";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import "../../../src/elements/widget-matric";
import { WidgetMatric } from "../../../src/elements/widget-matric";
import { baseArgsTypes } from "../helper";

const onClickAction = action('click');

type WidgetMatricArgs = {} & WidgetMatric;

const meta = {
    title: "Example/WidgetMatric",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`
        <ssk-widget-matric
            ${spread(args)}
            .showSubtext=${args.showSubtext}
            .showImage=${args.showImage}
            .showIconLeft=${args.showIconLeft}
            .showButtonIcon=${args.showButtonIcon}
            .showBadge=${args.showBadge}
            .showIconRight=${args.showIconRight}
            @click=${(e: Event) => onClickAction(e)}>
        </ssk-widget-matric>
    `;
    },
    args: {
        testId: 'storybook-test-id',
        label: "Total Sales",
        subText: "Compared to last month",
        showSubtext: true,
        showIconLeft: true,
        showButtonIcon: true,
        buttonIcon: "solid-arrow-right-circle",
    },
    argTypes: {
        // --- Data Properties ---
        label: {
            control: "text",
            description: "The main text label for the widget.",
            table: { category: "Data" },
        },
        subText: {
            control: "text",
            description: "The supporting subtext below the main label.",
            table: { category: "Data" },
        },
        badgeText: {
            control: "text",
            description: "Text to display inside the badge.",
            table: { category: "Data" },
        },
        imgUrl: {
            control: "text",
            description: "URL for the image to be displayed on the left.",
            table: { category: "Data" },
        },
        // --- Display Control Properties ---
        showSubtext: { control: "boolean", table: { category: "Display Control" } },
        showImage: { control: "boolean", table: { category: "Display Control" } },
        showIconLeft: { control: "boolean", table: { category: "Display Control" } },
        showButtonIcon: { control: "boolean", table: { category: "Display Control" } },
        showBadge: { control: "boolean", table: { category: "Display Control" } },
        showIconRight: { control: "boolean", table: { category: "Display Control" } },
        // --- Style & Layout Properties ---
        widgetWidth: {
            control: { type: 'select' },
            options: ['3', '4', '6'],
            description: "Controls the width of the widget container.",
            table: { category: "Style & Layout" },
        },
        badgeColor: { control: "text", description: "Theme color for the badge.", table: { category: "Style & Layout" } },
        badgeIcon: { control: "text", description: "Icon name for the badge.", table: { category: "Style & Layout" } },
        iconLeftColor: { control: "text", description: "Theme color for the left icon.", table: { category: "Style & Layout" } },
        iconLeft: { control: "text", description: "Icon name for the left icon.", table: { category: "Style & Layout" } },
        buttonColor: { control: "text", description: "Theme color for the button.", table: { category: "Style & Layout" } },
        buttonVariant: {
            control: { type: 'select' },
            options: ['outline', 'solid', 'ghost', 'solid-light'],
            description: "Variant style for the button.",
            table: { category: "Style & Layout" },
        },
        buttonIcon: { control: "text", description: "Icon name for the button.", table: { category: "Style & Layout" } },
        iconRightColor: { control: "text", description: "Theme color for the right icon.", table: { category: "Style & Layout" } },
        iconRight: { control: "text", description: "Icon name for the right icon.", table: { category: "Style & Layout" } },
        
        // --- Base and Test Properties ---
        testId: { control: 'text', description: 'Test ID for testing', table: { category: 'Testing' } },
        ...baseArgsTypes,
    },
} satisfies Meta<WidgetMatricArgs>;

export default meta;

type Story = StoryObj<WidgetMatricArgs>;

export const Default: Story = {
    args: {
        testId: "001",
        label: "1,250,000",
        subText: "Total Sales",
        badgeText: "3.25%",
        showBadge: true,
        showButtonIcon: false,
        showIconRight: false,
        showIconLeft: false,
        showImage: true,
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25417-129570&p=f&t=XIXTFazUQ6frUs0i-0",
        },
    },
};

export const WithIconButton: Story = {
    args: {
        label: "View Details",
        subText: "Click the button",
        showButtonIcon: true,
        showBadge: false,
        showIconRight: false,
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=25417-129570&p=f&t=XIXTFazUQ6frUs0i-0",
        },
    },
};
