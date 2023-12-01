import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { themeContext } from "../../contexts/theme";
import {
  Size,
  Theme,
  FontFamilyGroup,
  FontWeight,
  Type,
} from "../../types/theme";
import { ThemeValue } from "../../types/base-attributes";

@customElement("ssk-alert")
export class Alert extends LitElement implements ThemeValue {
  static registeredName = "ssk-alert";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // ThemeValue
  @property({ type: String })
  size: Size = "md";

  // Font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";
  @property({ type: String })
  fontSize?: string | undefined;

  // Alert attributes
  @property({ type: String })
  type: Type = "default";
  @property({ type: String })
  header: String;
  @property({ type: String })
  subHeader: String;
}
