import { createContext } from "@lit-labs/context";

export type Value = {
  setValue: (value: string, el: HTMLElement) => void;
};

export const valueContext = createContext<Value>("ssk-dropdown-value-context");
