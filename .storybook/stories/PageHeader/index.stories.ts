import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html } from "lit";
import "../../../src/components/page-header";
import "../../../src/elements/button";

interface PageHeaderArgs {
  title: string;
  subtitle: string;
  showBack: boolean;
  backLabel: string;
  testId?: string;
}

const meta = {
  title: "Components/Layout/PageHeader",
  tags: ["autodocs"],
  render: (args: PageHeaderArgs) => html`
    <ds-page-header
      title=${args.title}
      subtitle=${args.subtitle}
      ?show-back=${args.showBack}
      back-label=${args.backLabel}
      test-id=${args.testId ?? ""}
      @back=${action("back")}
    >
      <nav slot="breadcrumb" aria-label="breadcrumb" style="display:flex;align-items:center;gap:4px;font-size:18px">
        <span style="color:var(--text-secondary)">Products</span>
        <span style="color:var(--text-secondary)">/</span>
        <span style="color:var(--text-primary)">${args.title}</span>
      </nav>
      <ssk-button slot="actions" variant="outline">Export</ssk-button>
      <ssk-button slot="actions" variant="solid">+ Add</ssk-button>
    </ds-page-header>
  `,
  argTypes: {
    title:    { control: "text",    table: { category: "Props" } },
    subtitle: { control: "text",    table: { category: "Props" } },
    showBack: { control: "boolean", table: { category: "Props" } },
    backLabel:{ control: "text",    table: { category: "Props" } },
    testId:   { control: "text",    table: { category: "Props" } },
  },
} satisfies Meta<PageHeaderArgs>;

export default meta;

type Story = StoryObj<PageHeaderArgs>;

export const Default: Story = {
  args: {
    title:    "Product List",
    subtitle: "Manage your product catalog",
    showBack: false,
    backLabel:"Back",
  },
};

export const WithBack: Story = {
  args: {
    title:    "Edit Product",
    subtitle: "Update product details and pricing",
    showBack: true,
    backLabel:"Back to Products",
  },
};

export const TitleOnly: Story = {
  render: () => html`
    <ds-page-header title="Dashboard" @back=${action("back")}></ds-page-header>
  `,
};

export const LongTitle: Story = {
  args: {
    title:    "Product Inventory Management & Analytics Overview Dashboard",
    subtitle: "Comprehensive view of all inventory items across all warehouses",
    showBack: true,
    backLabel:"Back",
  },
};
