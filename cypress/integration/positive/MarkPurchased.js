describe("mark an active item as purchased", () => {
  it("should remove the purchased item from the active list", () => {
      cy.visit('http://localhost:3000');
      let newItem = new Date().valueOf();

      cy.contains("Add New Item").click();
      cy.get('input[placeholder="Item name"]').type(newItem);
      cy.get('input[placeholder="buy from"]').type('rewe');
      cy.contains("Add to List").click();

      cy.contains("Active").click();
      cy.contains('REWE').parent().children().contains(newItem).click();
      cy.contains("Mark Purchased").click();
      cy.contains("REWE").parent().children().contains(newItem).should("not.exist");

      cy.contains("Purchase History").click();
      cy.contains("REWE").parent().children().contains(newItem);
  });
});
