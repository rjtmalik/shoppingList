import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import DbConnection from "../database/DbConnection";
import { NotificationContext } from "../notifications/notification-context";

export default function SaveNewItemButton({ itemToInsert }) {
  const notificationCtx = useContext(NotificationContext);

  function addNewItem() {
    function callbackOnCompletion() {
      function handleSuccess() {
        notificationCtx({
          type: "success",
          text: `successfully saved ${itemToInsert.itemName}`,
        });
      }

      function handleError(errorDescription) {
        notificationCtx({ type: "error", text: errorDescription });
      }

      return {
        handleError,
        handleSuccess,
      };
    }

    DbConnection().addItem(itemToInsert, callbackOnCompletion());
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
