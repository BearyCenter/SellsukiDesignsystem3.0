import { LitElement } from "lit";

export const redispatchEvents = (
  event: Event,
  element: LitElement,
  eventType?: string,
) => {
  element.dispatchEvent(
    new CustomEvent(eventType ?? event.type, {
      detail: {
        originalEvent: event,
      },
    }),
  );
};
