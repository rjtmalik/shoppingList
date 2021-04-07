import React from 'react';
import { ListGroup } from "react-bootstrap";
import ShoppingListItem from "./ShoppingListItem";

export default function utils(){

    function groupByShopName(items, performAction) {
        let result = {};
        items.forEach((item) => {
          if (!result[item.shopName.toUpperCase()]) {
            result[item.shopName.toUpperCase()] = [item];
          } else {
            result[item.shopName.toUpperCase()].push(item);
          }
        });
    
        let uiResult = [];
        for (var key in result) {
          uiResult.push(
            <React.Fragment>
              <h6>{key}</h6>
              <ListGroup>
                {result[key].map((item) => (
                  <ShoppingListItem
                    isActive={true}
                    key={item.itemName}
                    item={item}
                    updateOnAction={performAction}
                  />
                ))}
              </ListGroup>
              <br />
            </React.Fragment>
          );
        }
        return uiResult;
      }

    return {
        groupByShopName
    }
}