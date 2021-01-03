import axios from "axios";

import * as c from "../constants/timerSetConstants";
import { USER_UPDATE_TOKEN } from "../constants/userConstants";
// import { BASE_API_URL } from "../constants/commonConstants";

export const getAllTimerSets = (key) => async (dispatch, getState) => {
  const { userLogin } = getState();

  dispatch({
    type: c.GET_ALLTIMERSET_REQUEST,
  });

  try {
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

    const { data } = await axios.post(
      `/api/v1/timerset`,
      {
        refreshToken: userLogin.userInfo.refreshToken,
      },
      config
    );

    if (data.success === true) {
      dispatch({
        type: c.GET_ALLTIMERSET_SUCCESS,
        payload: data.data,
      });

      if (data.token) {
        dispatch({
          type: USER_UPDATE_TOKEN,
          payload: data.token,
        });
      }
    } else {
      dispatch({
        type: c.GET_ALLTIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.GET_ALLTIMERSET_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTimerSet = (key) => async (dispatch, getState) => {
  const currentState = getState();
  let currentActiveTimer;
  if (currentState.activeTimerState) {
    currentActiveTimer = currentState.activeTimerState.activeTimer;
  }

  dispatch({
    type: c.GET_TIMERSET_REQUEST,
  });

  try {
    const { data } = await axios.get(`/api/v1/timerset/${key}`);

    if (data.success === true) {
      dispatch({
        type: c.GET_TIMERSET_SUCCESS,
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
        type: c.GET_TIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.GET_TIMERSET_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const showAddTimerSetMainModal = () => {
  return {
    type: c.SHOW_ADD_TIMERSET_MAIN,
  };
};

export const hideAddTimerSetMainModal = () => {
  return {
    type: c.HIDE_ADD_TIMERSET_MAIN,
  };
};

export const resetAddTimerSet = () => {
  return {
    type: c.SAVE_TIMERSET_RESET,
  };
};

export const showUpdateTimerSetMainModal = (timerSet) => {
  return {
    type: c.SHOW_UPDATE_TIMERSET_MAIN,
    payload: timerSet,
  };
};

export const hideUpdateTimerSetMainModal = () => {
  return {
    type: c.HIDE_UPDATE_TIMERSET_MAIN,
  };
};

export const resetUpdateTimerSet = () => {
  return {
    type: c.UPDATE_TIMERSET_RESET,
  };
};

export const showDeleteTimerSetMainModal = (timerSet) => {
  return {
    type: c.SHOW_DELETE_TIMERSET_MAIN,
    payload: timerSet,
  };
};

export const hideDeleteTimerSetMainModal = () => {
  return {
    type: c.HIDE_DELETE_TIMERSET_MAIN,
  };
};

export const resetDeleteTimerSetMain = () => {
  return {
    type: c.DELETE_TIMERSET_RESET,
  };
};

export const saveTimerSet = (timerSet) => async (dispatch, getState) => {
  const { userLogin } = getState();

  dispatch({
    type: c.SAVE_TIMERSET_REQUEST,
  });

  try {
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

    const { data } = await axios.post(
      `/api/v1/timerset/save`,
      {
        timerSet,
        refreshToken: userLogin.userInfo.refreshToken,
      },
      config
    );

    if (data.success === true) {
      dispatch({
        type: c.SAVE_TIMERSET_SUCCESS,
        payload: data.data,
      });

      if (data.token) {
        dispatch({
          type: USER_UPDATE_TOKEN,
          payload: data.token,
        });
      }
    } else {
      dispatch({
        type: c.SAVE_TIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.SAVE_TIMERSET_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTimerSet = (timerSet) => async (dispatch, getState) => {
  const { userLogin } = getState();

  dispatch({
    type: c.UPDATE_TIMERSET_REQUEST,
  });

  try {
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

    const { data } = await axios.post(
      `/api/v1/timerset/save`,
      {
        timerSet,
        refreshToken: userLogin.userInfo.refreshToken,
      },
      config
    );

    if (data.success === true) {
      dispatch({
        type: c.UPDATE_TIMERSET_SUCCESS,
        payload: data.data,
      });

      if (data.token) {
        dispatch({
          type: USER_UPDATE_TOKEN,
          payload: data.token,
        });
      }
    } else {
      dispatch({
        type: c.UPDATE_TIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.UPDATE_TIMERSET_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTimerSet = (timerSetKey) => async (dispatch, getState) => {
  const { userLogin } = getState();

  dispatch({
    type: c.DELETE_TIMERSET_REQUEST,
  });

  try {
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

    const { data } = await axios.post(
      `/api/v1/timerset/delete`,
      {
        key: timerSetKey,
        refreshToken: userLogin.userInfo.refreshToken,
      },
      config
    );

    if (data.success === true) {
      dispatch({
        type: c.DELETE_TIMERSET_SUCCESS,
        payload: data.data,
      });

      if (data.token) {
        dispatch({
          type: USER_UPDATE_TOKEN,
          payload: data.token,
        });
      }
    } else {
      dispatch({
        type: c.DELETE_TIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.DELETE_TIMERSET_FAIL,
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
    type: c.RESET_TIMERSET_REQUEST,
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
      { refreshToken: userLogin.userInfo.refreshToken },
      config
    );

    if (data.success === true) {
      dispatch({
        type: c.RESET_TIMERSET_SUCCESS,
        payload: data.data,
      });
      if (data.token) {
        dispatch({
          type: USER_UPDATE_TOKEN,
          payload: data.token,
        });
      }
      dispatch(deactivateTimer());
    } else {
      dispatch({
        type: c.RESET_TIMERSET_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.RESET_TIMERSET_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearTimerSet = () => {
  return {
    type: c.CLEAR_TIMERSET,
  };
};

export const startTimer = (key, timerId) => async (dispatch, getState) => {
  const { userLogin, timerSetState } = getState();
  dispatch({
    type: c.START_TIMER_REQUEST,
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
        type: c.START_TIMER_SUCCESS,
        payload: data.data,
      });
      dispatch(activateTimer(data.data));
    } else {
      dispatch({
        type: c.START_TIMER_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.START_TIMER_FAIL,
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
    type: c.STOP_TIMER_REQUEST,
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
        type: c.STOP_TIMER_SUCCESS,
        payload: data.data,
      });
      dispatch(deactivateTimer());
    } else {
      dispatch({
        type: c.STOP_TIMER_FAIL,
        payload: data.result.error,
      });
    }
  } catch (error) {
    dispatch({
      type: c.STOP_TIMER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    });
  }
};

export const activateTimer = (timer) => {
  return {
    type: c.ACTIVATE_TIMER,
    payload: timer,
  };
};

export const deactivateTimer = () => {
  return {
    type: c.DEACTIVATE_TIMER,
  };
};
