const setShops = (shops) => {
  return {
    type: "SET_SHOPS",
    payload: shops,
  };
};

export default { setShops };
