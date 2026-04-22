import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html } from "lit";
import "../../../src/components/filter-bar";
import "../../../src/elements/button";

interface FilterBarArgs {
  placeholder: string;
  search: string;
  showSearch: boolean;
  disabled: boolean;
  size: "sm" | "md" | "lg";
  testId?: string;
}

const meta = {
  title: "Components/Data/FilterBar",
  tags: ["autodocs"],
  render: (args: FilterBarArgs) => html`
    <ds-filter-bar
      placeholder=${args.placeholder}
      search=${args.search}
      ?show-search=${args.showSearch}
      ?disabled=${args.disabled}
      size=${args.size}
      test-id=${args.testId ?? ""}
      @filter-change=${action("filter-change")}
    >
      <ssk-button slot="filters" variant="outline" size="sm">Status</ssk-button>
      <ssk-button slot="filters" variant="outline" size="sm">Category</ssk-button>
      <ssk-button slot="actions" variant="solid" size="sm">+ Add</ssk-button>
    </ds-filter-bar>
  `,
  argTypes: {
    placeholder: { control: "text",    table: { category: "Props" } },
    search:      { control: "text",    table: { category: "Props" } },
    showSearch:  { control: "boolean", table: { category: "Props" } },
    disabled:    { control: "boolean", table: { category: "Props" } },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
      table: { category: "Props" },
    },
    testId: { control: "text", table: { category: "Props" } },
  },
} satisfies Meta<FilterBarArgs>;

export default meta;

type Story = StoryObj<FilterBarArgs>;

export const Default: Story = {
  args: {
    placeholder: "Search products...",
    search:      "",
    showSearch:  true,
    disabled:    false,
    size:        "md",
  },
};

export const WithPrefilledSearch: Story = {
  args: {
    placeholder: "Search products...",
    search:      "shirt",
    showSearch:  true,
    disabled:    false,
    size:        "md",
  },
};

export const SearchOnly: Story = {
  render: () => html`
    <ds-filter-bar
      placeholder="Search..."
      show-search
      @filter-change=${action("filter-change")}
    ></ds-filter-bar>
  `,
};

export const Disabled: Story = {
  args: {
    placeholder: "Search products...",
    search:      "",
    showSearch:  true,
    disabled:    true,
    size:        "md",
  },
};

export const SizeSm: Story = {
  args: {
    placeholder: "Search...",
    search:      "",
    showSearch:  true,
    disabled:    false,
    size:        "sm",
  },
};

export const SizeLg: Story = {
  args: {
    placeholder: "Search...",
    search:      "",
    showSearch:  true,
    disabled:    false,
    size:        "lg",
  },
};

export const FiltersOnly: Story = {
  render: () => html`
    <ds-filter-bar ?show-search=${false} @filter-change=${action("filter-change")}>
      <ssk-button slot="filters" variant="outline" size="sm">Status: Active</ssk-button>
      <ssk-button slot="filters" variant="outline" size="sm">Category</ssk-button>
      <ssk-button slot="filters" variant="outline" size="sm">Date range</ssk-button>
      <ssk-button slot="actions" variant="solid" size="sm">+ Add</ssk-button>
    </ds-filter-bar>
  `,
};
