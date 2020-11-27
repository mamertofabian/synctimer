import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { login, registerReset } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { result: passwordResetResult } = userResetPassword;

  const searchParams = new URLSearchParams(location.search);
  // const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (userInfo && userInfo.token) {
      // if (redirect === "upgrade") {
      //   history.push(`/${redirect}`);
      // } else {
      history.push("/");
      // }
    }
  }, [history, userInfo]);

  useEffect(() => {
    dispatch(registerReset());
  }, [dispatch]);

  const schemaSignIn = yup.object({
    emailSignIn: yup
      .string()
      .required("Email is required")
      .email("Invalid Email"),
    passwordSignIn: yup.string().required("Password is required"),
  });

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    history.push("/forgotpassword");
  };

  const signinHandler = async (email, password) => {
    dispatch(login(email, password));
  };

  const siFormik = useFormik({
    initialValues: { emailSignIn: "", passwordSignIn: "" },
    validationSchema: schemaSignIn,
    onSubmit: (values) =>
      signinHandler(values.emailSignIn, values.passwordSignIn),
  });

  return (
    <FormContainer>
      {passwordResetResult && passwordResetResult.success && (
        <div>
          <Message variant="success">
            Your password has been reset successfully.
          </Message>
          <Message variant="info">
            Please login below to view your account/upgrade.
            <br /> Or open a new UseDelight tab and login from there to access
            your subscription benefits.
          </Message>
        </div>
      )}
      {error && (
        <Message variant="danger">
          {error === "Invalid credentials"
            ? "Incorrect email or password"
            : error}
        </Message>
      )}
      {loading && <Loader />}
      <Form noValidate onSubmit={siFormik.handleSubmit}>
        <Form.Group controlId="emailSignIn">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            name="emailSignIn"
            isInvalid={
              siFormik.touched.emailSignIn && siFormik.errors.emailSignIn
            }
            // isValid={siFormik.touched.emailSignIn && !siFormik.errors.emailSignIn}
            onChange={siFormik.handleChange}
            onBlur={siFormik.handleBlur}
            value={siFormik.values.emailSignIn}
          />
          <Form.Control.Feedback type="invalid">
            {siFormik.errors.emailSignIn}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="passwordSignIn">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="passwordSignIn"
            isInvalid={
              siFormik.touched.passwordSignIn && siFormik.errors.passwordSignIn
            }
            // isValid={
            //   siFormik.touched.passwordSignIn && !siFormik.errors.passwordSignIn
            // }
            onChange={siFormik.handleChange}
            onBlur={siFormik.handleBlur}
            value={siFormik.values.passwordSignIn}
          />
          <Form.Control.Feedback type="invalid">
            {siFormik.errors.passwordSignIn}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mr-3"
          disabled={loading}
        >
          Sign-in
        </Button>
        {/*
        <LinkContainer
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
        >
          <Button variant="link">
            No account?
            <br />
            Click here to sign-up.
          </Button>
        </LinkContainer>
        <div>
          <Button
            variant="light"
            onClick={forgotPasswordHandler}
            className="mt-2"
          >
            Forgot password?
          </Button>
        </div>
        */}
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;