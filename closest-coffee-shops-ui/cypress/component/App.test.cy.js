import { mount } from "@cypress/react";
import React from "react";
import App from "../../src/App";
import { MOCKED_SHOPS_DATA } from "../../src/mocks/mockedData";

describe("render main component", () => {
  it("initial coords position", () => {
    mount(<App />);
    cy.get("[data-testid='coordinatevalues']").should("have.text", "0 0");
  });

  it("initial render of coffeeshops", () => {
    mount(<App />);
    cy.get("[data-testid='coffeeshopimg']").should("have.length", "6");
  });

  it("displayed coords are updated after clicks", () => {
    const clickAndCheckChanges = (clickCoords, expectedCoords) => {
      cy.get("[data-testid='mapimg']").click(
        Number(clickCoords.x),
        Number(clickCoords.y),
        {
          force: true,
        }
      );

      // Clicked coordinates seem to have a precision of ~2. Thus, we will aproximate the resulted coord
      cy.get("[data-testid='coordinatevalues']").should(($div) => {
        const text = $div.text();
        const [, x, y] = text.match(/^(-?\d+\.?\d+) (-?\d+\.?\d+)$/);

        const areCloseNumbers = (nb1, nb2) => {
          const treshold = 2;
          nb1 = Number(nb1);
          nb2 = Number(nb2);

          return Math.abs(nb1 - nb2) < treshold;
        };

        expect(areCloseNumbers(x, expectedCoords.x)).to.be.true;
        expect(areCloseNumbers(y, expectedCoords.y)).to.be.true;
      });

      cy.get("[data-testid='pointerimg']").should("have.length", "1");
      cy.get("[data-testid='coffeeshopimg']")
        .should("have.length", "6")
        .filter(".-highlighted")
        .should("have.length", "3");
    };

    cy.intercept(
      {
        method: "GET",
        url: "*/coffee_shops*",
      },
      [...MOCKED_SHOPS_DATA]
    );

    mount(<App />);
    cy.get("[data-testid='pointerimg']").should("have.length", "0");

    clickAndCheckChanges({ x: "50", y: "50" }, { x: "-126.00", y: "-97.94" });
    clickAndCheckChanges({ x: "100", y: "100" }, { x: "-66.00", y: "-17.50" });
    clickAndCheckChanges({ x: "200", y: "200" }, { x: "54.00", y: "143.40" });
    clickAndCheckChanges({ x: "11", y: "47" }, { x: "-172.80", y: "-102.77" });
    clickAndCheckChanges({ x: "279", y: "22" }, { x: "148.80", y: "-142.99" });
  });
});
