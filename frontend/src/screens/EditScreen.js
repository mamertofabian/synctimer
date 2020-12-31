import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";

import { clearTimerSet, getTimerSet } from "../actions/timerSetActions";
import Loader from "../components/Loader";
import TimerEdit from "../components/TimerEdit";

const EditScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const timerSetState = useSelector((state) => state.timerSetState);
  const {
    timerSet,
    loading: timerSetLoading,
    loaded: timerSetLoaded,
    error: timerSetError,
  } = timerSetState;

  const searchParams = new URLSearchParams(location.search);
  const keyParams = searchParams.get("key");
  const key = keyParams;

  useEffect(() => {
    if (key && !timerSetLoading && !timerSetLoaded) {
      dispatch(getTimerSet(key));
    }
  }, [dispatch, key, timerSetLoaded, timerSetLoading]);

  return (
    <div>
      {timerSet && timerSet.timers ? (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h4>{`${timerSet.name} (${timerSet.desc})`}</h4>
            <p className="text-primary">Timer Key: {timerSet.key}</p>
          </div>
          <ListGroup as="ul">
            {timerSet.timers.map((t) => {
              return (
                <TimerEdit
                  timerSetKey={timerSet.key}
                  t={t}
                  key={t._id}
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
          {userInfo && (
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="primary"
                className="mt-3 ml-3"
                onClick={() => {}}
              >
                <i className="far fa-save"></i> Save
              </Button>
              <Button
                variant="warning"
                className="mt-3 ml-3"
                onClick={() => {
                  dispatch(clearTimerSet());
                  history.push("/");
                }}
              >
                <i className="fas fa-ban"></i> Cancel
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EditScreen;
