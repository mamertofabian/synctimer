import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import { resetPassword } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const PasswordReset = ({ history, location }) => {
  const dispatch = useDispatch();
  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, result } = userResetPassword;

  useEffect(() => {
    if (result && result.success) {
      history.push("/login");
    }
  }, [history, result]);

  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("resettoken");

  const schemaPasswordReset = yup.object({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 chars"),
    confirmNewPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword"), null], "Password must match"),
  });

  const passwordResetHandler = async (newPassword) => {
    dispatch(resetPassword(resetToken, newPassword));
  };

  const suFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: schemaPasswordReset,
    onSubmit: (values) => passwordResetHandler(values.newPassword),
  });

  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form noValidate onSubmit={suFormik.handleSubmit}>
        <Form.Group controlId="newPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="newPassword"
            isInvalid={
              suFormik.touched.newPassword && suFormik.errors.newPassword
            }
            onChange={suFormik.handleChange}
            onBlur={suFormik.handleBlur}
            value={suFormik.values.newPassword}
          />
          <Form.Control.Feedback type="invalid">
            {suFormik.errors.newPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmNewPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            name="confirmNewPassword"
            isInvalid={
              suFormik.touched.confirmNewPassword &&
              suFormik.errors.confirmNewPassword
            }
            onChange={suFormik.handleChange}
            onBlur={suFormik.handleBlur}
            value={suFormik.values.confirmNewPassword}
          />
          <Form.Control.Feedback type="invalid">
            {suFormik.errors.confirmNewPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mr-3"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Submit New Password"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PasswordReset;
