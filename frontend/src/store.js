import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";
import { appStorageGet } from "./Utils/Utils";

const middleware = [thunk];

const userInfo = appStorageGet("userInfo");

const initialState = {
  userLogin: {
    userInfo,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
