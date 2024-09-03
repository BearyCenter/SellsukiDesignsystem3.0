import { html } from "lit";

export const renderColumn = (
  options: { label: string; value: number }[],
  selectedValue: number | undefined,
  size: string,
  handleClick: (value: number) => void,
) => {
  return html`
    <ui class="column">
      ${options.map(
        ({ label, value }) => html`
          <li
            class="item ${selectedValue === value ? "selected" : ""}"
            @click=${() => handleClick(value)}
          >
            <ssk-text
              size=${size}
              color="${selectedValue === value ? "white" : "black"}"
            >
              <span>${label}</span>
            </ssk-text>
          </li>
        `,
      )}
    </ui>
  `;
};
