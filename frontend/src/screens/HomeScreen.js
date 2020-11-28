import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import ms from "ms";

import Timer from "../components/Timer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getTimerSet, resetTimerSet } from "../actions/timerSetActions";
import ActiveTimer from "../components/ActiveTimer";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet, loading, error } = timerSetState;
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;

  // TODO: get from query params or from a list of timersets (admin dashboard)
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState("d9a36958");

  useEffect(() => {
    dispatch(getTimerSet(key));
  }, [dispatch, key]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : timerSet ? (
    activeTimer ? (
      <ActiveTimer timerSetKey={key} activeTimerId={timerSet.activeTimerId} />
    ) : (
      <div>
        <h4>
          {timerSet.name} ({timerSet.desc})
        </h4>
        <ListGroup as="ul">
          {timerSet.timers.map((t, index) => {
            return (
              <Timer
                timerSetKey={key}
                t={t}
                key={index}
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
        <div className="d-flex justify-content-center">
          <Button
            variant="danger"
            className="mt-3"
            onClick={() => dispatch(resetTimerSet(timerSet.key))}
          >
            Reset
          </Button>
        </div>
      </div>
    )
  ) : (
    <div></div>
  );
};

export default HomeScreen;
