import { kebabCase } from "change-case";
import { colord } from "colord";
import {
  FontFamilyGroup,
  FontWeight,
  Theme,
  getComponentThemeColor,
  getComponentThemeFontFamily,
  getComponentThemeFontWeight,
  getComponentThemeSize,
} from "./theme";

export type ThemeValue = {
  themeColor?: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;

  size: string;
  fontSize?: string;
  lineHeight?: string;
  gap?: string;
  rounded?: string;
  padding?: string;
  margin?: string;

  fontFamilyGroup?: FontFamilyGroup;
  fontWeight?: FontWeight;

  borderWidth?: string;

  boxShadow?: string;

  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
};

type kv = { [key: string]: string };

export const parseCssThemeValue = (
  theme: Theme | undefined,
  themeValue: ThemeValue,
  component?: keyof Theme["components"]
): kv => {
  let cssKV: kv = {};

  if (!theme) return cssKV;

  for (const [k, v] of Object.entries(themeValue)) {
    if (typeof v === "string") {
      cssKV[`--${k}`] = v;
    }
  }

  return cssKV;
};

export const deepFlattenTheme = (t: any, prefix = "", kv: kv = {}): kv => {
  for (const [k, v] of Object.entries(t)) {
    // ignore at-rule
    if (k.startsWith("@")) continue;

    const key = prefix ? `${prefix}.${kebabCase(k)}` : kebabCase(k);

    switch (typeof v) {
      case "string":
        kv[key] = v;
        break;
      case "number":
        kv[key] = `${v}`;
        break;

      case "object":
        // case array join them with space
        if (Array.isArray(v)) {
          kv[key] = v
            .map((v) => {
              switch (typeof v) {
                case "string":
                  return `"${v}"`;
                case "number":
                  return `${v}`;
                default:
                  return `"${v}"`;
              }
            })
            .join(", ");
          break;
        }

        deepFlattenTheme(v, key, kv);
        break;
    }
  }

  return kv;
};

export const parseAtRuleThemeValue = (theme: Theme | undefined): string[] => {
  let atRules: string[] = [];

  if (!theme) return atRules;

  // @keyframes
  for (const [k, ranges] of Object.entries(theme["@keyframes"])) {
    atRules.push(
      `@keyframes ${k} { ${Object.entries(ranges)
        .map(
          ([r, styles]) =>
            `${r} { ${Object.entries(styles)
              .map(([k, v]) => `${kebabCase(k)}: ${v};`)
              .join(" ")} }`
        )
        .join(" ")} }`
    );
  }

  return atRules;
};

export const parseThemeValueComponentCss = (
  theme: Theme | undefined,
  component: keyof Theme["components"],
  themeValue: ThemeValue,
  varOnly = false
): string => {
  let cssKV: { [props: string]: string | number | undefined } = {};

  if (!themeValue.themeColor) themeValue.themeColor = "transparent";

  // Color
  cssKV["background-color"] = getComponentThemeColor(
    theme,
    component,
    "colors",
    themeValue.backgroundColor || themeValue.themeColor,
    "500"
  );

  cssKV["color"] = getComponentThemeColor(
    theme,
    component,
    "colors",
    themeValue.color ||
      (colord(themeValue.themeColor).isDark() ? "white" : "black"),
    "100"
  );

  cssKV["border-color"] = getComponentThemeColor(
    theme,
    component,
    "colors",
    themeValue.borderColor || themeValue.themeColor,
    "400"
  );

  // Size
  cssKV["font-size"] = getComponentThemeSize(
    theme,
    component,
    "fontSize",
    themeValue.fontSize || themeValue.size
  );

  cssKV["line-height"] = getComponentThemeSize(
    theme,
    component,
    "lineHeight",
    themeValue.lineHeight || themeValue.size
  );

  cssKV["gap"] = getComponentThemeSize(
    theme,
    component,
    "spacing",
    themeValue.gap || themeValue.size
  );

  cssKV["border-radius"] = getComponentThemeSize(
    theme,
    component,
    "rounded",
    themeValue.rounded || themeValue.size
  );

  cssKV["padding"] = getComponentThemeSize(
    theme,
    component,
    "padding",
    themeValue.padding || themeValue.size
  );

  cssKV["margin"] = getComponentThemeSize(
    theme,
    component,
    "margin",
    themeValue.margin || themeValue.size
  );

  // Font
  cssKV["font-family"] = getComponentThemeFontFamily(
    theme,
    component,
    themeValue.fontFamilyGroup || "sans",
    themeValue.size
  );

  cssKV["font-weight"] = getComponentThemeFontWeight(
    theme,
    component,
    themeValue.fontWeight || "normal"
  );

  // Border
  cssKV["border-width"] = getComponentThemeSize(
    theme,
    component,
    "borderWidth",
    themeValue.borderWidth || themeValue.size,
    "0px"
  );

  // Shadow
  cssKV["box-shadow"] =
    themeValue.boxShadow &&
    getComponentThemeSize(theme, component, "boxShadow", themeValue.boxShadow);

  // Width, Height
  cssKV["width"] =
    themeValue.width &&
    getComponentThemeSize(theme, component, "width", themeValue.width);

  cssKV["height"] =
    themeValue.height &&
    getComponentThemeSize(theme, component, "height", themeValue.height);

  cssKV["min-width"] =
    themeValue.minWidth &&
    getComponentThemeSize(theme, component, "minWidth", themeValue.minWidth);

  cssKV["min-height"] =
    themeValue.minHeight &&
    getComponentThemeSize(theme, component, "minHeight", themeValue.minHeight);

  cssKV["max-width"] =
    themeValue.maxWidth &&
    getComponentThemeSize(theme, component, "maxWidth", themeValue.maxWidth);

  cssKV["max-height"] =
    themeValue.maxHeight &&
    getComponentThemeSize(theme, component, "maxHeight", themeValue.maxHeight);

  for (const [k, v] of Object.entries(cssKV)) {
    if (v === undefined) {
      delete cssKV[k];
      continue;
    }

    cssKV[`--${k}`] = v;
  }

  if (themeValue.themeColor) {
    const color = theme?.colors[themeValue.themeColor];
    if (color) {
      for (const [k, v] of Object.entries(color)) {
        cssKV[`--color-${k}`] = v;
      }
    }
  }

  if (varOnly) {
    return Object.entries(cssKV)
      .filter(([k, _]) => k.startsWith("--"))
      .map(([k, v]) => `${k}: ${v};\n`)
      .join("\n");
  }

  return Object.entries(cssKV)
    .map(([k, v]) => `${k}: ${v};\n`)
    .join("\n");
};
