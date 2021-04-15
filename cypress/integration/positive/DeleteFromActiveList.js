describe("Delete operations on Items in Active list", () => {
  it("should delete the item", () => {
    cy.visit("http://localhost:3000");

    let newItem = new Date().valueOf();
    cy.contains("Add New Item").click();
    cy.get('input[placeholder="Item name"]').type(newItem);
    cy.get('input[placeholder="buy from"]').type("rewe");
    cy.contains("Add to List").click();

    cy.contains("Active").click();
    cy.contains("REWE").parent().children().contains(newItem).click();
    cy.contains("Delete").click();
    cy.contains("REWE").parent().children().contains(newItem).should("not.exist");
  });
});
