import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/feature-page-scaffold";
import "../../../src/components/app-shell/index";
import "../../../src/components/app-shell/provider";
import "../../../src/components/dropdown";
import "../../../src/components/page-header";
import "../../../src/components/sidebar";
import "../../../src/elements/avatar";
import "../../../src/elements/button";
import "../../../src/elements/card-select";
import "../../../src/elements/icon";
import "../../../src/elements/input";
import "../../../src/elements/logo";
import "../../../src/elements/text";
import "../../../src/elements/top-navbar/index";

type AppShellArgs = {
  sidebarCollapsed: boolean;
  noSidebar: boolean;
  noNavbar: boolean;
  navbarHeight: string;
  sidebarWidth: string;
  brand: "sellsuki" | "patona" | "shipmunk" | "akita" | "sellsukipay" | "sukispace" | "oc2plus" | "ccs3";
};

const meta = {
  title: "Components/Layout/AppShell",
  tags: ["autodocs"],
  argTypes: {
    sidebarCollapsed: { control: "boolean", table: { category: "State" } },
    noSidebar:        { control: "boolean", table: { category: "Props" } },
    noNavbar:         { control: "boolean", table: { category: "Props" } },
    navbarHeight:     { control: "text",    table: { category: "Layout" } },
    sidebarWidth:     { control: "text",    table: { category: "Layout" } },
    brand: {
      control: { type: "select" },
      options: ["sellsuki", "patona", "shipmunk", "akita", "sellsukipay", "sukispace", "oc2plus", "ccs3"],
      table: { category: "Brand" },
    },
  },
} satisfies Meta<AppShellArgs>;

export default meta;
type Story = StoryObj<AppShellArgs>;

// Shared Sidebar showcase content — mirrors Components/Navigation/Sidebar > Default.
const sidebarShowcase = () => html`
  <style>
    .company-header {
      display: grid;
      grid-template-areas: "avatar name" "avatar branch";
      grid-template-columns: min-content 1fr;
      align-items: center;
      gap: 0 12px;
    }
    .company-header .avatar { grid-area: avatar; }
    .company-header .name {
      grid-area: name;
      font-size: 1.2em;
      color: var(--ssk-colors-text-900);
      text-align: start;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .company-header .branch {
      grid-area: branch;
      font-size: 0.8em;
      color: var(--ssk-colors-primary-500);
      text-align: start;
    }
  </style>

  <ssk-sidebar-header slot="header">
    <ssk-avatar
      src="/public/Avatar.png"
      alt="demo avatar"
      shape="circle"
      padding="16px 0"
      slot="mini"
    ></ssk-avatar>
    <ssk-dropdown themeColor="primary" width="full" hideChevron>
      <ssk-dropdown-button slot="selected">
        <div class="company-header">
          <ssk-avatar
            class="avatar"
            src="/public/Avatar.png"
            alt="demo avatar"
            shape="circle"
          ></ssk-avatar>
          <label class="name">Sellsuki company</label>
          <label class="branch">สาขา รัชดาภิเษก</label>
        </div>
      </ssk-dropdown-button>
      <ssk-dropdown-item>สาขา รัชดาภิเษก</ssk-dropdown-item>
      <ssk-dropdown-item>สาขา สีลม</ssk-dropdown-item>
      <ssk-dropdown-item>สาขา ทองหล่อ</ssk-dropdown-item>
    </ssk-dropdown>
  </ssk-sidebar-header>

  <ssk-sidebar-list>
    <ssk-sidebar-group label="Dashboard" key="dashboard">
      <ssk-sidebar-item key="dashboard-overview">
        <ssk-icon slot="prefix" name="outline-building-storefront"></ssk-icon>
        ภาพรวมร้าน
      </ssk-sidebar-item>
      <ssk-sidebar-item key="dashboard-orders">
        <ssk-icon slot="prefix" name="outline-inbox-stack"></ssk-icon>
        ออเดอร์
      </ssk-sidebar-item>
      <ssk-sidebar-item key="dashboard-live" disabled>
        <ssk-icon slot="prefix" name="solid-signal"></ssk-icon>
        Live (เร็วๆ นี้)
      </ssk-sidebar-item>
    </ssk-sidebar-group>

    <ssk-sidebar-group label="Product" key="product">
      <ssk-sidebar-item key="product-list">
        <ssk-icon slot="prefix" name="outline-shopping-bag"></ssk-icon>
        รายการสินค้า
      </ssk-sidebar-item>
      <ssk-sidebar-item key="product-category">
        <ssk-icon slot="prefix" name="outline-squares-plus"></ssk-icon>
        หมวดหมู่
      </ssk-sidebar-item>
    </ssk-sidebar-group>
  </ssk-sidebar-list>

  <ssk-sidebar-item slot="footer">
    <ssk-icon slot="prefix" name="outline-user-group"></ssk-icon>
    Support
  </ssk-sidebar-item>
  <ssk-sidebar-item slot="footer">
    <ssk-icon slot="prefix" name="outline-cog-8-tooth"></ssk-icon>
    Setting
  </ssk-sidebar-item>
`;

// Shared TopNavbar showcase content — mirrors Components/Navigation/TopNavbar > ShowCase.
const navbarShowcase = (onToggle: () => void) => html`
  <ssk-top-navbar slot="navbar">
    <div slot="left" style="display:flex;align-items:center;gap:10px">
      <ssk-button variant="ghost" size="sm" @click=${onToggle}>
        <ssk-icon name="outline-bars-3-center-left"></ssk-icon>
      </ssk-button>
      <ssk-logo
        srcLogo="https://placehold.co/40x40"
        altLogo="brand logo"
        srcLogoName="https://placehold.co/70x40"
        altLogoName="brand name"
        fullLogo
      ></ssk-logo>
    </div>

    <ssk-input placeholder="ค้นหาสินค้า / ออเดอร์ / ลูกค้า" value="">
      <ssk-icon name="outline-magnifying-glass" slot="prefix"></ssk-icon>
    </ssk-input>

    <div slot="right" style="display:flex;align-items:center;gap:14px">
      <ssk-icon name="outline-bell"></ssk-icon>
      <ssk-icon name="solid-point-3x3"></ssk-icon>
      <ssk-avatar
        src="https://placehold.co/40x40"
        alt="user avatar"
        shape="circle"
      ></ssk-avatar>
    </div>
  </ssk-top-navbar>
`;

const defaultArgs: AppShellArgs = {
  sidebarCollapsed: false,
  noSidebar: false,
  noNavbar: false,
  navbarHeight: "64px",
  sidebarWidth: "256px",
  brand: "sellsuki",
};

// Primary, full-fidelity story that demonstrates AppShell composing the real
// `<ssk-top-navbar>` and `<ssk-sidebar>` showcases side-by-side around a
// page-header + body. This is the canonical "what does the shell look like
// in a real app" answer.
export const ShowCase: Story = {
  args: defaultArgs,
  render: (args: AppShellArgs) => {
    const onToggle = () => {
      const shell = document.querySelector("ssk-app-shell") as
        | (HTMLElement & { sidebarCollapsed?: boolean })
        | null;
      if (shell) shell.sidebarCollapsed = !shell.sidebarCollapsed;
    };
    return html`
      <ssk-app-shell-provider brand=${args.brand}>
        <ssk-app-shell
          style="height:100vh;display:block"
          navbar-height=${args.navbarHeight}
          sidebar-width=${args.sidebarWidth}
          ?sidebar-collapsed=${args.sidebarCollapsed}
          ?no-sidebar=${args.noSidebar}
          ?no-navbar=${args.noNavbar}
        >
          ${navbarShowcase(onToggle)}

          <ssk-sidebar
            slot="sidebar"
            style="height:100%"
            ?expanded=${!args.sidebarCollapsed}
            width="100%"
            .expandedGroups=${["dashboard", "product"]}
          >
            ${sidebarShowcase()}
          </ssk-sidebar>

          <ssk-feature-page-scaffold>
            <ssk-page-header slot="header" title="ภาพรวมร้าน">
              <ssk-text slot="subtitle" size="md" color="background.600">
                สรุปยอดขายและออเดอร์วันนี้
              </ssk-text>
              <ssk-button slot="actions" variant="solid" themeColor="primary">
                สร้างออเดอร์ใหม่
              </ssk-button>
            </ssk-page-header>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;padding:24px">
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
          </ssk-feature-page-scaffold>
        </ssk-app-shell>
      </ssk-app-shell-provider>
    `;
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Full-fidelity AppShell — real `<ssk-top-navbar>` with hamburger, logo, search, and notification cluster + real `<ssk-sidebar>` with account header, grouped menu items, and footer actions. Click the hamburger to toggle the sidebar.",
      },
    },
  },
};

// Compact composition smoke test — minimal sidebar/navbar to confirm the
// shell renders without depending on every nested component.
export const Default: Story = {
  args: defaultArgs,
  render: (args: AppShellArgs) => html`
    <ssk-app-shell-provider brand=${args.brand}>
      <ssk-app-shell
        style="height:100vh;display:block"
        navbar-height=${args.navbarHeight}
        sidebar-width=${args.sidebarWidth}
        ?sidebar-collapsed=${args.sidebarCollapsed}
        ?no-sidebar=${args.noSidebar}
        ?no-navbar=${args.noNavbar}
      >
        <div slot="navbar" style="display:flex;align-items:center;justify-content:space-between;height:100%;padding:0 20px">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="font-weight:700;font-size:20px;color:var(--fg-brand-primary,#0ea5e9)">Sellsuki</span>
            <span style="color:var(--text-secondary,#6b7280)">System Name</span>
          </div>
          <ssk-avatar src="https://placehold.co/40x40" alt="user" shape="circle" size="md"></ssk-avatar>
        </div>

        <ssk-sidebar
          slot="sidebar"
          style="height:100%"
          ?expanded=${!args.sidebarCollapsed}
          width="100%"
        >
          <div slot="header" style="padding:12px;font-weight:600">Menu</div>
        </ssk-sidebar>

        <ssk-feature-page-scaffold>
          <div slot="header" style="font-size:24px;font-weight:700">Page Title</div>
          <div style="padding:24px;background:var(--bg-primary,#fff);border-radius:var(--radius-md,8px);border:1px solid var(--stroke-primary,#e5e7eb)">
            Main content area
          </div>
        </ssk-feature-page-scaffold>
      </ssk-app-shell>
    </ssk-app-shell-provider>
  `,
  parameters: { layout: "fullscreen" },
};

export const SidebarCollapsed: Story = {
  ...Default,
  args: { ...defaultArgs, sidebarCollapsed: true },
};

export const NoSidebar: Story = {
  ...Default,
  args: { ...defaultArgs, noSidebar: true },
};

export const PatonaBrand: Story = {
  ...ShowCase,
  args: { ...defaultArgs, brand: "patona" },
};
