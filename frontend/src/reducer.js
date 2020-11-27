import { combineReducers } from "redux";

import { getTimerSetReducer } from "./reducers/timerSetReducers";

const reducer = combineReducers({
  timerSetState: getTimerSetReducer,
});

export default reducer;
