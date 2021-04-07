import React, { useEffect, useReducer } from "react";
import { Alert } from "react-bootstrap";
import DbConnection from "../database/DbConnection";
import utils from "./utils";

export default function PurchaseHistory() {
  function performAction(actionableItem) {
    const callBack = () => dispatch(actionableItem);
    switch (actionableItem.type) {
      case "addItem":
        DbConnection().addItem(actionableItem.item, callBack);
        break;
      default:
        throw new Error(`Uncaught action ${actionableItem}`);
    }
  }

  function reducer(currentState, actionableItem) {
    return currentState.length > 0 ? currentState : actionableItem.items;
  }

  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    DbConnection().getPurchasedItems(dispatch);
  }, []);

  return (
    <React.Fragment>
      {items.length === 0 && (
        <Alert variant="light">You haven't bought anything.</Alert>
      )}

      {items.length > 0 && utils().groupByShopName(items, performAction)}
    </React.Fragment>
  );
}
