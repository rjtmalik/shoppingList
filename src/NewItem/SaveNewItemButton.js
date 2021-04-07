import React, {useContext} from "react";
import Button from "react-bootstrap/Button";
import DbConnection from "../database/DbConnection";
import { useHistory } from "react-router-dom";
import {NotificationContext} from '../notifications/notification-context';

export default function SaveNewItemButton({ itemToInsert }) {
  const notificationCtx = useContext(NotificationContext)

  function addNewItem() {
    function showShoppingList() {
      notificationCtx({type:'success', text:`successfully saved ${itemToInsert.itemName}`})
    }

    DbConnection().addItem(itemToInsert, showShoppingList);
  }

  return (
    <React.Fragment>
      {!itemToInsert.itemName && (
        <Button disabled variant="secondary" size="lg" block>
          Add to List
        </Button>
      )}
      {itemToInsert.itemName && (
        <Button variant="primary" size="lg" block onClick={addNewItem}>
          Add to List
        </Button>
      )}
    </React.Fragment>
  );
}
