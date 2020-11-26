import React from "react";
import { Button, ListGroup } from "react-bootstrap";

const Timer = ({ t }) => {
  return (
    <ListGroup.Item as="li" className="timer-li">
      <div>
        <span>{t.name}</span>
        <span> | {t.duration}m</span>
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
