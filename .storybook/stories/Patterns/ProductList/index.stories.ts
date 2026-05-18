import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../../src/patterns/product-list";
import {
  ProductListPattern,
  // re-export side-effect already registers <ssk-pattern-product-list>
} from "../../../../src/patterns/product-list";
import { productListMock } from "../../../../src/patterns/product-list/mock";

type StoryArgs = {
  brand: "ccs3" | "patona" | "oc2plus";
};

const meta: Meta<StoryArgs> = {
  title: "Patterns/Product List",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: { component: ProductListPattern.metadata.description },
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
    html`<ssk-pattern-product-list
      brand=${args.brand}
    ></ssk-pattern-product-list>`,
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

/** Empty state: no products, pagination shows zero, tabs flatten to 0. */
export const EmptyState: Story = {
  render: (args) => {
    const emptyData = {
      ...productListMock,
      products: [],
      pagination: { ...productListMock.pagination, total: 0 },
      statusTabs: productListMock.statusTabs.map((t) => ({ ...t, count: 0 })),
      stats: productListMock.stats.map((s) => ({ ...s, value: "0", deltaPct: 0 })) as typeof productListMock.stats,
    };
    return html`<ssk-pattern-product-list
      brand=${args.brand}
      .data=${emptyData}
    ></ssk-pattern-product-list>`;
  },
};

/**
 * Bounded-height host (600px) — mirrors the Pattern #1 Bounded600 story so
 * ds3-preview's Vibecode Templates embed works without changes.
 */
export const Bounded600: Story = {
  parameters: { layout: "centered" },
  render: (args) => html`
    <div style="height: 600px; width: 100%; max-width: 1280px; border: 1px solid var(--stroke-secondary, #e5e7eb); border-radius: 12px; overflow: hidden;">
      <ssk-pattern-product-list
        brand=${args.brand}
      ></ssk-pattern-product-list>
    </div>
  `,
};
