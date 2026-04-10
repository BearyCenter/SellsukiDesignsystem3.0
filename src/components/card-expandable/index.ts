import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { ColorName, ColorRole } from "../../types/theme";
import "../../../src/components/skeleton";

export class ExpandableCard extends LitElement {
  static registeredName = "ssk-expandable-card";

  @property({ type: String })
  testId?: string;
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";

  @property({ type: String })
  variant: "outlined" | "elevated" = "outlined";
  @property({ type: String })
  type: "expand-header" | "expand-footer" = "expand-header";

  @property({ type: Boolean })
  loading = false;
  @property({ type: Boolean })
  hideToggle = false;
  @property({ type: Boolean })
  hideText = false;
  @property({ type: Boolean, reflect: true })
  expanded = false;

  @property({ type: String })
  title = "";
  @property({ type: String })
  subtitle = "";

  @property({ type: String })
  width = "366px";
  @property({ type: String })
  height = "auto";
  @property({ type: String })
  radius = "8px";

  @property({ type: Boolean })
  lazy = true;
  @property({ type: String, attribute: "more-label" })
  moreLabel = "View more";
  @property({ type: String, attribute: "less-label" })
  lessLabel = "View less";

  @state() private hasHeader = false;

  private get cardClasses() {
    return ["card", this.variant, this.type, this.loading ? "is-loading" : "", this.expanded ? "is-expanded" : ""].join(" ");
  }

  private onHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this.hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private toggle = () => {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent("expanded-changed", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
  };

  private renderHeaderToggle() {
    return html`
      <div
        class="toggle-btn header"
        @click=${this.toggle}
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
    if (this.hidden) {
      return nothing;
    }

    const label = this.expanded ? this.lessLabel : this.moreLabel;
    return html`
      <div class="footer-bar">
        <div
          class="toggle-btn footer"
          @click=${this.toggle}
          aria-expanded=${String(this.expanded)}
        >
          ${this.hideText ? nothing : html`
            <ssk-text size="md" color="info" fontweight="medium">${label}</ssk-text>
          `}
          <slot name="footer"></slot>
          ${this.hideToggle ? nothing : html`
            <div class="expand-toggle">
              <ssk-icon 
                name="solid-chevron-down"
                class="chev"
                style="display: flex;"
                color="info"
                size="sm"
                >
              </ssk-icon>
            </div>
          `}
        </div>
      </div>
    `;
  }

  private renderPanel() {
    const inner = this.lazy && !this.expanded ? nothing : html`<div class="inner"><slot name="expand"></slot></div>`;
    return html`
      <div class=${`expand-panel ${this.expanded ? "open" : ""}`} role="region" aria-hidden=${String(!this.expanded)}>
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
      <article class=${this.cardClasses} style=${`--card-w:${this.width};--card-h:${this.height};--radius:${this.radius};`} data-testid=${this.testId || nothing}>
          ${isHeader
            ? html`
                <div class="content" data-testid=${this.testId ? `${this.testId}.content` : nothing}>
                  <header class="headers">
                    <div class="headers-left ${this.hasHeader ? 'has-header' : 'no-header'}">
                      <div class="header-slot" ?hidden=${!this.hasHeader} style="--header-size:48px">
                        <slot name="header" @slotchange=${this.onHeaderSlotChange}></slot>
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
                          <slot name="content"></slot>
                      </div>
                    </div>
                    <div class="expand-toggle">
                      <slot name="toggle"></slot>
                      ${this.hideToggle ? nothing : this.renderHeaderToggle()}
                    </div>
                  </div>
                  </header>

                ${this.renderPanel()}
                </div>
              `
          : nothing}

          ${isFooter
            ? html`
                    <div class="content">
                      <slot name="content"></slot>
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
    .card {
      width: var(--card-w, 320px);
      height: var(--card-h, auto);
      border-radius: var(--radius, 8px);
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

    .content { display: grid; width: auto;}

    /* ===== expand-header style ===== */
    .expand-header .content { padding: var(--content-padding, 12px 8px 12px 16px); display: grid;}
    .expand-footer .content { padding: var(--content-padding, 12px 8px 12px 16px); display: grid;}
    .headers{
      display:flex; align-items:center; gap:12px;
      width: auto;
    }
    .headers-left{
      display:flex; align-items:center; gap:12px; min-width:0; flex:1;
    }
    .slot-header { max-width: 48px; max-height: 48px; }
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

    .header-slot[hidden]{ display:none !important; }
    .headers-left.no-header{ gap:0; }

    .title-group{
      flex:1;
      min-width:0;
      display:grid;
    }

    .title-group ssk-text{
      display:block;
      max-width:100%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    slot[name="content"]::slotted(*){
      display:block;
      max-width:100%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    /* ===== expand-footer style ===== */
    .expand-footer .content{ padding: 0; }
    .expand-footer .expand-toggle{ 
      width: 24px;
      height: 24px;
    }
    .footer-bar{ border-top:1px solid #f3f4f6; }
    .toggle-btn.footer{
      display:flex; justify-content:center; align-items:center; gap:8px;
      padding: var(--toggle-btn-footer-padding, 16px); background:transparent; border:none; cursor:pointer; color:#1f2937;
    }
    .toggle-text{ font-size:14px; }
    .expand-panel{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .22s ease; }
    .expand-panel.open{ grid-template-rows:1fr; }
    .expand-header .expand-panel > .inner { overflow: hidden; border-top: 1px solid #e5e7eb; }
    .expand-panel > .inner { overflow: hidden; }
    .chev{ transition: transform .15s ease; }
    [aria-expanded="true"] .chev{ transform: rotate(-180deg); }

    /* ===== Skeletons ===== */
    .headers-skeleton {
      padding: 24px 16px;
    }

    .headers-left.no-header{ gap:0; }
    .header-slot[hidden]{ display:none !important; }

    .header-slot{
      --header-size: 48px;
      width: var(--header-size);
      height: var(--header-size);
      flex:none;
      display:grid; place-items:center;
      overflow:hidden;
    }

    .header-slot ::slotted(*){ max-width:100%; max-height:100%; display:block; }
    .header-slot ::slotted(img),
    .header-slot ::slotted(svg),
    .header-slot ::slotted(ssk-icon){ width:100%; height:100%; object-fit:contain; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-expandable-card": ExpandableCard;
  }
}

if (!customElements.get("ssk-expandable-card")) {
  customElements.define("ssk-expandable-card", ExpandableCard);
}
