import React from "react";
import { mount } from "@cypress/react";
import App from "../../src/App";

describe("render main component", () => {
  it("initial render of coffee shops", () => {
    mount(<App />);
    cy.get("[data-testid='coordinatevalues']").should("have.text", "0 0");
  });
});
