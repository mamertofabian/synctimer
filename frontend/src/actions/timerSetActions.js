import axios from "axios";

import {
  ACTIVATE_TIMER,
  DEACTIVATE_TIMER,
  GET_TIMERSET_FAIL,
  GET_TIMERSET_REQUEST,
  GET_TIMERSET_SUCCESS,
  RESET_TIMERSET_FAIL,
  RESET_TIMERSET_REQUEST,
  RESET_TIMERSET_SUCCESS,
  START_TIMER_FAIL,
  START_TIMER_REQUEST,
  START_TIMER_SUCCESS,
  STOP_TIMER_FAIL,
  STOP_TIMER_REQUEST,
  STOP_TIMER_SUCCESS,
} from "../constants/timerSetConstants";
// import { BASE_API_URL } from "../constants/commonConstants";

export const getTimerSet = (key) => async (dispatch, getState) => {
  const currentState = getState();
  let currentActiveTimer;
  if (currentState.activeTimerState) {
    currentActiveTimer = currentState.activeTimerState.activeTimer;
  }

  dispatch({
    type: GET_TIMERSET_REQUEST,
  });

  try {
    const { data } = await axios.get(`/api/v1/timerset/${key}`);

    if (data.success === true) {
      dispatch({
        type: GET_TIMERSET_SUCCESS,
        payload: data.data,
      });

      if (data.data.activeTimerId) {
        const activeTimer = data.data.timers.find(
          (t) => t._id === data.data.activeTimerId
        );
        if (activeTimer) {
          dispatch(activateTimer(activeTimer));
        }
      } else if (currentActiveTimer) {
        dispatch(deactivateTimer());
      }
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

export const resetTimerSet = (key) => async (dispatch, getState) => {
  const { userLogin } = getState();

  dispatch({
    type: RESET_TIMERSET_REQUEST,
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
      `/api/v1/timerset/reset/${key}`,
      null,
      config
    );

    if (data.success === true) {
      dispatch({
        type: RESET_TIMERSET_SUCCESS,
        payload: data.data,
      });
      dispatch(deactivateTimer());
    } else {
      dispatch({
        type: RESET_TIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: RESET_TIMERSET_FAIL,
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
      `/api/v1/timerset/${key}/start/${timerId}`,
      null,
      config
    );

    if (data.success === true) {
      dispatch({
        type: START_TIMER_SUCCESS,
        payload: data.data,
      });
      dispatch(activateTimer(data.data));
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
      `/api/v1/timerset/${key}/stop/${timerId}`,
      null,
      config
    );

    if (data.success === true) {
      dispatch({
        type: STOP_TIMER_SUCCESS,
        payload: data.data,
      });
      dispatch(deactivateTimer());
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

export const activateTimer = (timer) => {
  return {
    type: ACTIVATE_TIMER,
    payload: timer,
  };
};

export const deactivateTimer = () => {
  return {
    type: DEACTIVATE_TIMER,
  };
};
