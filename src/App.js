import { Container, Row, Col } from "react-bootstrap";
import ActiveShoppingList from "./shoppinglist/ActiveShoppingList";
import NewItemForm from "./NewItem/NewItemForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InitializeDatabase from "./database/InitializeDatabase";
import React, { useEffect, useState } from "react";
import Navigation from "./header/Navigation";
import ProductBanner from "./header/ProductBanner";
import SavedForLater from "./shoppinglist/SavedForLater";
import AutoHidingNotification from "./notifications/AutoHidingNotification";
import { NotificationContext } from "./notifications/notification-context";
import PurchaseHistory from './shoppinglist/PurchaseHistory';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    InitializeDatabase().init(setIsReady);
  }, []);

  return (
    <div>
      <NotificationContext.Provider value={setNotification}>
        {isReady && (
          <Router>
            <Container>
              <Row>
                <Col>
                  <ProductBanner />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Navigation />
                </Col>
              </Row>
              <Row>
                <Col>
                  <AutoHidingNotification notification={notification} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Switch>
                    <Route path="/items/saved">
                      <SavedForLater />
                    </Route>
                    <Route path="/items/add">
                      <NewItemForm />
                    </Route>
                    <Route path="/items/purchased">
                      <PurchaseHistory />
                    </Route>
                    <Route path="/">
                      <ActiveShoppingList />
                    </Route>
                  </Switch>
                </Col>
              </Row>
            </Container>
          </Router>
        )}
      </NotificationContext.Provider>
    </div>
  );
}

export default App;
