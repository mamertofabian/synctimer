import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTimerSet,
  getAllTimerSets,
  hideDeleteTimerSetModal,
  resetDeleteTimerSet,
} from "../../actions/timerSetActions";

import "./DeleteTimerSet.css";

const DeleteTimerSet = () => {
  const dispatch = useDispatch();
  const toggleShowDeleteTimerSetState = useSelector(
    (state) => state.toggleShowDeleteTimerSetState
  );
  const { timerSet } = toggleShowDeleteTimerSetState;
  const deleteTimerSetState = useSelector((state) => state.deleteTimerSetState);
  const { deletedTimerSetKey, deleting, deleted, error } = deleteTimerSetState;

  useEffect(() => {
    if (deletedTimerSetKey) {
      dispatch(hideDeleteTimerSetModal());
      dispatch(resetDeleteTimerSet());
      dispatch(getAllTimerSets());
    }
  }, [dispatch, deletedTimerSetKey]);

  return (
    <div className="deletetimerset-container">
      <div className="deletetimerset-content">
        {`Are you sure you want to delete ${timerSet.name} (${timerSet.desc})?`}
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="primary"
            className="mt-3 ml-3"
            disabled={deleting}
            onClick={() => dispatch(deleteTimerSet(timerSet.key))}
          >
            <i className="far fa-check-circle"></i>{" "}
            {deleting ? "Deleting..." : "Yes"}
          </Button>
          <Button
            variant="warning"
            className="mt-3 ml-3"
            disabled={deleting}
            onClick={() => {
              dispatch(hideDeleteTimerSetModal());
            }}
          >
            <i className="far fa-times-circle"></i> No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTimerSet;
