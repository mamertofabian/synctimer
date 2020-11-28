import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

import Timer from "../components/Timer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getTimerSet } from "../actions/timerSetActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet, loading, error } = timerSetState;

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
    </div>
  ) : (
    <div></div>
  );
};

export default HomeScreen;
