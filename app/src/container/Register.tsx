import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

import { IUser } from "../interface/IUser";
import { signUp } from "../store/Action";

type registerForm = Required<Pick<IUser, "userName" | "password">>;

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [message, setmessage] = useState<{ isError: boolean; message: string }>(
    {
      isError: false,
      message: "",
    }
  );
  const dispact = useDispatch();
  const history = useHistory();

  const initialValues: registerForm = {
    userName: "",
    password: "",
  };

  const validationSchema = yup.object<registerForm>({
    userName: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
  });

  const onSubmit = async (formData: registerForm, { resetForm }: any) => {
    // dispact(login(formData as IUser));
    dispact(
      signUp(formData as IUser, (error: Error | null, res: unknown) => {
        error
          ? setmessage({ isError: true, message: error.message })
          : (() => {
              resetForm({});
              setmessage({ isError: false, message: "Registered succesfully" });
            })();
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
            placeholder="Enter UserName"
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
            placeholder="Enter Password"
          />
          <ErrorMessage name="password">
            {(msg: any) => <span className="error"> {msg} </span>}
          </ErrorMessage>
        </div>
        <input type="submit" className="fadeIn fourth" value="Register" />
      </Form>
    </Formik>
  );

  return (
    <React.Fragment>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {loginForm}
          <span className={message.isError ? "error" : "success"}>
            {message.message ?? null}
          </span>
          <div id="formFooter">
            <a
              className="underlineHover"
              href="#"
              onClick={() => history.push("/login")}
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
