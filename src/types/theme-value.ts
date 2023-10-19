import { kebabCase } from "change-case";
import { FontFamilyGroup, FontWeight, Theme } from "./theme";

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

export const parseThemeToCss = (
  theme: Theme | undefined,
  component?: keyof Theme["components"],
  base: string = ":host"
): string => {
  let cssKV: kv = {};

  if (!theme) return "";

  // base theme
  cssKV = deepFlattenCssVar(theme);

  // component theme
  if (component) {
    const componentTheme = theme.components[component];

    if (componentTheme) {
      cssKV = {
        ...cssKV,
        ...deepFlattenCssVar(componentTheme),
      };
    }
  }

  return `${base} {${Object.entries(cssKV)
    .map(([k, v]) => `--${kebabCase(k)}: ${v};`)
    .join(" ")}}${parseAtRuleThemeValue(theme).join("\n")}`;
};

export const deepFlattenCssVar = (t: any, prefix = "", kv: kv = {}): kv => {
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

        deepFlattenCssVar(v, key, kv);
        break;
    }
  }

  return kv;
};

export const parseAtRuleThemeValue = (theme: Theme | undefined): string[] => {
  let atRules: string[] = [];

  if (!theme) return atRules;

  // @keyframes
  for (const [k, ranges] of Object.entries(theme["@keyframes"] ?? {})) {
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
