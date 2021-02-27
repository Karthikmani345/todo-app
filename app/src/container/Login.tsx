import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

import { IUser } from "../interface/IUser";
import { login } from "../store/Action";

interface ILoginProps {}

type loginForm = Required<Pick<IUser, "userName" | "password">>;

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [errorState, setErrorState] = useState<string>("");
  const dispact = useDispatch();
  const history = useHistory();

  const initialValues: loginForm = {
    userName: "",
    password: "",
  };

  const validationSchema = yup.object<loginForm>({
    userName: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
  });

  const onSubmit = async (formData: loginForm) => {
    // dispact(login(formData as IUser));
    dispact(
      login(formData as IUser, (error: Error | null, res: unknown) => {
        error ? setErrorState(error.message) : history.push("/bucket");
      })
    );
  };

  const loginForm = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-group">
          <Field
            name="userName"
            type="text"
            id="login"
            className="fadeIn second"
            placeholder="User Name"
          />
          <ErrorMessage name="userName">
            {(msg: any) => <span className="error"> {msg} </span>}
          </ErrorMessage>
        </div>
        <div className="form-group">
          <Field
            name="password"
            type="password"
            id="password"
            className="fadeIn third"
            placeholder="Password"
          />
          <ErrorMessage name="password">
            {(msg: any) => <span className="error"> {msg} </span>}
          </ErrorMessage>
        </div>
        <input type="submit" className="fadeIn fourth" value="Log In" />
      </Form>
    </Formik>
  );

  return (
    <React.Fragment>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {loginForm}
          <span className="error">{errorState ? errorState : null}</span>
          <div id="formFooter">
            <a
              className="underlineHover"
              href="#"
              onClick={() => history.push("/register")}
            >
              Dont have account ? Register
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
