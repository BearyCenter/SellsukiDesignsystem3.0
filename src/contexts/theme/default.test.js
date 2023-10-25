import { describe, expect, it } from "vitest";
import { applyTheme, defaultTheme } from "./default";

const deepFreeze = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  for (const key of Object.keys(obj)) {
    deepFreeze(obj[key]);
  }

  return Object.freeze(obj);
};

const freezeDefaultTheme = deepFreeze(defaultTheme);

describe("context-theme/applyTheme", () => {
  it("should apply empty", () => {
    expect(applyTheme({})).toEqual(freezeDefaultTheme);
  });

  it("should apply partial", () => {
    expect(
      applyTheme({
        colors: {
          primary: {
            500: "#ff0000",
          },
        },
      })
    ).toEqual({
      ...freezeDefaultTheme,
      colors: {
        ...freezeDefaultTheme.colors,
        primary: {
          ...freezeDefaultTheme.colors.primary,
          500: "#ff0000",
        },
      },
    });
  });

  it("should apply new field", () => {
    expect(
      applyTheme({
        animation: {
          jump: "jump 1s linear infinite",
        },
      })
    ).toEqual({
      ...freezeDefaultTheme,
      animation: {
        ...freezeDefaultTheme.animation,
        jump: "jump 1s linear infinite",
      },
    });
  });

  it("should clear field by undefeined", () => {
    expect(
      applyTheme({
        colors: undefined,
      })
    ).toEqual({
      ...freezeDefaultTheme,
      colors: undefined,
    });
  });

  it("should prepend to array", () => {
    expect(
      applyTheme({
        fontFamily: {
          sans: ["Inter"],
        },
      })
    ).toEqual({
      ...freezeDefaultTheme,
      fontFamily: {
        ...freezeDefaultTheme.fontFamily,
        sans: ["Inter", ...freezeDefaultTheme.fontFamily.sans],
      },
    });
  });
});
