import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";

import { clearTimerSet } from "../actions/timerSetActions";
import TimerEdit from "../components/TimerEdit";
import FormContainer from "../components/FormContainer";

const TimerSetForm = ({ history, timerSet }) => {
  const dispatch = useDispatch();
  const submitHandler = (values) => {
    // TODO: Save timerset
    console.log({ values });
  };

  const schema = yup.object({
    timerSetName: yup
      .string()
      .required("Timer set timerSetName is required")
      .min(5, "Timer Set Name must be at least 5 chars"),
  });

  const mainFormik = useFormik({
    initialValues: {
      timerSetName: (timerSet && timerSet.name) || "",
      timerSetDesc: (timerSet && timerSet.desc) || "",
    },
    validationSchema: schema,
    onSubmit: (values) => submitHandler(values),
  });

  return (
    <div>
      <Form noValidate onSubmit={mainFormik.handleSubmit}>
        <Form.Group controlId="timerSetName">
          <Row className="align-items-center">
            <Col md={2}>
              <Form.Label>Timer Set Name:</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Enter Timer Set Name"
                name="timerSetName"
                isInvalid={
                  mainFormik.touched.timerSetName &&
                  mainFormik.errors.timerSetName
                }
                onChange={mainFormik.handleChange}
                onBlur={mainFormik.handleBlur}
                value={mainFormik.values.timerSetName}
              />
            </Col>
            <Col>
              <Form.Control.Feedback type="invalid">
                {mainFormik.errors.timerSetName}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="timerSetDesc">
          <Row className="align-items-center">
            <Col md={2}>
              <Form.Label>Description:</Form.Label>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="timerSetDesc"
                isInvalid={
                  mainFormik.touched.timerSetDesc &&
                  mainFormik.errors.timerSetDesc
                }
                onChange={mainFormik.handleChange}
                onBlur={mainFormik.handleBlur}
                value={mainFormik.values.timerSetDesc}
              />
            </Col>
          </Row>
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center">
          {/*<h4>{`${timerSet.name} (${timerSet.desc})`}</h4>*/}
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
        <div className="d-flex justify-content-center align-items-center">
          <Button variant="primary" className="mt-3 ml-3" type="submit">
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
      </Form>
    </div>
  );
};

export default TimerSetForm;
