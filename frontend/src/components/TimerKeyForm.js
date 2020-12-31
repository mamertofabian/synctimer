import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useSelector } from "react-redux";

const TimerKeyForm = () => {
  const timerSetState = useSelector((state) => state.timerSetState);
  const { loading: timerSetLoading } = timerSetState;

  const submitHandler = (timerKey) => {
    window.location.assign(`/?key=${timerKey}`);
  };

  const schemaTimerKey = yup.object({
    timerKey: yup.string().required("Timer key is required"),
  });

  const siFormik = useFormik({
    initialValues: { timerKey: "" },
    validationSchema: schemaTimerKey,
    onSubmit: (values) => submitHandler(values.timerKey),
  });

  return (
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
  );
};

export default TimerKeyForm;
