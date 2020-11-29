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

export const getTimerSetReducer = (state = {}, action) => {
  const currentTimerSet = { ...state.timerSet };
  let timers = [];
  if (currentTimerSet && currentTimerSet.timers) {
    timers = [...currentTimerSet.timers];
  }

  switch (action.type) {
    case GET_TIMERSET_REQUEST:
      return { loading: true, loaded: false, timerSet: currentTimerSet };
    case GET_TIMERSET_SUCCESS:
      return {
        loading: false,
        loaded: true,
        timerSet: action.payload,
      };
    case GET_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
        timerSet: currentTimerSet,
      };
    case START_TIMER_REQUEST:
      return { starting: true, timerSet: action.payload };
    case START_TIMER_SUCCESS:
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
      const timer2 = timers.find((t) => t._id === action.payload._id);
      if (timer2) {
        timer2.ended = action.payload.ended;
        currentTimerSet.activeTimerId = null;
      }
      currentTimerSet.timers = timers;
      return {
        stopping: false,
        timerSet: currentTimerSet,
      };
    case STOP_TIMER_FAIL:
      return {
        stopping: false,
        error: action.payload,
        timerSet: { ...state.timerSet },
      };
    case RESET_TIMERSET_REQUEST:
      return { loading: true };
    case RESET_TIMERSET_SUCCESS:
      return {
        loading: false,
        timerSet: action.payload,
      };
    case RESET_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const activeTimerReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVATE_TIMER:
      return {
        activeTimer: action.payload,
      };
    case DEACTIVATE_TIMER:
      return {
        activeTimer: undefined,
      };
    default:
      return state;
  }
};
