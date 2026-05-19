import { LitElement, html, css, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import "../../../src/elements/card-select";
import "./index"
import "../card-select"; 
interface Card {
    id: number;
    label: string;
    supportText: string;
    cardSize: string;
    selected: boolean;
    disabled: boolean;
    icon: string;
}

/**
 * Sellsuki Card Group — DS 3.0
 *
 * Single-select container for `<ssk-card-select>` tiles. Pass a typed
 * `cards` array — the group enforces mutual exclusivity (only one card
 * carries the `selected` state) and emits the chosen index up to its
 * parent. Layout is a wrapping flex grid with tokenized gaps.
 *
 * Use this for radio-style picker UIs where each option needs more than a
 * label — an icon plus support text (plan picker, layout chooser,
 * payment-method selector). For text-only radios use
 * `<ssk-radio-group>`. For multi-select use `<ssk-checkbox>` rows.
 *
 * @example
 *   <ssk-card-group
 *     .cards=${[
 *       { id: 1, label: "Standard", supportText: "ฟรี", icon: "outline-cube", cardSize: "md", selected: true,  disabled: false },
 *       { id: 2, label: "Premium",  supportText: "฿299/เดือน", icon: "outline-star", cardSize: "md", selected: false, disabled: false },
 *     ]}
 *   ></ssk-card-group>
 */
export class CardGroup extends LitElement {
    @property({ type: Array }) cards: Card[] = [];

    @state() selectedCardIndex: number | null = null;

    updated(changedProperties: PropertyValues) {
        if (changedProperties.has("cards")) {
            const selectedCard = this.cards.find(card => card.selected);
            this.selectedCardIndex = selectedCard ? this.cards.indexOf(selectedCard) : null;
        }
    }

    private handleCardClick(event: CustomEvent) {
        const { index } = event.detail;
        this.selectedCardIndex = index;
        this.cards = this.cards.map((card, i) => ({ ...card, selected: i === index }));
        this.requestUpdate();
    }

    render() {
        return html`
        <style>
            .container {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            }
        </style>
        <div class="container">
            ${this.cards.map(
            (card, index) => html`
                <ssk-card-select
                .selected=${this.selectedCardIndex === index}
                .disabled=${card.disabled}
                .index=${index}
                .cardSize=${card.cardSize}
                @card-click=${this.handleCardClick}
                >
                <div class="icon-style">
                    <ssk-icon name="${card.icon}" size="3xl"></ssk-icon>
                </div>
                <div class="text-label">
                    ${card.label}
                </div>
                <div class="support-text">
                    <ssk-text size="sm" color="gray.500">${card.supportText}</ssk-text>
                </div>
                </ssk-card-select>
            `
            )}
        </div>
        `;
    }

    static styles = css`
        .container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        }
    `;
    }

    declare global {
    interface HTMLElementTagNameMap {
        "ssk-card-group": CardGroup;
    }
}

if (!customElements.get("ssk-card-group")) {
  customElements.define("ssk-card-group", CardGroup);
}
