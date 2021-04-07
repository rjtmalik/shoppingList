import React, { useEffect, useReducer } from "react";
import { Alert } from "react-bootstrap";
import DbConnection from "../database/DbConnection";
import utils from "./utils";

export default function SavedForLater() {

  function performAction(actionableItem) {
    const callBack = () => dispatch(actionableItem);
    switch (actionableItem.type) {
      case "delete":
        DbConnection().deleteItem(actionableItem, callBack);
        break;
      case "moveToActive":
        DbConnection().moveToActiveList(actionableItem, callBack);
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
      case "moveToActive":
        return currentState.filter(
          (x) => x.itemName !== actionableItem.item.itemName
        );
      default:
        return actionableItem.items;
    }
  }

  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    DbConnection().getAllSavedItems(dispatch);
  }, []);

  return (
    <React.Fragment>
      {items.length === 0 && (
        <Alert variant="light">Nothing here.</Alert>
      )}

      {items.length > 0 && utils().groupByShopName(items, performAction)}
    </React.Fragment>
  );
}
