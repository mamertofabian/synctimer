import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";

import Timer from "../components/Timer";

const HomeScreen = () => {
  const [timerSet, setTimerSet] = useState({
    timers: [],
  });

  useEffect(() => {
    const fetchTimers = async () => {
      const { data } = await axios.get("/api/timers");

      setTimerSet(data);
    };

    fetchTimers();
  }, []);

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
