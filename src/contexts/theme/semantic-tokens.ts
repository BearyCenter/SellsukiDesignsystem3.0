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

// ── Shared tokens (brand-independent) ────────────────────────────────────────

const DB_HEAVENT = '"DB HeaventRounded", sans-serif';

const sharedTokens: Record<string, string> = {
  // radius
  "--radius-none": "0px",
  "--radius-xxs":  "2px",
  "--radius-xs":   "4px",
  "--radius-sm":   "6px",
  "--radius-md":   "8px",
  "--radius-lg":   "12px",
  "--radius-xl":   "16px",
  "--radius-2xl":  "20px",
  "--radius-3xl":  "24px",
  "--radius-4xl":  "32px",
  "--radius-full": "9999px",
  // typography — family
  "--font-h1":      DB_HEAVENT,
  "--font-h2":      DB_HEAVENT,
  "--font-h3":      DB_HEAVENT,
  "--font-h4":      DB_HEAVENT,
  "--font-p":       DB_HEAVENT,
  "--font-label":   DB_HEAVENT,
  "--font-caption": DB_HEAVENT,
  "--font-button":  DB_HEAVENT,
  // typography — weight
  "--font-weight-normal":   "400",
  "--font-weight-medium":   "500",
  "--font-weight-semibold": "600",
  "--font-weight-bold":     "700",
  // typography — size
  "--font-size-h1":      "44px",
  "--font-size-h2":      "36px",
  "--font-size-h3":      "28px",
  "--font-size-h4":      "24px",
  "--font-size-p":       "20px",
  "--font-size-label":   "20px",
  "--font-size-caption": "18px",
  "--font-size-button":  "18px",
  // typography — weight shorthands (shorthand aliases for component use)
  "--weight-h1":      "400",
  "--weight-h2":      "400",
  "--weight-h3":      "700",
  "--weight-h4":      "500",
  "--weight-p":       "400",
  "--weight-label":   "400",
  "--weight-caption": "400",
  "--weight-button":  "600",
  // elevation
  "--elevation-sm": "0px 1px 2px 0px rgba(0,0,0,0.05)",
  "--elevation-md": "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)",
  "--elevation-lg": "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)",
  "--elevation-xl": "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)",
};

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
  // button
  "--button-solid-bg":            aerospaceOrange["500"],
  "--button-solid-bg-hover":      aerospaceOrange["600"],
  "--button-solid-fg":            white["50"],
  "--button-solid-fg-hover":      white["50"],
  "--button-solid-border":        aerospaceOrange["500"],
  "--button-solid-border-hover":  aerospaceOrange["600"],
  "--button-outline-fg":          aerospaceOrange["500"],
  "--button-outline-fg-hover":    aerospaceOrange["600"],
  "--button-outline-border":      aerospaceOrange["500"],
  "--button-outline-border-hover":aerospaceOrange["600"],
  "--button-ghost-fg":            aerospaceOrange["500"],
  "--button-ghost-fg-hover":      aerospaceOrange["600"],
  // error aliases (DS 2.0 naming — mapped from danger)
  "--icon-error":        rose["600"],
  "--bg-error-primary":  rose["50"],
  "--bg-error-solid":    rose["600"],
  "--text-error-primary":rose["600"],
  "--stroke-error":      rose["400"],
  "--stroke-error-solid":rose["600"],
  "--fg-error-primary":  rose["600"],
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
  // button
  "--button-solid-bg":            sky["500"],
  "--button-solid-bg-hover":      sky["600"],
  "--button-solid-fg":            white["50"],
  "--button-solid-fg-hover":      white["50"],
  "--button-solid-border":        sky["500"],
  "--button-solid-border-hover":  sky["600"],
  "--button-outline-fg":          sky["500"],
  "--button-outline-fg-hover":    sky["600"],
  "--button-outline-border":      sky["500"],
  "--button-outline-border-hover":sky["600"],
  "--button-ghost-fg":            sky["500"],
  "--button-ghost-fg-hover":      sky["600"],
  // error aliases (DS 2.0 naming — mapped from danger)
  "--icon-error":        rose["600"],
  "--bg-error-primary":  rose["50"],
  "--bg-error-solid":    rose["600"],
  "--text-error-primary":rose["600"],
  "--stroke-error":      rose["400"],
  "--stroke-error-solid":rose["600"],
  "--fg-error-primary":  rose["600"],
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
  Object.entries(sharedTokens).forEach(([token, value]) =>
    root.style.setProperty(token, value),
  );
  Object.entries(semanticTokens[brand]).forEach(([token, value]) =>
    root.style.setProperty(token, value),
  );
}
