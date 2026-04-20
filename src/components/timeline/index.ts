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

export class Timeline extends LitElement {
    static registeredName = "ssk-timeline";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    // BaseAttributes
    @property({ type: String })
    testId?: string;

    // ThemeValue
    @property({ type: String })
    themeColor: ColorRole | ColorName = "primary";
    @property({ type: String })
    color?: ColorRole | ColorName;
    @property({ type: String })
    backgroundColor?: string | undefined;

    @property({ type: String })
    size: Size = "md";
    @property({ type: String })
    padding?: Size;
    @property({ type: String })
    fontSize?: string | undefined;
    @property({ type: String })
    gap?: string | undefined;
    @property({ type: String })
    rounded?: string | undefined;
    @property({ type: String })
    margin?: string | undefined;

    // font
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    @property({ type: Array })
    Items: TimelineItem[] = [];

    @property({ type: Boolean })
    hidden = false;

    @property({ type: String })
    display: "vertical" | "horizontal" = "vertical";
    render() {
        if (this.hidden) {
            return nothing;
        }
        const getStatusColor = (
            status: "completed" | "in-progress" | "pending"
        ) => {
            switch (status) {
                case "completed":
                    return "#059669";
                case "in-progress":
                    return "#32a9ff";
                case "pending":
                    return "#9ca3af";
                default:
                    return "#9ca3af";
            }
        };

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
              <li
                class="${getLineClass(item.status)}"
                style="--timeline-dot-color: ${getStatusColor(item.status)};"
              >
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
        background-color: var(--timeline-dot-color, #3498db);
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
        background-color: var(
            --timeline-line-color,
            #059669
        );
        z-index: 0;
    }
    .timeline li.in-progress::after,
    .timeline li.pending::after {
        background-color: transparent;
        background-image: linear-gradient(
            to bottom,
            transparent 50%,
            var(--timeline-line-color, #e5e7eb) 50%
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
        background-color: var(--timeline-line-color, #059669);
        left: 20px;
    }
    .timeline.horizontal li.in-progress::after,
    .timeline.horizontal li.pending::after {
        border-top: 2px dashed var(--timeline-line-color, #e5e7eb);
        background: none;
    }
    .timeline.horizontal li.in-progress::after,
    .timeline.horizontal li.pending::after {
        border-top-style: dashed;
        border-top-width: 2px;
        border-top-color: var(--timeline-line-color, #e5e7eb);
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
        color: var(--ssk-colors-gray-500);
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
        font-size: 24px;
        font-weight: 400;
        color: var(--ssk-colors-gray-800);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .timeline-description {
        margin: 15px 0 0 15px;
        font-size: var(--font-size-p,20px);
        color: var(--ssk-colors-gray-800);
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

if (!customElements.get("ds-timeline")) {
  customElements.define("ds-timeline", Timeline);
}
if (!customElements.get("ssk-timeline")) {
  customElements.define("ssk-timeline", Timeline);
}
