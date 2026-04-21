import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/app-shell/index";
import "../../../src/components/app-shell/provider";
import "../../../src/components/app-shell/feature-page-scaffold";
import "../../../src/components/sidebar";
import "../../../src/elements/top-navbar";
import "../../../src/elements/avatar";

const meta = {
  title: "Components/Layout/AppShell",
  tags: ["autodocs"],
  argTypes: {
    sidebarCollapsed: { control: "boolean", table: { category: "State" } },
    noSidebar:        { control: "boolean", table: { category: "Props" } },
    noNavbar:         { control: "boolean", table: { category: "Props" } },
    navbarHeight:     { control: "text",    table: { category: "Layout" } },
    sidebarWidth:     { control: "text",    table: { category: "Layout" } },
    brand:            {
      control: { type: "select" },
      options: ["sellsuki", "patona", "shipmunk", "akita", "sellsukipay"],
      table: { category: "Brand" },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    sidebarCollapsed: false,
    noSidebar: false,
    noNavbar: false,
    navbarHeight: "60px",
    sidebarWidth: "256px",
    brand: "sellsuki",
  },
  render: (args: Record<string, unknown>) => html`
    <ds-app-shell-provider brand=${args.brand as string}>
      <ds-app-shell
        style="height:100vh;display:block"
        navbar-height=${args.navbarHeight as string}
        sidebar-width=${args.sidebarWidth as string}
        ?sidebar-collapsed=${args.sidebarCollapsed}
        ?no-sidebar=${args.noSidebar}
        ?no-navbar=${args.noNavbar}
      >
        <!-- Navbar slot -->
        <div slot="navbar" style="display:flex;align-items:center;justify-content:space-between;height:100%;padding:0 20px;background:var(--bg-primary,#fff)">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="font-weight:700;font-size:20px;color:var(--fg-brand-primary,#0ea5e9)">Sellsuki</span>
            <span style="color:var(--text-secondary,#6b7280);font-size:18px">System Name</span>
          </div>
          <div style="display:flex;align-items:center;gap:16px">
            <ssk-avatar src="" alt="WW" shape="circle" size="md"></ssk-avatar>
          </div>
        </div>

        <!-- Sidebar slot -->
        <ds-sidebar
          slot="sidebar"
          style="height:100%"
          ?expanded=${!args.sidebarCollapsed}
          width="100%"
        >
          <div slot="header" style="padding:12px;font-weight:600;color:var(--text-primary,#111827)">
            Menu
          </div>
        </ds-sidebar>

        <!-- Main content -->
        <ds-feature-page-scaffold>
          <div slot="header" style="font-size:24px;font-weight:700;color:var(--text-primary,#111827)">Page Title</div>
          <div style="padding:24px;background:var(--bg-primary,#fff);border-radius:var(--radius-md,8px);border:1px solid var(--stroke-primary,#e5e7eb)">
            Main content area
          </div>
        </ds-feature-page-scaffold>
      </ds-app-shell>
    </ds-app-shell-provider>
  `,
};

export const SidebarCollapsed: Story = {
  args: {
    ...Default.args,
    sidebarCollapsed: true,
  },
  render: Default.render,
};

export const NoSidebar: Story = {
  args: {
    ...Default.args,
    noSidebar: true,
  },
  render: Default.render,
};

export const PatonaBrand: Story = {
  args: {
    ...Default.args,
    brand: "patona",
  },
  render: Default.render,
};
