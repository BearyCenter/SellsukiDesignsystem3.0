import { ArgTypes } from "@storybook/web-components";
import { ColorName, ColorRole, Size } from "../../src/types/theme";
import { ThemeValue } from "../../src/types/theme-value";

const colors: (ColorRole | ColorName)[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "green",
  "blue",
  "red",
  "pink",
];

const customColors: (string | undefined)[] = [
  "primary.500",
  "primary.300",
  "primary.700",
  "secondary.500",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ff00ff",
  "#00ffff",
  "#ffff00",
  "#000000",
  "#ffffff",
  "rgb(1,12,123)",
  "rgba(0,0,0,0.5)",
  "rgba(1,255,33,0.5)",
  "hsl(0, 100%, 50%)",
  "hsla(0, 100%, 50%, 0.5)",
  "hwb(0, 0%, 0%)",
  "hwb(0, 0%, 0%, 0.5)",
  undefined,
];

const sizes: (Size | undefined)[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  undefined,
];

const customSizes: string[] = ["1rem", "1.2rem", "2em", "14px", "28px", "16pt"];

const windowSizes: string[] = [
  "full",
  "100dvw",
  "100dvh",
  "50vw",
  "50vh",
  "50%",
  "fit-content",
  "min-content",
  "max-content",
  "auto",
];

const shadows: string[] = [
  "0px 1px 4px rgba(0, 0, 0, 0.2)",
  "0px 2px 8px rgba(0, 0, 0, 0.2)",
  "0px 4px 16px rgba(255, 0, 0, 0.6)",
];

export const baseArgsTypes: ArgTypes<ThemeValue> = {
  themeColor: {
    options: colors,
    description: "The theme color",
    control: "select",
  },
  color: {
    options: [...colors, ...customColors],
    description: "The Font color",
    control: "select",
  },
  backgroundColor: {
    options: [...colors, ...customColors],
    description: "The background color",
    control: "color",
  },
  borderColor: {
    options: [...colors, ...customColors],
    description: "The border color",
    control: "color",
  },

  borderStyle: {
    options: [
      "solid",
      "dashed",
      "dotted",
      "double",
      "groove",
      "ridge",
      "inset",
      "outset",
      "none",
      "hidden",
    ],
    description: "The border style",
    control: "select",
  },

  size: {
    options: [...sizes, ...customSizes],
    control: "select",
  },
  fontSize: {
    options: [...sizes, ...customSizes],
    description: "The font size",
    control: "select",
  },
  lineHeight: {
    options: [...sizes, ...customSizes],
    description: "The line height",
    control: "select",
  },
  gap: {
    options: [...sizes, ...customSizes],
    description: "The gap",
    control: "select",
  },
  rounded: {
    options: [...sizes, ...customSizes],
    description: "The rounded",
    control: "select",
  },
  margin: {
    options: [...sizes, ...customSizes],
    description: "The margin",
    control: "select",
  },
  padding: {
    options: [...sizes, ...customSizes],
    description: "The padding",
    control: "select",
  },

  fontFamilyGroup: {
    options: ["sans", "serif", "mono"],
    description: "The font family group",
    control: "inline-radio",
  },

  fontWeight: {
    options: [
      "thin",
      "extralight",
      "light",
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
      "black",
    ],
    description: "The font weight",
    control: "inline-radio",
  },

  borderWidth: {
    options: [...sizes, ...customSizes],
    description: "The border width",
    control: "select",
  },

  boxShadow: {
    options: [...sizes, ...shadows],
    description: "The box shadow",
    control: "select",
  },

  width: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The width",
    control: "select",
  },

  height: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The height",
    control: "select",
  },

  minWidth: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The min width",
    control: "select",
  },

  minHeight: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The min height",
    control: "select",
  },

  maxWidth: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The max width",
    control: "select",
  },

  maxHeight: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The max height",
    control: "select",
  },
};
