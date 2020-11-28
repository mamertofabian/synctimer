import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Countdown, { zeroPad } from "react-countdown";

import { Button } from "react-bootstrap";
import { getTimerSet, stopTimer } from "../actions/timerSetActions";
import "./ActiveTimerScreen.css";

const ActiveTimerScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet } = timerSetState;
  const searchParams = new URLSearchParams(location.search);
  const keyParams = searchParams.get("key");

  useEffect(() => {
    if (!timerSet && keyParams) {
      dispatch(getTimerSet(keyParams));
    }
  }, [dispatch, keyParams, timerSet]);

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
        <div className="timer-container d-flex justify-content-center align-items-center">
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
                  history.push(`/?key=${timerSet.key}`);
                }}
              >
                Stop
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>No timer key provided</div>
      )}
    </div>
  );
};

export default ActiveTimerScreen;
