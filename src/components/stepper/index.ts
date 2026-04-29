import { LitElement, css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { themeContext } from "../../contexts/theme";
import {
    ColorName,
    ColorRole,
    FontFamilyGroup,
    FontWeight,
    Size,
    Theme,
    parseThemeToCssVariables,
} from "../../types/theme";
import "../../../src/elements/icon";

interface Step {
    title: string;
    description: string;
    status: "finish" | "process" | "wait" | "error";
    progress?: number; // Optional for steps with progress bars
    icon?: string;  // Optional to override the default icon  
}

export class Stepper extends LitElement {
    
    static registeredName = "ssk-stepper";

    @consume({ context: themeContext, subscribe: true })
    @property({ attribute: false })
    public theme?: Theme;

    // BaseAttributes
    @property({ type: String })
    testId?: string;

    // ThemeValue
    @property({ type: String })
    themeColor: ColorRole | ColorName = "primary";
    @property({ type: String })
    color?: ColorRole | ColorName;
    @property({ type: String })
    backgroundColor?: string | undefined;

    @property({ type: String })
    size: Size = "md";
    @property({ type: String })
    padding?: Size;
    @property({ type: String })
    fontSize?: string | undefined;
    @property({ type: String })
    gap?: string | undefined;
    @property({ type: String })
    rounded?: string | undefined;
    @property({ type: String })
    margin?: string | undefined;

    // font
    @property({ type: String })
    fontFamilyGroup: FontFamilyGroup = "sans";
    @property({ type: String })
    fontWeight: FontWeight = "normal";

    @property({ type: Array })
    steps: Step[] = [];

    @property({ type: Number })
    currentStep = 0;

    @property({ type: Number })
    activeIndex = 0;
    
    @property({ type: String  })
    errorStep = "error";

    @property({ type: Boolean })
    hidden = false;

    @property({ type: Number })
    percent: number | undefined;

    render() {
        if (this.hidden) {
            return nothing;
        }

        return html`
        ${parseThemeToCssVariables(this.theme?.components?.stepper, ":host")}
    
        <div class="step-container">
            ${this.steps.map((step, index) => html`
                <div
                class="step 
                    ${index === this.currentStep || step.status == 'process' ? 'active' : index < this.currentStep && step.status == 'error' ? 'error' : index < this.currentStep || step.status == 'finish' ? 'finished' : ''} "
                style="gap: 5px;"
                @click="${() => this.handleStepClick(index)}"
                >
                <div class="container">
                    <div class="stepper">
                    <svg class="progress-circle" style="--progress-percent:${step.progress || 0};">
                        <circle class="circle" cx="20" cy="26" r="16"></circle>
                        <circle class="bar" cx="20" cy="26" r="18"></circle>
                        <foreignObject x="4" y="10" width="32" height="32">
                        <div class="circle-content">
                            ${index < this.currentStep && step.status == 'error'
                            ? html`<ssk-icon name="solid-x-mark" themeColor="danger" size="sm"></ssk-icon>`
                            : index < this.currentStep || step.status == 'finish'
                            ? html`<ssk-icon name="solid-check" themeColor="white" size="sm"></ssk-icon>`
                            : html`${step.icon ? html`<ssk-icon name="${step.icon}" size="sm"></ssk-icon>` : html`<div class="title">${index + 1}</div>`}                            `}
                        </div>
                        </foreignObject>
                    </svg>
                    </div>
                </div>
                <div class="description ${index === this.currentStep || step.status == 'process' ? 'active' : index < this.currentStep && step.status == 'error' ? 'error' : index < this.currentStep || step.status == 'finish' ? 'finished' : ''}">
                    <div class="text-title">
                    <div class="title-step">
                        ${step.title}
                    </div>
                    <div class="divider"></div>
                    </div>
                    <div class="text-description">
                        ${step.description}
                    </div>
                </div>
                </div>
            `)}
            </div>
        `;
    }

    shouldUpdateStatus(step: Step): boolean {
        return step.status !== "error";
    }

    handleStepClick(index: number) {
        if (index !== this.currentStep) {
            this.currentStep = index;
            if (this.shouldUpdateStatus(this.steps[index])) {
                this.steps[index].status = "process";
            }
            for (let i = 0; i < index; i++) {
                if (this.shouldUpdateStatus(this.steps[i])) {
                    this.steps[i].status = "finish";
                }
            }
            for (let i = index + 1; i < this.steps.length; i++) {
                if (this.shouldUpdateStatus(this.steps[i])) {
                    this.steps[i].status = "wait";
                }
            }
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
        }
    }

    nextStep() {
        if (this.currentStep <= this.steps.length) {
            this.currentStep++;
        }
    }

    static styles = css`

    .step-container { 
        display: flex; 
        flex-direction: row;
    }

    .step {
        width: 400px;
        height: 80px;
        display: contents;
    }

    .description {
        margin-top: 18px;
        width: 100%;
        display: flex; 
        flex-direction: column;
        font-weight: var(--font-weight-normal, 400);
        padding-left: 8px;
        padding-right: 8px;
    }

    .description.error .divider {
        background-color: transparent; 
    }

    .description.error .text-title{
        color: var(--fg-danger-primary, #E11D48);
    }

    .description.error .text-description{
        color: var(--fg-danger-primary, #E11D48);
    }

    .text-title {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: var(--font-size-h4, 24px);
        height: 10px;
        color: var(--text-primary, #1F2937);
        padding-top: 4px;
        padding-bottom: 4px;
        padding-letf: 8px;
        padding-right: 8px;
    }

    .title {
        font-size: var(--font-size-h4, 24px);
    }


    .title-step {
        min-width: max-content;
        max-width: 200px;
        padding-right: 16px;
    }

    .text-description {
        width: 100%;
        height: 10px;
        font-size: var(--font-size-p, 20px);
        color: var(--text-secondary, #6B7280);
    }

    .divider {
        width: 100%;
        height: 2px;
        background-color: var(--stroke-primary, #E5E7EB);
    }

    .progress-circle {
        width: 40px;
        height: 60px;
        border-radius: 50%;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .circle-content{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--text-secondary, #6B7280);
        border-radius: 50%;
        color: var(--text-disabled, #9CA3AF);
        width: 30px;
        height: 30px;
        font-size: var(--font-size-h4, 24px);
        font-weight: var(--font-weight-medium, 500);
    }

    .step.active .circle-content{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 50%;
        background-color: var(--bg-brand-solid, #32A9FF);
        color: var(--fg-white, #ffffff);
        width: 30px;
        height: 30px;
    }

    .step.finished .circle-content{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 50%;
        background-color: var(--bg-brand-solid-hover, #F97316);
        width: 30px;
        height: 30px;
    }

    .step.error .circle-content{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--stroke-danger, #E11D48);
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }

    .step.active .progress-circle .bar {
        position: absolute;
        fill: none;
        stroke: var(--fg-brand-primary, #32A9FF);
        stroke-width: 2;
        background: transparent;
        width: 32px;
        height: 32px;
        stroke-dasharray: calc(var(--progress-percent) / 100 * 113) 500;
        transform-box: fill-box;
        transform-origin: center;
        transform: rotate(271deg);
    }

    .progress-circle .circle {
        width: 30px;
        height: 30px;
        fill: var(--bg-primary, #ffffff);
        border: 1px solid var(--text-secondary, #6B7280);
        border-radius: 50%;
        background-color: var(--bg-primary, #ffffff);
    }

    .step.active .circle {
        border: 0px;
        background-color: var(--bg-brand-solid, #32A9FF);
        color: var(--fg-white, #ffffff);
    }

    .progress-circle .bar {
        fill: none;
        background: transparent;
    }

    .text .error {
        color: var(--fg-danger-primary, #E11D48);
    }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ssk-stepper": Stepper;
    }
}

if (!customElements.get("ssk-stepper")) {
  customElements.define("ssk-stepper", Stepper);
}
