import { combineReducers } from "redux";

import {
  getTimerSetReducer,
  activeTimerReducer,
  allTimerSetReducer,
} from "./reducers/timerSetReducers";
import {
  userForgotPasswordReducer,
  userLoginReducer,
  userRegisterReducer,
  userResetPasswordReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  allTimerSetState: allTimerSetReducer,
  timerSetState: getTimerSetReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  activeTimerState: activeTimerReducer,
});

export default reducer;
