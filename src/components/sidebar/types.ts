import { createContext } from "@lit/context";
import { MenuVariants } from "../../types/theme";
;

export type SidebarAttributes = {
  label?: string;
  disabled?: boolean;
  active?: boolean;
  variant?: MenuVariants;
  expanded: boolean;
  isOpen?: boolean;
  hiddenIcon?: boolean;
};

export type State = {
  expanded: boolean; // sidebar expanded to show labels
  selectedItems: string[]; // selected items
  expandedGroups: string[]; // collapsed groups
  setExpanded: (expanded: boolean) => void;
  setSelectedItem: (key: string, selected: boolean) => void;
  setExpandedGroup: (key: string, collapsed: boolean) => void;
};

export const stateContext = createContext<State>("ssk-sidebar-state-context");
