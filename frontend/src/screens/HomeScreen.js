import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Overlay, Tooltip } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getAllTimerSets,
  getTimerSet,
  showUpdateTimerSetModal,
} from "../actions/timerSetActions";
import ActiveTimer from "../components/ActiveTimer";
import { logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import TimerSetList from "../components/TimerSetList";
import TimerList from "../components/TimerList";
import TimerKeyForm from "../components/TimerKeyForm";
import UpdateTimerSet from "../components/UpdateTimerSet/UpdateTimerSet";

const HomeScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const copyTarget = useRef(null);
  const [showCopied, setShowCopied] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const allTimerSetState = useSelector((state) => state.allTimerSetState);
  const {
    allTimerSet,
    loading: allTimerSetLoading,
    loaded: allTimerSetLoaded,
  } = allTimerSetState;
  const timerSetState = useSelector((state) => state.timerSetState);
  const {
    timerSet,
    loaded: timerSetLoaded,
    error: timerSetError,
  } = timerSetState;
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;
  const toggleShowUpdateTimerSet = useSelector(
    (state) => state.toggleShowUpdateTimerSetState.show
  );

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
    if (
      timerSetLoaded &&
      timerSet &&
      key &&
      (!userInfo || (userInfo && userInfo.user !== timerSet.user))
    ) {
      setTimeout(() => {
        dispatch(getTimerSet(key));
      }, 3000);
    }
  }, [timerSetLoaded, dispatch, key, userInfo, timerSet]);

  useEffect(() => {
    if (
      timerSetError &&
      timerSetError === "Not authorized to access this route"
    ) {
      dispatch(logout());
    }
  }, [dispatch, timerSetError]);

  useEffect(() => {
    if (userInfo && !allTimerSetLoaded && !allTimerSetLoading) {
      dispatch(getAllTimerSets());
    }
  }, [dispatch, allTimerSetLoaded, allTimerSetLoading, userInfo]);

  return timerSetError ? (
    <Message variant="danger">{timerSetError}</Message>
  ) : timerSet ? (
    <div>
      {timerSet && timerSet.name && (
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <h4 className="mb-0">{`${timerSet.name} (${timerSet.desc})`}</h4>
            {userInfo && userInfo.user === timerSet.user && (
              <span
                className="align-self-center ml-2 text-info edit-timerset-icon d-print-none"
                title="Edit"
                onClick={() => dispatch(showUpdateTimerSetModal(timerSet))}
              >
                <i className="far fa-edit "></i>
              </span>
            )}
          </div>
          <div className="d-flex align-items-center">
            <p className="text-primary mb-0">Timer Key: {timerSet.key}</p>
            <span
              className="align-self-center ml-2 text-info edit-timerset-icon d-print-none"
              title="Copy share link"
              ref={copyTarget}
              onClick={() => {
                const link = `${window.location.origin}/?key=${timerSet.key}`;
                navigator.clipboard.writeText(link).then(() => {
                  setShowCopied(true);
                  setTimeout(() => {
                    setShowCopied(false);
                  }, 3000);
                });
              }}
            >
              <i className="far fa-share-square"></i>
            </span>
            <Overlay
              target={copyTarget.current}
              show={showCopied}
              placement="top"
            >
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  Timerset link copied!
                </Tooltip>
              )}
            </Overlay>
          </div>
          {toggleShowUpdateTimerSet && <UpdateTimerSet />}
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
      <div className="text-center">
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
