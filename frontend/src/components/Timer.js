import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ms from "ms";
import {
  showDeleteTimerModal,
  showUpdateTimerModal,
  startTimer,
} from "../actions/timerSetActions";
import { useEffect } from "react";
import { Fragment } from "react";

const Timer = ({
  timerSetKey,
  t,
  timerSet,
  activeTimerId,
  lastStoppedTimer,
  nextTimer,
}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [idleElapseTime, setIdleElapseTime] = useState();

  useEffect(() => {
    if (
      lastStoppedTimer &&
      lastStoppedTimer._id === t._id &&
      t.ended &&
      Date.now() - Date.parse(t.ended) < ms("30m")
    ) {
      const interval = setInterval(() => {
        const elapse = Date.now() - Date.parse(t.ended);
        const date = new Date(0);
        date.setMilliseconds(elapse);
        const timeString = date.toISOString().substr(14, 7);
        setIdleElapseTime(timeString);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [lastStoppedTimer, t]);

  const finished = t.started && t.ended;
  let actualDuration = finished
    ? t.duration * 1000 * 60 -
      (new Date(t.ended).getTime() - new Date(t.started).getTime())
    : null;

  if (actualDuration < 0) {
    actualDuration = actualDuration * -1 + ms("1d");
  }

  let timeString;
  if (finished) {
    const date = new Date(0);
    date.setMilliseconds(actualDuration);
    timeString = date.toISOString().substr(11, 8);
    // .replace(/^[0:]+/, "");
  }
  const formattedDuration = finished ? timeString : null;
  const actualDurationStyle = finished
    ? actualDuration <= ms(`${t.duration}m`)
      ? { color: "limegreen" }
      : { color: "red" }
    : {};

  const idleTimer = lastStoppedTimer &&
    lastStoppedTimer._id === t._id &&
    t.ended &&
    nextTimer &&
    Date.now() - Date.parse(t.ended) < ms("30m") && (
      <div className="text-center my-0 d-flex flex-column">
        <div>
          <small className="alert alert-warning p-1">
            Intermediate time: {idleElapseTime}
          </small>
        </div>
        <i className="fas fa-long-arrow-alt-down"></i>
      </div>
    );

  const timeBetween = () => {
    if (t.ended && nextTimer && nextTimer.started) {
      const date = new Date(0);
      date.setMilliseconds(Date.parse(nextTimer.started) - Date.parse(t.ended));
      return (
        <div className="text-center my-0 d-flex flex-column">
          <div>
            <small className="alert alert-secondary p-1">
              Intermediate time: {date.toISOString().substr(11, 8)}
            </small>
          </div>
          <i className="fas fa-long-arrow-alt-down"></i>
        </div>
      );
    }
  };

  return (
    <Fragment>
      <ListGroup.Item as="li" className="timer-li">
        <div className="d-flex flex-column justify-content-center">
          <div className="container">
            <div className="row">
              <div>
                <span className="col-sm-auto pl-0">
                  <strong>{t.name}:</strong>
                </span>
              </div>
              <span className="col-sm pl-0"> {t.duration}m</span>
              {finished && (
                <span className="col-sm pl-0">
                  <span style={actualDurationStyle}>{formattedDuration}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        {userInfo && userInfo.user === timerSet.user && (
          <div className="d-flex justify-content-center align-items-center d-print-none">
            <Button
              className="ml-3"
              disabled={activeTimerId}
              onClick={() => {
                dispatch(startTimer(timerSetKey, t._id));
                // history.push(`/timer?key=${timerSetKey}`);
              }}
            >
              <i className="far fa-play-circle"></i>
            </Button>
            <Button
              className="ml-2"
              variant="info"
              title="Edit"
              disabled={t.started}
              onClick={() => {
                dispatch(showUpdateTimerModal(t));
              }}
            >
              <i className="far fa-edit"></i>
            </Button>
            <Button
              className="ml-2"
              variant="danger"
              title="Delete"
              disabled={t.started}
              onClick={() => {
                dispatch(showDeleteTimerModal(t));
              }}
            >
              <i className="far fa-trash-alt"></i>
            </Button>
            {/* <Button
            className="ml-3"
            variant="warning"
            disabled={t.ended || !t.started}
            onClick={() => dispatch(stopTimer(timerSetKey, t._id))}
          >
            <i className="far fa-stop-circle"></i> Stop
          </Button> */}
          </div>
        )}
      </ListGroup.Item>
      {timeBetween()}
      {idleTimer}
    </Fragment>
  );
};

export default Timer;
