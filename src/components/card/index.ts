import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ssk-card")
export class Card extends LitElement {
  static registeredName = "ssk-card";

  @property({ type: String })
    variant: "outlined" | "elevated" = "outlined";
  @property({ type: String })
    type: "stacked" | "horizontal" = "stacked";
  @property({ type: Boolean }) 
    loading = false;

  @property({ type: String }) 
    title = "";
  @property({ type: String }) 
    subtitle = "";
  @property({ type: String }) 
    image = "";
  @property({ type: String }) 
    icons = "";

  @property({ type: String }) 
    width = "280px";
  @property({ type: String }) 
    height = "auto";
  @property({ type: String }) 
    imageWidth = "280px";
  @property({ type: String }) 
    imageHeight = "210px";
  @property({ type: String }) 
    radius = "12px";

  private get cardClasses() {
    return [
      "card",
      this.variant,
      this.type,
      this.loading ? "is-loading" : "",
    ].join(" ");
  }

  render() {
    if (this.loading) {
      return html`
        <article
          class=${this.cardClasses}
          style=${`--card-w:${this.width};--card-h:${this.height};--media-w:${this.imageWidth};--media-h:${this.imageHeight};--radius:${this.radius};`}
          aria-busy="true"
        >
          ${this.type === "stacked"
          ? html`
                <div class="media skeleton"></div>
                <div class="content">
                  <div class="skeleton line lg"></div>
                  <div class="skeleton line"></div>
                  <div class="skeleton line short"></div>
                </div>
              `
          : html`
                <div class="media skeleton small"></div>
                <div class="content">
                  <div class="skeleton line"></div>
                  <div class="skeleton line short"></div>
                </div>
                <div class="trailing">
                  <div class="skeleton pill"></div>
                </div>
              `}
        </article>
      `;
    }

    // DEFAULT STATE
    return html`
      <article
        class=${this.cardClasses}
        style=${`--card-w:${this.width};--card-h:${this.height};--media-w:${this.imageWidth};--media-h:${this.imageHeight};--radius:${this.radius};`}
      >
        ${this.type === "stacked"
        ? html`
              <div class="media">
                ${this.image
            ? html`<img src=${this.image} alt="" />`
            : html`<div class="media-fallback"></div>`}
              </div>

              <div class="content">
                <header class="titles">
                  ${this.title
            ? html`<div class="title" title=${this.title}
                        >${this.title}</div
                      >`
            : nothing}
                  ${this.subtitle
            ? html`<div class="subtitle" title=${this.subtitle}
                        >${this.subtitle}</div
                      >`
            : nothing}
                </header>

                <div class="meta">
                  <slot name="meta"></slot>
                </div>

                <div class="actions">
                  <slot name="action"></slot>
                </div>
              </div>
            `
        : html`
              <div class="icons">
                <slot name="icon"></slot>
              </div>
              <div class="media small">
                ${this.image
                  ? html`<img src=${this.image} alt="" />`
                  : html`<div class="media-fallback"></div>`}
              </div>

              <div class="content">
                <div class="title one-line" title=${this.title}>${this.title}</div>
                ${this.subtitle
                  ? html`<div class="subtitle one-line" title=${this.subtitle}
                            >${this.subtitle}</div
                          >`
                  : nothing}
                  <slot name="meta"></slot>
              </div>

              <div class="actions">
                <slot name="actions"></slot>
              </div>
            `}
      </article>
    `;
  }

  static styles = css`
    :host { display: inline-block; }
    .card {
      width: var(--card-w, 280px);
      height: var(--card-h, auto);
      border-radius: var(--radius, 12px);
      background: white;
      box-sizing: border-box;
      color: #1f2937; /* slate-800 */
      transition: box-shadow .2s ease, transform .12s ease, border-color .2s ease;
      overflow: hidden;
    }
    .card.outlined { border: 1px solid #e5e7eb; } /* gray-200 */
    .card.elevated { border: 1px solid transparent; box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08); }
    .card:focus-within { outline: 2px solid #7c3aed33; outline-offset: 2px; } /* violet */

    /* --- Stacked layout --- */
    .card.stacked { display: grid; grid-template-rows: auto 1fr; }
    .card.stacked .media {
      width: var(--media-w, 280px);
      height: var(--media-h, 210px);
      background: #f3f4f6;
    }
    .card.stacked .media img {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .media-fallback { width: 100%; height: 100%; background: linear-gradient(135deg,#f3f4f6,#e5e7eb); }
    .card.stacked .content { padding: 12px; display: grid; gap: 8px; }
    .titles { display: grid; gap: 4px; }
    .title { font-weight: 600; line-height: 1.3; }
    .subtitle { font-size: 12px; color: #6b7280; }
    .meta { font-size: 14px; color: #ef4444; } /* price red like mock */
    .actions { margin-top: 4px; display: flex; gap: 8px; align-items: center; }

    /* --- Horizontal layout --- */
    .card.horizontal {
      display: grid;
      grid-template-columns: auto auto 1fr auto;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
    }
    .card.horizontal .media.small {
      width: 48px; height: 48px; border-radius: 8px; overflow: hidden; background:#f3f4f6;
    }
    .card.horizontal .media.small img {
      width: 100%; height: 100%; object-fit: cover; display:block;
    }
    .card.horizontal .content {
      min-width: 0;
      display: grid; gap: 4px;
    }
    .one-line { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .trailing { display: grid; align-items: center; }
    ::slotted([slot="end"]), ::slotted([slot="action"]) { display: inline-flex; align-items: center; }

    /* --- Skeleton loading --- */
    .is-loading { position: relative; }
    .skeleton {
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
      background-size: 400% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
      border-radius: 10px;
    }
    .skeleton.line { height: 12px; }
    .skeleton.line.lg { height: 16px; }
    .skeleton.line.short { width: 40%; }
    .skeleton.pill { width: 60px; height: 28px; border-radius: 999px; }
    .card.stacked .content .skeleton { margin: 6px 0; }
    .card.horizontal .content .skeleton { margin: 4px 0; }
    .skeleton.small { width: 48px; height: 48px; }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    ::slotted(button), ::slotted(a) {
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap { "ssk-card": Card; }
}
