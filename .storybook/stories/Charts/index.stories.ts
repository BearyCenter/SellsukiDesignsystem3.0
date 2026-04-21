import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/charts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const salesData = {
  labels: months,
  series: [
    { label: "Revenue", values: [120, 195, 143, 230, 187, 260, 215, 300, 270, 320, 290, 410] },
    { label: "Orders",  values: [80, 130, 95, 160, 125, 175, 140, 200, 170, 210, 185, 260] },
  ],
};

const meta = {
  title: "Components/Data/Charts",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const LineChartDefault: Story = {
  render: () => html`
    <div style="padding:24px;background:var(--bg-primary,#fff);border-radius:8px;border:1px solid #e5e7eb">
      <h3 style="margin:0 0 16px;font-size:20px;font-weight:600">Monthly Revenue vs Orders</h3>
      <ds-line-chart
        .series=${salesData.series}
        .labels=${salesData.labels}
        height=${280}
        ?smooth=${true}
        ?show-dots=${true}
        ?show-grid=${true}
        ?show-legend=${true}
      ></ds-line-chart>
    </div>
  `,
};

export const LineChartNoSmooth: Story = {
  render: () => html`
    <div style="padding:24px;background:var(--bg-primary,#fff);border-radius:8px;border:1px solid #e5e7eb">
      <h3 style="margin:0 0 16px;font-size:20px;font-weight:600">Stepped Line Chart</h3>
      <ds-line-chart
        .series=${salesData.series}
        .labels=${salesData.labels}
        height=${280}
        ?smooth=${false}
        ?show-dots=${false}
      ></ds-line-chart>
    </div>
  `,
};

export const BarChartDefault: Story = {
  render: () => html`
    <div style="padding:24px;background:var(--bg-primary,#fff);border-radius:8px;border:1px solid #e5e7eb">
      <h3 style="margin:0 0 16px;font-size:20px;font-weight:600">Quarterly Comparison</h3>
      <ds-bar-chart
        .series=${[
          { label: "Q1", values: [120, 195, 143, 230], color: "var(--fg-brand-primary,#0ea5e9)" },
          { label: "Q2", values: [180, 220, 160, 290], color: "#22c55e" },
        ]}
        .labels=${["Jan", "Feb", "Mar", "Apr"]}
        height=${280}
        ?show-grid=${true}
        ?show-legend=${true}
      ></ds-bar-chart>
    </div>
  `,
};

export const DonutChartDefault: Story = {
  render: () => html`
    <div style="padding:24px;background:var(--bg-primary,#fff);border-radius:8px;border:1px solid #e5e7eb;display:inline-block">
      <h3 style="margin:0 0 16px;font-size:20px;font-weight:600">Order Status</h3>
      <ds-donut-chart
        .slices=${[
          { label: "Delivered", value: 64 },
          { label: "Pending",   value: 22 },
          { label: "Cancelled", value: 8, color: "#ef4444" },
          { label: "Returned",  value: 6, color: "#f59e0b" },
        ]}
        size=${220}
        thickness=${44}
        center-value="64%"
        center-label="Delivered"
        ?show-legend=${true}
      ></ds-donut-chart>
    </div>
  `,
};

export const AllCharts: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px">
      <div style="background:#fff;border-radius:8px;border:1px solid #e5e7eb;padding:20px">
        <p style="margin:0 0 12px;font-weight:600;font-size:20px">Line</p>
        <ds-line-chart .series=${salesData.series} .labels=${months.slice(0,6)} height=${200}></ds-line-chart>
      </div>
      <div style="background:#fff;border-radius:8px;border:1px solid #e5e7eb;padding:20px">
        <p style="margin:0 0 12px;font-weight:600;font-size:20px">Bar</p>
        <ds-bar-chart
          .series=${[{ label: "Sales", values: [40,80,60,110,90,70] }]}
          .labels=${months.slice(0,6)}
          height=${200}
        ></ds-bar-chart>
      </div>
      <div style="background:#fff;border-radius:8px;border:1px solid #e5e7eb;padding:20px;display:flex;justify-content:center">
        <ds-donut-chart
          .slices=${[{label:"A",value:40},{label:"B",value:30},{label:"C",value:20},{label:"D",value:10}]}
          size=${180}
          thickness=${36}
          center-value="100"
        ></ds-donut-chart>
      </div>
    </div>
  `,
};
