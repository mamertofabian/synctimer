import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import { forgotPassword } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ForgotPasswordScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const forgotPasswordState = useSelector((state) => state.userForgotPassword);
  const { userInfo } = userLogin;
  const { error, loading, result } = forgotPasswordState;

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push("/");
    }
  }, [history, userInfo]);

  const resetPasswordHandler = async (email) => {
    dispatch(forgotPassword(email));
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Invalid Email"),
    }),
    onSubmit: (values) => resetPasswordHandler(values.email),
  });

  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {result && result.success ? (
        <Message>{result.data}</Message>
      ) : (
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              isInvalid={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mr-3"
            disabled={formik.isSubmitting || loading}
          >
            {formik.isSubmitting || loading
              ? "Please wait..."
              : "Reset Password"}
          </Button>
          <LinkContainer to="/login">
            <Button
              variant="secondary"
              disabled={formik.isSubmitting || loading}
            >
              Cancel
            </Button>
          </LinkContainer>
        </Form>
      )}
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
