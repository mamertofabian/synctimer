import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ms from "ms";

const Timer = ({ t }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const startTimer = (id) => {
    console.log(`Timer with id: ${id} started`);
  };

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
          <Button className="ml-3" onClick={() => startTimer(t._id)}>
            Start
          </Button>
          <Button className="ml-3" variant="warning">
            Stop
          </Button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default Timer;
