import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ms from "ms";
import { startTimer, stopTimer } from "../actions/timerSetActions";

const Timer = ({ timerSetKey, t, activeTimerId }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const finished = t.started && t.ended;
  const actualDuration = finished
    ? new Date(t.ended).getTime() - new Date(t.started).getTime()
    : null;
  const formattedDuration = finished ? ms(actualDuration) : null;
  const actualDurationStyle = finished
    ? actualDuration <= ms(`${t.duration}m`)
      ? { color: "lightgreen" }
      : { color: "red" }
    : {};

  return (
    <ListGroup.Item as="li" className="timer-li">
      <div>
        <span>{t.name}</span>
        <span> | {t.duration}m</span>
        {finished && (
          <span>
            {" "}
            | <span style={actualDurationStyle}>{formattedDuration}</span>
          </span>
        )}
      </div>
      {userInfo && userInfo.email && (
        <div>
          <Button
            className="ml-3"
            disabled={activeTimerId}
            onClick={() => dispatch(startTimer(timerSetKey, t._id))}
          >
            Start
          </Button>
          <Button
            className="ml-3"
            variant="warning"
            disabled={t.ended || !t.started}
            onClick={() => dispatch(stopTimer(timerSetKey, t._id))}
          >
            Stop
          </Button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default Timer;
