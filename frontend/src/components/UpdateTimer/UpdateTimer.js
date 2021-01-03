import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  getTimerSet,
  hideUpdateTimerModal,
  resetUpdateTimer,
  updateTimer,
} from "../../actions/timerSetActions";

import "./UpdateTimer.css";
import { Button, Form } from "react-bootstrap";

const UpdateTimer = () => {
  const dispatch = useDispatch();
  const timerSetState = useSelector((state) => state.timerSetState);
  const { timerSet } = timerSetState;
  const updateTimerState = useSelector((state) => state.updateTimerState);
  const { updatedTimer, loading, loaded, error } = updateTimerState;
  const timerToUpdate = useSelector(
    (state) => state.toggleShowUpdateTimerState.timer
  );

  useEffect(() => {
    document.getElementById("timerName").focus();
  }, []);

  useEffect(() => {
    if (updatedTimer) {
      dispatch(hideUpdateTimerModal());
      dispatch(resetUpdateTimer());
      dispatch(getTimerSet(timerSet.key));
    }
  }, [dispatch, updatedTimer, timerSet.key]);

  const submitHandler = (values) => {
    const timers = [...timerSet.timers];
    const targetTimer = timers.find((t) => t._id === timerToUpdate._id);
    targetTimer.name = values.timerName;
    targetTimer.duration = values.duration;
    dispatch(updateTimer({ ...timerSet, timers }));
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
    // order: yup.number().typeError("Order must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      timerName: timerToUpdate.name,
      duration: timerToUpdate.duration,
      // order: timerToUpdate.order,
    },
    validationSchema: schema,
    onSubmit: (values) => submitHandler(values),
  });

  return (
    <div className="updatetimer-container">
      <div className="updatetimer-content">
        <h5>Update Timer for {timerSet.name}</h5>
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
          {/* <Form.Group controlId="order">
            <Form.Control
              type="text"
              placeholder="Order sequence"
              name="order"
              isInvalid={formik.touched.order && formik.errors.order}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.order}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.order}
            </Form.Control.Feedback>
          </Form.Group> */}
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
                dispatch(hideUpdateTimerModal());
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

export default UpdateTimer;
