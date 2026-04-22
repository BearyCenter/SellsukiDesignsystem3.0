import { LitElement, css, html, svg, nothing } from "lit";
import { property, state } from "lit/decorators.js";

export interface LineChartSeries {
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

export class LineChart extends LitElement {
  static registeredName = "ds-line-chart";

  @property({ type: Array })
  series: LineChartSeries[] = [];

  @property({ type: Array })
  labels: string[] = [];

  @property({ type: Number })
  height = 300;

  @property({ type: Boolean })
  smooth = true;

  @property({ type: Boolean, attribute: "show-dots" })
  showDots = true;

  @property({ type: Boolean, attribute: "show-grid" })
  showGrid = true;

  @property({ type: Boolean, attribute: "show-legend" })
  showLegend = true;

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

  private _computePoints(values: number[], allValues: number[], padL: number, padR: number, padT: number, padB: number) {
    const w = this._width - padL - padR;
    const h = this.height - padT - padB;
    const min = Math.min(0, ...allValues);
    const max = Math.max(...allValues) || 1;
    const range = max - min || 1;
    const step = values.length > 1 ? w / (values.length - 1) : w;
    return values.map((v, i) => ({
      x: padL + (values.length > 1 ? i * step : w / 2),
      y: padT + h - ((v - min) / range) * h,
    }));
  }

  private _pathD(points: { x: number; y: number }[], smooth: boolean): string {
    if (points.length === 0) return "";
    if (!smooth) {
      return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    }
    // Catmull-Rom to cubic bezier
    let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[Math.max(0, i - 2)];
      const p1 = points[i - 1];
      const p2 = points[i];
      const p3 = points[Math.min(points.length - 1, i + 1)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  }

  render() {
    const padL = 48, padR = 20, padT = 16, padB = 40;
    const allValues = this.series.flatMap(s => s.values);
    const min = Math.min(0, ...allValues);
    const max = Math.max(...allValues) || 1;
    const h = this.height - padT - padB;

    const yTicks = 5;
    const range = max - min || 1;

    return html`
      <div class="chart-wrap" data-testid=${this.testId ?? nothing}>
        <svg
          width="100%"
          height=${this.height}
          viewBox="0 0 ${this._width} ${this.height}"
          preserveAspectRatio="none"
          role="img"
        >
          ${this.showGrid ? svg`
            ${Array.from({ length: yTicks + 1 }, (_, i) => {
              const y = padT + (h / yTicks) * i;
              const val = max - (range / yTicks) * i;
              return svg`
                <line x1=${padL} y1=${y.toFixed(1)} x2=${this._width - padR} y2=${y.toFixed(1)}
                  stroke="var(--stroke-primary,#e5e7eb)" stroke-width="1" />
                <text x=${padL - 6} y=${y.toFixed(1)} text-anchor="end" dominant-baseline="middle"
                  class="tick-label">${Math.round(val)}</text>
              `;
            })}
          ` : nothing}

          ${this.labels.length > 0 ? svg`
            ${this.labels.map((label, i) => {
              const step = (this._width - padL - padR) / Math.max(this.labels.length - 1, 1);
              const x = padL + (this.labels.length > 1 ? i * step : (this._width - padL - padR) / 2);
              return svg`
                <text x=${x.toFixed(1)} y=${this.height - 10} text-anchor="middle" class="tick-label">${label}</text>
              `;
            })}
          ` : nothing}

          ${this.series.map((s, si) => {
            const color = s.color ?? DEFAULT_COLORS[si % DEFAULT_COLORS.length];
            const points = this._computePoints(s.values, allValues, padL, padR, padT, padB);
            const d = this._pathD(points, this.smooth);
            return svg`
              <path d=${d} fill="none" stroke=${color} stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round" />
              ${this.showDots ? points.map(p => svg`
                <circle cx=${p.x.toFixed(1)} cy=${p.y.toFixed(1)} r="4"
                  fill=${color} stroke="var(--bg-primary,#fff)" stroke-width="2" />
              `) : nothing}
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
    :host {
      display: block;
    }

    .chart-wrap {
      width: 100%;
    }

    svg {
      display: block;
      overflow: visible;
    }

    .tick-label {
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
      fill: var(--text-secondary, #6b7280);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 12px;
      justify-content: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: var(--font-size-caption, 18px);
      font-family: var(--font-caption, sans-serif);
      color: var(--text-primary, #111827);
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-line-chart": LineChart;
    "ssk-line-chart": LineChart;
  }
}

if (!customElements.get("ds-line-chart")) {
  customElements.define("ds-line-chart", LineChart);
}
if (!customElements.get("ssk-line-chart")) {
  customElements.define("ssk-line-chart", LineChart);
}
