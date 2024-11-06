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

        <ssk-table-cell>John</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>30</ssk-table-cell>

        <ssk-table-cell>Jane</ssk-table-cell>
        <ssk-table-cell>Doe</ssk-table-cell>
        <ssk-table-cell>25</ssk-table-cell>

        <ssk-table-cell>John</ssk-table-cell>
        <ssk-table-cell>Smith</ssk-table-cell>
        <ssk-table-cell>40</ssk-table-cell>
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
  args: {
    testId: "test-id",
    ".columnsWidth": ["300px", "150px", "auto"],
    backgroundColor: "#fff",
    stripedBackgroundColor: "#777",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=1145%3A69931&mode=dev",
    },
  },
};
