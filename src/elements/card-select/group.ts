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

if (!customElements.get("ds-card-group")) {
  customElements.define("ds-card-group", CardGroup);
}
if (!customElements.get("ssk-card-group")) {
  customElements.define("ssk-card-group", CardGroup);
}
