import { combineReducers } from "redux";

import { getTimerSetReducer } from "./reducers/timerSetReducers";
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
});

export default reducer;
