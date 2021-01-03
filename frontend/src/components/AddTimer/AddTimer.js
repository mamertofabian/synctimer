import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  getTimerSet,
  hideAddTimerModal,
  resetAddTimer,
  saveTimer,
} from "../../actions/timerSetActions";

import "./AddTimer.css";
import { Button, Form } from "react-bootstrap";

const AddTimer = () => {
  const dispatch = useDispatch();
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet } = timerSetState;
  const saveTimerState = useSelector((state) => state.saveTimerState);
  const { newTimer, loading, loaded, error } = saveTimerState;

  useEffect(() => {
    document.getElementById("timerName").focus();
  }, []);

  useEffect(() => {
    if (newTimer) {
      dispatch(hideAddTimerModal());
      dispatch(resetAddTimer());
      dispatch(getTimerSet(timerSet.key));
    }
  }, [dispatch, newTimer, timerSet.key]);

  const submitHandler = (values) => {
    const timers = [...timerSet.timers];
    timers.push({ name: values.timerName, duration: values.duration });
    dispatch(saveTimer({ ...timerSet, timers }));
  };

  const schema = yup.object({
    timerName: yup
      .string()
      .required("Timer Name is required")
      .min(5, "Timer Name must be at least 5 chars"),
    duration: yup
      .number()
      .required("Duration is required")
      .typeError("Duration must be a number")
      .min(1, "Duration must be at least 1 minute"),
  });

  const formik = useFormik({
    initialValues: {
      timerName: "",
      duration: "",
    },
    validationSchema: schema,
    onSubmit: (values) => submitHandler(values),
  });

  return (
    <div className="addtimer-container">
      <div className="addtimer-content">
        <h5>Add new Timer for {timerSet.name}</h5>
        <hr />
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="timerName">
            <Form.Control
              type="text"
              placeholder="Timer Name"
              name="timerName"
              isInvalid={formik.touched.timerName && formik.errors.timerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.timerName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.timerName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Control
              type="text"
              placeholder="Duration in minutes"
              name="duration"
              isInvalid={formik.touched.duration && formik.errors.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.duration}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.duration}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="primary"
              className="mt-3 ml-3"
              type="submit"
              disabled={loading}
            >
              <i className="far fa-save"></i> {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="warning"
              className="mt-3 ml-3"
              disabled={loading}
              onClick={() => {
                dispatch(hideAddTimerModal());
              }}
            >
              <i className="fas fa-ban"></i> Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddTimer;
