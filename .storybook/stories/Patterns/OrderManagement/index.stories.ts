import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../../src/patterns/order-management";
import {
  OrderManagementPattern,
  // re-export side-effect already registers <ssk-pattern-order-management>
} from "../../../../src/patterns/order-management";
import { orderManagementMock } from "../../../../src/patterns/order-management/mock";

type StoryArgs = {
  brand: "ccs3" | "patona" | "oc2plus";
};

const meta: Meta<StoryArgs> = {
  title: "Patterns/Order Management",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: { component: OrderManagementPattern.metadata.description },
    },
  },
  argTypes: {
    brand: {
      control: { type: "inline-radio" },
      options: ["ccs3", "patona", "oc2plus"],
      table: { category: "Brand" },
    },
  },
  args: { brand: "ccs3" },
  render: (args) =>
    html`<ssk-pattern-order-management
      brand=${args.brand}
    ></ssk-pattern-order-management>`,
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Patona: Story = {
  args: { brand: "patona" },
};

export const OC2Plus: Story = {
  args: { brand: "oc2plus" },
};

/** Empty state: no orders, pagination shows zero. */
export const EmptyState: Story = {
  render: (args) => {
    const emptyData = {
      ...orderManagementMock,
      orders: [],
      pagination: { ...orderManagementMock.pagination, total: 0 },
      statusTabs: orderManagementMock.statusTabs.map((t) => ({ ...t, count: 0 })),
    };
    return html`<ssk-pattern-order-management
      brand=${args.brand}
      .data=${emptyData}
    ></ssk-pattern-order-management>`;
  },
};

/**
 * Bounded-height host (600px) — mimics how ds3-preview's Vibecode Templates page
 * embeds the pattern inside a fixed container. If this story renders correctly
 * (full layout, no empty rows), the same approach works in ds3-preview without
 * the legacy fake-shell PreviewShell workaround.
 */
export const Bounded600: Story = {
  parameters: { layout: "centered" },
  render: (args) => html`
    <div style="height: 600px; width: 100%; max-width: 1280px; border: 1px solid var(--stroke-secondary, #e5e7eb); border-radius: 12px; overflow: hidden;">
      <ssk-pattern-order-management
        brand=${args.brand}
      ></ssk-pattern-order-management>
    </div>
  `,
};
