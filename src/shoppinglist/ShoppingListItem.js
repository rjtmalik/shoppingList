import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import ActionsPanelFactory from "../ActionsOnItem/ActionsPanelFactory";
import Modal from "react-bootstrap/Modal";

export default function ShoppingListItem({ isActive, item, updateOnAction }) {
  const [showActions, setShowActions] = useState(false);

  function showPossibleActions() {
    setShowActions(true);
  }

  function handleClose() {
    setShowActions(false);
  }

  return (
    <React.Fragment>
      <Modal show={showActions} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.itemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActionsPanelFactory item={item} updateOnAction={updateOnAction} />
        </Modal.Body>
      </Modal>

      <ListGroup.Item variant="light" action onClick={showPossibleActions}>
        {item.itemName}
      </ListGroup.Item>
    </React.Fragment>
  );
}
