import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import FormContainer from "../components/FormContainer";
import { loginReset, register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userRegister;
  const { userInfo } = userLogin;

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (userInfo && userInfo.token) {
      if (redirect === "upgrade") {
        history.push(`/${redirect}`);
      } else {
        history.push("/account");
      }
    }
  }, [history, redirect, userInfo]);

  useEffect(() => {
    dispatch(loginReset());
  }, [dispatch]);

  const schemaSignUp = yup.object({
    displayName: yup.string().required("Display name is required"),
    emailSignUp: yup
      .string()
      .required("Email is required")
      .email("Invalid Email"),
    passwordSignUp: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 chars"),
    confirmPasswordSignUp: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("passwordSignUp"), null], "Password must match"),
  });

  const signupHandler = async (name, email, password) => {
    dispatch(register(name, email, password));
  };

  const suFormik = useFormik({
    initialValues: {
      displayName: "",
      emailSignUp: "",
      passwordSignUp: "",
      confirmPasswordSignUp: "",
    },
    validationSchema: schemaSignUp,
    onSubmit: (values) =>
      signupHandler(
        values.displayName,
        values.emailSignUp,
        values.passwordSignUp
      ),
  });

  return (
    <FormContainer>
      {error && (
        <Message variant="danger">
          {error === "email already exists"
            ? "Email already exists. Please try to sign-in."
            : error}
        </Message>
      )}
      {loading && <Loader />}
      <Form noValidate onSubmit={suFormik.handleSubmit}>
        <Form.Group controlId="displayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Display Name"
            name="displayName"
            isInvalid={
              suFormik.touched.displayName && suFormik.errors.displayName
            }
            onChange={suFormik.handleChange}
            onBlur={suFormik.handleBlur}
            value={suFormik.values.displayName}
          />
          <Form.Control.Feedback type="invalid">
            {suFormik.errors.displayName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="emailSignUp">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            name="emailSignUp"
            isInvalid={
              suFormik.touched.emailSignUp && suFormik.errors.emailSignUp
            }
            onChange={suFormik.handleChange}
            onBlur={suFormik.handleBlur}
            value={suFormik.values.emailSignUp}
          />
          <Form.Control.Feedback type="invalid">
            {suFormik.errors.emailSignUp}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="passwordSignUp">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="passwordSignUp"
            isInvalid={
              suFormik.touched.passwordSignUp && suFormik.errors.passwordSignUp
            }
            onChange={suFormik.handleChange}
            onBlur={suFormik.handleBlur}
            value={suFormik.values.passwordSignUp}
          />
          <Form.Control.Feedback type="invalid">
            {suFormik.errors.passwordSignUp}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmPasswordSignUp">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            name="confirmPasswordSignUp"
            isInvalid={
              suFormik.touched.confirmPasswordSignUp &&
              suFormik.errors.confirmPasswordSignUp
            }
            onChange={suFormik.handleChange}
            onBlur={suFormik.handleBlur}
            value={suFormik.values.confirmPasswordSignUp}
          />
          <Form.Control.Feedback type="invalid">
            {suFormik.errors.confirmPasswordSignUp}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="mr-3">
          Sign-up
        </Button>
        <LinkContainer to={redirect ? `/login?redirect=${redirect}` : "/login"}>
          <Button variant="link">
            Already have an account?
            <br />
            Click here to sign-in.
          </Button>
        </LinkContainer>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
