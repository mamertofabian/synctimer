import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";

import Timer from "./Timer";
import {
  clearTimerSet,
  resetTimerSet,
  showAddTimerModal,
} from "../actions/timerSetActions";
import AddTimer from "./AddTimer/AddTimer";
import UpdateTimer from "./UpdateTimer/UpdateTimer";
import DeleteTimer from "./DeleteTimer/DeleteTimer";

const TimerList = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet } = timerSetState;
  const toggleShowAddTimer = useSelector(
    (state) => state.toggleShowAddTimerState.show
  );
  const toggleShowUpdateTimer = useSelector(
    (state) => state.toggleShowUpdateTimerState.show
  );
  const toggleShowDeleteTimer = useSelector(
    (state) => state.toggleShowDeleteTimerState.show
  );

  return (
    <div>
      <ListGroup as="ul">
        {timerSet.timers.map((t) => {
          return (
            <Timer
              timerSetKey={timerSet.key}
              t={t}
              timerSet={timerSet}
              key={t._id}
              activeTimerId={timerSet.activeTimerId}
            />
          );
        })}
        {userInfo && userInfo.user === timerSet.user && (
          <ListGroup.Item as="li">
            <Button
              variant="success"
              onClick={() => dispatch(showAddTimerModal())}
            >
              <i className="far fa-plus-square"></i> Add New Timer
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          <strong>
            Total duration:{" "}
            {timerSet.timers.reduce(
              (total, current) => total + current.duration,
              0
            )}
            m
          </strong>
        </ListGroup.Item>
      </ListGroup>
      {userInfo && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          {userInfo.user === timerSet.user && (
            <Button
              variant="danger"
              className="mt-3"
              onClick={() => dispatch(resetTimerSet(timerSet.key))}
            >
              <i className="fas fa-sync"></i> Start Over
            </Button>
          )}
          <Button
            variant="info"
            className="mt-3"
            onClick={() => {
              dispatch(clearTimerSet());
              history.push("/");
            }}
          >
            <i className="fas fa-list"></i> Select another timer set
          </Button>
        </div>
      )}
      {toggleShowAddTimer && <AddTimer />}
      {toggleShowUpdateTimer && <UpdateTimer />}
      {toggleShowDeleteTimer && <DeleteTimer />}
    </div>
  );
};

export default TimerList;
