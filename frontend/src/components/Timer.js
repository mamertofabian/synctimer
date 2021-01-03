import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ms from "ms";
import {
  showDeleteTimerModal,
  showUpdateTimerModal,
  startTimer,
} from "../actions/timerSetActions";

const Timer = ({ timerSetKey, t, timerSet, activeTimerId }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  return (
    <ListGroup.Item as="li" className="timer-li">
      <div className="d-flex justify-content-center align-items-center">
        <span className="mr-2">
          <strong>{t.name}</strong>
        </span>
        <span> | {t.duration}m</span>
        {finished && (
          <span>
            {" "}
            | <span style={actualDurationStyle}>{formattedDuration}</span>
          </span>
        )}
      </div>
      {userInfo && userInfo.user === timerSet.user && (
        <div className="d-flex justify-content-center align-items-center">
          <Button
            className="ml-3"
            disabled={activeTimerId}
            onClick={() => {
              dispatch(startTimer(timerSetKey, t._id));
              // history.push(`/timer?key=${timerSetKey}`);
            }}
          >
            <i className="far fa-play-circle"></i> Start
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
  );
};

export default Timer;
