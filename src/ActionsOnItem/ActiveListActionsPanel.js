import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function ActiveListActionsPanel({item, updateOnAction}) {
  
  function deleteMe(event) {
    updateOnAction({ item, type: "delete" });
  }

  function confirmPurchased(event) {
    updateOnAction({ item, type: "markPurchased" });
  }

  function saveForLater(event) {
    updateOnAction({ item, type: "saveForLater" });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={deleteMe} block variant="danger">Delete</Button>
        </Col>
        <Col>
          <Button block onClick={saveForLater} variant="dark">Save For Later</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={confirmPurchased} block variant="success">Mark Purchased</Button>
        </Col>
      </Row>
    </Container>
  );
}
