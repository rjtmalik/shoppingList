import { unstable_renderSubtreeIntoContainer } from "react-dom";

export default function DbConnection() {
  function openConn(executeOnOpeningConnection) {
    let openRequest = window.indexedDB.open("shoppingListDb", 1);
    openRequest.onsuccess = function (event) {
      let db = event.target.result;
      executeOnOpeningConnection(db);
    };
  }

  function addItem(item, callbackObj) {
    function addEntryInDb(db) {
      let addReqeust = db
        .transaction("shoppingListItems", "readwrite")
        .objectStore("shoppingListItems")
        .add({ itemName: item.itemName, shopName: item.shopName });
      addReqeust.onsuccess = function (event) {
        callbackObj.handleSuccess();
      };
      addReqeust.onerror = function (event) {
        if (event.target.error.name === "ConstraintError") {
          callbackObj.handleError(`${item.itemName} is already present in the shopping list`);
        } else {
          callbackObj.handleError(event.target.error.message);
        }
      };
    }
    openConn(addEntryInDb);
  }

  function getAllItems(callbackFn) {
    function getAllFrom(db) {
      let getAllRequest = db
        .transaction("shoppingListItems", "readwrite")
        .objectStore("shoppingListItems")
        .getAll();
      getAllRequest.onsuccess = function (event) {
        callbackFn({ items: event.target.result });
      };
    }
    openConn(getAllFrom);
  }

  function deleteItem(actionableItem, callbackFn) {
    function dbUpdate(db) {
      let getAllRequest = db
        .transaction("shoppingListItems", "readwrite")
        .objectStore("shoppingListItems")
        .delete(actionableItem.item.itemName);
      getAllRequest.onsuccess = function (event) {
        callbackFn(actionableItem);
      };
    }
    openConn(dbUpdate);
  }

  function markPurchased(actionableItem, callbackFn) {
    function dbUpdate(db) {
      let deleteRequest = db
        .transaction("shoppingListItems", "readwrite")
        .objectStore("shoppingListItems")
        .delete(actionableItem.item.itemName);

      let addToPurcahsedListRequest = db
        .transaction("purchasedItems", "readwrite")
        .objectStore("purchasedItems")
        .put({ ...actionableItem.item, createdOn: new Date() });

      deleteRequest.onsuccess = function (event) {
        console.log("deleted from active list");
      };

      addToPurcahsedListRequest.onsuccess = function (event) {
        console.log("added to purchased list");
      };

      Promise.all([deleteRequest, addToPurcahsedListRequest]).then((values) => {
        callbackFn(actionableItem);
      });
    }
    openConn(dbUpdate);
  }

  function getPurchasedItems(callbackFn) {
    function dbGet(db) {
      let getAllRequest = db
        .transaction("purchasedItems", "readwrite")
        .objectStore("purchasedItems")
        .getAll();
      getAllRequest.onsuccess = function (event) {
        callbackFn({
          items: event.target.result === undefined ? [] : event.target.result,
        });
      };
    }
    openConn(dbGet);
  }

  function saveForLater(actionableItem, callbackFn) {
    function dbUpdate(db) {
      let addReqeust = db
        .transaction("archivedShoppingItems", "readwrite")
        .objectStore("archivedShoppingItems")
        .add(actionableItem.item);
      addReqeust.onsuccess = function (event) {};

      let deleteItemRequest = db
        .transaction("shoppingListItems", "readwrite")
        .objectStore("shoppingListItems")
        .delete(actionableItem.item.itemName);
      deleteItemRequest.onsuccess = function (event) {};

      Promise.all([deleteItemRequest.onsuccess, addReqeust.onsuccess]).then(
        (values) => {
          callbackFn(actionableItem);
        }
      );
    }
    openConn(dbUpdate);
  }

  function getAllSavedItems(callbackFn) {
    function getAllFrom(db) {
      let getAllRequest = db
        .transaction("archivedShoppingItems", "readwrite")
        .objectStore("archivedShoppingItems")
        .getAll();
      getAllRequest.onsuccess = function (event) {
        callbackFn({ items: event.target.result });
      };
    }
    openConn(getAllFrom);
  }

  function moveToActiveList(actionableItem, callbackFn) {
    function dbUpdate(db) {
      let addReqeust = db
        .transaction("shoppingListItems", "readwrite")
        .objectStore("shoppingListItems")
        .add(actionableItem.item);
      addReqeust.onsuccess = function (event) {};

      let deleteItemRequest = db
        .transaction("archivedShoppingItems", "readwrite")
        .objectStore("archivedShoppingItems")
        .delete(actionableItem.item.itemName);
      deleteItemRequest.onsuccess = function (event) {};

      Promise.all([deleteItemRequest.onsuccess, addReqeust.onsuccess]).then(
        (values) => {
          callbackFn(actionableItem);
        }
      );
    }
    openConn(dbUpdate);
  }

  return {
    moveToActiveList,
    getAllSavedItems,
    saveForLater,
    getPurchasedItems,
    markPurchased,
    deleteItem,
    getAllItems,
    addItem,
  };
}
