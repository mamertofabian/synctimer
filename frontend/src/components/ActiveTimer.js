import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Countdown, { zeroPad } from "react-countdown";
import { Button } from "react-bootstrap";
import { startTimer, stopTimer } from "../actions/timerSetActions";

const ActiveTimer = ({ timerSetKey, activeTimerId }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        {completed ? "-" : ""}
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  return (
    <div>
      <Countdown
        date={
          new Date(activeTimer.started).getTime() +
          activeTimer.duration * 1000 * 60
        }
        overtime={true}
        renderer={renderer}
      />
      {userInfo && userInfo.email && (
        <div>
          <Button
            variant="warning"
            disabled={activeTimer.ended || !activeTimer.started}
            onClick={() => dispatch(stopTimer(timerSetKey, activeTimer._id))}
          >
            Stop
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveTimer;
