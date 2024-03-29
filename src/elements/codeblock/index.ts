import { consume } from "@lit/context";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property ,queryAssignedElements } from "lit/decorators.js";
import { themeContext } from "../../contexts/theme";
import {
  BadgeVariants,
  ColorName,
  ColorRole,
  FontFamilyGroup,
  FontWeight,
  Size,
  Theme,
  cssVar,
  parseThemeToCssVariables,
  parseVariables,
} from "../../types/theme";
import Prism from 'prismjs';
// let theme = "/node_modules/prismjs/themes/prism.css";
// let theme = "prismjs";

@customElement("ssk-code-block")
export class CodeBlock extends LitElement {
  static registeredName = "ssk-code-block";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  // BaseAttributes
  @property({ type: String })
  testId?: string;

  // ThemeValue
  @property({ type: String })
  themeColor: ColorRole | ColorName = "background";
  @property({ type: String })
  color?: ColorRole | ColorName;
  @property({ type: String })
  backgroundColor?: ColorRole | ColorName;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  rounded?: string | undefined;

  @property({ type: String })
  borderWidth?: string | undefined;
  @property({ type: String })
  borderColor?: ColorRole | ColorName | undefined;
  @property({ type: String })
  borderStyle?: string | undefined;

  // font
  @property({ type: String })
  fontFamilyGroup: FontFamilyGroup = "sans";
  @property({ type: String })
  fontWeight: FontWeight = "normal";

  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;

  @property({ type: String })
  padding?: Size;

  @property({ type: String })
  variant: BadgeVariants = "solid";
  @property({ type: Boolean })
  hidden = false;

  @property({ type: String })
  cursor?: string | undefined;

  @property({ type: String })
  align?: "center" | "start" | "end" = "center";
  @property({ type: String })
  gap?: string | undefined;
  @property({ type: String })
  language?: string | undefined;
  @property({ type: Boolean })
  copyButton = false;

  @property({ type: String }) 
  textToCopy = 'ggaaa';
  @queryAssignedElements({})
  _listItems!: Array<HTMLElement>;
  

  // async firstUpdated() {
  //   await this.__loadLanguage();
  //   const nodes = this.shadowRoot?.querySelector("slot")?.assignedNodes()
  //   // const nodes = this.shadowRoot.querySelector("#code").assignedNodes();
  //   let codeCombined = "";
  //   for (let index = 0, len = nodes.length; index < len; ++index) {
  //     codeCombined += nodes[index].nodeValue;
  //   }
  //   console.log(codeCombined)
  //   this.language = "css";

  //   const codeClean = codeCombined.replace(/^\s+|\s+$/g, "");
  //   const highlight = Prism.highlight(
  //     codeClean,
  //     Prism.languages[this.language],
  //     this.language
  //   );
  //   console.log(highlight)

  //   let a = this.shadowRoot?.querySelector("#code")?.innerHTML
  //   a = highlight
  //   console.log(a)

  //   // let myContainer = document.getElementById('output') as HTMLInputElement;
  //   // console.log(myContainer.innerHTML)
  //   // myContainer?.innerHTML?:String = highlight;

  //   // document.getElementById("output").innerHTML = highlight;
  //   // this.shadowRoot?.querySelector("#output")?.innerHTML = highlight;
  // }

  // async firstUpdated() {
    // await this.__loadLanguage();
    // const nodes = document.querySelector('#code');
    // const nodes = this.shadowRoot?.querySelector("slot")?.assignedNodes()
    // const nodes = this.shadowRoot.querySelector("#code").assignedNodes();
    // console.log(nodes.textContent)
    // let codeCombined = "";
    // for (let index = 0, len = nodes.length; index < len; ++index) {
    //   codeCombined += nodes[index].nodeValue;
    // }
    // console.log(codeCombined)
    // this.language = "clike";

    // const codeClean = codeCombined.replace(/^\s+|\s+$/g, "");
    // const highlight = Prism.highlight(
    //   codeClean,
    //   Prism.languages[this.language],
    //   this.language
    // );


    // console.log(highlight)
    // this.shadowRoot?.querySelector("slot")?.assignedNodes() = highlight;
    // for (let index = 0; index < nodes.length; index++) {
    //   console.log(nodes[index])
    //   codeCombined += nodes[index].textContent?.trim()
    // }
  // }

  //   // strip the lead/end newlines so we don't look horrible
  //   const codeClean = codeCombined.replace(/^\s+|\s+$/g, "");
  //   const highlight = Prism.highlight(
  //     codeClean,
  //     Prism.languages[this.language],
  //     this.language
  //   );

  //   // Set to our styled block
  //   this.shadowRoot.querySelector("#output").innerHTML = highlight;
  // }

  // async __loadLanguage() {
  //   await import(
  //     `/node_modules/prismjs/components/prism-${this.language}.min.js`
  //   );
  // }

  // async firstUpdated() {
  //   await this.__loadLanguage();
  //   const node = this.shadowRoot?.querySelector("#code")?.assignedNodes()
  //   let codeCombined = "";
  //   for (let index = 0, len = node.length; index < len; ++index) {
  //     codeCombined += node[index].nodeValue;
  //   }

  //   // strip the lead/end newlines so we don't look horrible
  //   const codeClean = codeCombined.replace(/^\s+|\s+$/g, "");
  //   const highlight = Prism.highlight(
  //     codeClean,
  //     Prism.languages[this.language],
  //     this.language
  //   );

  //   // Set to our styled block
  //   this.shadowRoot.querySelector("#output").innerHTML = highlight;

  // }

  async __loadLanguage() {
    this.language = "css";
    await import(
      `/node_modules/prismjs/components/prism-${this.language}.min.js`
    );
  }

  render() {
    if (this.hidden) {
      return nothing;
    }

    let additionalCss = html`
      <style>
        div {
          --font-size: ${parseVariables(
            cssVar("font-size", this.size),
            "1rem"
          )};
          --font-family: ${parseVariables(
            cssVar("font-family", this.fontFamilyGroup)
          )};
          --font-weight: ${parseVariables(
            cssVar("font-weight", this.fontWeight)
          )};

          --rounded: ${parseVariables(cssVar("rounded", this.rounded), "8px")};
          --cursor: ${parseVariables(this.cursor, "default")};

          --background-color: ${parseVariables(
            cssVar("colors", this.backgroundColor, 50),
            cssVar("colors", this.backgroundColor),
            this.backgroundColor,
            cssVar("colors", this.themeColor, 50)
          )};
          --border-color: ${parseVariables(
            cssVar("colors", this.borderColor, 400),
            cssVar("colors", this.borderColor),
            this.borderColor,
            cssVar("colors", this.themeColor, 400)
          )};
          --border-width: ${parseVariables(
            cssVar("border-width", this.borderWidth),
            "1px"
          )};
          --border-style: ${parseVariables(
            cssVar("border-style", this.borderStyle),
            "solid"
          )};

          --width: ${parseVariables(cssVar("width", this.width), "auto")};
          --height: ${parseVariables(cssVar("height", this.height), "auto")};

          --padding: ${parseVariables(
            cssVar("padding", this.padding),
            this.padding,
            "1em"
          )};

          --color: ${parseVariables(
            cssVar("colors", this.color, 800),
            cssVar("colors", this.color),
            this.color,
            "inherit"
          )};

          --gap: ${parseVariables(cssVar("gap", this.gap), "1em")};

          --align: ${this.align};
        }
      </style>
    `;

    return html`
      ${parseThemeToCssVariables(this.theme?.components?.container, ":host")}
      ${additionalCss}
      <pre><code id="output"></code></pre>
        
      <div class="container" id="contain" data-testid=${this.testId || nothing}>
        <div class="scroll">
          <div class="right">
            <ssk-button id="copyButton" variant="ghost" themeColor="black" hidden=${this.copyButton || nothing} @click=${(e: Event) => this.handleClick(e)}><ssk-icon name="outline-document-duplicate"></ssk-icon></ssk-button>
          </div>
          <slot id="code" >test slot</slot>
          <pre><code id="output"></code></pre>
        </div>
      </div>
    `;
  }
  
  private async handleClick(e: Event) {
    // console.log(e)
    // const text = document?.querySelector("#code")
    // console.log(text)
    
    // const text1 = document.getElementById('code');
    // console.log(text1)
    // const text2 = document.getElementById('hide');
    // console.log(text2)
    // const text3 = document.getElementById('contain');
    // console.log(text3)
    // const text4 = document.querySelector('div');
    // console.log(text4)

    const text5 = this.shadowRoot?.querySelector('slot')?.assignedNodes()[0]
    console.log(text5?.)

    // const nodesaa = document.querySelector('#code');
    // const text = this.shadowRoot?.querySelector("#code")
    // const text = document.querySelector('#code');
    // let value

    // const selectProtected: SelectProtected = {
    //   codeElement: document.getElementById("code"),
    // };

    // let slots = this.shadowRoot?.querySelectorAll("slot");
    // slots[1].addEventListener("slotchange", (ee: Event) => {
    //   let nodes = slots[1].assignedNodes();
    //   console.log(
    //     `Element in Slot "${slots[1].name}" changed to "${nodes[0].outerHTML}".`,
    //   );
    // });

    // const target = e.target as HTMLInputElement;
    // const targets = document.querySelector('#code') as HTMLInputElement;
    // const targetstest = document.getElementById('#test') as HTMLInputElement;
    // const nodes111 = this.shadowRoot?.querySelector("#test")
    // const a = Array.from(document.getElementsByClassName('code') as HTMLCollectionOf<HTMLElement>)
    
    // // console.log(target)
    // // console.log(targets)
    // const nodes = this.shadowRoot?.querySelector("slot")?.assignedNodes()
    // console.log(nodes)

    // for (let index = 0; index < nodes.length; index++) {
    //   console.log(nodes[index])
    //   this.textToCopy = nodes[index].textContent?.trim()
    // }

    // await navigator.clipboard.writeText(this.textToCopy)
    // console.log(nodes?.textContent?.toString())
    // console.log(nodes111?.textContent?.trim())
    // console.log(a)
    // console.log(document.querySelector('#code'));
    // console.log(document.querySelector('code'));

    // if (!node || !node.textContent) {
    //   throw new Error("Element not found");
    // }

    // value = node.textContent;
    // console.log(value)

    // let texts = 'sadsdasdsad'
    // await navigator.clipboard.writeText(texts);
    // await navigator.clipboard.writeText(this.textToCopy);
    // try {
    //   await navigator.clipboard.writeText(this.textToCopy)
    // } catch {
    //   console.log('ระบบผิดพลาด กรุณาทำใหม่อีกครั้ง')
    // }

    // let handleCopyClick = document.querySelector('#copy-quote');
    // let quoteText = document.getElementById('code');
    // quoteText as HTMLInputElement
    // console.log(quoteText)
    // let text = quoteText.textContent;
    // navigator.clipboard.writeText(`${text}`)
    // if (this.disabled) {
    //   return;
    // }

    // this.state?.setSelectedItem(
    //   this.key,
    //   !this.state.selectedItems.includes(this.key)
    // );
  }

  // handleSlotchange(e: Event) {
  //   console.log(e)
  //   // const childNodes = e.target?.assignedNodes({flatten: true});
  //   // // ... do something with childNodes ...
  //   // this.allText = childNodes.map((node) => {
  //   //   return node.textContent ? node.textContent : ''
  //   // }).join('');
  // }

  static styles = css`
  .hide {
    display: none ;
  }

  .container {
      flex-direction: column;
      align-items: var(--align);
      justify-content: center;

      background-color: var(--background-color);
      color: var(--color);

      font-size: var(--font-size);
      font-family: var(--font-family);
      font-weight: var(--font-weight);
      line-height: var(--line-height);

      border-style: var(--border-style);
      border-radius: var(--rounded);
      border-color: var(--border-color);
      border-width: var(--border-width);

      cursor: var(--cursor);

      width: var(--width);
      height: var(--height);

      padding: var(--padding);
      gap: var(--gap);
      
    }

    .scroll{
      overflow-x: auto;
    }
    .scroll::-webkit-scrollbar {
        height: 4px;
    }
    
    .scroll::-webkit-scrollbar-track {
        border-radius: 4px;
        background-color: #d9d9d9;
    }
    
    .scroll::-webkit-scrollbar-thumb {
        background: #6b7280;
        border-radius: 4px;
    }

    .right {
      position: fixed;
      float: right;
      right: 1.3em;
      top: 1.8em;
    }
  `;
}

declare global {
  interface HTMLElementContainerNameMap {
    "ssk-code-block": CodeBlock;
  }
}
