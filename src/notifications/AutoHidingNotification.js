import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AutoHidingNotification({ notification }) {
  function getVariantFrom() {
    switch (notification.type) {
      case "success":
        return "success";
      case "error":
        return "warning";
      case undefined:
        return "";
      default:
        throw new Error(`Could not display notification for ${notification}`);
    }
  }

  const startTime = new Date().getTime();

  function hideElement() {
    const currentTime = new Date().getTime();
    if (currentTime - startTime > 800) {
      document.querySelector("#lblnotification").classList.remove('show');
    } else {
      requestAnimationFrame(hideElement);
    }
  }

  if (notification.text) {
    requestAnimationFrame(hideElement);
  }

  return (
    <React.Fragment>
      {notification.text && (
        <Alert id="lblnotification" className="show" variant={getVariantFrom(notification)}>
          {notification.text}
        </Alert>
      )}
    </React.Fragment>
  );
}
