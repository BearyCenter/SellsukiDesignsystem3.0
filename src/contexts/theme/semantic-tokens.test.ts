import { describe, expect, it, beforeEach } from "vitest";
import { Brand, injectSemanticTokens, semanticTokens } from "./semantic-tokens";

function makeMockRoot() {
  const props = new Map<string, string>();
  return {
    style: {
      setProperty: (k: string, v: string) => props.set(k, v),
      getPropertyValue: (k: string) => props.get(k) ?? "",
    },
  } as unknown as HTMLElement;
}

describe("semanticTokens", () => {
  it("all three brands produce non-empty token maps", () => {
    expect(Object.keys(semanticTokens.patona).length).toBeGreaterThan(0);
    expect(Object.keys(semanticTokens.ccs3).length).toBeGreaterThan(0);
    expect(Object.keys(semanticTokens.oc2plus).length).toBeGreaterThan(0);
  });
});

describe("injectSemanticTokens", () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = makeMockRoot();
  });

  it("sets --bg-brand-solid to #EC5E2A for patona", () => {
    injectSemanticTokens(Brand.patona, root);
    expect(root.style.getPropertyValue("--bg-brand-solid")).toBe("#EC5E2A");
  });

  it("sets --bg-brand-solid to #32A9FF for ccs3", () => {
    injectSemanticTokens(Brand.ccs3, root);
    expect(root.style.getPropertyValue("--bg-brand-solid")).toBe("#32A9FF");
  });

  it("sets --bg-brand-solid to #32A9FF for oc2plus", () => {
    injectSemanticTokens(Brand.oc2plus, root);
    expect(root.style.getPropertyValue("--bg-brand-solid")).toBe("#32A9FF");
  });

  it("replaces previously-set value when brand changes", () => {
    injectSemanticTokens(Brand.patona, root);
    expect(root.style.getPropertyValue("--bg-brand-solid")).toBe("#EC5E2A");

    injectSemanticTokens(Brand.ccs3, root);
    expect(root.style.getPropertyValue("--bg-brand-solid")).toBe("#32A9FF");
  });
});
