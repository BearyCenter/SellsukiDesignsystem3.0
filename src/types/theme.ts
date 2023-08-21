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

export type ColorRange =
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

export type Color = {
  [key: ColorRange | string]: string;
};

export type ColorPalette = {
  [key in ColorName | ColorRole]: Color;
};

export type Theme = {
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
  blur: {
    [key in Size]: string;
  };
  borderColor: ColorPalette;
  boxShadow: {
    [key in Size]: string;
  };
  dropShadow: {
    [key in Size]: string;
  };
  width: {
    [key in SizeSystem]: string;
  };
  height: {
    [key in SizeSystem]: string;
  };
  minWidth: {
    [key in SizeSystem]: string;
  };
  minHeight: {
    [key in SizeSystem]: string;
  };
  maxWidth: {
    [key in SizeSystem]: string;
  };
  maxHeight: {
    [key in SizeSystem]: string;
  };
  gap: {
    [key in Size]: string;
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
