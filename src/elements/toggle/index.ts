import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import { ThemeValue } from "../../types/base-attributes";
import { consume } from "@lit-labs/context";
import { redispatchEvents } from "../../helpers/lit";
import {
  ColorName,
  ColorRole,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";

@customElement("ssk-toggle")
export class Toggle extends LitElement implements ThemeValue {
  static registeredName = "ssk-toggle"

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  testId?: string;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";

  @property({ type: String })
  color?: ColorRole | ColorName = "white";

  @property({ type: String })
  backgroundColor?: string | undefined;

  @property({ type: String })
  size: Size = "md";

  @property({ type: String })
  fontSize?: string | undefined;

  @property({ type: String })
  margin?: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: Boolean })
  checked = false;


  render() {
    if (this.hidden) {
      return html``;
    }

    let additionalCss = `
      --font-size: ${parseVariables(
        cssVar("font-size", this.fontSize),
        cssVar("font-size", this.size),
      )};

      --margin: ${parseVariables(
        cssVar("margin", this.margin),
        this.margin
      )};

      --background-color: ${parseVariables(
        cssVar("colors", "gray", 200),
      )};

      --background-color-hover: ${parseVariables(
        cssVar("colors", "gray", 300),
      )};

      --background-color-disabled: ${parseVariables(
        cssVar("colors", "gray", 200),
      )};

      --background-color-active: ${parseVariables(
        cssVar("colors", this.backgroundColor),
        this.backgroundColor,
        cssVar("colors", this.themeColor, 500),
        
      )};

      --background-color-active-hover: ${parseVariables(
        cssVar("colors", this.backgroundColor),
        this.backgroundColor,
        cssVar("colors", this.themeColor, 600),
        
      )};

      --background-color-active-disabled: ${parseVariables(
        cssVar("colors", "gray", 600),
      )};

      --color: ${parseVariables(
        cssVar("colors", this.color, 200),
        cssVar("colors", "white", 200),
        this.color,
      )}
    `

    return html`
    ${parseThemeToCssVariables(this.theme?.components?.toggle, "toggle")}
      <style>
        .switch {
          ${additionalCss}
        }
      </style>

      <div>
        <label class="switch">
          <input 
            data-testid=${this.testId || nothing}
            type="checkbox" 
            .disabled=${this.disabled} 
            .checked=${this.checked}
            @input=${(e: Event) => redispatchEvents(e, this)}
            @change=${(e: Event) => redispatchEvents(e, this)}
            @click=${(e: Event) => redispatchEvents(e, this)}
          >
          <div class="slider round"></div>
        </label>
      </div>
    `
  }

  static styles = css`
    .switch {
      position: relative;
      display: inline-block;
      width: 1.667em;
      height: 1em;
      font-size: var(--font-size);
      margin: var(--margin);
    }

    .switch input[type="checkbox"] {
      display: none;
    }

    input[type="checkbox"]:not(:checked)+.slider {
      background-color: var(--background-color);
    }

    input[type="checkbox"]:hover:not(:checked)+.slider {
      background-color: var(--background-color-hover);
    }

    input[type="checkbox"]:checked+.slider {
      background-color: var(--background-color-active);
    }

    input[type="checkbox"]:hover:checked+.slider {
      background-color: var(--background-color-active-hover);
    }

    input[type="checkbox"]:disabled+.slider {
      background-color: var(--background-color-disabled);
    }

    input[type="checkbox"]:hover:disabled+.slider {
      background-color: var(--background-color-disabled);
    }

    input[type="checkbox"]:checked+.slider:before {
      -webkit-transform: translateX(0.66em);
      transform: translateX(0.66em);
    }

    input[type="checkbox"]+.slider.round:before {
      box-shadow: var(--ssk-box-shadow-xs);
    }
    
    input[type="checkbox"]:disabled+.slider.round:before {
      box-shadow: none;
    }

    .slider.round {
      border-radius: 1em;
    }

    .slider.round:before {
      border-radius: 1em;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-transition: background-color 0.2s ease-in-out;
      transition: background-color 0.2s ease-in-out;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 0.834em;
      width: 0.834em;
      left:  0.0834em;
      bottom:  0.0834em;
      background-color: var(--color);
      -webkit-transition: transform  .4s;
      transition: transform  .4s;
    }
  `;

}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-toggle": Toggle;
  }
}