import { spread } from "@open-wc/lit-helpers";
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/table";
import "../../../src/elements/badge";
import "../../../src/elements/text";
import { Table } from "../../../src/components/table";
import { AutoLitProperty, baseArgsTypes, genericEvents } from "../helper";


type TableWithData = AutoLitProperty<Table>;

const meta = {
    title: "Example/Table",
    tags: ["autodocs"],
    render: ({ ...args }) => {
        return html`
        <ssk-table ${spread({ ...args })}>
        </ssk-table>
        `;
    },

    argTypes: {
        ".headers": {
            description: "The Header of the table",
            table: {
                type: {
                    summary: "string",
                },
            }
        },
        ".itemValue": {
            description: "The bady data of the table",
            table: {
                type: {
                    summary: "string",
                },
            }
        }
    },
} satisfies Meta<TableWithData>;

export default meta;

type Story = StoryObj<TableWithData>;

export const Default: Story = {
    args: {
        ".headers": [
            {
                text: 'Name',
            },
            {
                text: 'Age',
            },
            {
                text: 'Email',
            }
        ],
        ".itemValue": [{
            name:'Teerachai',
            age:'28',
            email:'Teerachai@test.com'
        },
        {
            name:'Manapong',
            age:'25',
            email:'Manapongi@test.com'
        }],
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?type=design&node-id=2260-34872&mode=design&t=7zLQqFkUWnN3q4pJ-0",
        },
    },
};
export const TableWithHeader: Story = {
    args: {
        ".headers": [
            { text: 'ID', value: 'id' },
            { text: 'Image' },
            { text: 'Product' },
            { text: 'Pricing' },
            { text: 'Create Date', value: 'date' },
            { text: 'Status' },
            { text: '' },
            { text: 'button' },
            { text: '' }
        ],
        ".itemValue": [
            {
                id: 'SSKU0011A',
                img: 'img123',
                product: 'SSK Pay',
                price: '1,000 THB',
                payment: 'complete', 
                date: '18/09/2023',
                status: 'Active',
                copy: '',
                button: 'Button',
                action: 'icon'
            },
            {
                id: 'SSKU0012A',
                img: 'img212',
                product: 'LINE Official',
                price: '767 THB',
                payment: 'pading',
                date: '06/05/2023',
                status: 'Inactive',
                copy: '',
                button: 'Button',
                action: 'icon'
            }
        ],
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
        },
    },
    render: ({ ...args }) => {
        console.log(args[".itemValue"]);
        return html`
        <ssk-table ${spread({ ...args })}>
            <div slot="id" style="display: flex; align-items: center;"> ID <ssk-icon name="outline-chevron-up-down" size="xs"></ssk-icon></div>
            <div slot="price" style="display: flex; align-items: center;"> Pricing <ssk-icon name="outline-chevron-up-down" size="xs"></ssk-icon></div>
            <div slot="date" style="display: flex; align-items: center;"> Create Date <ssk-icon name="outline-chevron-up-down" size="xs"></ssk-icon></div>
        </ssk-table>
        `;
    },
};

export const TableWithBody: Story = {
    args: {
        ".headers": [
            { text: 'ID' },
            { text: 'Image' },
            { text: 'Product' },
            { text: 'Pricing'},
            { text: 'Payments' },
            { text: 'CreateDate'},
            { text: 'Status' },
            { text: '' },
            { text: 'button' },
            { text: '' }
        ],
        ".itemValue": [
            {
                id: 'SSKU0011A',
                image: 'img',
                product: 'SSK Pay',
                pricing: '1,000 THB',
                payments: 'complete', 
                createdate: '18/09/2023',
                status: 'Active',
                copy: '',
                button: 'Button',
                action: 'icon'
            },
            {
                id: 'SSKU0012A',
                image: 'img2',
                product: 'LINE Official',
                pricing: '767 THB',
                payments: 'pading',
                createdate: '06/05/2023',
                status: 'Inactive',
                copy: '',
                button: 'Button',
                action: 'icon'
            }
        ],
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
        },
    },
    render: ({ ...args }) => {
        const { ".headers": headers, ".itemValue": itemValue } = args; 

        return html`
        <ssk-table .headers="${headers}" .itemValue="${itemValue}">
        </ssk-table>
        `;
    },
};
export const TableWithSelect: Story = {
    args: {
        ".headers": [
            { text: 'ID' },
            { text: 'Image' },
            { text: 'Product' },
            { text: 'Pricing'},
            { text: 'Payments' },
            { text: 'Create Date'},
            { text: 'Status' },
            { text: '' },
            { text: 'button' },
            { text: '' }
        ],
        ".itemValue": [
            {
                id: 'SSKU0011A',
                img: 'img',
                product: 'SSK Pay',
                price: '1,000 THB',
                payment: 'complete', 
                date: '18/09/2023',
                status: 'Active',
                copy: '',
                button: 'Button',
                action: 'icon'
            },
            {
                id: 'SSKU0012A',
                img: 'img2',
                product: 'LINE Official',
                price: '767 THB',
                payment: 'pading',
                date: '06/05/2023',
                status: 'Inactive',
                copy2: '',
                button: 'Button',
                action: 'icon'
            }
        ],
        selectEnabled: true,
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
        },
    },
    render: ({ ...args }) => {
        console.log(args[".itemValue"]);
        return html`
        <ssk-table ${spread({ ...args })}>
            <div slot="copy"><ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon></div>
            <div slot="copy2"><ssk-icon name="outline-document-duplicate" size="xs"></ssk-icon></div>
        </ssk-table>
        `;
    },
};

export const TableWithFooter: Story = {
    args: {
        ".headers": [
            { text: 'ID' },
            { text: 'Image' },
            { text: 'Product' },
            { text: 'Pricing'},
            { text: 'Payments' },
            { text: 'Create Date'},
            { text: 'Status' },
            { text: '' },
            { text: 'button' },
            { text: '' }
        ],
        ".itemValue": [
            {
                id: 'SSKU0011A',
                img: 'img',
                product: 'SSK Pay',
                price: '1,000 THB',
                payment: 'complete', 
                date: '18/09/2023',
                status: 'Active',
                copy: '',
                button: 'Button',
                action: 'icon'
            },
            {
                id: 'SSKU0012A',
                img: 'img2',
                product: 'LINE Official',
                price: '767 THB',
                payment: 'pading',
                date: '06/05/2023',
                status: 'Inactive',
                copy: '',
                button: 'Button',
                action: 'icon'
            }
        ],
        showFooter: true,
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=585%3A57607&mode=dev",
        },
    },
    render: ({ ...args }) => {
        console.log(args[".itemValue"]);
        return html`
        <ssk-table ${spread({ ...args })}>
        </ssk-table>
        `;
    },
};
