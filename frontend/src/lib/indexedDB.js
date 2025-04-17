import { openDB } from 'idb';

const DB_NAME = 'DSOImageDB';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('images')) {
        const store = db.createObjectStore('images', { keyPath: 'mode' });
        store.createIndex('mode', 'mode');
      }
    },
  });
}

export async function saveImageData(mode, imageData, predictions) {
  const db = await initDB();
  await db.put('images', {
    mode,
    image: imageData,
    predictions,
  });
}

export async function getImageData(mode) {
  const db = await initDB();
  return db.get('images', mode);
}

export async function removeImageData(mode) {
  const db = await initDB();
  return db.delete('images', mode);
}

export async function clearAllImageData() {
  const db = await initDB();
  return db.clear('images');
}
