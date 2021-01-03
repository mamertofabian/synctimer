import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTimerSet } from "../actions/timerSetActions";
import Loader from "../components/Loader";
import TimerSetForm from "../components/TimerSetForm";

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

  useEffect(() => {
    if (timerSet) {
      console.log("Timer set loaded");
    }
  }, [timerSet]);

  return (
    <div>
      {timerSet && timerSet.timers ? (
        <div>
          <TimerSetForm history={history} timerSet={timerSet} />
        </div>
      ) : (
        timerSetLoading && <Loader />
      )}
    </div>
  );
};

export default EditScreen;
