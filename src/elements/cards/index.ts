import { customElement } from "lit/decorators.js";
import { LitElement } from "lit";
import { ThemeValue } from "../../types/base-attributes";

@customElement("ssk-cards")
export class Cards extends LitElement implements ThemeValue {
  static registeredName = "ssk-cards";
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-cards": Cards;
  }
}
