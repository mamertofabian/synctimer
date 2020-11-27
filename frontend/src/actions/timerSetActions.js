import axios from "axios";

import {
  GET_TIMERSET_FAIL,
  GET_TIMERSET_REQUEST,
  GET_TIMERSET_SUCCESS,
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
