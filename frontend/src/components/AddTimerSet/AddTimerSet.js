import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

import "./AddTimerSet.css";
import { Button, Form } from "react-bootstrap";
import {
  getAllTimerSets,
  hideAddTimerSetMainModal,
  resetAddTimerSet,
  saveTimerSet,
} from "../../actions/timerSetActions";

const AddTimerSet = () => {
  const dispatch = useDispatch();

  const saveTimerSetState = useSelector((state) => state.saveTimerSetState);
  const { newTimerSet, loading, loaded, error } = saveTimerSetState;

  useEffect(() => {
    document.getElementById("timerSetName").focus();
  }, []);

  useEffect(() => {
    if (newTimerSet) {
      dispatch(hideAddTimerSetMainModal());
      dispatch(resetAddTimerSet());
      dispatch(getAllTimerSets());
    }
  }, [dispatch, newTimerSet]);

  const submitHandler = (values) => {
    dispatch(
      saveTimerSet({
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
      timerSetName: "",
      timerSetDesc: "",
      timeBudget: "",
    },
    validationSchema: schema,
    onSubmit: (values) => submitHandler(values),
  });

  return (
    <div className="addtimerset-container">
      <div className="addtimerset-content">
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
              disabled={loading}
            >
              <i className="far fa-save"></i> {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="warning"
              className="mt-3 ml-3"
              disabled={loading}
              onClick={() => {
                dispatch(hideAddTimerSetMainModal());
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

export default AddTimerSet;
