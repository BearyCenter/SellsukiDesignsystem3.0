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
  themeColor: string;
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

export const parseThemeValueComponentCss = (
  theme: Theme | undefined,
  component: keyof Theme["components"],
  themeValue: ThemeValue
): string => {
  let cssKV: { [props: string]: string | number | undefined } = {};

  // Color
  cssKV["background-color"] = getComponentThemeColor(
    theme,
    component,
    "colors",
    themeValue.backgroundColor || themeValue.themeColor,
    "500"
  );
  cssKV["--background-color"] = cssKV["background-color"];

  cssKV["color"] = getComponentThemeColor(
    theme,
    component,
    "colors",
    themeValue.color ||
      (colord(themeValue.themeColor).isDark() ? "white" : "black"),
    "100"
  );
  cssKV["--color"] = cssKV["color"];

  cssKV["border-color"] = getComponentThemeColor(
    theme,
    component,
    "colors",
    themeValue.borderColor || themeValue.themeColor,
    "400"
  );
  cssKV["--border-color"] = cssKV["border-color"];

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
    themeValue.borderWidth || themeValue.size
  );

  // Shadow
  cssKV["box-shadow"] = getComponentThemeSize(
    theme,
    component,
    "boxShadow",
    themeValue.boxShadow || themeValue.size
  );

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

  return Object.entries(cssKV)
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${v};`)
    .join("\n");
};
