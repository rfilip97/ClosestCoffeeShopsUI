const initialState = { shops: [] };

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOPS":
      return state
        ? { ...state, shops: action.payload, temp: action.payload.temp++ }
        : { shops: action.payload, temp: 0 };

    default:
      return state;
  }
};

export default shopReducer;
