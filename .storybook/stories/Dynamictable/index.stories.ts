import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/dynamic-table";
import { DynamicTable } from "../../../src/components/dynamic-table";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type TableArgs = AutoLitProperty<DynamicTable>;

const meta = {
  title: "Example/DynamicTable",
  tags: ["autodocs"],
  render: ({ ...args }) => {
    return html`
      <ssk-dynamic-table ${spread({ ...args })}>
        <ssk-header-cell slot="headers" sortable sortDirection="asc"
          >First Name</ssk-header-cell
        >
        <ssk-header-cell slot="headers" sortable>Last Name</ssk-header-cell>
        <ssk-header-cell slot="headers">Age</ssk-header-cell>

        <div>John</div>
        <div>Doe</div>
        <div>30</div>

        <div>Jane</div>
        <div>Doe</div>
        <div>25</div>

        <div>John</div>
        <div>Smith</div>
        <div>40</div>
      </ssk-dynamic-table>
    `;
  },
  argTypes: {
    ...baseArgsTypes,
  },
} satisfies Meta<TableArgs>;

export default meta;

type Story = StoryObj<TableArgs>;

export const Default: Story = {
  args: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};
