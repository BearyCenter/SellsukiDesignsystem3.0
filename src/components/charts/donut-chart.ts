import { LitElement, css, html, svg, nothing } from "lit";
import { property } from "lit/decorators.js";

export interface DonutSlice {
  label: string;
  value: number;
  color?: string;
}

const DEFAULT_COLORS = [
  "var(--fg-brand-primary, #0ea5e9)",
  "var(--bg-success-solid, #22c55e)",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export class DonutChart extends LitElement {
  static registeredName = "ds-donut-chart";

  @property({ type: Array })
  slices: DonutSlice[] = [];

  @property({ type: Number })
  size = 200;

  @property({ type: Number })
  thickness = 40;

  @property({ type: Boolean, attribute: "show-legend" })
  showLegend = true;

  @property({ type: String, attribute: "center-label" })
  centerLabel = "";

  @property({ type: String, attribute: "center-value" })
  centerValue = "";

  @property({ type: String, attribute: "test-id" })
  testId?: string;

  private _arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle - 90));
    const y1 = cy + r * Math.sin(toRad(startAngle - 90));
    const x2 = cx + r * Math.cos(toRad(endAngle - 90));
    const y2 = cy + r * Math.sin(toRad(endAngle - 90));
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large},1 ${x2.toFixed(2)},${y2.toFixed(2)}`;
  }

  render() {
    const total = this.slices.reduce((s, sl) => s + sl.value, 0) || 1;
    const cx = this.size / 2;
    const cy = this.size / 2;
    const r = (this.size - this.thickness) / 2;
    let angle = 0;

    return html`
      <div class="wrap" data-testid=${this.testId ?? nothing}>
        <svg width=${this.size} height=${this.size} viewBox="0 0 ${this.size} ${this.size}" role="img">
          ${this.slices.length === 0 ? svg`
            <circle cx=${cx} cy=${cy} r=${r} fill="none"
              stroke="var(--stroke-primary,#e5e7eb)" stroke-width=${this.thickness} />
          ` : this.slices.map((sl, i) => {
            const color = sl.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            const sweep = (sl.value / total) * 360;
            const start = angle;
            angle += sweep;
            const d = this._arc(cx, cy, r, start, angle - 0.2);
            return svg`<path d=${d} fill="none" stroke=${color} stroke-width=${this.thickness}
              stroke-linecap="round" />`;
          })}

          ${this.centerValue ? svg`
            <text x=${cx} y=${cy - 6} text-anchor="middle" dominant-baseline="middle"
              class="center-value">${this.centerValue}</text>
            <text x=${cx} y=${cy + 14} text-anchor="middle" dominant-baseline="middle"
              class="center-label">${this.centerLabel}</text>
          ` : this.centerLabel ? svg`
            <text x=${cx} y=${cy} text-anchor="middle" dominant-baseline="middle"
              class="center-value">${this.centerLabel}</text>
          ` : nothing}
        </svg>

        ${this.showLegend && this.slices.length > 0 ? html`
          <div class="legend">
            ${this.slices.map((sl, i) => html`
              <div class="legend-item">
                <span class="legend-dot" style="background:${sl.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}"></span>
                <span class="legend-label">${sl.label}</span>
                <span class="legend-pct">${((sl.value / total) * 100).toFixed(1)}%</span>
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }

  static styles = css`
    :host { display: inline-block; }
    .wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    svg { display: block; }
    .center-value {
      font-size: calc(var(--font-size-label, 20px) * 1.4);
      font-family: var(--font-label, sans-serif);
      font-weight: var(--font-weight-bold, 700);
      fill: var(--text-primary, #111827);
    }
    .center-label {
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
      fill: var(--text-secondary, #6b7280);
    }
    .legend { display: flex; flex-direction: column; gap: 8px; width: 100%; }
    .legend-item {
      display: flex; align-items: center; gap: 8px;
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
    }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .legend-label { flex: 1; color: var(--text-primary, #111827); }
    .legend-pct { color: var(--text-secondary, #6b7280); font-weight: var(--font-weight-medium, 500); }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-donut-chart": DonutChart;
    "ssk-donut-chart": DonutChart;
  }
}

if (!customElements.get("ds-donut-chart")) { customElements.define("ds-donut-chart", DonutChart); }
if (!customElements.get("ssk-donut-chart")) { customElements.define("ssk-donut-chart", class extends DonutChart {}); }
