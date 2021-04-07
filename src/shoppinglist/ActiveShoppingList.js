import React, { useEffect, useReducer } from "react";
import { Alert } from "react-bootstrap";
import DbConnection from "../database/DbConnection";
import utils from "./utils";

export default function ActiveShoppingList() {
  
  function performAction(actionableItem) {
    const callBack = () => dispatch(actionableItem);
    switch (actionableItem.type) {
      case "delete":
        DbConnection().deleteItem(actionableItem, callBack);
        break;
      case "markPurchased":
        DbConnection().markPurchased(actionableItem, callBack);
        break;
      case "saveForLater":
        DbConnection().saveForLater(actionableItem, callBack);
        break;
      default:
        throw new Error(`Uncaught action ${actionableItem}`);
    }
  }

  function reducer(currentState, actionableItem) {
    switch (actionableItem.type) {
      case "delete":
        return currentState.filter(
          (x) => x.itemName !== actionableItem.item.itemName
        );
      case "markPurchased":
        return currentState.filter(
          (x) => x.itemName !== actionableItem.item.itemName
        );
      case "saveForLater":
        return currentState.filter(
          (x) => x.itemName !== actionableItem.item.itemName
        );
      default:
        return actionableItem.items;
    }
  }

  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    DbConnection().getAllItems(dispatch);
  }, []);

  return (
    <React.Fragment>
      {items.length === 0 && (
        <Alert variant="light">No pending items to buy.</Alert>
      )}

      {items.length > 0 && utils().groupByShopName(items, performAction)}
    </React.Fragment>
  );
}
