import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import AddTimerSet from "./AddTimerSet/AddTimerSet";
import {
  showAddTimerSetMainModal,
  showDeleteTimerSetMainModal,
} from "../actions/timerSetActions";
import DeleteTimerSet from "./DeleteTimerSet/DeleteTimerSet";

const TimerSetList = ({ history }) => {
  const dispatch = useDispatch();
  const allTimerSetState = useSelector((state) => state.allTimerSetState);
  const {
    allTimerSet,
    loading: allTimerSetLoading,
    loaded: allTimerSetLoaded,
    error: allTimerSetError,
  } = allTimerSetState;

  const toggleShowAddTimerSetMain = useSelector(
    (state) => state.toggleShowAddTimerSetMainState.show
  );
  const toggleShowDeleteTimerSetMain = useSelector(
    (state) => state.toggleShowDeleteTimerSetMainState.show
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
            <ListGroup.Item as="li" className="timerset-li" key={s.key}>
              <div className="d-flex justify-content-center align-items-center">
                <span className="mr-3">{`${s.name} (${s.desc})`}</span>
                <span>Key: {s.key}</span>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  className="ml-2"
                  variant="primary"
                  title="Select"
                  // disabled={activeTimerId}
                  onClick={() => {
                    selectHandler(s.key);
                  }}
                >
                  <i className="far fa-check-circle"></i>
                </Button>
                <Button
                  className="ml-2"
                  variant="secondary"
                  title="Clone"
                  // disabled={activeTimerId}
                  onClick={() => {
                    // dispatch(startTimer(timerSetKey, t._id));
                    // history.push(`/timer?key=${timerSetKey}`);
                    alert("Under construction");
                  }}
                >
                  <i className="far fa-clone"></i>
                </Button>
                <Button
                  className="ml-2"
                  variant="info"
                  title="Edit"
                  onClick={() => {
                    history.push(`/edit?key=${s.key}`);
                  }}
                >
                  <i className="far fa-edit"></i>
                </Button>
                <Button
                  className="ml-2"
                  variant="danger"
                  title="Delete"
                  // disabled={t.ended || !t.started}
                  onClick={() => {
                    dispatch(showDeleteTimerSetMainModal(s));
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
        onClick={() => dispatch(showAddTimerSetMainModal())}
      >
        Create new Timer Set
      </Button>
      {toggleShowAddTimerSetMain && <AddTimerSet />}
      {toggleShowDeleteTimerSetMain && <DeleteTimerSet />}
    </div>
  );
};

export default TimerSetList;
