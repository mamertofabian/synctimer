import React from "react";
import { Button, ListGroup } from "react-bootstrap";

const Timer = ({ t, index }) => {
  return (
    <ListGroup.Item as="li" key={index} className="timer-li">
      <div>
        <span>{t.name}</span>
        <span> | {t.duration / 60}m</span>
      </div>
      <div>
        <Button className="ml-3">Start</Button>
        <Button className="ml-3" variant="warning">
          Stop
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default Timer;
