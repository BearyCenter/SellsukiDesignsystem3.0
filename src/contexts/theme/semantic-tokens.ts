import { defaultColorPallete } from "./default";

// ── Brand ─────────────────────────────────────────────────────────────────────

export const Brand = {
  patona:  "patona",
  ccs3:    "ccs3",
  oc2plus: "oc2plus",
} as const;

export type Brand = (typeof Brand)[keyof typeof Brand];

// ── Palette refs ──────────────────────────────────────────────────────────────

function getPaletteScale(name: string): Record<string, string> {
  const entry = (defaultColorPallete as Record<string, unknown>)[name];
  if (typeof entry !== "object" || entry === null) {
    throw new Error(`Color palette "${name}" is not a scale`);
  }
  return entry as Record<string, string>;
}

const gray            = getPaletteScale("gray");
const sky             = getPaletteScale("sky");
const emerald         = getPaletteScale("emerald");
const amber           = getPaletteScale("amber");
const rose            = getPaletteScale("rose");
const white           = getPaletteScale("white");
const aerospaceOrange = getPaletteScale("aerospace-orange");

// ── Semantic tokens per brand ─────────────────────────────────────────────────

export type SemanticTokenMap = Record<string, string>;

const patonaTokens: SemanticTokenMap = {
  // text
  "--text-primary":          gray["800"],
  "--text-primary-hover":    gray["900"],
  "--text-secondary":        gray["500"],
  "--text-secondary-hover":  gray["600"],
  "--text-white":            white["50"],
  "--text-disabled":         gray["400"],
  "--text-placeholder":      gray["400"],
  "--text-brand-primary":    aerospaceOrange["500"],
  "--text-brand-hover":      aerospaceOrange["600"],
  "--link":                  sky["600"],
  "--text-danger-primary":   rose["600"],
  "--text-warning-primary":  amber["600"],
  "--text-success-primary":  emerald["600"],
  "--text-info":             sky["500"],
  // stroke
  "--stroke-primary":         gray["200"],
  "--stroke-primary-solid":   gray["900"],
  "--stroke-secondary":       gray["300"],
  "--stroke-disabled":        gray["300"],
  "--stroke-brand":           aerospaceOrange["300"],
  "--stroke-brand-solid":     aerospaceOrange["500"],
  "--stroke-brand-lighter":   aerospaceOrange["100"],
  "--stroke-danger":          rose["400"],
  "--stroke-danger-solid":    rose["600"],
  "--stroke-danger-lighter":  rose["100"],
  "--stroke-warning":         amber["400"],
  "--stroke-warning-solid":   amber["600"],
  "--stroke-warning-lighter": amber["100"],
  "--stroke-success":         emerald["400"],
  "--stroke-success-solid":   emerald["600"],
  "--stroke-success-lighter": emerald["100"],
  "--stroke-info":            sky["300"],
  "--stroke-info-solid":      sky["500"],
  "--stroke-info-lighter":    sky["100"],
  "--stroke-gray-lighter":    gray["100"],
  // icon
  "--icon-primary":     gray["500"],
  "--icon-disabled":    gray["400"],
  "--icon-info":        sky["500"],
  "--icon-danger":      rose["600"],
  "--icon-success":     emerald["600"],
  "--icon-warning":     amber["600"],
  "--icon-white":       white["50"],
  "--icon-dark":        gray["900"],
  "--icon-brand":       aerospaceOrange["500"],
  "--icon-brand-hover": aerospaceOrange["600"],
  "--icon-link":        sky["600"],
  // background
  "--bg-primary":           white["50"],
  "--bg-primary-hover":     gray["100"],
  "--bg-secondary":         gray["100"],
  "--bg-tertiary":          gray["500"],
  "--bg-quaternary":        gray["50"],
  "--bg-primary-solid":     gray["900"],
  "--bg-active":            gray["100"],
  "--bg-disabled":          gray["200"],
  "--bg-disabled-soft":     gray["50"],
  "--bg-brand-primary":     aerospaceOrange["50"],
  "--bg-brand-secondary":   aerospaceOrange["100"],
  "--bg-brand-solid":       aerospaceOrange["500"],
  "--bg-brand-solid-hover": aerospaceOrange["600"],
  "--bg-danger-primary":    rose["50"],
  "--bg-danger-solid":      rose["600"],
  "--bg-warning-primary":   amber["50"],
  "--bg-warning-solid":     amber["600"],
  "--bg-success-primary":   emerald["50"],
  "--bg-success-solid":     emerald["600"],
  "--bg-info-primary":      sky["50"],
  "--bg-info-solid":        sky["500"],
  // foreground
  "--fg-primary":           gray["800"],
  "--fg-secondary":         gray["500"],
  "--fg-secondary-hover":   gray["600"],
  "--fg-white":             white["50"],
  "--fg-placeholder":       gray["400"],
  "--fg-disabled":          gray["400"],
  "--fg-brand-primary":     aerospaceOrange["500"],
  "--fg-brand-secondary":   aerospaceOrange["400"],
  "--fg-danger-primary":    rose["600"],
  "--fg-danger-secondary":  rose["500"],
  "--fg-warning-primary":   amber["600"],
  "--fg-warning-secondary": amber["500"],
  "--fg-success-primary":   emerald["600"],
  "--fg-success-secondary": emerald["500"],
};

const sellsukiSkyTokens: SemanticTokenMap = {
  // text
  "--text-primary":          gray["800"],
  "--text-primary-hover":    gray["900"],
  "--text-secondary":        gray["500"],
  "--text-secondary-hover":  gray["600"],
  "--text-white":            white["50"],
  "--text-disabled":         gray["400"],
  "--text-placeholder":      gray["400"],
  "--text-brand-primary":    sky["500"],
  "--text-brand-hover":      sky["600"],
  "--link":                  sky["600"],
  "--text-danger-primary":   rose["600"],
  "--text-warning-primary":  amber["600"],
  "--text-success-primary":  emerald["600"],
  "--text-info":             sky["500"],
  // stroke
  "--stroke-primary":         gray["200"],
  "--stroke-primary-solid":   gray["900"],
  "--stroke-secondary":       gray["300"],
  "--stroke-disabled":        gray["300"],
  "--stroke-brand":           sky["300"],
  "--stroke-brand-solid":     sky["500"],
  "--stroke-brand-lighter":   sky["100"],
  "--stroke-danger":          rose["400"],
  "--stroke-danger-solid":    rose["600"],
  "--stroke-danger-lighter":  rose["100"],
  "--stroke-warning":         amber["400"],
  "--stroke-warning-solid":   amber["600"],
  "--stroke-warning-lighter": amber["100"],
  "--stroke-success":         emerald["400"],
  "--stroke-success-solid":   emerald["600"],
  "--stroke-success-lighter": emerald["100"],
  "--stroke-info":            sky["300"],
  "--stroke-info-solid":      sky["500"],
  "--stroke-info-lighter":    sky["100"],
  "--stroke-gray-lighter":    gray["100"],
  // icon
  "--icon-primary":     gray["500"],
  "--icon-disabled":    gray["400"],
  "--icon-info":        sky["500"],
  "--icon-danger":      rose["600"],
  "--icon-success":     emerald["600"],
  "--icon-warning":     amber["600"],
  "--icon-white":       white["50"],
  "--icon-dark":        gray["900"],
  "--icon-brand":       sky["500"],
  "--icon-brand-hover": sky["600"],
  "--icon-link":        sky["600"],
  // background
  "--bg-primary":           white["50"],
  "--bg-primary-hover":     gray["50"],  // lighter than patona (gray-100) — intentional for sky brand
  "--bg-secondary":         gray["100"],
  "--bg-tertiary":          gray["500"],
  "--bg-quaternary":        gray["50"],
  "--bg-primary-solid":     gray["900"],
  "--bg-active":            gray["100"],
  "--bg-disabled":          gray["200"],
  "--bg-disabled-soft":     gray["50"],
  "--bg-brand-primary":     sky["50"],
  "--bg-brand-secondary":   sky["100"],
  "--bg-brand-solid":       sky["500"],
  "--bg-brand-solid-hover": sky["600"],
  "--bg-danger-primary":    rose["50"],
  "--bg-danger-solid":      rose["600"],
  "--bg-warning-primary":   amber["50"],
  "--bg-warning-solid":     amber["600"],
  "--bg-success-primary":   emerald["50"],
  "--bg-success-solid":     emerald["600"],
  "--bg-info-primary":      sky["50"],
  "--bg-info-solid":        sky["500"],
  // foreground
  "--fg-primary":           gray["800"],
  "--fg-secondary":         gray["500"],
  "--fg-secondary-hover":   gray["600"],
  "--fg-white":             white["50"],
  "--fg-placeholder":       gray["400"],
  "--fg-disabled":          gray["400"],
  "--fg-brand-primary":     sky["500"],
  "--fg-brand-secondary":   sky["400"],
  "--fg-danger-primary":    rose["600"],
  "--fg-danger-secondary":  rose["500"],
  "--fg-warning-primary":   amber["600"],
  "--fg-warning-secondary": amber["500"],
  "--fg-success-primary":   emerald["600"],
  "--fg-success-secondary": emerald["500"],
};

export const semanticTokens: Record<Brand, SemanticTokenMap> = {
  patona:  patonaTokens,
  ccs3:    sellsukiSkyTokens,
  oc2plus: sellsukiSkyTokens,
};

// ── Inject helpers ────────────────────────────────────────────────────────────

export function injectSemanticTokens(
  brand: Brand,
  root: HTMLElement = document.documentElement,
): void {
  Object.entries(semanticTokens[brand]).forEach(([token, hex]) =>
    root.style.setProperty(token, hex),
  );
}
