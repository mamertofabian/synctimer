import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTimer,
  getTimerSet,
  hideDeleteTimerModal,
  resetDeleteTimer,
} from "../../actions/timerSetActions";

import "./DeleteTimer.css";

const DeleteTimer = () => {
  const dispatch = useDispatch();
  const toggleShowDeleteTimerState = useSelector(
    (state) => state.toggleShowDeleteTimerState
  );
  const { timer } = toggleShowDeleteTimerState;
  const deleteTimerState = useSelector((state) => state.deleteTimerState);
  const { deletedTimerId, deleting, deleted, error } = deleteTimerState;
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet } = timerSetState;

  useEffect(() => {
    if (deletedTimerId) {
      dispatch(hideDeleteTimerModal());
      dispatch(resetDeleteTimer());
      dispatch(getTimerSet(timerSet.key));
    }
  }, [dispatch, deletedTimerId, timerSet.key]);

  return (
    <div className="deletetimer-container">
      <div className="deletetimer-content">
        {`Are you sure you want to delete ${timer.name}?`}
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            className="mt-3 ml-3"
            disabled={deleting}
            onClick={() => {
              const updatedTimers = timerSet.timers.filter(
                (t) => t._id !== timer._id
              );
              timerSet.timers = updatedTimers;
              dispatch(deleteTimer(timerSet));
            }}
          >
            <i className="far fa-check-circle"></i>{" "}
            {deleting ? "Deleting..." : "Yes"}
          </Button>
          <Button
            variant="warning"
            className="mt-3 ml-3"
            disabled={deleting}
            onClick={() => {
              dispatch(hideDeleteTimerModal());
            }}
          >
            <i className="far fa-times-circle"></i> No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTimer;
