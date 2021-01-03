import { combineReducers } from "redux";

import {
  getTimerSetReducer,
  activeTimerReducer,
  allTimerSetReducer,
  toggleShowAddTimerSetMainReducer,
  toggleShowUpdateTimerSetMainReducer,
  toggleShowDeleteTimerSetMainReducer,
  saveTimerSetReducer,
  deleteTimerSetReducer,
  updateTimerSetReducer,
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
  saveTimerSetState: saveTimerSetReducer,
  updateTimerSetState: updateTimerSetReducer,
  deleteTimerSetState: deleteTimerSetReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  activeTimerState: activeTimerReducer,
  toggleShowAddTimerSetMainState: toggleShowAddTimerSetMainReducer,
  toggleShowUpdateTimerSetMainState: toggleShowUpdateTimerSetMainReducer,
  toggleShowDeleteTimerSetMainState: toggleShowDeleteTimerSetMainReducer,
});

export default reducer;
