import { combineReducers } from "redux";

import {
  getTimerSetReducer,
  activeTimerReducer,
  allTimerSetReducer,
  toggleShowAddTimerSetReducer,
  toggleShowUpdateTimerSetReducer,
  toggleShowDeleteTimerSetReducer,
  saveTimerSetReducer,
  deleteTimerSetReducer,
  updateTimerSetReducer,
  toggleShowAddTimerReducer,
  toggleShowUpdateTimerReducer,
  toggleShowDeleteTimerReducer,
  saveTimerReducer,
  deleteTimerReducer,
  updateTimerReducer,
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
  saveTimerState: saveTimerReducer,
  updateTimerState: updateTimerReducer,
  deleteTimerState: deleteTimerReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  activeTimerState: activeTimerReducer,
  toggleShowAddTimerSetState: toggleShowAddTimerSetReducer,
  toggleShowUpdateTimerSetState: toggleShowUpdateTimerSetReducer,
  toggleShowDeleteTimerSetState: toggleShowDeleteTimerSetReducer,
  toggleShowAddTimerState: toggleShowAddTimerReducer,
  toggleShowUpdateTimerState: toggleShowUpdateTimerReducer,
  toggleShowDeleteTimerState: toggleShowDeleteTimerReducer,
});

export default reducer;
