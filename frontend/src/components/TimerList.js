import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import ms from "ms";

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

  const formatDuration = (durationMs) => {
    const date = new Date(0);
    date.setMilliseconds(durationMs);
    return date.toISOString().substr(11, 8);
  };

  const getActualDuration = () => {
    const startedTimers = timerSet.timers.filter((t) => t.started);
    const endedTimers = timerSet.timers.filter((t) => t.ended);

    if (startedTimers.length > 0 && endedTimers.length > 0) {
      const firstStarted = startedTimers[0].started;
      const lastEnded = endedTimers[endedTimers.length - 1].ended;
      const duration =
        new Date(lastEnded).getTime() - new Date(firstStarted).getTime();

      return formatDuration(duration);
    } else {
      return null;
    }
  };

  const getTotalTimerScheduledDuration = () => {
    return timerSet.timers.reduce(
      (total, current) => total + current.duration,
      0
    );
  };

  const getTotalTimerActualDuration = () => {
    return timerSet.timers.reduce((total, current) => {
      const finished = current.started && current.ended;
      let actualDuration = finished
        ? new Date(current.ended).getTime() -
          new Date(current.started).getTime()
        : 0;
      return total + actualDuration / 60000;
    }, 0);
  };

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
          <ListGroup.Item as="li" className="d-print-none">
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
        <ListGroup.Item
          as="li"
          active
          className="d-flex flex-row justify-content-between align-items-center"
        >
          <div>
            <strong>Total timer scheduled duration: </strong>
            <span>
              {formatDuration(ms(`${getTotalTimerScheduledDuration()}m`))}
            </span>
            <br />
            <strong>Total timer actual duration: </strong>
            <span>
              {formatDuration(ms(`${getTotalTimerActualDuration()}m`))}
            </span>
          </div>
          <div>
            <strong>Timer Set Time Budget: </strong>
            <span>{formatDuration(ms(`${timerSet.timeBudget}m`))}</span>
            <br />
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="actual-duration">
                  Computed using the <strong>first timer started</strong> and
                  the <strong>last timer ended</strong>.
                </Tooltip>
              }
            >
              <div>
                <strong>Timer Set actual duration: </strong>
                <span>{getActualDuration()}</span>
              </div>
            </OverlayTrigger>
          </div>
        </ListGroup.Item>
      </ListGroup>
      {userInfo && (
        <div className="d-flex flex-column justify-content-center align-items-center d-print-none">
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
              window.location.assign("/");
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
