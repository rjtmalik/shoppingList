import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function PurchasedHistoryListActionsPanel({item, updateOnAction}) {
  
  function addItem(event) {
    updateOnAction({ item, type: "addItem" });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={addItem} block variant="success">Add To Shopping List</Button>
        </Col>
      </Row>
    </Container>
  );
}
