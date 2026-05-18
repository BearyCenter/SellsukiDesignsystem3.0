import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/default-shell";
import "../../../src/components/page-header";
import "../../../src/elements/button";
import "../../../src/elements/text";

const meta = {
  title: "Components/Layout/DefaultShell",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    brand: {
      control: { type: "select" },
      options: ["sellsuki", "patona", "shipmunk", "akita", "sellsukipay", "sukispace", "oc2plus", "ccs3"],
      table: { category: "Brand" },
    },
    companyName:        { control: "text", table: { category: "Identity" } },
    companyBranch:      { control: "text", table: { category: "Identity" } },
    companyAvatar:      { control: "text", table: { category: "Identity" } },
    userAvatar:         { control: "text", table: { category: "Identity" } },
    logoSrc:            { control: "text", table: { category: "Logo" } },
    logoNameSrc:        { control: "text", table: { category: "Logo" } },
    searchPlaceholder:  { control: "text", table: { category: "Search" } },
    showSearch:         { control: "boolean", table: { category: "Search" } },
    showNotifications:  { control: "boolean", table: { category: "Right cluster" } },
    showAppGrid:        { control: "boolean", table: { category: "Right cluster" } },
    sidebarCollapsed:   { control: "boolean", table: { category: "Layout" } },
    sidebarWidth:       { control: "text", table: { category: "Layout" } },
    navbarHeight:       { control: "text", table: { category: "Layout" } },
    selectedKey:        { control: "text", table: { category: "Selection" } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const sampleMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    items: [
      { key: "overview", label: "ภาพรวมร้าน", icon: "outline-building-storefront" },
      { key: "orders",   label: "ออเดอร์",      icon: "outline-inbox-stack" },
      { key: "live",     label: "Live (เร็วๆ นี้)", icon: "solid-signal", disabled: true },
    ],
  },
  {
    key: "product",
    label: "Product",
    items: [
      { key: "product-list",     label: "รายการสินค้า",  icon: "outline-shopping-bag" },
      { key: "product-category", label: "หมวดหมู่",      icon: "outline-squares-plus" },
    ],
  },
];

const sampleFooter = [
  { key: "support", label: "Support", icon: "outline-user-group" },
  { key: "setting", label: "Setting", icon: "outline-cog-8-tooth" },
];

// Primary preset showcase — pass data, get the full chrome.
export const ShowCase: Story = {
  args: {
    brand: "sellsuki",
    companyName: "Sellsuki Co., Ltd.",
    companyBranch: "สาขา รัชดาภิเษก",
    companyAvatar: "/public/Avatar.png",
    userAvatar: "https://placehold.co/40x40",
    logoSrc: "https://placehold.co/40x40",
    logoNameSrc: "https://placehold.co/70x40",
    searchPlaceholder: "ค้นหาสินค้า / ออเดอร์ / ลูกค้า",
    showSearch: true,
    showNotifications: true,
    showAppGrid: true,
    sidebarCollapsed: false,
    sidebarWidth: "256px",
    navbarHeight: "64px",
    selectedKey: "overview",
  },
  render: (args: Record<string, unknown>) => html`
    <ssk-default-shell
      style="height:100vh;display:block"
      brand=${args.brand as string}
      company-name=${args.companyName as string}
      company-branch=${args.companyBranch as string}
      company-avatar=${args.companyAvatar as string}
      user-avatar=${args.userAvatar as string}
      logo-src=${args.logoSrc as string}
      logo-name-src=${args.logoNameSrc as string}
      search-placeholder=${args.searchPlaceholder as string}
      ?show-search=${args.showSearch}
      ?show-notifications=${args.showNotifications}
      ?show-app-grid=${args.showAppGrid}
      ?sidebar-collapsed=${args.sidebarCollapsed}
      sidebar-width=${args.sidebarWidth as string}
      navbar-height=${args.navbarHeight as string}
      selected-key=${args.selectedKey as string}
      .menu=${sampleMenu}
      .footerItems=${sampleFooter}
      @menu-select=${(e: CustomEvent) => console.log("menu-select", e.detail)}
      @search-submit=${(e: CustomEvent) => console.log("search-submit", e.detail)}
      @sidebar-toggle=${(e: CustomEvent) => console.log("sidebar-toggle", e.detail)}
    >
      <ssk-page-header slot="header" title="ภาพรวมร้าน">
        <ssk-text slot="subtitle" size="md" color="background.600">
          สรุปยอดขายและออเดอร์วันนี้
        </ssk-text>
        <ssk-button slot="actions" variant="solid" themeColor="primary">
          สร้างออเดอร์ใหม่
        </ssk-button>
      </ssk-page-header>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
        <div style="padding:20px;background:var(--bg-primary,#fff);border-radius:var(--radius-md,8px);border:1px solid var(--stroke-primary,#e5e7eb)">
          <ssk-text size="md" color="background.600">ยอดขายวันนี้</ssk-text>
          <div style="font-size:28px;font-weight:700;color:var(--text-primary,#111827);margin-top:8px">฿ 248,500</div>
        </div>
        <div style="padding:20px;background:var(--bg-primary,#fff);border-radius:var(--radius-md,8px);border:1px solid var(--stroke-primary,#e5e7eb)">
          <ssk-text size="md" color="background.600">ออเดอร์รอจัดส่ง</ssk-text>
          <div style="font-size:28px;font-weight:700;color:var(--text-primary,#111827);margin-top:8px">42</div>
        </div>
        <div style="padding:20px;background:var(--bg-primary,#fff);border-radius:var(--radius-md,8px);border:1px solid var(--stroke-primary,#e5e7eb)">
          <ssk-text size="md" color="background.600">ลูกค้าใหม่</ssk-text>
          <div style="font-size:28px;font-weight:700;color:var(--text-primary,#111827);margin-top:8px">18</div>
        </div>
      </div>
    </ssk-default-shell>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "Pass `brand`, identity props, `.menu`, `.footerItems`, and a `selected-key` — the shell renders the full chrome (provider + layout + navbar + sidebar + scaffold) for you. Slot in page content via the default slot.",
      },
    },
  },
};

// Minimal — just brand + menu, no company identity, no avatar. Shows
// what survives when only required-ish props are set.
export const Minimal: Story = {
  args: { brand: "sellsuki" },
  render: (args: Record<string, unknown>) => html`
    <ssk-default-shell
      style="height:100vh;display:block"
      brand=${args.brand as string}
      .menu=${sampleMenu}
      .footerItems=${sampleFooter}
    >
      <div style="padding:40px;text-align:center;color:var(--text-secondary,#6b7280)">
        Pass page content here.
      </div>
    </ssk-default-shell>
  `,
};

// No-search variant — common for product apps that put search elsewhere.
export const NoSearch: Story = {
  args: { ...ShowCase.args, showSearch: false },
  render: ShowCase.render,
};

// Sidebar collapsed at boot.
export const SidebarCollapsed: Story = {
  args: { ...ShowCase.args, sidebarCollapsed: true },
  render: ShowCase.render,
};

// Patona brand — verifies brand propagation to descendants via the
// underlying ssk-app-shell-provider.
export const PatonaBrand: Story = {
  args: { ...ShowCase.args, brand: "patona" },
  render: ShowCase.render,
};

// Escape-hatch demo — override navbar-center with a custom toolbar.
export const CustomCenterSlot: Story = {
  args: ShowCase.args,
  render: (args: Record<string, unknown>) => html`
    <ssk-default-shell
      style="height:100vh;display:block"
      brand=${args.brand as string}
      company-name=${args.companyName as string}
      company-branch=${args.companyBranch as string}
      company-avatar=${args.companyAvatar as string}
      user-avatar=${args.userAvatar as string}
      logo-src=${args.logoSrc as string}
      logo-name-src=${args.logoNameSrc as string}
      .menu=${sampleMenu}
      .footerItems=${sampleFooter}
      selected-key="overview"
    >
      <div slot="navbar-center" style="display:flex;align-items:center;gap:12px;justify-content:center">
        <ssk-button variant="outline" size="sm">รายงาน</ssk-button>
        <ssk-button variant="outline" size="sm">รายการนำเข้า</ssk-button>
        <ssk-button variant="solid" themeColor="primary" size="sm">ส่งออก CSV</ssk-button>
      </div>

      <ssk-page-header slot="header" title="ออเดอร์รอยืนยัน"></ssk-page-header>
      <div style="padding:40px;color:var(--text-secondary,#6b7280)">
        navbar-center has been replaced by custom toolbar buttons via the
        <code>slot="navbar-center"</code> escape hatch. The hamburger,
        sidebar, and right cluster are still the preset defaults.
      </div>
    </ssk-default-shell>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "Each region (`navbar-left`, `navbar-center`, `navbar-right`, `sidebar-header`, `sidebar-menu`, `sidebar-footer`) is a named slot — assigning content replaces the preset fallback while leaving the rest untouched.",
      },
    },
  },
};
