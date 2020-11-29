import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, ListGroup } from "react-bootstrap";
import * as yup from "yup";

import Timer from "../components/Timer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getTimerSet, resetTimerSet } from "../actions/timerSetActions";
import FormContainer from "../components/FormContainer";
import { useFormik } from "formik";
import ActiveTimer from "../components/ActiveTimer";

const HomeScreen = ({ location }) => {
  const dispatch = useDispatch();
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet, loading, error } = timerSetState;
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;

  const searchParams = new URLSearchParams(location.search);
  const keyParams = searchParams.get("key");

  // TODO: get from query params or from a list of timersets (admin dashboard)
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState(keyParams);

  useEffect(() => {
    if (key) {
      dispatch(getTimerSet(key));
    }
  }, [dispatch, key]);

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

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : timerSet ? (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          {timerSet.name} ({timerSet.desc})
        </h4>
        <p className="text-primary">Timer Key: {timerSet.key}</p>
      </div>
      {activeTimer ? (
        <ActiveTimer />
      ) : (
        <div>
          <ListGroup as="ul">
            {timerSet.timers.map((t, index) => {
              return (
                <Timer
                  timerSetKey={key}
                  t={t}
                  key={index}
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
          <div className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="mt-3"
              onClick={() => dispatch(resetTimerSet(timerSet.key))}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      <FormContainer>
        <Form noValidate onSubmit={siFormik.handleSubmit}>
          <Form.Group controlId="timerKey">
            <Form.Label>Please enter the timer key below:</Form.Label>
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
            disabled={loading}
          >
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default HomeScreen;
