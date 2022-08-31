import { translateMapCoordinates } from "./coordinates";

describe("CoordinateConverter", () => {
  it("should never return negative coordinates", async () => {
    for (let x = -180; x <= 180; x++) {
      for (let y = -180; y <= 180; y++) {
        const [translatedX, translatedY] = translateMapCoordinates(x, y);
        expect(translatedX >= 0).toBe(true);
        expect(translatedY >= 0).toBe(true);
      }
    }
  });
});
