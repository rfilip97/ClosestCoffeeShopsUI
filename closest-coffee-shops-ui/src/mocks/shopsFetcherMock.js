import { MOCKED_SHOPS_DATA } from "./mockedData";

export const shopsFetcherMock = () => {
  let jsdomAlert = null;

  const startMock = () => {
    jsdomAlert = window.alert;
    window.alert = () => {};

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([MOCKED_SHOPS_DATA, 200]),
      })
    );
  };

  const stopMock = () => {
    global.fetch.mockRestore();
    window.alert = jsdomAlert;

    jsdomAlert = null;
  };

  return { startMock, stopMock };
};
