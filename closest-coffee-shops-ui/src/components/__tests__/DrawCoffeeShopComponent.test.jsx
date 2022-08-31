import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { MOCKED_SHOPS_DATA } from "../../mocks/mockedData";
import { shopsFetcherMock } from "../../mocks/shopsFetcherMock";
import { translateMapCoordinates } from "../../utils/coordinates";
import { CoffeeShop } from "../DrawCoffeeShopComponent";

let container = null;
const shopsFetcher = shopsFetcherMock();
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  shopsFetcher.startMock();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  shopsFetcher.stopMock();
});

test("component renders successfully", () => {
  render(<CoffeeShop shop={MOCKED_SHOPS_DATA[0]} />, container);
});

test("component uses the expected image", () => {
  render(
    <CoffeeShop data-testid="coffeeShop" shop={MOCKED_SHOPS_DATA[0]} />,
    container
  );

  const shopImage = screen.getByAltText("Coffee shop");
  expect(shopImage).toHaveAttribute("src", "cshop.png");
});

test("shop image is drawn at the expected coordinates", () => {
  const shop = MOCKED_SHOPS_DATA[0];
  render(<CoffeeShop data-testid="coffeeShop" shop={shop} />, container);

  const [expectedCoordsX, expectedCoordsY] = translateMapCoordinates(
    shop.x,
    shop.y
  );

  const shopImage = screen.getByAltText("Coffee shop");
  expect(shopImage).toHaveStyle(`left: ${expectedCoordsX}px`);
  expect(shopImage).toHaveStyle(`top: ${expectedCoordsY}px`);
});

test("shop image has the expected size", () => {
  render(
    <CoffeeShop data-testid="coffeeShop" shop={MOCKED_SHOPS_DATA[0]} />,
    container
  );

  const shopImage = screen.getByAltText("Coffee shop");
  expect(shopImage).toHaveStyle("height: 50px");
  expect(shopImage).toHaveStyle("width: 50px");
});

test("component reacts to the highlighted prop", () => {
  render(
    <CoffeeShop
      data-testid="coffeeShop"
      shop={{ ...MOCKED_SHOPS_DATA[0], highlighted: true }}
    />,
    container
  );

  const shopImage = screen.getByAltText("Coffee shop");
  expect(shopImage).toHaveClass("-highlighted");
});
