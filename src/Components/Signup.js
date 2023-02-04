import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  firstname: Yup.string("Invalid firstname")
    .min(3, "Name cannot be less than 3 characters")
    .max(30, "Name is too long !")
    .required("Required"),
  lastname: Yup.string("Invalid lastname")
    .min(2, "lastname cannot be less than 3 characters ")
    .max(30, "lastname is too long !")
    .required("Required"),
  useremail: Yup.string("email type Invalid")
    .email()
    .required("Email is required !"),
  userpassword: Yup.string("Invalid Password")
    .required("Password is required")
    .min(6, "password cannont be less than 6 chars!")
    .max(12, "password cannot be more than 12 characters"),
});

const Signup = () => {
  let navigate = useNavigate();
  const [InitialFormValues] = useState({
    firstname: "",
    lastname: "",
    useremail: "",
    userpassword: "",
  });

  const handleFormSubmit = async (values) => {
    navigate("/TodoList", true);
  };
  return (
    <div className="signup-form">
      <h3> Sign Up</h3>
      <Formik
        validationSchema={signupSchema}
        initialValues={InitialFormValues}
        onSubmit={handleFormSubmit}
      >
        {/* {(formprops) => (*/}
        {({ errors, touched }) => (
          <Form>
            <div>
            <label>
              First Name
              <Field
                name="firstname"
                type="text"
                className="input-field"
              ></Field>
            </label>
            {errors.firstname && touched.firstname ? (
              <div>{errors.firstname}</div>
            ) : null}
            </div>
            <div>
            <label>
              Last Name
              <Field
                name="lastname"
                type="text"
                className="input-field"
              ></Field>
            </label>
            {errors.lastname && touched.lastname ? (
              <div>{errors.lastname}</div>
            ) : null}
        
            </div>
            <div>
            <label className="email-label">
              Email
              <Field
                name="useremail"
                type="email"
                id="email-id"
                className="input-field"
              ></Field>
            </label>
            {errors.useremail && touched.useremail ? (
              <div>{errors.useremail}</div>
            ) : null}
            </div>
            <div>
            <label>
              Password
              <Field
                name="userpassword"
                type="password"
                className="input-field"
              ></Field>
            </label>
            {errors.userpassword && touched.userpassword ? (
              <div>{errors.userpassword}</div>
            ) : null}
            </div>
            <div>
            <button type="submit">
              SignUp
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
