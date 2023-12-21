import { MenuVariants } from "../../types/theme";

export type SidebarAttributes = {
  label?: string;
  disabled?: boolean;
  active?: boolean;
  variant?: MenuVariants;
  collapsed: boolean;
  isOpen?: boolean;
  hiddenIcon?: boolean;
};
