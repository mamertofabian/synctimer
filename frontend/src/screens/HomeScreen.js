import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

import Timer from "../components/Timer";
import { getTimerSet } from "../actions/timerSetActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet } = timerSetState;

  // TODO: get from query params or from a list of timersets (admin dashboard)
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState("d9a36958");

  useEffect(() => {
    dispatch(getTimerSet(key));
  }, [dispatch, key]);

  return (
    <div>
      {timerSet && timerSet.name && (
        <h4>
          {timerSet.name} ({timerSet.desc})
        </h4>
      )}
      {timerSet && (
        <ListGroup as="ul">
          {timerSet.timers.map((t, index) => {
            return <Timer t={t} key={index} />;
          })}
        </ListGroup>
      )}
    </div>
  );
};

export default HomeScreen;
