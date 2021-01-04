import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import AddTimerSet from "./AddTimerSet/AddTimerSet";
import {
  cloneTimerSet,
  getAllTimerSets,
  showAddTimerSetModal,
  showDeleteTimerSetModal,
  resetCloneTimerSet,
} from "../actions/timerSetActions";
import DeleteTimerSet from "./DeleteTimerSet/DeleteTimerSet";

const TimerSetList = ({ history }) => {
  const dispatch = useDispatch();
  const allTimerSetState = useSelector((state) => state.allTimerSetState);
  const { allTimerSet, loading: allTimerSetLoading } = allTimerSetState;
  const cloneTimerSetState = useSelector((state) => state.cloneTimerSetState);
  const { newTimerSet } = cloneTimerSetState;

  useEffect(() => {
    if (newTimerSet) {
      dispatch(getAllTimerSets());
      dispatch(resetCloneTimerSet());
    }
  }, [dispatch, newTimerSet]);

  const toggleShowAddTimerSet = useSelector(
    (state) => state.toggleShowAddTimerSetState.show
  );
  const toggleShowDeleteTimerSet = useSelector(
    (state) => state.toggleShowDeleteTimerSetState.show
  );

  const selectHandler = (timerKey) => {
    window.location.assign(`/?key=${timerKey}`);
  };

  return (
    <div>
      <h5>Your Timer Sets</h5>
      <ListGroup as="ul">
        {allTimerSet.map((s) => {
          return (
            <ListGroup.Item
              as="li"
              action
              onClick={() => selectHandler(s.key)}
              className="timerset-li"
              key={s.key}
            >
              <div className="d-flex justify-content-center align-items-center">
                <span className="mr-3">{`${s.name} (${s.desc})`}</span>
                <span>Key: {s.key}</span>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  className="ml-2"
                  variant="secondary"
                  title="Clone"
                  // disabled={activeTimerId}
                  onClick={(e) => {
                    // dispatch(startTimer(timerSetKey, t._id));
                    // history.push(`/timer?key=${timerSetKey}`);
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch(cloneTimerSet(s));
                  }}
                >
                  <i className="far fa-clone"></i>
                </Button>
                <Button
                  className="ml-2"
                  variant="danger"
                  title="Delete"
                  // disabled={t.ended || !t.started}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch(showDeleteTimerSetModal(s));
                  }}
                >
                  <i className="far fa-trash-alt"></i>
                </Button>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <hr />
      <Button
        variant="info"
        type="submit"
        className="mr-3"
        disabled={allTimerSetLoading}
        onClick={() => dispatch(showAddTimerSetModal())}
      >
        <i className="far fa-plus-square"></i> Create new Timer Set
      </Button>
      {toggleShowAddTimerSet && <AddTimerSet />}
      {toggleShowDeleteTimerSet && <DeleteTimerSet />}
    </div>
  );
};

export default TimerSetList;
