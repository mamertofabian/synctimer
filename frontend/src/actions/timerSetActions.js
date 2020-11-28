import axios from "axios";

import {
  GET_TIMERSET_FAIL,
  GET_TIMERSET_REQUEST,
  GET_TIMERSET_SUCCESS,
  START_TIMER_FAIL,
  START_TIMER_REQUEST,
  START_TIMER_SUCCESS,
  STOP_TIMER_FAIL,
  STOP_TIMER_REQUEST,
  STOP_TIMER_SUCCESS,
} from "../constants/timerSetConstants";
import { BASE_API_URL } from "../constants/commonConstants";

export const getTimerSet = (key) => async (dispatch) => {
  dispatch({
    type: GET_TIMERSET_REQUEST,
  });

  try {
    const { data } = await axios.get(`${BASE_API_URL}/timerset/${key}`);

    if (data.success === true) {
      dispatch({
        type: GET_TIMERSET_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_TIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_TIMERSET_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const startTimer = (key, timerId) => async (dispatch, getState) => {
  const { userLogin, timerSetState } = getState();
  dispatch({
    type: START_TIMER_REQUEST,
    payload: timerSetState.timerSet,
  });

  const authorization =
    userLogin.userInfo && userLogin.userInfo.token
      ? `Bearer ${userLogin.userInfo.token}`
      : "";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };

  try {
    const { data } = await axios.post(
      `${BASE_API_URL}/timerset/${key}/start/${timerId}`,
      null,
      config
    );

    if (data.success === true) {
      dispatch({
        type: START_TIMER_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: START_TIMER_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: START_TIMER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const stopTimer = (key, timerId) => async (dispatch, getState) => {
  const { userLogin, timerSetState } = getState();
  dispatch({
    type: STOP_TIMER_REQUEST,
    payload: timerSetState.timerSet,
  });

  const authorization =
    userLogin.userInfo && userLogin.userInfo.token
      ? `Bearer ${userLogin.userInfo.token}`
      : "";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };

  try {
    const { data } = await axios.post(
      `${BASE_API_URL}/timerset/${key}/stop/${timerId}`,
      null,
      config
    );

    if (data.success === true) {
      dispatch({
        type: STOP_TIMER_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: STOP_TIMER_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: STOP_TIMER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};
