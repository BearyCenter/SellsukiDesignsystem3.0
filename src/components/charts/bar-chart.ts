import { LitElement, css, html, svg, nothing } from "lit";
import { property, state } from "lit/decorators.js";

export interface BarChartSeries {
  label: string;
  values: number[];
  color?: string;
}

const DEFAULT_COLORS = [
  "var(--fg-brand-primary, #0ea5e9)",
  "var(--bg-success-solid, #22c55e)",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export class BarChart extends LitElement {
  static registeredName = "ds-bar-chart";

  @property({ type: Array })
  series: BarChartSeries[] = [];

  @property({ type: Array })
  labels: string[] = [];

  @property({ type: Number })
  height = 300;

  @property({ type: Boolean, attribute: "show-grid" })
  showGrid = true;

  @property({ type: Boolean, attribute: "show-legend" })
  showLegend = true;

  @property({ type: Number, attribute: "bar-gap" })
  barGap = 4;

  @property({ type: String, attribute: "test-id" })
  testId?: string;

  @state() private _width = 600;
  private _ro?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._ro = new ResizeObserver(entries => {
      this._width = entries[0].contentRect.width || 600;
    });
    this.updateComplete.then(() => {
      this._ro?.observe(this.shadowRoot?.querySelector(".chart-wrap") as Element ?? this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._ro?.disconnect();
  }

  render() {
    const padL = 48, padR = 20, padT = 16, padB = 40;
    const allValues = this.series.flatMap(s => s.values);
    const max = Math.max(...allValues, 1);
    const chartW = this._width - padL - padR;
    const chartH = this.height - padT - padB;
    const groupCount = this.labels.length || (this.series[0]?.values.length ?? 0);
    const seriesCount = this.series.length;
    const groupW = groupCount > 0 ? chartW / groupCount : 0;
    const barW = Math.max(4, (groupW - this.barGap * (seriesCount + 1)) / seriesCount);
    const yTicks = 5;

    return html`
      <div class="chart-wrap" data-testid=${this.testId ?? nothing}>
        <svg width="100%" height=${this.height}
          viewBox="0 0 ${this._width} ${this.height}"
          preserveAspectRatio="none" role="img">

          ${this.showGrid ? svg`
            ${Array.from({ length: yTicks + 1 }, (_, i) => {
              const y = padT + (chartH / yTicks) * i;
              const val = max - (max / yTicks) * i;
              return svg`
                <line x1=${padL} y1=${y.toFixed(1)} x2=${this._width - padR} y2=${y.toFixed(1)}
                  stroke="var(--stroke-primary,#e5e7eb)" stroke-width="1" />
                <text x=${padL - 6} y=${y.toFixed(1)} text-anchor="end" dominant-baseline="middle"
                  class="tick-label">${Math.round(val)}</text>
              `;
            })}
          ` : nothing}

          ${Array.from({ length: groupCount }, (_, gi) => {
            const groupX = padL + gi * groupW;
            const label = this.labels[gi] ?? String(gi + 1);
            return svg`
              ${this.series.map((s, si) => {
                const val = s.values[gi] ?? 0;
                const barH = (val / max) * chartH;
                const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
                const x = groupX + this.barGap + si * (barW + this.barGap);
                const y = padT + chartH - barH;
                return svg`<rect x=${x.toFixed(1)} y=${y.toFixed(1)} width=${barW.toFixed(1)} height=${Math.max(0, barH).toFixed(1)}
                  fill=${color} rx="3" />`;
              })}
              <text x=${(groupX + groupW / 2).toFixed(1)} y=${this.height - 10}
                text-anchor="middle" class="tick-label">${label}</text>
            `;
          })}
        </svg>

        ${this.showLegend && this.series.length > 0 ? html`
          <div class="legend">
            ${this.series.map((s, si) => html`
              <div class="legend-item">
                <span class="legend-dot" style="background:${s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length]}"></span>
                <span>${s.label}</span>
              </div>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .chart-wrap { width: 100%; }
    svg { display: block; overflow: visible; }
    .tick-label {
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
      fill: var(--text-secondary, #6b7280);
    }
    .legend {
      display: flex; flex-wrap: wrap; gap: 16px; margin-top: 12px; justify-content: center;
    }
    .legend-item {
      display: flex; align-items: center; gap: 6px;
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
      color: var(--text-primary, #111827);
    }
    .legend-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-bar-chart": BarChart;
    "ssk-bar-chart": BarChart;
  }
}

if (!customElements.get("ds-bar-chart")) { customElements.define("ds-bar-chart", BarChart); }
if (!customElements.get("ssk-bar-chart")) { customElements.define("ssk-bar-chart", BarChart); }
