import { ArgTypes } from "@storybook/web-components";
import { BaseAttributes } from "../../src/types/base-attributes";
import { ColorName, ColorRole, Size } from "../../src/types/theme";

const colors: (ColorRole | ColorName)[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "error",
  "warning",
  "info",
  "white",
  "black",
  "vin-rouge",
  "light-orchid",
  "wisteria",
  "matte-violet",
  "matte-blue",
  "cobalt-blue",
  "fiord",
  "navy",
  "slate",
  "gray",
  "stone",
  "brown",
  "cappuccino",
  "ecru",
  "olive",
  "lime",
  "green",
  "emerald",
  "teal",
  "turquoise",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "red",
  "apricot",
  "orange",
  "aerospace-orange",
  "amber",
  "yellow",
  "gold",
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

export const genericEvents: ArgTypes<any> = {
  // events
  "@click": {
    action: "@click",
    table: {
      category: "Events props",
    },
  },
  "@dblclick": {
    action: "@dblclick",
    table: {
      category: "Events props",
    },
  },
  "@focus": {
    action: "@focus",
    table: {
      category: "Events props",
    },
  },
  "@blur": {
    action: "@blur",
    table: {
      category: "Events props",
    },
  },
  "@mouseenter": {
    action: "@mouseenter",
    table: {
      category: "Events props",
    },
  },
  "@mouseleave": {
    action: "@mouseleave",
    table: {
      category: "Events props",
    },
  },
  "@mouseover": {
    action: "@mouseover",
    table: {
      category: "Events props",
    },
  },
  "@mouseout": {
    action: "@mouseout",
    table: {
      category: "Events props",
    },
  },
  "@mousedown": {
    action: "@mousedown",
    table: {
      category: "Events props",
    },
  },
  "@mouseup": {
    action: "@mouseup",
    table: {
      category: "Events props",
    },
  },
  "@keydown": {
    action: "@keydown",
    table: {
      category: "Events props",
    },
  },
  "@keyup": {
    action: "@keyup",
    table: {
      category: "Events props",
    },
  },
  "@keypress": {
    action: "@keypress",
    table: {
      category: "Events props",
    },
  },
  "@change": {
    action: "@change",
    table: {
      category: "Events props",
    },
  },
  "@input": {
    action: "@input",
    table: {
      category: "Events props",
    },
  },
  "@invalid": {
    action: "@invalid",
    table: {
      category: "Events props",
    },
  },
  "@submit": {
    action: "@submit",
    table: {
      category: "Events props",
    },
  },
  "@reset": {
    action: "@reset",
    table: {
      category: "Events props",
    },
  },
  "@select": {
    action: "@select",
    table: {
      category: "Events props",
    },
  },
  "@dragstart": {
    action: "@dragstart",
    table: {
      category: "Events props",
    },
  },
  "@drag": {
    action: "@drag",
    table: {
      category: "Events props",
    },
  },
  "@dragend": {
    action: "@dragend",
    table: {
      category: "Events props",
    },
  },
  "@dragenter": {
    action: "@dragenter",
    table: {
      category: "Events props",
    },
  },
  "@dragleave": {
    action: "@dragleave",
    table: {
      category: "Events props",
    },
  },
  "@dragover": {
    action: "@dragover",
    table: {
      category: "Events props",
    },
  },
  "@drop": {
    action: "@drop",
    table: {
      category: "Events props",
    },
  },
  "@scroll": {
    action: "@scroll",
    table: {
      category: "Events props",
    },
  },
  "@wheel": {
    action: "@wheel",
    table: {
      category: "Events props",
    },
  },
  "@animationstart": {
    action: "@animationstart",
    table: {
      category: "Events props",
    },
  },
  "@animationend": {
    action: "@animationend",
    table: {
      category: "Events props",
    },
  },
  "@animationiteration": {
    action: "@animationiteration",
    table: {
      category: "Events props",
    },
  },
  "@transitionstart": {
    action: "@transitionstart",
    table: {
      category: "Events props",
    },
  },
  "@transitioncancel": {
    action: "@transitioncancel",
    table: {
      category: "Events props",
    },
  },
  "@transitionend": {
    action: "@transitionend",
    table: {
      category: "Events props",
    },
  },
  "@load": {
    action: "@load",
    table: {
      category: "Events props",
    },
  },
  "@error": {
    action: "@error",
    table: {
      category: "Events props",
    },
  },
};

export const baseArgsTypes: ArgTypes<BaseAttributes | any> = {
  themeColor: {
    options: colors,
    description: "The theme color",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  color: {
    options: [...colors, ...customColors],
    description: "The Font color",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  backgroundColor: {
    options: [...colors, ...customColors],
    description: "The background color",
    control: "color",
    table: {
      category: "Base props",
    },
  },
  borderColor: {
    options: [...colors, ...customColors],
    description: "The border color",
    control: "color",
    table: {
      category: "Base props",
    },
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
    table: {
      category: "Base props",
    },
  },

  size: {
    options: [...sizes, ...customSizes],
    description: "The size of components",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  fontSize: {
    options: [...sizes, ...customSizes],
    description: "The font size",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  lineHeight: {
    options: [...sizes, ...customSizes],
    description: "The line height",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  gap: {
    options: [...sizes, ...customSizes],
    description: "The gap",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  rounded: {
    options: [...sizes, ...customSizes],
    description: "The rounded",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  margin: {
    options: [...sizes, ...customSizes],
    description: "The margin",
    control: "select",
    table: {
      category: "Base props",
    },
  },
  padding: {
    options: [...sizes, ...customSizes],
    description: "The padding",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  fontFamilyGroup: {
    options: ["sans", "serif", "mono"],
    description: "The font family group",
    control: "inline-radio",
    table: {
      category: "Base props",
    },
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
    table: {
      category: "Base props",
    },
  },

  borderWidth: {
    options: [...sizes, ...customSizes],
    description: "The border width",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  boxShadow: {
    options: [...sizes, ...shadows],
    description: "The box shadow",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  width: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The width",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  height: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The height",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  minWidth: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The min width",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  minHeight: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The min height",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  maxWidth: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The max width",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  maxHeight: {
    options: [...sizes, ...customSizes, ...windowSizes],
    description: "The max height",
    control: "select",
    table: {
      category: "Base props",
    },
  },

  "?hidden": {
    description: "The flag for hide components",
    control: {
      type: "boolean",
    },
    table: {
      category: "Base props",
      defaultValue: {
        summary: false,
      },
      type: {
        summary: "boolean",
      },
    },
  },
};
