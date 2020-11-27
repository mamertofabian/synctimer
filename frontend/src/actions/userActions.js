import axios from "axios";
import { appStorageRemove, appStorageSet } from "../Utils/Utils";
import { BASE_API_URL } from "../constants/commonConstants";
import {
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_RESET,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_RESET,
  USER_RESET_PASSWORD_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_API_URL}/auth/login`,
      { email, password },
      config
    );

    if (data.success === true) {
      const payload = {
        name: data.data.name,
        email: data.data.email,
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      };
      dispatch({ type: USER_LOGIN_SUCCESS, payload: payload });
      dispatch(resetPasswordReset());
      appStorageSet({
        key: "userInfo",
        value: payload,
      });
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginReset = () => {
  return {
    type: USER_LOGIN_RESET,
  };
};

export const logout = () => (dispatch) => {
  appStorageRemove("userInfo");
  dispatch({ type: USER_LOGOUT, payload: { loggedOut: true } });
  dispatch({ type: USER_REGISTER_SUCCESS, payload: null });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_API_URL}/auth/register`,
      { name, email, password },
      config
    );

    if (data.success === true) {
      const payload = {
        name: data.data.name,
        email: data.data.email,
        isAdmin: data.data.isAdmin,
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      };

      dispatch({ type: USER_REGISTER_SUCCESS, payload: payload });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: payload });

      appStorageSet({
        key: "userInfo",
        value: payload,
      });
    } else {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerReset = () => {
  return {
    type: USER_REGISTER_RESET,
  };
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_API_URL}/auth/forgotpassword`,
      { email },
      config
    );

    if (data.success === true) {
      dispatch({
        type: USER_FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_FORGOT_PASSWORD_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgotPasswordReset = () => {
  return {
    type: USER_FORGOT_PASSWORD_RESET,
  };
};

export const resetPassword = (resetToken, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${BASE_API_URL}/auth/resetpassword/${resetToken}`,
      { password },
      config
    );

    if (data.success === true) {
      dispatch({
        type: USER_RESET_PASSWORD_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_RESET_PASSWORD_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPasswordReset = () => {
  return {
    type: USER_RESET_PASSWORD_RESET,
  };
};
