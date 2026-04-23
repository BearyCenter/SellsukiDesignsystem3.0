import { consume } from "@lit/context";
import { css, html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
  Theme,
} from "../../types/theme";

export class MiscIcon extends LitElement {
  static registeredName = "ssk-misc-icon";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  variant: "solid" | "light" | "outline" = "solid";

  @property({ type: String })
  iconName: string = "outline-question-mark-circle";

  @property({ type: String })
  size: string = "md";

  @property({ type: String })
  themeColor: string = "black";

  @property({ type: String })
  iconColor?: string;

  render() {
    if (this.hidden) {
      return nothing;
    }

    let bgColor = "transparent";
    let fontColor = "black";
    let b1Color = "transparent";
    let b2Color = "transparent";
    let padding = parseVariables(
      cssVar("padding", this.size),
      this.size,
      cssVar("padding", "md")
    );

    switch (this.variant) {
      case "solid":
        bgColor = parseVariables(
          cssVar("colors", this.iconColor),
          cssVar("colors", this.iconColor, 500),

          this.iconColor,
          cssVar("colors", this.themeColor, 500),
          this.themeColor,
          cssVar("colors", "primary", 500)
        );
        fontColor = "white";

        break;
      case "light":
        bgColor = parseVariables(
          cssVar("colors", this.themeColor, 100),
          this.themeColor,
          cssVar("colors", "primary", 100)
        );
        fontColor = parseVariables(
          cssVar("colors", this.themeColor, 500),
          this.themeColor,
          cssVar("colors", "primary", 500)
        );
        break;
      case "outline":
        bgColor = "transparent";
        fontColor = parseVariables(
          cssVar("colors", this.themeColor, 500),
          this.themeColor,
          cssVar("colors", "primary", 500)
        );
        b1Color = parseVariables(
          cssVar("colors", this.themeColor, 300),
          this.themeColor,
          cssVar("colors", "primary", 300)
        );
        b2Color = parseVariables(
          cssVar("colors", this.themeColor, 100),
          this.themeColor,
          cssVar("colors", "primary", 100)
        );
        break;
    }

    return html`${parseThemeToCssVariables(
        this.theme?.components?.miscIcon,
        ":host"
      )}

      <style>
        :host {
          --icon-misc-background-color: ${bgColor};
          --icon-misc-color: ${fontColor};
          --icon-misc-border-1-color: ${b1Color};
          --icon-misc-border-2-color: ${b2Color};
          --icon-misc-padding: ${padding}
      </style>

      <div
        class="${this.variant === "outline"
          ? "outline-background"
          : ""} misc-icon"
      >
        <ssk-icon
          name=${this.iconName}
          size=${this.size}
          color=${fontColor}
        ></ssk-icon>
      </div>`;
  }

  static styles = css`
    :host {
      display: inline-block;
      font-size: var(--icon-misc-padding);
    }

    .misc-icon {
      display: flex;
      padding: var(--icon-misc-padding);
      border-radius: 50%;
      background-color: var(--icon-misc-background-color, transparent);
      color: var(--icon-misc-color, black);
    }

    .outline-background {
      background-position: center;
      background: radial-gradient(
            transparent 1.2em,
            var(--icon-misc-border-1-color) 1.2em,
            var(--icon-misc-border-1-color) calc(1.2em + 2px),
            transparent calc(1.2em + 2px)
          )
          center,
        radial-gradient(
            transparent calc(2em - 2px),
            var(--icon-misc-border-2-color) calc(2em - 2px),
            var(--icon-misc-border-2-color) 2em,
            transparent 2em
          )
          center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-misc-icon": MiscIcon;
  }
}

if (!customElements.get("ds-misc-icon")) {
  customElements.define("ds-misc-icon", MiscIcon);
}
if (!customElements.get("ssk-misc-icon")) {
  customElements.define("ssk-misc-icon", class extends MiscIcon {});
}
