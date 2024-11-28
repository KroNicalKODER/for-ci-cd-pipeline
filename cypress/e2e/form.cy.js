describe("Form Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    it("submits the form successfully with valid data", () => {
      cy.get('input[name="name"]').type("John Doe");
      cy.get('input[name="email"]').type("john.doe@example.com");
      cy.get('input[name="phone"]').type("1234567890");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="confirmPassword"]').type("password123");
      cy.get('button[type="submit"]').click();
      cy.contains("Form submitted successfully!").should("be.visible");
    });
  });
  