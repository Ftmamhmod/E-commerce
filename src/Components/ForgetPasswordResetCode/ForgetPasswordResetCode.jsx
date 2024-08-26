import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordResetCode() {
  function forgetPassword(values) {
    console.log(values);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((res) => {
        toast.success(`Done ${res}`, { position: "top-right" });
      });
  }

  const forgetPasswordForm = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
    },

    onSubmit: (values) => {
      forgetPassword(values);
      console.log(values);
    },
  });
  return (
    <div>
      <div>
        <form
          onSubmit={forgetPasswordForm.handleSubmit}
          className="max-w-md mx-auto m-10"
        >
          <div className="relative z-0 w-full mb-3 mt-3 group">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              email
            </label>
            <input
              type="email"
              value={forgetPasswordForm.values.email}
              name="email"
              onBlur={forgetPasswordForm.handleBlur}
              onChange={forgetPasswordForm.handleChange}
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              placeholder=" "
            />
          </div>
          <div className="relative z-0 w-full mb-3 mt-3 group">
            <label
              htmlFor="resetCode"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              resetCode
            </label>
            <input
              type="text"
              value={forgetPasswordForm.values.resetCode}
              name="resetCode"
              onBlur={forgetPasswordForm.handleBlur}
              onChange={forgetPasswordForm.handleChange}
              id="resetCode"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              placeholder=" "
            />
          </div>
          <div className="flex justify-evenly">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Proceed resetting Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
