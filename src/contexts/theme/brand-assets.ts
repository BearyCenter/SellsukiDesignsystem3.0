/**
 * Brand asset registry (DS 3.0)
 *
 * Single source of truth for brand-specific visual assets — logo marks, full
 * wordmark logos, and human-readable display names. Consumed by <ssk-logo>
 * and any other component that needs to render brand-specific imagery.
 *
 * Asset resolution order in <ssk-logo>:
 *   1. Explicit `srcLogo` / `srcLogoName` props (consumer override — wins)
 *   2. Explicit `brand` attribute on <ssk-logo>
 *   3. Brand inherited via Lit context from <ssk-app-shell-provider> or
 *      <ssk-theme-provider>
 *   4. Default fallback ("ccs3" — Sellsuki/Shipmunk/Akita group)
 *
 * Why a registry, not a CSS token: logos are media (SVG/PNG references),
 * not stylable values. They need TypeScript discoverability so consumers and
 * vibecode AI tools can introspect "what assets does brand X expose?" — which
 * CSS-var driven approaches can't provide.
 */

import { createContext } from "@lit/context";
import type { Brand } from "./semantic-tokens";

export type { Brand };

export interface BrandAssets {
  /** Square brand mark (icon only). Used in compact UIs — sidebar header, favicon, navbar logo when wordmark is hidden. */
  readonly logoMark: string;
  /** Full logo with wordmark. Used in marketing surfaces, page headers, login screens. */
  readonly logoFull: string;
  /** Human-readable brand display name (Thai-friendly). */
  readonly displayName: string;
  /** Primary brand color in hex — convenience accessor; semantic tokens still authoritative for styling. */
  readonly brandColor: string;
}

const svgDataUri = (svg: string): string =>
  "data:image/svg+xml;utf8," + encodeURIComponent(svg);

const mark = (label: string, fill: string): string =>
  svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${fill}"/><text x="32" y="42" text-anchor="middle" font-family="Inter, sans-serif" font-size="32" font-weight="700" fill="#fff">${label}</text></svg>`,
  );

const wordmark = (label: string, fill: string): string =>
  svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48"><rect width="48" height="48" rx="10" fill="${fill}"/><text x="24" y="32" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" font-weight="700" fill="#fff">${label[0]}</text><text x="60" y="32" font-family="Inter, sans-serif" font-size="22" font-weight="600" fill="#111827">${label}</text></svg>`,
  );

export const BRAND_ASSETS: Record<Brand, BrandAssets> = {
  ccs3: {
    logoMark:    mark("S", "#32a9ff"),
    logoFull:    wordmark("Sellsuki", "#32a9ff"),
    displayName: "Sellsuki",
    brandColor:  "#32a9ff",
  },
  patona: {
    logoMark:    mark("P", "#10b981"),
    logoFull:    wordmark("Patona", "#10b981"),
    displayName: "Patona",
    brandColor:  "#10b981",
  },
  oc2plus: {
    logoMark:    mark("O", "#f97316"),
    logoFull:    wordmark("OC2+", "#f97316"),
    displayName: "OC2+",
    brandColor:  "#f97316",
  },
};

export const DEFAULT_BRAND: Brand = "ccs3";

export const getBrandAssets = (brand?: Brand | null): BrandAssets =>
  BRAND_ASSETS[brand ?? DEFAULT_BRAND] ?? BRAND_ASSETS[DEFAULT_BRAND];

/**
 * Lit context for propagating the active brand down the component tree.
 * Provided by <ssk-app-shell-provider> and <ssk-theme-provider>.
 * Consumed by <ssk-logo> (and any future brand-aware component).
 */
export const brandContext = createContext<Brand>("ssk-brand-context");
