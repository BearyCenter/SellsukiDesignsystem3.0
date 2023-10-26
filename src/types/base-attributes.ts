import { FontFamilyGroup, FontWeight } from "./theme";

export type BaseAttributes = {
  testId?: string;
} & ThemeValue;

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

  borderStyle?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden";
  boxShadow?: string;

  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
};

// export const parseBaseThemeValueToCssVariables = (
//   themeValue: ThemeValue,
//   base: string = ":host" // svg, div, button, etc
// ): TemplateResult => {
//   return
