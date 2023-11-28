import { customElement } from "lit/decorators.js";
import { consume } from "@lit-labs/context";

import { LitElement } from "lit";
import { themeContext } from "../../contexts/theme";

import { ThemeValue } from "../../types/base-attributes";

@customElement("ssk-cards")
export class Cards extends LitElement implements ThemeValue {
  static registeredName = "ssk-cards";

  @consume({ context: themeContext, subscribe: true })

}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-cards": Cards;
  }
}
