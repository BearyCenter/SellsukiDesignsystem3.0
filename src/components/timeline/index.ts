import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { themeContext } from "../../contexts/theme";
import {
    ColorName,
    ColorRole,
    FontFamilyGroup,
    FontWeight,
    Size,
    Theme,
    parseThemeToCssVariables,
} from "../../types/theme";
import "../../../src/elements/icon";

export interface TimelineItem {
    title: string;
    description: string;
    subTitle: string;
    status: "completed" | "in-progress" | "pending";
}

/**
 * Sellsuki Timeline — DS 3.0
 *
 * Chronological list of events rendered as a connected line with status
 * dots. Each item in the `Items` array has a title, subTitle (e.g.
 * timestamp), description, and a `status` (`completed` / `in-progress` /
 * `pending`) that styles the connector segment leading into it. Supports
 * `vertical` (default) and `horizontal` layouts.
 *
 * Reach for `<ssk-timeline>` for activity feeds, order history, audit
 * logs — anywhere "what happened when" is the primary story. For a guided
 * wizard with discrete steps use `<ssk-stepper>` instead.
 *
 * @example
 *   <ssk-timeline
 *     .Items=${[
 *       { title: "สั่งซื้อ",   subTitle: "10:24", description: "", status: "completed" },
 *       { title: "ชำระเงิน",  subTitle: "10:27", description: "", status: "in-progress" },
 *       { title: "จัดส่ง",     subTitle: "—",    description: "", status: "pending" },
 *     ]}
 *   ></ssk-timeline>
 */
export class Timeline extends LitElement {
    static registeredName = "ssk-timeline";

    /**
     * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
     */
    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    // BaseAttributes
    /**
     * Stable `data-testid` attribute applied to the timeline container for E2E test selectors.
     */
    @property({ type: String })
    testId?: string;

    // ThemeValue
    /**
     * Brand accent for the in-progress event dot — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
     */
    @property({ type: String })
    themeColor: ColorRole | ColorName = "primary";
    /**
     * Optional override for event title color (`ColorRole` or `ColorName`). Leave unset to use `--text-primary`.
     */
    @property({ type: String })
    color?: ColorRole | ColorName;
    /**
     * Optional surface color behind the timeline (any CSS color).
     */
    @property({ type: String })
    backgroundColor?: string | undefined;

    /**
     * Visual size scale — `xs` / `sm` / `md` / `lg` / `xl`. Controls font tokens and spacing between events. Defaults to `md`.
     */
    @property({ type: String })
    size: Size = "md";
    /**
     * Override the padding token — accepts the same `xs`–`xl` scale as `size`. Leave unset to inherit from `size`.
     */
    @property({ type: String })
    padding?: Size;
    /**
     * Override the event title font size (any CSS length). Stay above 18px (`--font-size-caption`) for the DS 3.0 minimum.
     */
    @property({ type: String })
    fontSize?: string | undefined;
    /**
     * Override the gap between timeline events (any CSS length).
     */
    @property({ type: String })
    gap?: string | undefined;
    /**
     * Override the corner radius for event surfaces (any CSS length). Defaults to the size-bound `--radius-*` token.
     */
    @property({ type: String })
    rounded?: string | undefined;
    /**
     * Override the outer margin around the timeline (any CSS shorthand).
     */
    @property({ type: String })
    margin?: string | undefined;

    // font
    /**
     * Font family group — `sans` (default body face) or `mono` for fixed-width timestamps.
     */
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    /**
     * Font weight token for event titles — typically `normal`.
     */
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    /**
     * Ordered list of timeline events. Each item has `title`, `subTitle` (timestamp / context), `description`, and `status` (`completed` / `in-progress` / `pending`) which styles the connector segment leading into it.
     */
    @property({ type: Array })
    Items: TimelineItem[] = [];

    /**
     * When `true`, the timeline is omitted from the rendered tree entirely.
     */
    @property({ type: Boolean })
    hidden = false;

    /**
     * Layout orientation — `vertical` (default, stacked column) or `horizontal` (scrollable row).
     */
    @property({ type: String })
    display: "vertical" | "horizontal" = "vertical";
    render() {
        if (this.hidden) {
            return nothing;
        }
        const getLineClass = (status: "completed" | "in-progress" | "pending") => {
            return status === "in-progress" || status === "pending"
                ? status
                : "completed";
        };

        return html`
      ${parseThemeToCssVariables(this.theme?.components?.timeline, ":host")}

      <div
        class="timeline ${this.display}"
        data-testid=${this.testId || nothing}
      >
        <ul>
          ${this.Items.map(
            (item) => html`
              <li class="${getLineClass(item.status)}">
                <div class="timeline-content ${this.display}">
                  <p class="timeline-title">${item.title}</p>
                  <span class="date">${item.subTitle}</span>
                  <p class="timeline-description">${item.description}</p>
                </div>
              </li>
            `
        )}
        </ul>
      </div>
    `;
    }

    static styles = css`
    .timeline {
        position: relative;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }
    .timeline ul {
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    /* ── Status color tokens — defined per class, consumed by ::before/::after */
    .timeline li.completed {
        --timeline-dot-color:  var(--fg-success-primary, #059669);
        --timeline-line-color: var(--fg-success-primary, #059669);
    }
    .timeline li.in-progress {
        --timeline-dot-color:  var(--fg-brand-primary, #32a9ff);
        --timeline-line-color: var(--stroke-primary, #e5e7eb);
    }
    .timeline li.pending {
        --timeline-dot-color:  var(--text-disabled, #9ca3af);
        --timeline-line-color: var(--stroke-primary, #e5e7eb);
    }

    .timeline li {
        position: relative;
        padding-left: 30px;
    }
    .timeline li::before {
        content: "";
        position: absolute;
        left: 12px;
        top: 0;
        width: 6px;
        height: 6px;
        background-color: var(--timeline-dot-color);
        border-radius: 50%;
        z-index: 1;
        margin-top: 10px;
    }
    .timeline li::after {
        content: "";
        position: absolute;
        left: 14px;
        top: 24px;
        width: 2px;
        max-height: 120px;
        height: calc(100% - 14px);
        background-color: var(--timeline-line-color);
        z-index: 0;
    }
    .timeline li.in-progress::after,
    .timeline li.pending::after {
        background-color: transparent;
        background-image: linear-gradient(
            to bottom,
            transparent 50%,
            var(--timeline-line-color) 50%
        );
        background-size: 100% 10px;
        background-repeat: repeat;
        max-height: 120px;
    }
    .timeline-content {
        max-width: 210px;
        text-align: left;
        padding-bottom: 10px;
        height: 100px;
        padding-top: 5px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
    }
    .timeline.horizontal {
        flex-direction: row;
        align-items: center;
        overflow-x: auto;
        white-space: nowrap;
    }
    .timeline.horizontal ul {
        flex-direction: row;
    }
    .timeline-content.horizontal {
        margin-top: 20px;
        max-width: 200px;
        text-align: left;
        padding-bottom: 20px;
        display: block;
        position: relative;
        left: 80px;
        overflow: hidden;
        white-space: normal;
        height: 120px;
    }
    .timeline.horizontal li::before {
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0;
    }
    .timeline.horizontal li::after {
        top: 2px;
        width: calc(100% - 20px);
        height: 2px;
        transform: translateX(50%);
        background-color: var(--timeline-line-color);
        left: 20px;
    }
    .timeline.horizontal li.in-progress::after,
    .timeline.horizontal li.pending::after {
        border-top: 2px dashed var(--timeline-line-color);
        background: none;
    }
    .timeline.horizontal li.in-progress::after,
    .timeline.horizontal li.pending::after {
        border-top-style: dashed;
        border-top-width: 2px;
        border-top-color: var(--timeline-line-color);
        background: none;
    }
    .timeline.horizontal li::after {
        margin-left: 5px;
    }
    .timeline.horizontal li:last-child::after {
        display: none;
    }

    .timeline li:last-child::after {
        display: none;
    }
    .date {
        display: block;
        margin: -10px 0 0 15px;
        font-size: var(--font-size-caption,18px);
        color: var(--text-secondary, #6b7280);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .timeline-title {
        margin: 0 0 0 15px;
        position: relative;
        left: 0px;
        top: -6px;
        font-size: var(--font-size-p, 20px);
        font-weight: var(--font-weight-normal, 400);
        color: var(--text-primary, #111827);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .timeline-description {
        margin: 15px 0 0 15px;
        font-size: var(--font-size-p,20px);
        color: var(--text-primary, #111827);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .timeline.horizontal .timeline-description {
        font-size: var(--font-size-p,20px);
        width: 180px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-timeline": Timeline;
    }
}

if (!customElements.get("ssk-timeline")) {
  customElements.define("ssk-timeline", Timeline);
}
