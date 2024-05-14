export function initializeIndexedDB(data) {
  const dbName = "clientsDB";
  const dbVersion = 1;
  const storeName = "clientsStore";

  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.error);
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (db.objectStoreNames.contains(storeName)) {
      // Delete the old object store
      db.deleteObjectStore(storeName);
    }
    // Create a new object store
    const store = db.createObjectStore(storeName, { keyPath: "_id" });
    // Optionally, define indexes for searching or sorting
    // store.createIndex("author", "blogPostAuthor");
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    // Clear existing data
    store.clear();

    data.forEach((post) => {
      const request = store.put(post);
      request.onerror = function (event) {
        console.error("Error storing data in IndexDB:", event.target.error);
      };
    });
  };
}
