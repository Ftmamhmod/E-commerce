import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { tokenContext } from "../../context/TokenContext";
import { Link, useNavigate } from "react-router-dom";

export const Signin = () => {
  const [signinMessage, setSetSigninMessage] = useState("");
  const { setUserToken } = useContext(tokenContext);
  const navigate = useNavigate();
  function fetchMessageHandling(err) {
    setSetSigninMessage(err);
    setTimeout(() => {
      setSetSigninMessage("");
    }, 2500);
  }

  async function signin(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        console.log(res.data);
        console.log("token", res.data.token);
        localStorage.setItem("token", res.data.token);
        setUserToken(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        fetchMessageHandling(err.response.data.message);
      });
  }

  const signinForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      signin(values);
      console.log(values);
    },
  });

  return (
    <>
      <div
        onSubmit={signinForm.handleSubmit}
        className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 shadow-lg  mt-20 "
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className=" text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Email address:
              </label>
              <div className="mt-2">
                <input
                  onBlur={signinForm.handleBlur}
                  onChange={signinForm.handleChange}
                  value={signinForm.values.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password:
                </label>
                <div className="text-sm">
                  <Link
                    to={"/forgetpassword"}
                    
                    className="font-semibold text-green-500 hover:text-green-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={signinForm.handleChange}
                  onBlur={signinForm.handleBlur}
                  value={signinForm.values.password}
                  id="password"
                  name="password"
                  type="password"
                  placeholder=" "
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
            {signinMessage != "" ? (
                    <div
                        className={`flex items-center p-4 mb-4 text-sm  border border-red-300 rounded-lg  dark:bg-red-200 
                                text-red-800 bg-red-50 dark:text-red-400
                        dark:border-red-800`}
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
                            <span className="font-medium">{signinMessage}</span>
                        </div>
                    </div>
                ) : null}
              <button
                type="Signin"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Sign in
              </button>

            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/Register"
              className="font-semibold leading-6 text-green-500 hover:text-green-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
