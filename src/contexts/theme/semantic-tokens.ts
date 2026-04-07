import { defaultColorPallete } from "./default";

// ── Brand ─────────────────────────────────────────────────────────────────────

export const Brand = {
  patona:  "patona",
  ccs3:    "ccs3",
  oc2plus: "oc2plus",
} as const;

export type Brand = (typeof Brand)[keyof typeof Brand];

// ── Palette var map ───────────────────────────────────────────────────────────
// Derived from defaultColorPallete — single source of truth, no hex duplication

const PALETTE_COLORS = {
  "aerospace-orange": defaultColorPallete["aerospace-orange"],
  sky:     defaultColorPallete.sky,
  gray:    defaultColorPallete.gray,
  emerald: defaultColorPallete.emerald,
  amber:   defaultColorPallete.amber,
  rose:    defaultColorPallete.rose,
  white:   { "50": (defaultColorPallete.white as Record<string, string>)["50"] },
};

export const paletteVarMap: Record<string, string> =
  Object.entries(PALETTE_COLORS).reduce((acc, [name, scales]) => {
    Object.entries(scales).forEach(([scale, hex]) => {
      acc[`--palette-${name}-${scale}`] = hex as string;
    });
    return acc;
  }, {} as Record<string, string>);

// ── Semantic tokens per brand ─────────────────────────────────────────────────

export type SemanticTokenMap = Record<string, string>;

const patonaTokens: SemanticTokenMap = {
  // text
  "--text-primary":          "--palette-gray-800",
  "--text-primary-hover":    "--palette-gray-900",
  "--text-secondary":        "--palette-gray-500",
  "--text-secondary-hover":  "--palette-gray-600",
  "--text-white":            "--palette-white-50",
  "--text-disabled":         "--palette-gray-400",
  "--text-placeholder":      "--palette-gray-400",
  "--text-brand-primary":    "--palette-aerospace-orange-500",
  "--text-brand-hover":      "--palette-aerospace-orange-600",
  "--link":                  "--palette-sky-600",
  "--text-danger-primary":   "--palette-rose-600",
  "--text-warning-primary":  "--palette-amber-600",
  "--text-success-primary":  "--palette-emerald-600",
  "--text-info":             "--palette-sky-500",
  // stroke
  "--stroke-primary":         "--palette-gray-200",
  "--stroke-primary-solid":   "--palette-gray-900",
  "--stroke-secondary":       "--palette-gray-300",
  "--stroke-disabled":        "--palette-gray-300",
  "--stroke-brand":           "--palette-aerospace-orange-300",
  "--stroke-brand-solid":     "--palette-aerospace-orange-500",
  "--stroke-brand-lighter":   "--palette-aerospace-orange-100",
  "--stroke-danger":          "--palette-rose-400",
  "--stroke-danger-solid":    "--palette-rose-600",
  "--stroke-danger-lighter":  "--palette-rose-100",
  "--stroke-warning":         "--palette-amber-400",
  "--stroke-warning-solid":   "--palette-amber-600",
  "--stroke-warning-lighter": "--palette-amber-100",
  "--stroke-success":         "--palette-emerald-400",
  "--stroke-success-solid":   "--palette-emerald-600",
  "--stroke-success-lighter": "--palette-emerald-100",
  "--stroke-info":            "--palette-sky-300",
  "--stroke-info-solid":      "--palette-sky-500",
  "--stroke-info-lighter":    "--palette-sky-100",
  "--stroke-gray-lighter":    "--palette-gray-100",
  // icon
  "--icon-primary":     "--palette-gray-500",
  "--icon-disabled":    "--palette-gray-400",
  "--icon-info":        "--palette-sky-500",
  "--icon-danger":      "--palette-rose-600",
  "--icon-success":     "--palette-emerald-600",
  "--icon-warning":     "--palette-amber-600",
  "--icon-white":       "--palette-white-50",
  "--icon-dark":        "--palette-gray-900",
  "--icon-brand":       "--palette-aerospace-orange-500",
  "--icon-brand-hover": "--palette-aerospace-orange-600",
  "--icon-link":        "--palette-sky-600",
  // background
  "--bg-primary":           "--palette-white-50",
  "--bg-primary-hover":     "--palette-gray-100",
  "--bg-secondary":         "--palette-gray-100",
  "--bg-tertiary":          "--palette-gray-500",
  "--bg-quaternary":        "--palette-gray-50",
  "--bg-primary-solid":     "--palette-gray-900",
  "--bg-active":            "--palette-gray-100",
  "--bg-disabled":          "--palette-gray-200",
  "--bg-disabled-soft":     "--palette-gray-50",
  "--bg-brand-primary":     "--palette-aerospace-orange-50",
  "--bg-brand-secondary":   "--palette-aerospace-orange-100",
  "--bg-brand-solid":       "--palette-aerospace-orange-500",
  "--bg-brand-solid-hover": "--palette-aerospace-orange-600",
  "--bg-danger-primary":    "--palette-rose-50",
  "--bg-danger-solid":      "--palette-rose-600",
  "--bg-warning-primary":   "--palette-amber-50",
  "--bg-warning-solid":     "--palette-amber-600",
  "--bg-success-primary":   "--palette-emerald-50",
  "--bg-success-solid":     "--palette-emerald-600",
  "--bg-info-primary":      "--palette-sky-50",
  "--bg-info-solid":        "--palette-sky-500",
  // foreground
  "--fg-primary":           "--palette-gray-800",
  "--fg-secondary":         "--palette-gray-500",
  "--fg-secondary-hover":   "--palette-gray-600",
  "--fg-white":             "--palette-white-50",
  "--fg-placeholder":       "--palette-gray-400",
  "--fg-disabled":          "--palette-gray-400",
  "--fg-brand-primary":     "--palette-aerospace-orange-500",
  "--fg-brand-secondary":   "--palette-aerospace-orange-400",
  "--fg-danger-primary":    "--palette-rose-600",
  "--fg-danger-secondary":  "--palette-rose-500",
  "--fg-warning-primary":   "--palette-amber-600",
  "--fg-warning-secondary": "--palette-amber-500",
  "--fg-success-primary":   "--palette-emerald-600",
  "--fg-success-secondary": "--palette-emerald-500",
};

const sellsukiSkyTokens: SemanticTokenMap = {
  // text
  "--text-primary":          "--palette-gray-800",
  "--text-primary-hover":    "--palette-gray-900",
  "--text-secondary":        "--palette-gray-500",
  "--text-secondary-hover":  "--palette-gray-600",
  "--text-white":            "--palette-white-50",
  "--text-disabled":         "--palette-gray-400",
  "--text-placeholder":      "--palette-gray-400",
  "--text-brand-primary":    "--palette-sky-500",
  "--text-brand-hover":      "--palette-sky-600",
  "--link":                  "--palette-sky-600",
  "--text-danger-primary":   "--palette-rose-600",
  "--text-warning-primary":  "--palette-amber-600",
  "--text-success-primary":  "--palette-emerald-600",
  "--text-info":             "--palette-sky-500",
  // stroke
  "--stroke-primary":         "--palette-gray-200",
  "--stroke-primary-solid":   "--palette-gray-900",
  "--stroke-secondary":       "--palette-gray-300",
  "--stroke-disabled":        "--palette-gray-300",
  "--stroke-brand":           "--palette-sky-300",
  "--stroke-brand-solid":     "--palette-sky-500",
  "--stroke-brand-lighter":   "--palette-sky-100",
  "--stroke-danger":          "--palette-rose-400",
  "--stroke-danger-solid":    "--palette-rose-600",
  "--stroke-danger-lighter":  "--palette-rose-100",
  "--stroke-warning":         "--palette-amber-400",
  "--stroke-warning-solid":   "--palette-amber-600",
  "--stroke-warning-lighter": "--palette-amber-100",
  "--stroke-success":         "--palette-emerald-400",
  "--stroke-success-solid":   "--palette-emerald-600",
  "--stroke-success-lighter": "--palette-emerald-100",
  "--stroke-info":            "--palette-sky-300",
  "--stroke-info-solid":      "--palette-sky-500",
  "--stroke-info-lighter":    "--palette-sky-100",
  "--stroke-gray-lighter":    "--palette-gray-100",
  // icon
  "--icon-primary":     "--palette-gray-500",
  "--icon-disabled":    "--palette-gray-400",
  "--icon-info":        "--palette-sky-500",
  "--icon-danger":      "--palette-rose-600",
  "--icon-success":     "--palette-emerald-600",
  "--icon-warning":     "--palette-amber-600",
  "--icon-white":       "--palette-white-50",
  "--icon-dark":        "--palette-gray-900",
  "--icon-brand":       "--palette-sky-500",
  "--icon-brand-hover": "--palette-sky-600",
  "--icon-link":        "--palette-sky-600",
  // background
  "--bg-primary":           "--palette-white-50",
  "--bg-primary-hover":     "--palette-gray-50",
  "--bg-secondary":         "--palette-gray-100",
  "--bg-tertiary":          "--palette-gray-500",
  "--bg-quaternary":        "--palette-gray-50",
  "--bg-primary-solid":     "--palette-gray-900",
  "--bg-active":            "--palette-gray-100",
  "--bg-disabled":          "--palette-gray-200",
  "--bg-disabled-soft":     "--palette-gray-50",
  "--bg-brand-primary":     "--palette-sky-50",
  "--bg-brand-secondary":   "--palette-sky-100",
  "--bg-brand-solid":       "--palette-sky-500",
  "--bg-brand-solid-hover": "--palette-sky-600",
  "--bg-danger-primary":    "--palette-rose-50",
  "--bg-danger-solid":      "--palette-rose-600",
  "--bg-warning-primary":   "--palette-amber-50",
  "--bg-warning-solid":     "--palette-amber-600",
  "--bg-success-primary":   "--palette-emerald-50",
  "--bg-success-solid":     "--palette-emerald-600",
  "--bg-info-primary":      "--palette-sky-50",
  "--bg-info-solid":        "--palette-sky-500",
  // foreground
  "--fg-primary":           "--palette-gray-800",
  "--fg-secondary":         "--palette-gray-500",
  "--fg-secondary-hover":   "--palette-gray-600",
  "--fg-white":             "--palette-white-50",
  "--fg-placeholder":       "--palette-gray-400",
  "--fg-disabled":          "--palette-gray-400",
  "--fg-brand-primary":     "--palette-sky-500",
  "--fg-brand-secondary":   "--palette-sky-400",
  "--fg-danger-primary":    "--palette-rose-600",
  "--fg-danger-secondary":  "--palette-rose-500",
  "--fg-warning-primary":   "--palette-amber-600",
  "--fg-warning-secondary": "--palette-amber-500",
  "--fg-success-primary":   "--palette-emerald-600",
  "--fg-success-secondary": "--palette-emerald-500",
};

export const semanticTokens: Record<Brand, SemanticTokenMap> = {
  patona:  patonaTokens,
  ccs3:    sellsukiSkyTokens,
  oc2plus: sellsukiSkyTokens,
};

// ── Inject helpers ────────────────────────────────────────────────────────────

export function injectPaletteVars(root: HTMLElement = document.documentElement): void {
  Object.entries(paletteVarMap).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function injectSemanticTokens(
  brand: Brand,
  root: HTMLElement = document.documentElement,
): void {
  Object.entries(semanticTokens[brand]).forEach(([semanticVar, paletteVar]) => {
    const hex = paletteVarMap[paletteVar];
    if (hex) root.style.setProperty(semanticVar, hex);
  });
}
