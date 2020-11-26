import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";

import Timer from "../components/Timer";

const HomeScreen = () => {
  const [timerSet, setTimerSet] = useState({
    timers: [],
  });
  // TODO: get from query params or from a list of timersets (admin dashboard)
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState("d9a36958");

  useEffect(() => {
    const fetchTimers = async () => {
      const { data } = await axios.get(`/api/v1/timerset/${key}`);
      setTimerSet(data.data);
    };

    fetchTimers();
  }, [key]);

  return (
    <div>
      {timerSet.name && (
        <h4>
          {timerSet.name} ({timerSet.desc})
        </h4>
      )}
      <ListGroup as="ul">
        {timerSet.timers.map((t, index) => {
          return <Timer t={t} key={index} />;
        })}
      </ListGroup>
    </div>
  );
};

export default HomeScreen;
