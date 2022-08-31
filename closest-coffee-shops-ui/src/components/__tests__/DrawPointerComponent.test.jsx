import { render, screen, cleanup } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Pointer } from "../DrawPointerComponent";
import { translateMapCoordinates } from "../../utils/coordinates";
import { pointsContainer } from "../../utils/pointsContainer";

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

test("component renders successfully", () => {
  render(<Pointer x={0} y={0} />, container);
});

test("pointer is drawn at the expected coordinates", () => {
  const pts = pointsContainer();

  pts.addPoints(0, 0)(50, 50)(-50, 50)(-50, -50)(50, -50)(180, 180)(-180, 180)(
    -180,
    180
  )(180, -180)(90, 90);

  pts.getPoints().map((pt) => {
    render(<Pointer x={pt.x} y={pt.y} />, container);

    const [expectedCoordsX, expectedCoordsY] = translateMapCoordinates(
      pt.x,
      pt.y
    );

    const pointer = screen.getByAltText("Pointer");
    expect(pointer).toHaveStyle(`left: ${expectedCoordsX}px`);
    expect(pointer).toHaveStyle(`top: ${expectedCoordsY}px`);

    cleanup();
  });
});
