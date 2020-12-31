import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { getAllTimerSets, getTimerSet } from "../actions/timerSetActions";
import ActiveTimer from "../components/ActiveTimer";
import { logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import TimerSetList from "../components/TimerSetList";
import TimerList from "../components/TimerList";
import TimerKeyForm from "../components/TimerKeyForm";

const HomeScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allTimerSetState = useSelector((state) => state.allTimerSetState);
  const {
    allTimerSet,
    loading: allTimerSetLoading,
    loaded: allTimerSetLoaded,
    error: allTimerSetError,
  } = allTimerSetState;
  const timerSetState = useSelector((state) => state.timerSetState);
  const {
    timerSet,
    loading: timerSetLoading,
    loaded: timerSetLoaded,
    error: timerSetError,
  } = timerSetState;
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;

  const searchParams = new URLSearchParams(location.search);
  const keyParams = searchParams.get("key");

  // TODO: get from query params or from a list of timersets (admin dashboard)
  // eslint-disable-next-line no-unused-vars
  const key = keyParams;

  useEffect(() => {
    if (key) {
      dispatch(getTimerSet(key));
    }
  }, [dispatch, key]);

  useEffect(() => {
    if (timerSetLoaded && !userInfo) {
      setTimeout(() => {
        dispatch(getTimerSet(key));
      }, 3000);
    }
  }, [timerSetLoaded, dispatch, key, userInfo]);

  useEffect(() => {
    if (
      timerSetError &&
      timerSetError === "Not authorized to access this route"
    ) {
      dispatch(logout());
    }
  }, [dispatch, timerSetError]);

  useEffect(() => {
    if (!allTimerSetLoaded && !allTimerSetLoading) {
      dispatch(getAllTimerSets());
    }
  }, [dispatch, allTimerSetLoaded, allTimerSetLoading]);

  return timerSetError ? (
    <Message variant="danger">{timerSetError}</Message>
  ) : timerSet ? (
    <div>
      {timerSet && timerSet.name && (
        <div className="d-flex justify-content-between align-items-center">
          <h4>{`${timerSet.name} (${timerSet.desc})`}</h4>
          <p className="text-primary">Timer Key: {timerSet.key}</p>
        </div>
      )}
      {activeTimer ? (
        <ActiveTimer />
      ) : timerSet && timerSet.timers ? (
        <TimerList history={history} />
      ) : (
        <Loader />
      )}
    </div>
  ) : (
    <div>
      <TimerKeyForm />
      <div>
        <hr />
        {userInfo && allTimerSet ? (
          <TimerSetList history={history} />
        ) : (
          <LinkContainer to="/login">
            <Button variant="link">
              Sign-in to create your own timer set. Registration is free.
            </Button>
          </LinkContainer>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
