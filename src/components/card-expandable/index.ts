import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("ssk-expandable-card")
export class ExpandableCard extends LitElement {
  static registeredName = "ssk-expandable-card";

  @property({ type: String }) variant: "outlined" | "elevated" = "outlined";
  @property({ type: String })
  type: "expand-header" | "expand-footer" = "expand-header";

  @property({ type: Boolean }) loading = false;

  @property({ type: String }) title = "";
  @property({ type: String }) subtitle = "";

  @property({ type: String }) width = "366px";
  @property({ type: String }) height = "auto";
  @property({ type: String }) radius = "12px";

  // expand behavior
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: Boolean }) lazy = true;
  @property({ type: String, attribute: "more-label" }) moreLabel = "View more";
  @property({ type: String, attribute: "less-label" }) lessLabel = "View less";

  @state() private _panelId = `ec-${Math.random().toString(36).slice(2, 9)}`;

  private get cardClasses() {
    return ["card", this.variant, this.type, this.loading ? "is-loading" : "", this.expanded ? "is-expanded" : ""].join(" ");
  }

  private toggle = () => {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent("expanded-changed", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
  };

  // --- toggles ---
  private renderHeaderToggle() {
    return html`
      <div
        class="toggle-btn header"
        @click=${this.toggle}
        aria-controls=${this._panelId}
        aria-expanded=${String(this.expanded)}
        title=${this.expanded ? "Collapse" : "Expand"}
      >
        <slot name="toggle-icon">
          <ssk-icon
            name="solid-chevron-down"
            class="chev"
            style="display: flex;"
            color="gray.500"
          ></ssk-icon>
        </slot>
      </div>
    `;
  }

  private renderFooterToggle() {
    const label = this.expanded ? this.lessLabel : this.moreLabel;
    return html`
      <div class="footer-bar">
        <div
          class="toggle-btn footer"
          @click=${this.toggle}
          aria-controls=${this._panelId}
          aria-expanded=${String(this.expanded)}
        >
          <ssk-text size="md" color="info" fontweight="normal">${label}</ssk-text>
          <slot name="toggle-icon">
            <ssk-icon 
            name="solid-chevron-down"
            class="chev"
            style="display: flex;"
            color="info"
            size="md"
            >
            </ssk-icon>
          </slot>
        </div>
      </div>
    `;
  }

  private renderPanel() {
    const inner = this.lazy && !this.expanded ? nothing : html`<div class="inner"><slot name="expand"></slot></div>`;
    return html`
      <div id=${this._panelId} class=${`expand-panel ${this.expanded ? "open" : ""}`} role="region" aria-hidden=${String(!this.expanded)}>
        ${inner}
      </div>
    `;
  }

  private renderLoading() {
    return html`
      <article class=${this.cardClasses} style=${`--card-w:${this.width};--card-h:${this.height};--radius:${this.radius};`} aria-busy="true">
        ${this.type === "expand-header"
          ? html`
              <div class="headers-skeleton">
                    <ssk-skeleton width="180px" skeletonshape="capsule" size="md"></ssk-skeleton>
              </div>
            `
          : html`
              <div class="headers-skeleton" style="display: flex; flex-direction: column; gap: 8px; padding: 12px 16px;">
                    <ssk-skeleton width="180px" skeletonshape="capsule" size="md"></ssk-skeleton>
                    <ssk-skeleton width="240px" skeletonshape="capsule" size="md" style="padding-bottom: 14px;"></ssk-skeleton>
              </div>
              <div class="headers-skeleton" style="display: flex; flex-direction: column;">
                    <ssk-skeleton width="180px" skeletonshape="capsule" size="md"></ssk-skeleton>
              </div>
            `}
      </article>
    `;
  }

  render() {
    if (this.loading) return this.renderLoading();

    const isHeader = this.type === "expand-header";
    const isFooter = this.type === "expand-footer";

    return html`
      <article class=${this.cardClasses} style=${`--card-w:${this.width};--card-h:${this.height};--radius:${this.radius};`}>
          ${isHeader
            ? html`
                <!-- HEADER VARIANT -->
              <div class="content">
                <header class="headers">
                  <div class="headers-left">
                    <div class="slot-header">
                      <slot name="header"></slot>
                    </div>
                    <div class="title-group">
                      ${this.title
                        ? html`<ssk-text size="md" fontWeight="medium""
                            >${this.title}</ssk-text
                          >`
                        : nothing}
                      ${this.subtitle
                        ? html`<ssk-text size="sm" color="gray.500" fontWeight="normal"
                            >${this.subtitle}</ssk-text
                          >`
                        : nothing}
                    </div>
                  </div>
                  <div class="expand-toggle">
                    ${this.renderHeaderToggle()}
                  </div>
                </div>
                </header>

                <!-- expandable panel -->
                ${this.renderPanel()}
                </div>
              `
            : nothing}

          ${isFooter
            ? html`
                <div class="content">
                <div class="preview-area">
                  <slot name="preview"></slot>
                </div>

                ${this.renderPanel()}

                ${this.renderFooterToggle()}
                </div>
              `
            : nothing}
        
      </article>
    `;
  }

  static styles = css`
    :host { display: inline-block; color: #1f2937; } /* slate-800 */
    .card {
      width: var(--card-w, 320px);
      height: var(--card-h, auto);
      border-radius: var(--radius, 12px);
      background: white;
      box-sizing: border-box;
      transition: box-shadow .2s ease, border-color .2s ease;
      overflow: hidden;
    }
    .card.outlined { border: 1px solid #e5e7eb; } /* gray-200 */
    .card.elevated { 
      border: 1px solid transparent;
      box-shadow: 
        0 1px  2px rgba(17, 24, 39, 0.071),
        0 3px  3px rgba(17, 24, 39, 0.051),
        0 7px  4px rgba(17, 24, 39, 0.031),
        0 12px 5px rgba(17, 24, 39, 0.012); 
    }

    .content { display: grid; }

    /* ===== expand-header style ===== */
    .expand-header .content { padding: 12px 8px 12px 16px; display: grid;}
    .headers{
      display:flex; align-items:center; gap:12px;
    }
    .headers-left{
      display:flex; align-items:center; gap:12px; min-width:0; flex:1;
    }
    .slot-header { width: 48px; height: 48px;}
    .title-group{ min-width:0; display:grid; gap:2px; }
    .title{ font-weight:600; line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .subtitle{ font-size:12px; color:#6b7280; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .expand-toggle{ 
      width: 40px; 
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center; 
    }
    .toggle-btn.header{ cursor:pointer; }
    .chev{ transition: transform .15s ease; }
    [aria-expanded="true"] .chev{ transform: rotate(-180deg); }

    /* ===== expand-footer style ===== */
    .expand-footer .content{ padding: 0; }
    .preview-area{ padding: 12px; }
    .footer-bar{ border-top:1px solid #f3f4f6; }
    .toggle-btn.footer{
      width:100%; display:flex; justify-content:center; align-items:center; gap:8px;
      padding:12px; background:transparent; border:none; cursor:pointer; color:#1f2937;
    }
    .toggle-btn.footer:hover{ background:#f9fafb; }
    .toggle-text{ font-size:14px; }
    .expand-panel{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .22s ease; }
    .expand-panel.open{ grid-template-rows:1fr; }
    .expand-panel > .inner { overflow: hidden; border-top: 1px solid #e5e7eb;}
    .chev{ transition: transform .15s ease; }
    [aria-expanded="true"] .chev{ transform: rotate(-180deg); }

    /* ===== Skeletons ===== */
    .headers-skeleton {
      padding: 24px 16px;
    }
    .is-loading .skeleton{
      background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 37%,#f3f4f6 63%);
      background-size: 400% 100%; animation: shimmer 1.4s ease-in-out infinite; border-radius: 10px;
    }
    .skeleton.line{ height:12px; margin:6px 0; }
    .skeleton.line.lg{ height:16px; }
    .skeleton.line.short{ width:40%; }
    .skeleton.pill.sm{ width:334px; height:28px; border-radius:999px; }
    .skeleton.bar{ height:36px; border-radius:8px; }
    .skeleton.square{ width:20px; height:20px; border-radius:6px; }
    @keyframes shimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-expandable-card": ExpandableCard;
  }
}
