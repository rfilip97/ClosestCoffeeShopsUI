import { MOCKED_SHOPS_DATA } from "./mockedData";

export const shopsFetcherMock = () => {
  const startMock = () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCKED_SHOPS_DATA),
      })
    );
  };

  const stopMock = () => {
    global.fetch.mockRestore();
  };

  return { startMock, stopMock };
};
