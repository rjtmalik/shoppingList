import React from "react";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";

export default function Navigation() {
  const history = useHistory();

  function redirectToTab(key) {
    history.push(`${key}`);
  }

  return (
    <Nav
      justify
      className="justify-content-end"
      variant="tabs"
      defaultActiveKey="/"
      onSelect={redirectToTab}
    >
      <Nav.Item>
        <Nav.Link eventKey="/">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/items/add">Add New Item</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/items/saved">Saved For Later</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/items/purchased">Purchase History</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
