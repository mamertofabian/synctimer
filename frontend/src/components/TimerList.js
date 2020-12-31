import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";

import Timer from "./Timer";
import { clearTimerSet, resetTimerSet } from "../actions/timerSetActions";

const TimerList = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const timerSetState = useSelector((state) => state.timerSetState);
  const {
    timerSet,
    loading: timerSetLoading,
    loaded: timerSetLoaded,
    error: timerSetError,
  } = timerSetState;

  return (
    <div>
      <ListGroup as="ul">
        {timerSet.timers.map((t) => {
          return (
            <Timer
              timerSetKey={timerSet.key}
              t={t}
              key={t._id}
              activeTimerId={timerSet.activeTimerId}
            />
          );
        })}
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
          <Button
            variant="danger"
            className="mt-3"
            onClick={() => dispatch(resetTimerSet(timerSet.key))}
          >
            <i className="fas fa-sync"></i> Start Over
          </Button>
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
    </div>
  );
};

export default TimerList;
