import { describe, expect, it } from "vitest";
import { runContract } from "../test-utils/vibecode-contract";
import { OrderManagementPattern } from "../patterns/order-management";

describe("Order Management pattern — base contract", () => {
  for (const brand of ["ccs3", "patona", "oc2plus"] as const) {
    it(`brand=${brand} passes 7 base contract rules`, () => {
      const html = OrderManagementPattern.toHtmlString(brand);
      const result = runContract(html, {
        templateName: OrderManagementPattern.metadata.name,
        brand,
      });
      if (!result.ok) {
        const lines = result.violations.map(
          (v) => `  [rule ${v.rule} ${v.ruleLabel}] ${v.message}`,
        );
        throw new Error(
          `Contract failed for ${brand}:\n${lines.join("\n")}`,
        );
      }
      expect(result.ok).toBe(true);
    });
  }

  it("metadata exposes correct tagName + name", () => {
    expect(OrderManagementPattern.metadata.name).toBe("order-management");
    expect(OrderManagementPattern.metadata.tagName).toBe(
      "ssk-pattern-order-management",
    );
    expect(OrderManagementPattern.registeredName).toBe(
      OrderManagementPattern.metadata.tagName,
    );
  });
});
