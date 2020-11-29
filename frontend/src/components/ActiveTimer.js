import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Countdown, { zeroPad } from "react-countdown";

import { Button } from "react-bootstrap";
import { stopTimer } from "../actions/timerSetActions";
import "./ActiveTimer.css";

const ActiveTimer = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet } = timerSetState;

  const renderer = ({ minutes, seconds, completed }) => {
    return completed ? (
      <h1 className="timer" style={{ color: "red" }}>
        -{zeroPad(minutes)}:{zeroPad(seconds)}
      </h1>
    ) : (
      <h1 className="timer">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </h1>
    );
  };

  return (
    <div>
      {activeTimer ? (
        <div>
          <div className="d-flex justify-content-center align-items-center">
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
                  onClick={() => {
                    dispatch(stopTimer(timerSet.key, activeTimer._id));
                  }}
                >
                  Stop
                </Button>
              </div>
            )}
          </div>
          <h3 className="text-center">{activeTimer.name}</h3>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ActiveTimer;
