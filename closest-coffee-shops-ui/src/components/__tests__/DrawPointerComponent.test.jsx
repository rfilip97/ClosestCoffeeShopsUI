import { render, screen, cleanup } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Pointer } from "../DrawPointerComponent";
import {
  pointPxToPercent,
  translateMapCoordinates,
} from "../../utils/coordinates";
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

jest.mock("../../utils/environment");

test("component renders successfully", () => {
  render(<Pointer x={0} y={0} />, container);
});

test("pointer is drawn at the expected coordinates using algorithm", () => {
  const pts = pointsContainer();

  pts.addPoints(50, 50)(50, 50)(-50, 50)(-50, -50)(50, -50)(180, 180)(
    -180,
    180
  )(-180, 180)(180, -180)(90, 90);

  pts.getPoints().map((pt) => {
    render(<Pointer x={pt.x} y={pt.y} />, container);

    const mapTranslationAlg = (pt) => {
      const [translatedX, translatedY] = translateMapCoordinates(pt.x, pt.y);

      const [percentX, percentY] = pointPxToPercent({
        x: translatedX,
        y: translatedY,
      });

      return [percentX, percentY];
    };

    const [expectedX, expectedY] = mapTranslationAlg(pt);

    const pointer = screen.getByTestId("pointerimg");
    expect(pointer).toHaveStyle(`left: ${expectedX}%`);
    expect(pointer).toHaveStyle(`top: ${expectedY}%`);

    cleanup();
  });
});

test("pointer is drawn at the expected coordinates using precalculated data", () => {
  const ptsContainer = pointsContainer();
  ptsContainer.addPoints(50, 50)(100, 100)(11, 11)(11, 47);
  const pts = ptsContainer.getPoints();

  const expectedTranslatedPointsContainer = pointsContainer();
  expectedTranslatedPointsContainer.addPoints(63.89, 63.89)(77.78, 77.78)(
    53.06,
    53.06
  )(53.06, 63.06);
  const expectedTranslatedPoints =
    expectedTranslatedPointsContainer.getPoints();

  console.log(JSON.stringify(pts));

  for (let i = 0; i < pts.length; i++) {
    const pt = pts[i];
    const expectedPt = expectedTranslatedPoints[i];

    render(<Pointer x={pt.x} y={pt.y} />, container);
    const pointer = screen.getByTestId("pointerimg");

    expect(pointer).toHaveStyle(`left: ${expectedPt.x}%`);
    expect(pointer).toHaveStyle(`top: ${expectedPt.y}%`);

    cleanup();
  }
});
