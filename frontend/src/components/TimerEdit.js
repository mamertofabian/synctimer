import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const TimerEdit = ({ timerSetKey, t, activeTimerId }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <ListGroup.Item as="li" className="timer-li">
      <div className="d-flex justify-content-center align-items-center">
        <span className="mr-2">
          <strong>{t.name}</strong>
        </span>
        <span> | {t.duration}m</span>
      </div>
      {userInfo && userInfo.email && (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            className="ml-3"
            disabled={activeTimerId}
            variant="secondary"
            title="Move Up"
            onClick={() => {
              // dispatch(startTimer(timerSetKey, t._id));
              // history.push(`/timer?key=${timerSetKey}`);
            }}
          >
            <i className="fas fa-caret-up"></i>
          </Button>
          <Button
            className="ml-2"
            disabled={activeTimerId}
            variant="secondary"
            title="Move Down"
            onClick={() => {
              // dispatch(startTimer(timerSetKey, t._id));
              // history.push(`/timer?key=${timerSetKey}`);
            }}
          >
            <i className="fas fa-caret-down"></i>
          </Button>
          <Button
            className="ml-3"
            disabled={activeTimerId}
            variant="danger"
            title="Delete"
            onClick={() => {
              // dispatch(startTimer(timerSetKey, t._id));
              // history.push(`/timer?key=${timerSetKey}`);
            }}
          >
            <i className="far fa-trash-alt"></i>
          </Button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default TimerEdit;
