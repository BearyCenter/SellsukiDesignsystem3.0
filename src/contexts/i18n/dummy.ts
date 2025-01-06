import { I18nData, I18nStore } from ".";

export class DummyI18nStore implements I18nStore {
  currentLang: string = "";

  async getVersion(): Promise<number> {
    return 0;
  }

  async setVersion(version: number): Promise<void> {
    // Empty implementation
  }

  async bulkSet(data: I18nData): Promise<void> {
    // Empty implementation
  }

  async set(key: string, lang: string, value: string): Promise<void> {
    // Empty implementation
  }

  async sets(key: string, values: { [lang: string]: string }): Promise<void> {
    // Empty implementation
  }

  async get(key: string, lang: string, fallbackLang?: string): Promise<string> {
    return "";
  }

  async getAll(): Promise<I18nData> {
    return {};
  }

  async render(
    key: string,
    lang: string,
    metadata: any,
    fallbackLang?: string
  ): Promise<string> {
    return "";
  }

  async clear(): Promise<void> {
    // Empty implementation
  }
}
