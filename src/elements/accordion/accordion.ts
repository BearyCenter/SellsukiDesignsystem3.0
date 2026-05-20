import { consume } from "@lit/context";
import { LitElement, html, css } from "lit";
import {
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

/**
 * Sellsuki Accordion — DS 3.0
 *
 * Vertical stack of collapsible panels. `mode="single"` (default) closes
 * other panels when one opens; `mode="multiple"` lets several stay open.
 * Two visual variants: `clean` (flat) and `bordered` (separated boxes).
 *
 * Reach for `<ssk-accordion>` for FAQ lists, settings groups, or any
 * disclosure pattern where several related sections share the same
 * surface. For a single isolated reveal use `<ssk-expandable-card>`; for
 * a tabbed switcher use `<ssk-tab-header>`.
 *
 * @example
 *   <ssk-accordion mode="single" variant="bordered">
 *     <ssk-accordion-item title="คำถามที่ 1">คำตอบ...</ssk-accordion-item>
 *     <ssk-accordion-item title="คำถามที่ 2">คำตอบ...</ssk-accordion-item>
 *   </ssk-accordion>
 *
 * @slot - `<ssk-accordion-item>` children
 */
export class Accordion extends LitElement {
  static registeredName = "ssk-accordion";

  /**
   * Active theme injected via Lit context from `<ssk-theme-provider>`. Not authored by callers.
   */
  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  /**
   * Stable `data-testid` attribute applied to the accordion and forwarded to each child item as `data-test-id="<testId>-item-<id>"`.
   */
  @property({ type: String })
  testId?: string;

  /**
   * Brand accent for the borders and header surface — falls back to `--fg-brand-primary` from `<ssk-app-shell-provider>` brand context. Pass an explicit `ColorRole` to override.
   */
  @property({ type: String })
  themeColor: ColorRole | ColorName = "primary";
  /**
   * Visual size scale — `xs` / `sm` / `md` / `lg` / `xl`. Drives header padding, font size, and radius. Defaults to `md`.
   */
  @property({ type: String })
  size: Size = "md";
  /**
   * Override the header font size (any CSS length). Stay above 18px (`--font-size-caption`) for the DS 3.0 minimum.
   */
  @property({ type: String })
  fontSize?: string | undefined;
  /**
   * Font family group — `sans` (default body face) or `mono` for fixed-width labels.
   */
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  /**
   * Font weight token for accordion item headers — typically `normal` or `medium`.
   */
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  /**
   * Optional surface color for the header background (any CSS color). Leave unset to use the brand-tinted default.
   */
  @property({ type: String })
  backgroundColor?: string | undefined;
  /**
   * Optional override for the header text color (`ColorRole` or `ColorName`). Leave unset to use `--text-primary`.
   */
  @property({ type: String })
  color?: ColorRole | ColorName = "primary.500";

  /**
   * Open behavior — `single` (default) closes other panels when one opens; `multiple` lets several panels stay open at once.
   */
  @property({ type: String })
  mode: "single" | "multiple" = "single";
  /**
   * Horizontal alignment of the header label — `left` (default), `center`, or `right`. Forwarded automatically to each child item.
   */
  @property({ type: String })
  align: "left" | "center" | "right" = "left";
  /**
   * Visual style — `clean` (flat, borderless, default) or `bordered` (separated boxes with brand-tinted outline).
   */
  @property({ type: String })
  variant: "clean" | "bordered" = "clean";

  /**
   * Internal — slotted `<ssk-accordion-item>` children resolved via `@queryAssignedElements`.
   * Consumers don't read this directly; the accordion uses it to coordinate single-mode close behavior.
   */
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

  /**
   * Internal — `accordion-toggle` event handler bound via arrow-fn-as-field for `this` capture.
   * Enforces single-mode (only one item open at a time) vs multiple-mode behavior.
   */
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

if (!customElements.get("ssk-accordion")) {
  customElements.define("ssk-accordion", Accordion);
}
