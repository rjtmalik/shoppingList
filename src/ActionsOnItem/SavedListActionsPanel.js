import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function SavedListActionsPanel({item, updateOnAction}) {
  
  function moveToActiveList(event) {
    updateOnAction({ item, type: "moveToActive" });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={moveToActiveList} block variant="success">Move Back To Shopping List</Button>
        </Col>
      </Row>
    </Container>
  );
}
