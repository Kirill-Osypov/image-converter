import { openDB, type IDBPDatabase } from 'idb';
import type { ConvertedImageRecord } from '@/types/history';

const DB_NAME = 'image-converter-db';
const DB_VERSION = 1;
const STORE_NAME = 'history';

type HistoryDB = IDBPDatabase<{ history: ConvertedImageRecord }>;

let dbPromise: Promise<HistoryDB> | null = null;

export function initDB(): Promise<HistoryDB> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    }) as Promise<HistoryDB>;
  }

  return dbPromise;
}

export async function getAllHistory(): Promise<ConvertedImageRecord[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function saveHistoryItem(item: ConvertedImageRecord): Promise<void> {
  const db = await initDB();
  await db.put(STORE_NAME, item);
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

export async function clearHistory(): Promise<void> {
  const db = await initDB();
  await db.clear(STORE_NAME);
}

export async function deleteExpiredHistory(nowIso: string): Promise<void> {
  const db = await initDB();
  const all = await db.getAll(STORE_NAME);
  const now = new Date(nowIso).getTime();

  const tx = db.transaction(STORE_NAME, 'readwrite');
  for (const item of all) {
    const expiresAt = new Date(item.expiresAt).getTime();
    if (expiresAt <= now) {
      await tx.store.delete(item.id);
    }
  }
  await tx.done;
}

export async function getTotalStorageUsage(): Promise<number> {
  const db = await initDB();
  const all = await db.getAll(STORE_NAME);
  return all.reduce((acc, item) => acc + item.sizeBytes, 0);
}
