import React from "react";
import { ListGroup } from "react-bootstrap";
import Timer from "../components/Timer";

import { timerSet } from "../timer_data";

const HomeScreen = () => {
  return (
    <div>
      <h4>
        {timerSet.name} ({timerSet.desc})
      </h4>
      <ListGroup as="ul">
        {timerSet.timers.map((t, index) => {
          return <Timer t={t} index={index} />;
        })}
      </ListGroup>
    </div>
  );
};

export default HomeScreen;
