import { IDBPDatabase, openDB } from "idb";
import { I18nData, I18nStore } from ".";

// mustache
import mustache from "mustache";

const DB_NAMESPACE = "ssk-i18n";
const DB_VERSION = 1;
const DEFAULT_LANG = "en";

type I18nStoreData = {
  key: string;
  lang: string;
  value: string;
};

export class IdbI18nStore implements I18nStore {
  constructor(namespace: string = DB_NAMESPACE, version: number = DB_VERSION) {
    this.namespace = namespace;

    this.db = this.initDb(namespace, version);
  }

  private db: Promise<IDBPDatabase<I18nStoreData>>;

  private namespace: string = DB_NAMESPACE;

  private async initDb(
    namespace: string = DB_NAMESPACE,
    version: number = DB_VERSION,
  ) {
    return openDB<I18nStoreData>(namespace, version, {
      upgrade: (db) => {
        db.createObjectStore(namespace);
      },
    });
  }

  public currentLang: string = DEFAULT_LANG;

  public async getVersion(): Promise<number> {
    const db = await this.db;
    return db.version;
  }
  public async setVersion(version: number): Promise<void> {
    const db = await this.db;
    await db.close();
    this.db = this.initDb(this.namespace, version);
  }

  public async set(key: string, lang: string, value: string): Promise<void> {
    const db = await this.db;
    await db.put(this.namespace, { key, lang, value }, `${key}-${lang}`);
  }

  public async bulkSet(values: I18nData): Promise<void> {
    const db = await this.db;
    const keys = Object.keys(values);
    await Promise.all(
      keys.map((key) => {
        const langs = Object.keys(values[key]);
        return Promise.all(
          langs.map((lang) => {
            return db.put(
              this.namespace,
              { key, lang, value: values[key][lang] },
              `${key}-${lang}`,
            );
          }),
        );
      }),
    );
  }

  public async sets(
    key: string,
    values: { [lang: string]: string },
  ): Promise<void> {
    const db = await this.db;
    const keys = Object.keys(values);
    await Promise.all(
      keys.map((lang) => {
        return db.put(
          this.namespace,
          { key, lang, value: values[lang] },
          `${key}-${lang}`,
        );
      }),
    );
  }

  public async get(
    key: string,
    lang: string,
    fallbackLang?: string,
  ): Promise<string> {
    const db = await this.db;

    const v = await db.get(this.namespace, `${key}-${lang}`);
    if (!v && fallbackLang) {
      (await db.get(this.namespace, `${key}-${fallbackLang}`))?.value;
    }
    return v?.value ?? key;
  }

  public async getAll(): Promise<I18nData> {
    const db = await this.db;
    const keys = await db.getAllKeys(this.namespace);

    const data: I18nData = {};

    await Promise.all(
      keys.map(async (key) => {
        const v = await db.get(this.namespace, key);
        if (v) {
          if (!data[v.key]) {
            data[v.key] = {};
          }
          data[v.key][v.lang] = v.value;
        }
      }),
    );

    return data;
  }

  public async render(
    key: string,
    lang: string,
    metadata: any,
    fallbackLang?: string,
  ): Promise<string> {
    const value = await this.get(key, lang, fallbackLang);

    return mustache.render(value, metadata);
  }

  public async clear(): Promise<void> {
    const db = await this.db;
    await db.clear(this.namespace);
  }
}
