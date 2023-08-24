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

type ThemeField = {
  colors: ColorPalette;
  spacing: {
    [key in Size]: string;
  };
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
  dropShadow: {
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
  keyframes: {
    [key: string]: {
      [range: string]: {
        [style: string]: string;
      };
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
  };
} & ThemeField;

type ExcludeUndefinedKeys<T> = Exclude<T, undefined>;
type ColorFieldKeys<T> = ExcludeUndefinedKeys<
  {
    [K in keyof T]: T[K] extends ColorPalette ? K : never;
  }[keyof T]
>;
type SizeFieldKeys<T> = ExcludeUndefinedKeys<
  {
    [K in keyof T]: T[K] extends {
      [key in Size | SizeSystem]: string;
    }
      ? K
      : never;
  }[keyof T]
>;

export const getColor = (
  theme: ThemeField | undefined,
  field: ColorFieldKeys<Theme>,
  color: ColorName | ColorRole,
  scale: ColorScale,
  fallbackColor?: string
) => {
  const c = theme?.[field]?.[color];

  if (typeof c === "string") {
    return c;
  }

  return c?.[scale] || fallbackColor;
};

export const getSize = (
  theme: ThemeField | undefined,
  field: SizeFieldKeys<Theme>,
  size: Size | SizeSystem,
  fallbackSize?: string
) => {
  return theme?.[field]?.[size] || fallbackSize;
};

export const getFontFamily = (
  theme: Theme | undefined,
  group: FontFamilyGroup,
  fallbackFontFamily?: string
) => {
  return theme?.fontFamily?.[group]?.join(",") || fallbackFontFamily;
};

export const getFontWeight = (
  theme: Theme | undefined,
  weight: FontWeight,
  fallbackFontWeight?: number
) => {
  return theme?.fontWeight?.[weight] || fallbackFontWeight;
};

export const getComponentThemeColor = (
  theme: Theme | undefined,
  component: keyof Theme["components"],
  field: ColorFieldKeys<ThemeField>,
  color: ColorName | ColorRole,
  scale: ColorScale,
  fallbackColor?: string
) => {
  const c = theme?.components?.[component]?.[field]?.[color];

  if (typeof c === "string") {
    return c;
  }

  return c?.[scale] || getColor(theme, field, color, scale, fallbackColor);
};

export const getComponentThemeSize = (
  theme: Theme | undefined,
  component: keyof Theme["components"],
  field: SizeFieldKeys<ThemeField>,
  size: Size | SizeSystem,
  fallbackSize?: string
) => {
  return (
    theme?.components?.[component]?.[field]?.[size] ||
    getSize(theme, field, size, fallbackSize)
  );
};

export const getComponentThemeFontFamily = (
  theme: Theme | undefined,
  component: keyof Theme["components"],
  group: FontFamilyGroup,
  fallbackFontFamily?: string
) => {
  return (
    theme?.components?.[component]?.fontFamily?.[group]?.join(",") ||
    getFontFamily(theme, group, fallbackFontFamily)
  );
};

export const getComponentThemeFontWeight = (
  theme: Theme | undefined,
  component: keyof Theme["components"],
  weight: FontWeight,
  fallbackFontWeight?: number
) => {
  return (
    theme?.components?.[component]?.fontWeight?.[weight] ||
    getFontWeight(theme, weight, fallbackFontWeight)
  );
};
