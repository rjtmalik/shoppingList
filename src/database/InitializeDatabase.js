export default function InitializeDatabase() {
  return {
    init: init,
  };

  function init(setIsReady) {
    var dbOpenConnectionRequest = window.indexedDB.open("shoppingListDb", 1);

    dbOpenConnectionRequest.onupgradeneeded = function (event) {
      let db = event.target.result;
      var shoppingListItemsObjectStore = db.createObjectStore(
        "shoppingListItems",
        { keyPath: "itemName" }
      );

      db.createObjectStore("archivedShoppingItems", { keyPath: "itemName" });

      db.createObjectStore("purchasedItems", { keyPath: "itemName" });
    };

    dbOpenConnectionRequest.onsuccess = function (event) {
      setIsReady(true);
    };

    dbOpenConnectionRequest.onerror = function (event) {
      console.log(dbOpenConnectionRequest);
    };
  }
}
