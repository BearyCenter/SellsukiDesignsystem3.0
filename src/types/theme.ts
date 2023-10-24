import { kebabCase } from "change-case";

import { TemplateResult, html } from "lit";

export type SizeSystem =
  | string // e.g. __em, __rem, __vh, __vw, __%, __px
  | "full"
  | "screen"
  | "min"
  | "max"
  | "fit";

export type Size =
  | string // e.g. __em, __rem, __vh, __vw, __%, __px
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type FontFamilyGroup = "sans" | "serif" | "mono";

export type ColorScale =
  | string // user defined
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type ColorRole =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type ColorName =
  | string
  | "white"
  | "black"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export type Position =
  | "left"
  | "right"
  | "bottom"
  | "center"
  | "top"
  | "left-bottom"
  | "left-top"
  | "right-bottom"
  | "right-top";

export type BackgroundSize = "auto" | "cover" | "contain";

export type ButtonVariants = "solid" | "outline" | "ghost";

export type Color =
  | {
      [key: ColorScale | string]: string;
    }
  | string;

export type ColorPalette = {
  [key in ColorName | ColorRole]: Color;
};

export type ThemeField = {
  colors: ColorPalette;
  fontSize: {
    [key in Size]: string;
  };
  lineHeight: {
    [key in Size]: string;
  };
  fontFamily: {
    [key in FontFamilyGroup]: string[];
  };
  fontWeight: {
    [key in FontWeight]: number;
  };
  borderColor: ColorPalette;
  borderWidth: {
    [key in Size]: string;
  };
  rounded: {
    [key in Size]: string;
  };
  boxShadow: {
    [key in Size]: string;
  };
  width: {
    [key in Size | SizeSystem]: string;
  };
  height: {
    [key in Size | SizeSystem]: string;
  };
  minWidth: {
    [key in Size | SizeSystem]: string;
  };
  minHeight: {
    [key in Size | SizeSystem]: string;
  };
  maxWidth: {
    [key in Size | SizeSystem]: string;
  };
  maxHeight: {
    [key in Size | SizeSystem]: string;
  };
  padding: {
    [key in Size]: string;
  };
  margin: {
    [key in Size]: string;
  };
  "@keyframes": {
    [keyframe: string]: {
      [range: string]: { [style: string]: string };
    };
  };
  animation: {
    [key: string]: string;
  };
  screens: {
    [key: Size]: string;
  };
};

export type Theme = {
  components: {
    button?: {
      // for extra fields
    } & Partial<ThemeField>;
    input?: {} & Partial<ThemeField>;
    icon?: {} & Partial<ThemeField>;
    text?: {} & Partial<ThemeField>;
    heading?: {} & Partial<ThemeField>;
    divider?: {} & Partial<ThemeField>;
    checkbox?: {} & Partial<ThemeField>;
  };
} & ThemeField;

type kv = { [key: string]: string };

export const parseThemeToCssVariables = (
  theme: Partial<ThemeField> | undefined,
  base: string = ":host"
): TemplateResult => {
  let cssKV: kv = {};

  if (!theme) return html``;

  // base theme
  cssKV = deepFlattenCssVar(theme);

  return html`<style>
    ${base} {${Object.entries(cssKV)
      .map(([k, v]) => `--${k}: ${v};`)
      .join(" ")}}${parseAtRuleThemeValue(theme).join("\n")}
  </style>`;
};

export const deepFlattenCssVar = (t: any, prefix = "", kv: kv = {}): kv => {
  for (const [k, v] of Object.entries(t)) {
    // ignore at-rule
    if (k.startsWith("@")) continue;

    const key = prefix ? `${prefix}-${kebabCase(k)}` : kebabCase(k);

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

export const parseAtRuleThemeValue = (
  theme: Partial<ThemeField> | undefined
): string[] => {
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

// parseVariableWithDefault
// vars = ['--color', '--color-500','--color-primary', '--color-primary-500', '#fff']
// return `var(--color, var(--color-500, var(--color-primary, var(--color-primary-500, #fff))))`
export const parseVariables = (
  ...variables: (string | undefined)[]
): string => {
  const vs = variables.filter((v): v is string => !!v);

  if (vs.length === 0) return "";

  return parseVariablesWithFallback(...vs);
};

const parseVariablesWithFallback = (...variables: string[]): string => {
  const [first, ...rest] = variables;

  if (rest.length === 0) {
    if (first.startsWith("--")) return `var(${first})`;

    return first;
  }

  if (first.startsWith("--"))
    return `var(${first}, ${parseVariablesWithFallback(...rest)})`;

  return first;
};

export const cssVar = (
  ...key: (string | number | undefined)[]
): string | undefined => {
  // if any key are undefined, return undefined
  if (key.some((k) => k === undefined)) return undefined;

  return `--${key.map((k) => kebabCase(`${k}`)).join("-")}`;
};
