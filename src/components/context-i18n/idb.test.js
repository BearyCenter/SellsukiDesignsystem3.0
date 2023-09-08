import { describe, expect, test } from "vitest";
import { IdbI18nStore } from "./idb";

import "fake-indexeddb/auto";

const data = {
  hello: {
    th: "สวัสดี",
    en: "Hello",
  },
  hello_template: {
    th: "สวัสดี {{name}}",
    en: "Hello {{name}}",
  },
};

describe("context-i18n/idb", () => {
  test("set value", async () => {
    const store = new IdbI18nStore();
    await store.set("hello", "th", data["hello"]["th"]);

    expect(await store.get("hello", "th")).toEqual(data["hello"]["th"]);
  });

  test("get not exist value", async () => {
    const store = new IdbI18nStore();
    expect(await store.get("hello_xxx", "th")).toEqual("");
  });

  test("get not exist language", async () => {
    const store = new IdbI18nStore();
    expect(await store.get("hello", "xxx")).toEqual("");
  });

  test("get not exist value and language", async () => {
    const store = new IdbI18nStore();
    expect(await store.get("hello_xxx", "xxx")).toEqual("");
  });

  test("get not exist language with fallback", async () => {
    const store = new IdbI18nStore();
    expect(await store.get("hello", "xx", "th")).toEqual("สวัสดี");
  });

  test("render template", async () => {
    const store = new IdbI18nStore();
    await store.set("hello_template", "th", data["hello_template"]["th"]);

    expect(
      await store.render("hello_template", "th", { name: "John" })
    ).toEqual("สวัสดี John");
  });

  test("clear", async () => {
    const store = new IdbI18nStore();
    await store.set("hello", "th", data["hello"]["th"]);
    await store.clear();

    expect(await store.get("hello", "th")).toEqual("");
  });
});
