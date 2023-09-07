import { IDBPDatabase, openDB } from "idb";
import { I18nStore } from ".";

const DB_NAMESPACE = "ssk-i18n";
const DB_VERSION = 1;

type I18nStoreData = {
  key: string;
  lang: string;
  value: string;
};

export class IdbI18nStore implements I18nStore {
  constructor(namespace?: string) {
    this.namespace = namespace || DB_NAMESPACE;

    this.db = openDB<I18nStoreData>(this.namespace, DB_VERSION, {
      upgrade: (db) => {
        db.createObjectStore(this.namespace);
      },
    });
  }

  private db: Promise<IDBPDatabase<I18nStoreData>>;

  private namespace: string = DB_NAMESPACE;

  public dataVersion: string = "";

  public async set(key: string, lang: string, value: string): Promise<void> {
    const db = await this.db;
    await db.put(this.namespace, { key, lang, value }, `${key}-${lang}`);
  }

  public async sets(
    key: string,
    values: { [lang: string]: string }
  ): Promise<void> {
    const db = await this.db;
    const keys = Object.keys(values);
    await Promise.all(
      keys.map((lang) => {
        return db.put(
          this.namespace,
          { key, lang, value: values[lang] },
          `${key}-${lang}`
        );
      })
    );
  }

  public async get(key: string, lang: string): Promise<string> {
    const db = await this.db;
    return (await db.get(this.namespace, `${key}-${lang}`))?.value;
  }

  public async render(
    key: string,
    lang: string,
    metadata: any
  ): Promise<string> {
    const db = await this.db;
    const value = (await db.get(this.namespace, `${key}-${lang}`))?.value;
    return value ? value : metadata?.default;
  }

  public async clear(): Promise<void> {
    const db = await this.db;
    await db.clear(this.namespace);
  }
}
