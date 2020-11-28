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
    case START_TIMER_REQUEST:
      return { starting: true, timerSet: action.payload };
    case START_TIMER_SUCCESS:
      const currentTimerSet = { ...state.timerSet };
      const timers = [...currentTimerSet.timers];
      const timer = timers.find((t) => t._id === action.payload._id);
      if (timer) {
        timer.started = action.payload.started;
        timer.ended = action.payload.ended;
        currentTimerSet.activeTimerId = action.payload._id;
      }
      currentTimerSet.timers = timers;
      return {
        starting: false,
        timerSet: currentTimerSet,
      };
    case START_TIMER_FAIL:
      return {
        starting: false,
        error: action.payload,
        timerSet: { ...state.timerSet },
      };
    case STOP_TIMER_REQUEST:
      return { stopping: true, timerSet: action.payload };
    case STOP_TIMER_SUCCESS:
      const currentTimerSet2 = { ...state.timerSet };
      const timers2 = [...currentTimerSet2.timers];
      const timer2 = timers2.find((t) => t._id === action.payload._id);
      if (timer2) {
        timer2.ended = action.payload.ended;
        currentTimerSet2.activeTimerId = null;
      }
      currentTimerSet2.timers = timers2;
      return {
        stopping: false,
        timerSet: currentTimerSet2,
      };
    case STOP_TIMER_FAIL:
      return {
        stopping: false,
        error: action.payload,
        timerSet: { ...state.timerSet },
      };
    default:
      return state;
  }
};
