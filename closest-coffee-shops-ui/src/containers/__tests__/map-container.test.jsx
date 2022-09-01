import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { MOCKED_SHOPS_DATA } from "../../mocks/mockedData";
import { createShopsStore } from "../../testUtils/testStores";
import { MapContainer } from "../map-container";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("number of drawn shops", async () => {
  const store = createShopsStore(MOCKED_SHOPS_DATA);
  render(
    <Provider store={store}>
      <MapContainer />
    </Provider>,
    container
  );

  const shops = screen.getAllByAltText("Coffee shop");
  expect(shops.length).toBe(MOCKED_SHOPS_DATA.length);
});
