import * as c from "../constants/timerSetConstants";

export const allTimerSetReducer = (state = {}, action) => {
  switch (action.type) {
    case c.GET_ALLTIMERSET_REQUEST:
      return { loading: true, loaded: false };
    case c.GET_ALLTIMERSET_SUCCESS:
      return {
        loading: false,
        loaded: true,
        allTimerSet: action.payload,
      };
    case c.GET_ALLTIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTimerSetReducer = (state = {}, action) => {
  const currentTimerSet = { ...state.timerSet };
  let timers = [];
  if (currentTimerSet && currentTimerSet.timers) {
    timers = [...currentTimerSet.timers];
  }

  switch (action.type) {
    case c.GET_TIMERSET_REQUEST:
      return { loading: true, loaded: false, timerSet: currentTimerSet };
    case c.GET_TIMERSET_SUCCESS:
      return {
        loading: false,
        loaded: true,
        timerSet: action.payload,
      };
    case c.GET_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
        timerSet: currentTimerSet,
      };
    case c.START_TIMER_REQUEST:
      return { starting: true, timerSet: action.payload };
    case c.START_TIMER_SUCCESS:
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
    case c.START_TIMER_FAIL:
      return {
        starting: false,
        error: action.payload,
        timerSet: { ...state.timerSet },
      };
    case c.STOP_TIMER_REQUEST:
      return { stopping: true, timerSet: action.payload };
    case c.STOP_TIMER_SUCCESS:
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
    case c.STOP_TIMER_FAIL:
      return {
        stopping: false,
        error: action.payload,
        timerSet: { ...state.timerSet },
      };
    case c.RESET_TIMERSET_REQUEST:
      return { loading: true };
    case c.RESET_TIMERSET_SUCCESS:
      return {
        loading: false,
        timerSet: action.payload,
      };
    case c.RESET_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.CLEAR_TIMERSET:
      return {
        loading: false,
        loaded: false,
        timerSet: undefined,
      };
    default:
      return state;
  }
};

export const saveTimerSetReducer = (state = {}, action) => {
  switch (action.type) {
    case c.SAVE_TIMERSET_REQUEST:
      return { loading: true, loaded: false };
    case c.SAVE_TIMERSET_SUCCESS:
      return {
        loading: false,
        loaded: true,
        newTimerSet: action.payload,
      };
    case c.SAVE_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.SAVE_TIMERSET_RESET:
      return {
        newTimerSet: undefined,
      };
    default:
      return state;
  }
};

export const cloneTimerSetReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CLONE_TIMERSET_REQUEST:
      return { loading: true, loaded: false };
    case c.CLONE_TIMERSET_SUCCESS:
      return {
        loading: false,
        loaded: true,
        newTimerSet: action.payload,
      };
    case c.CLONE_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.CLONE_TIMERSET_RESET:
      return {
        newTimerSet: undefined,
      };
    default:
      return state;
  }
};

export const updateTimerSetReducer = (state = {}, action) => {
  switch (action.type) {
    case c.UPDATE_TIMERSET_REQUEST:
      return { loading: true, loaded: false };
    case c.UPDATE_TIMERSET_SUCCESS:
      return {
        loading: false,
        loaded: true,
        updatedTimerSet: action.payload,
      };
    case c.UPDATE_TIMERSET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.UPDATE_TIMERSET_RESET:
      return {
        updatedTimerSet: undefined,
      };
    default:
      return state;
  }
};

export const deleteTimerSetReducer = (state = {}, action) => {
  switch (action.type) {
    case c.DELETE_TIMERSET_REQUEST:
      return { deleting: true, deleted: false };
    case c.DELETE_TIMERSET_SUCCESS:
      return {
        deleting: false,
        deleted: true,
        deletedTimerSetKey: action.payload,
      };
    case c.DELETE_TIMERSET_FAIL:
      return {
        deleting: false,
        error: action.payload,
      };
    case c.DELETE_TIMERSET_RESET:
      return {
        deletedTimerSetKey: undefined,
      };
    default:
      return state;
  }
};

export const toggleShowAddTimerSetReducer = (state = false, action) => {
  switch (action.type) {
    case c.SHOW_ADD_TIMERSET:
      return { show: true };
    case c.HIDE_ADD_TIMERSET:
      return { show: false };
    default:
      return state;
  }
};

export const toggleShowUpdateTimerSetReducer = (state = false, action) => {
  switch (action.type) {
    case c.SHOW_UPDATE_TIMERSET:
      return { show: true, timerSet: action.payload };
    case c.HIDE_UPDATE_TIMERSET:
      return { show: false };
    default:
      return state;
  }
};

export const toggleShowDeleteTimerSetReducer = (state = false, action) => {
  switch (action.type) {
    case c.SHOW_DELETE_TIMERSET:
      return { show: true, timerSet: action.payload };
    case c.HIDE_DELETE_TIMERSET:
      return { show: false };
    default:
      return state;
  }
};

export const activeTimerReducer = (state = {}, action) => {
  switch (action.type) {
    case c.ACTIVATE_TIMER:
      return {
        activeTimer: action.payload,
      };
    case c.DEACTIVATE_TIMER:
      return {
        activeTimer: undefined,
      };
    default:
      return state;
  }
};

export const toggleShowAddTimerReducer = (state = false, action) => {
  switch (action.type) {
    case c.SHOW_ADD_TIMER:
      return { show: true };
    case c.HIDE_ADD_TIMER:
      return { show: false };
    default:
      return state;
  }
};

export const toggleShowUpdateTimerReducer = (state = false, action) => {
  switch (action.type) {
    case c.SHOW_UPDATE_TIMER:
      return { show: true, timer: action.payload };
    case c.HIDE_UPDATE_TIMER:
      return { show: false };
    default:
      return state;
  }
};

export const toggleShowDeleteTimerReducer = (state = false, action) => {
  switch (action.type) {
    case c.SHOW_DELETE_TIMER:
      return { show: true, timer: action.payload };
    case c.HIDE_DELETE_TIMER:
      return { show: false };
    default:
      return state;
  }
};

export const saveTimerReducer = (state = {}, action) => {
  switch (action.type) {
    case c.SAVE_TIMER_REQUEST:
      return { loading: true, loaded: false };
    case c.SAVE_TIMER_SUCCESS:
      return {
        loading: false,
        loaded: true,
        newTimer: action.payload,
      };
    case c.SAVE_TIMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.SAVE_TIMER_RESET:
      return {
        newTimer: undefined,
      };
    default:
      return state;
  }
};

export const updateTimerReducer = (state = {}, action) => {
  switch (action.type) {
    case c.UPDATE_TIMER_REQUEST:
      return { loading: true, loaded: false };
    case c.UPDATE_TIMER_SUCCESS:
      return {
        loading: false,
        loaded: true,
        updatedTimer: action.payload,
      };
    case c.UPDATE_TIMER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.UPDATE_TIMER_RESET:
      return {
        updatedTimer: undefined,
      };
    default:
      return state;
  }
};

export const deleteTimerReducer = (state = {}, action) => {
  switch (action.type) {
    case c.DELETE_TIMER_REQUEST:
      return { deleting: true, deleted: false };
    case c.DELETE_TIMER_SUCCESS:
      return {
        deleting: false,
        deleted: true,
        deletedTimerId: action.payload,
      };
    case c.DELETE_TIMER_FAIL:
      return {
        deleting: false,
        error: action.payload,
      };
    case c.DELETE_TIMER_RESET:
      return {
        deletedTimerId: undefined,
      };
    default:
      return state;
  }
};
