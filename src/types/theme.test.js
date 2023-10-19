import { describe, expect, it } from "vitest";
import { parseThemeToCss } from "./theme-value";

describe("parseThemeToCss", () => {
  it("should return empty string if theme is empty", () => {
    const theme = {};
    const result = parseThemeToCss(theme);
    expect(result).toEqual(":host {}");
  });

  it("should return CSS string with valid theme", () => {
    const theme = {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
        light: "#f8f9fa",
        dark: "#343a40",
      },
      fonts: {
        body: "Arial, sans-serif",
        heading: "Helvetica, sans-serif",
      },
      fontSizes: {
        small: "12px",
        medium: "16px",
        large: "20px",
      },
    };
    const result = parseThemeToCss(theme);
    expect(result).toEqual(
      `:host {--colors-primary: #007bff; --colors-secondary: #6c757d; --colors-success: #28a745; --colors-danger: #dc3545; --colors-warning: #ffc107; --colors-info: #17a2b8; --colors-light: #f8f9fa; --colors-dark: #343a40; --fonts-body: Arial, sans-serif; --fonts-heading: Helvetica, sans-serif; --font-sizes-small: 12px; --font-sizes-medium: 16px; --font-sizes-large: 20px;}`
    );
  });
});
