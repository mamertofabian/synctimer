import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, ListGroup } from "react-bootstrap";
import * as yup from "yup";

import Timer from "../components/Timer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  clearTimerSet,
  getAllTimerSets,
  getTimerSet,
  resetTimerSet,
} from "../actions/timerSetActions";
import FormContainer from "../components/FormContainer";
import { useFormik } from "formik";
import ActiveTimer from "../components/ActiveTimer";
import { logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";

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
    if (!allTimerSetLoaded && !allTimerSetLoading && !allTimerSet) {
      dispatch(getAllTimerSets());
    }
  }, []);

  const schemaTimerKey = yup.object({
    timerKey: yup.string().required("Timer key is required"),
  });

  const siFormik = useFormik({
    initialValues: { timerKey: "" },
    validationSchema: schemaTimerKey,
    onSubmit: (values) => submitHandler(values.timerKey),
  });

  const submitHandler = (timerKey) => {
    window.location.assign(`/?key=${timerKey}`);
  };

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
        <div>
          <ListGroup as="ul">
            {timerSet.timers.map((t) => {
              return (
                <Timer
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
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Button
                variant="danger"
                className="mt-3"
                onClick={() => dispatch(resetTimerSet(timerSet.key))}
              >
                <i className="fas fa-sync"></i> Start Over
              </Button>
              <Button
                variant="info"
                className="mt-3"
                onClick={() => {
                  dispatch(clearTimerSet());
                  history.push("/");
                }}
              >
                <i className="fas fa-list"></i> Select another timer set
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  ) : (
    <div>
      <FormContainer>
        <Form noValidate onSubmit={siFormik.handleSubmit}>
          <Form.Group controlId="timerKey">
            <Form.Label>Please enter a timer key below:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Timer Key"
              name="timerKey"
              isInvalid={siFormik.touched.timerKey && siFormik.errors.timerKey}
              // isValid={siFormik.touched.emailSignIn && !siFormik.errors.emailSignIn}
              onChange={siFormik.handleChange}
              onBlur={siFormik.handleBlur}
              value={siFormik.values.timerKey}
            />
            <Form.Control.Feedback type="invalid">
              {siFormik.errors.timerKey}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mr-3"
            disabled={timerSetLoading}
          >
            Submit
          </Button>
        </Form>
      </FormContainer>
      <div>
        <hr />
        {userInfo && allTimerSet ? (
          <div>
            <h5>Your Timer Sets</h5>
            <ListGroup as="ul">
              {allTimerSet.map((s) => {
                return (
                  <ListGroup.Item as="li" className="timerset-li" key={s.key}>
                    <div className="d-flex justify-content-center align-items-center">
                      <span className="mr-3">{`${s.name} (${s.desc})`}</span>
                      <span>Key: {s.key}</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        className="ml-2"
                        variant="primary"
                        title="Select"
                        // disabled={activeTimerId}
                        onClick={() => {
                          submitHandler(s.key);
                        }}
                      >
                        <i className="far fa-check-circle"></i>
                      </Button>
                      <Button
                        className="ml-2"
                        variant="secondary"
                        title="Clone"
                        // disabled={activeTimerId}
                        onClick={() => {
                          // dispatch(startTimer(timerSetKey, t._id));
                          // history.push(`/timer?key=${timerSetKey}`);
                          alert("Under construction");
                        }}
                      >
                        <i className="far fa-clone"></i>
                      </Button>
                      <Button
                        className="ml-2"
                        variant="info"
                        title="Edit"
                        // disabled={activeTimerId}
                        onClick={() => {
                          // dispatch(startTimer(timerSetKey, t._id));
                          // history.push(`/timer?key=${timerSetKey}`);
                          alert("Under construction");
                        }}
                      >
                        <i className="far fa-edit"></i>
                      </Button>
                      <Button
                        className="ml-2"
                        variant="danger"
                        title="Delete"
                        // disabled={t.ended || !t.started}
                        onClick={() => {
                          // dispatch(stopTimer(timerSetKey, t._id))
                          alert("Under construction");
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </Button>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <hr />
            <Button
              variant="info"
              type="submit"
              className="mr-3"
              disabled={timerSetLoading}
            >
              Create new Timer Set
            </Button>
          </div>
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
