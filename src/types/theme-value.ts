import { colord } from "colord";
import {
  Theme,
  getComponentThemeColor,
  getComponentThemeFontFamily,
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

  fontFamilyGroup?: string;
  fontWeight?: string;

  borderWidth?: string;

  boxShadow?: string;
  dropShadow?: string;

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
) => {
  let cssKV: { [props: string]: string | undefined } = {};

  cssKV["background-color"] = getComponentThemeColor(
    theme,
    component,
    "colors",
    themeValue.backgroundColor || themeValue.themeColor,
    "500"
  );

  if (themeValue.color) {
    cssKV["color"] = getComponentThemeColor(
      theme,
      component,
      "colors",
      themeValue.color,
      "100"
    );
  } else {
    cssKV["color"] = getComponentThemeColor(
      theme,
      component,
      "colors",
      colord(themeValue.themeColor).isDark() ? "white" : "black",
      "100"
    );
  }

  return `
    border: none;
    border-radius: ${getComponentThemeSize(
      theme,
      component,
      "rounded",
      theme.size
    )};
    padding: ${getComponentThemeSize(
      theme,
      component,
      "padding",
      theme.padding || theme.size
    )};
    font-size: ${getComponentThemeSize(
      theme,
      component,
      "fontSize",
      theme.size
    )};
    line-height: ${getComponentThemeSize(
      theme,
      component,
      "lineHeight",
      theme.size
    )};
    font-family: ${getComponentThemeFontFamily(
      theme,
      component,
      theme.fontFamilyGroup,
      theme.size
    )};
    font-weight: ${theme.fontWeight};`;
};
