describe("Adding new items to cart", () => {
  it.skip("new item should be added", () => {
    let item = new Date().valueOf();
    cy.visit("http://localhost:3000");

    cy.contains('Add New Item').click();
    cy.get('input[placeholder="Item name"]').type(item);
    cy.get('input[placeholder="buy from"]').type("rewe");

    cy.contains("Add to List").click();

    cy.contains(`successfully saved ${item}`);
  });

  it("does not allow same item to be added again", () => {
    let item = new Date().valueOf();
    cy.visit("http://localhost:3000");

    cy.contains('Add New Item').click();
    cy.get('input[placeholder="Item name"]').type(item);
    cy.get('input[placeholder="buy from"]').type("rewe");

    cy.contains("Add to List").click();

    cy.contains("Active").click();
    cy.contains(item);

    cy.contains("Add New Item").click();
    cy.get('input[placeholder="Item name"]').type(item);
    cy.get('input[placeholder="buy from"]').type("rewe");
    cy.contains("Add to List").click();
    cy.contains(`${item} is already present in the shopping list`)
  });
});
