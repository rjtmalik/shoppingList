import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import SaveNewItemButton from "./SaveNewItemButton";

export default function NewItemForm() {
  function handleTextFilled(event) {
    let userInput = event.target.value.trim();
    if(event.target.id === 'txtItemName'){
      setItemToInsert({ itemName: userInput, shopName: itemToInsert.shopName });
    }
    else{
      setItemToInsert({ itemName: itemToInsert.itemName, shopName: userInput });
    }
  }

  const [itemToInsert, setItemToInsert] = useState({});

  return (
    <React.Fragment>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="lblItemName">Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Item name"
          aria-label="itemName"
          aria-describedby="lblItemName"
          onInput={handleTextFilled}
          id="txtItemName"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="lblShopName">Shop</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="buy from"
          aria-label="buyFrom"
          aria-describedby="lblShopName"
          id="txtShopName"
          onInput={handleTextFilled}
        />
      </InputGroup>
      <SaveNewItemButton itemToInsert={itemToInsert} />
    </React.Fragment>
  );
}
