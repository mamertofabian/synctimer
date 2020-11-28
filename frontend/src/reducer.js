import { combineReducers } from "redux";

import {
  getTimerSetReducer,
  activeTimerReducer,
} from "./reducers/timerSetReducers";
import {
  userForgotPasswordReducer,
  userLoginReducer,
  userRegisterReducer,
  userResetPasswordReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  timerSetState: getTimerSetReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  activeTimerState: activeTimerReducer,
});

export default reducer;
