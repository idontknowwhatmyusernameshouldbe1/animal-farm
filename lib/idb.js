const DB_NAME = "animal-farm";
const DB_VERSION = 1;
const STORE = "pets";

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("IndexedDB open failed"));
  });
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, fn) {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const store = tx.objectStore(STORE);
    let settled = false;
    let result;

    const finish = (error) => {
      if (settled) return;
      settled = true;
      db.close();
      if (error) reject(error);
      else resolve(result);
    };

    tx.oncomplete = () => finish();
    tx.onerror = () => finish(tx.error ?? new Error("IndexedDB tx failed"));
    tx.onabort = () => finish(tx.error ?? new Error("IndexedDB tx aborted"));

    Promise.resolve()
      .then(() => fn(store))
      .then((value) => {
        result = value;
      })
      .catch((error) => {
        try {
          tx.abort();
        } catch {
          // ignore
        }
        finish(error);
      });
  });
}

export async function idbGetAllPets() {
  const pets = (await withStore("readonly", (store) =>
    requestToPromise(store.getAll())
  )) ?? [];
  pets.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return pets;
}

export async function idbGetPet(id) {
  const pet = await withStore("readonly", (store) =>
    requestToPromise(store.get(id))
  );
  return pet ?? null;
}

export async function idbPutPet(pet) {
  await withStore("readwrite", (store) => {
    store.put(pet);
  });
  return pet;
}

export async function idbDeletePet(id) {
  await withStore("readwrite", (store) => {
    store.delete(id);
  });
  return true;
}
