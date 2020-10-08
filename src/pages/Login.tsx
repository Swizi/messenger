import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { LoginErrors, LoginValues } from "../interfaces";

import "./Login.css";
import { useHistory } from "react-router-dom";
// import { ToastProvider, useToasts } from "react-toast-notifications";

import $ from "jquery";
import { useFormik, FormikHelpers } from "formik";
// import CircularProgress from "@material-ui/core/CircularProgress";

const validate = (values: any) => {
  const errors = {} as LoginErrors;

  if (!/^[a-zA-Z0-9-_]{5,15}$/g.test(values.login)) {
    errors.login = "Логин меньше 16 и больше 4 символов";
  }

  if (values.password.length <= 3) {
    errors.password = "Пароль больше 3 символов";
  }

  return errors;
};

export function Login() {
  let history = useHistory();
  const [loading, setLoading] = useState<Boolean>(false);
  //   const [pageLoading, setPageLoading] = useState(true);

  //   useEffect(() => {
  //     $.post(
  //       `/ajax/check_auth.php`,
  //       {
  //         target: "checking",
  //       },
  //       function (data) {
  //         var response = $.parseJSON(data);
  //         if (response.status == 0) {
  //           history.push("/Applications");
  //         }
  //         setPageLoading(false);
  //       }
  //     );
  //   }, []);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: LoginValues) => {
      setLoading(true);
      $.post(
        `/ajax/login.php`,
        {
          target: "logination",
          login: values.login,
          password: values.password,
        },
        function (data: Object) {
          // var response = $.parseJSON(data);
          // if (response.status == 0) {
          //   localStorage.setItem("login", values.login);
          //   history.push("/Applications");
          // }
          setLoading(false);
        }
      );
    },
  });

  //   if (pageLoading) {
  //     return (
  //       <div className="loading_block">
  //         <h3 className="loading_header">DVFU.Food</h3>
  //         <CircularProgress className="circular_progress" />
  //       </div>
  //     );
  //   }

  return (
    <div className="login_modal">
      <h1 style={{ marginBottom: 30 }}>Friends chat</h1>
      <Form
        className="login_form"
        method="POST"
        onSubmit={() => formik.handleSubmit()}
        autoComplete="on"
      >
        <Form.Group
          controlId="login"
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Form.Label style={{ textAlign: "left" }}>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login"
            name="login"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
        </Form.Group>

        <Form.Group
          controlId="password"
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Form.Label style={{ textAlign: "left" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
