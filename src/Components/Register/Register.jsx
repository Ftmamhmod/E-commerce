import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { tokenContext } from "../../context/TokenContext";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export const Register = () => {
  const { userToken, setUserToken } = useContext(tokenContext);
  const [signupMessage, setSignupMessage] = useState("");
  function fetchMessageHandling(err) {
    setSignupMessage(err);
    setTimeout(() => {
      setSignupMessage("");
    }, 2500);
  }
  async function signup(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUserToken(res.data.token);
        console.log("state", userToken);
        fetchMessageHandling(res.data.message);
        Navigate("/");
      })
      .catch((err) => {
        fetchMessageHandling(err?.response?.data.message);
      });
  }

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      signup(values);
    },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(2, "at least two characters")
        .max(12, "maximum 12 characters")
        .required("name is required"),
      email: yup
        .string()
        .email("this email is not valid")
        .required("Email is required"),
      password: yup
        .string()
        .required("password is required")
        .min(5, "min 5 characters")
        .max(9, "max 9 characters"),
      rePassword: yup
        .string()
        .oneOf([yup.ref("password")], "rePassword must match password ")
        .required("this field is required"),
      phone: yup
        .string()
        .matches(/(01)[0125][0-9]{8}/, "this number is not valid "),
    }),
  });

  return (
    <div className="flex min-h-full flex-col justify-center  py-12 lg:px-8 shadow-lg  ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register now
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={registerForm.handleSubmit}
          noValidate
          className="space-y-6"
        >
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name:
              </label>
            </div>
            <div className="mt-2">
              <input
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.name}
                autoComplete="name"
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
            {registerForm.errors.name && registerForm.touched.name ? (
              <div
                className="bg-red-200 p-2  rounded-sm text-red-600 "
                role="alert"
              >
                <p>{registerForm.errors.name}</p>
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="email"
              className=" text-left block text-sm font-medium leading-6 text-gray-900"
            >
              Email address:
            </label>
            <div className="mt-2">
              <input
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
            {registerForm.errors.email && registerForm.touched.email ? (
              <div
                className="bg-red-200 p-2  rounded-sm text-red-600 "
                role="alert"
              >
                <p>{registerForm.errors.email}</p>
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password:
              </label>
            </div>
            <div className="mt-2">
              <input
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
            {registerForm.errors.password && registerForm.touched.password ? (
              <div
                className="bg-red-200 p-2  rounded-sm text-red-600 "
                role="alert"
              >
                <p>{registerForm.errors.password}</p>
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="rePassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Re-password:
              </label>
            </div>
            <div className="mt-2">
              <input
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.rePassword}
                id="repassword"
                name="rePassword"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div
                className="bg-red-200 p-2  rounded-sm text-red-600 "
                role="alert"
              >
                <p>{registerForm.errors.rePassword}</p>
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone:
              </label>
            </div>
            <div className="mt-2">
              <input
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
                value={registerForm.values.phone}
                autoComplete="phone"
                id="phone"
                name="phone"
                type="tel"
                placeholder=" "
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div
                className="bg-red-200 p-2  rounded-sm text-red-600 "
                role="alert"
              >
                <p>{registerForm.errors.phone}</p>
              </div>
            ) : null}
          </div>
          <div>
            {signupMessage != "" ? (
              <div
                className={`flex items-center p-4 mb-4 text-sm  border border-red-300 rounded-lg  ${
                  signupMessage == "success"
                    ? "dark:text-green-400 text-green-800 bg-green-50 "
                    : "text-red-800 bg-red-50 dark:text-red-400"
                } dark:border-red-800`}
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{signupMessage}</span>
                </div>
              </div>
            ) : null}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Have an account?
          <Link
            to="/Signin"
            className="font-semibold leading-6 text-green-500 hover:text-green-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
