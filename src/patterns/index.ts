/**
 * DS 3.0 Page Patterns — public barrel.
 *
 * Importing this module registers every pattern's custom element
 * (`<ssk-pattern-*>`) and makes them available via the registry.
 */

export * from "./types";
export * from "./registry";

// Each pattern import has a side-effect: registers the custom element +
// adds the class to the registry.
export * from "./order-management";
export type {
  Channel,
  OrderManagementData,
  OrderRow,
  OrderStatus,
  SidebarItem,
  StatCard,
  StatusTab,
  Trend,
} from "./order-management/mock";
export { orderManagementMock } from "./order-management/mock";
