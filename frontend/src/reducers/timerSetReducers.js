import {
  GET_TIMERSET_FAIL,
  GET_TIMERSET_REQUEST,
  GET_TIMERSET_SUCCESS,
} from "../constants/timerSetConstants";

export const getTimerSetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TIMERSET_REQUEST:
      return { loading: true };
    case GET_TIMERSET_SUCCESS:
      return {
        loading: false,
        timerSet: action.payload,
      };
    case GET_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
