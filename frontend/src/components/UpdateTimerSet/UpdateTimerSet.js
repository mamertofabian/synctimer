import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import {
  getAllTimerSets,
  getTimerSet,
  hideUpdateTimerSetMainModal,
  resetUpdateTimerSet,
  updateTimerSet,
} from "../../actions/timerSetActions";

import "./UpdateTimerSet.css";

const UpdateTimerSet = () => {
  const dispatch = useDispatch();
  const toggleShowUpdateTimerSetMainState = useSelector(
    (state) => state.toggleShowUpdateTimerSetMainState
  );
  const { timerSet } = toggleShowUpdateTimerSetMainState;
  const updateTimerSetState = useSelector((state) => state.updateTimerSetState);
  const { updatedTimerSet, updating, updated, error } = updateTimerSetState;

  useEffect(() => {
    document.getElementById("timerSetName").focus();
  }, []);

  useEffect(() => {
    if (updatedTimerSet) {
      dispatch(hideUpdateTimerSetMainModal());
      dispatch(getTimerSet(updatedTimerSet.key));
      dispatch(getAllTimerSets());
      dispatch(resetUpdateTimerSet());
    }
  }, [dispatch, updatedTimerSet]);

  const submitHandler = (values) => {
    dispatch(
      updateTimerSet({
        ...timerSet,
        name: values.timerSetName,
        desc: values.timerSetDesc,
        timeBudget: values.timeBudget,
      })
    );
  };

  const schema = yup.object({
    timerSetName: yup
      .string()
      .required("Timer Set Name is required")
      .min(5, "Timer Set Name must be at least 5 chars"),
    timeBudget: yup
      .number()
      .typeError("Time budget must be a number")
      .required("Time budget is required")
      .min(1, "Time budget must be at least 1 minute"),
  });

  const formik = useFormik({
    initialValues: {
      timerSetName: timerSet.name,
      timerSetDesc: timerSet.desc,
      timeBudget: timerSet.timeBudget,
    },
    validationSchema: schema,
    onSubmit: (values) => submitHandler(values),
  });

  return (
    <div className="updatetimerset-container">
      <div className="updatetimerset-content">
        <h5>Add new Timer Set</h5>
        <hr />
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="timerSetName">
            <Form.Control
              type="text"
              placeholder="Timer Set Name"
              name="timerSetName"
              isInvalid={
                formik.touched.timerSetName && formik.errors.timerSetName
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.timerSetName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.timerSetName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="timerSetDesc">
            <Form.Control
              type="text"
              placeholder="Description"
              name="timerSetDesc"
              isInvalid={
                formik.touched.timerSetDesc && formik.errors.timerSetDesc
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.timerSetDesc}
            />
          </Form.Group>
          <Form.Group controlId="timerSetDesc">
            <Form.Control
              type="text"
              placeholder="Time budget in minutes"
              name="timeBudget"
              isInvalid={formik.touched.timeBudget && formik.errors.timeBudget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.timeBudget}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.timeBudget}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="primary"
              className="mt-3 ml-3"
              type="submit"
              disabled={updating}
            >
              <i className="far fa-save"></i>{" "}
              {updating ? "Updating..." : "Save"}
            </Button>
            <Button
              variant="warning"
              className="mt-3 ml-3"
              disabled={updating}
              onClick={() => {
                dispatch(hideUpdateTimerSetMainModal());
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

export default UpdateTimerSet;
