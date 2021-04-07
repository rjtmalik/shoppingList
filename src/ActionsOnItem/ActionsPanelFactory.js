import React from "react";
import { useLocation } from "react-router-dom";
import ActiveListActionsPanel from "./ActiveListActionsPanel";
import SavedListActionsPanel from "./SavedListActionsPanel";
import PurchasedHistoryListActionsPanel from './PurchasedHistoryListActionsPanel';

export default function ActionsPanelFactory({ item, updateOnAction }) {
  const location = useLocation();

  function getApplicableActions() {
    switch (location.pathname) {
      case "/items/saved":
        return (
          <SavedListActionsPanel item={item} updateOnAction={updateOnAction} />
        );
      case "/items/purchased":
        return (
          <PurchasedHistoryListActionsPanel item={item} updateOnAction={updateOnAction} />
        );
      default:
        return (
          <ActiveListActionsPanel item={item} updateOnAction={updateOnAction} />
        );
    }
  }

  return <React.Fragment>{getApplicableActions()}</React.Fragment>;
}
