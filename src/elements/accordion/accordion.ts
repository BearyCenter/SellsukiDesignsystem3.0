import { consume } from "@lit/context";
import { LitElement, html, css } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  ColorName,
  ColorRole,
  cssVar,
  FontFamilyGroup,
  FontWeight,
  parseThemeToCssVariables,
  parseVariables,
  Size,
  Theme,
} from "../../types/theme";

@customElement("ssk-accordion")
export class Accordion extends LitElement {
  static registeredName = "ssk-accordion";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  testId?: string;

  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  fontSize?: string | undefined;
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  backgroundColor?: string | undefined;
  @property({ type: String })
  color?: ColorRole | ColorName = "primary.500";

  @property({ type: String })
  mode: "single" | "multiple" = "single";
  @property({ type: String })
  align: "left" | "center" | "right" = "left";
  @property({ type: String })
  variant: "clean" | "bordered" = "clean";

  @queryAssignedElements({ flatten: true })
  items!: HTMLElement[];

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("accordion-toggle", this.handleToggle);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("accordion-toggle", this.handleToggle);
  }

  handleToggle = (e: Event) => {
    const customEvent = e as CustomEvent<{ id: string }>;
    const clickedId = customEvent.detail.id;

    this.items.forEach((item: any) => {
      const isClicked = item.id === clickedId;

      if (this.mode === "multiple") {
        if (isClicked) item.open = !item.open;
      } else {
        item.open = isClicked ? !item.open : false;
      }

      item.align = this.align;
      if (this.testId) {
        item.setAttribute("data-test-id", `${this.testId}-item-${item.id}`);
      }
    });

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          openItems: this.items
            .filter((i: any) => i.open)
            .map((i: any) => i.id),
        },
      })
    );
  };

  render() {
    let additionalCss = `
        --background-color: ${parseVariables(
          this.backgroundColor,
          cssVar("colors", this.themeColor, 100)
        )};

        --border-color: ${parseVariables(
          cssVar("colors", this.themeColor, 200)
        )};
        --padding: ${parseVariables(cssVar("padding", this.size))};
        --rounded: ${parseVariables(cssVar("rounded", this.size))};
        --color: ${parseVariables(cssVar("colors", this.color), this.color)};
        --font-family: ${parseVariables(
          cssVar("font-family", this.fontFamilyGroup)
        )};
        --font-weight: ${parseVariables(
          cssVar("font-weight", this.fontWeight)
        )};
        --font-size: ${parseVariables(
          cssVar("font-size", this.fontSize),
          cssVar("font-size", this.size)
        )};
        `;

    switch (this.variant) {
      case "clean":
        additionalCss += `
            --border-color: transparent;
            border: none;
        `;
        break;
      case "bordered":
        additionalCss += `
            --border-color: ${parseVariables(
              cssVar("colors", this.themeColor, 200)
            )};
        `;
        break;
    }

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.accordion, ":host")}
      <style>
        :host {
        ${additionalCss};
        }
      </style>
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-accordion": Accordion;
  }
}
