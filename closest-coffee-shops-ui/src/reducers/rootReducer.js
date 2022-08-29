import shopReducer from "./shopReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  shopReducer,
});

export default rootReducer;
