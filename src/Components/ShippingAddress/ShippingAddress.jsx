import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ShippingAddress() {
  const { cartId } = useContext(cartContext);
  const [isOnlinePyament, setIsOnlinePyament] = useState(false);

  function cashPayment(values) {
    const address = {
      shippingAddress: {
        values,
      },
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          address,
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res);

        toast.success("Cash Payment Confirmed", {
          position: "top-right",
        });
      })
      .catch((err) => {
        if (err.response.data.message == "invalid ID null") {
          toast.error("Cart is empty", {
            position: "top-right",
          });
        }
      });
  }

  function onlinePayment(values) {
    const address = {
      shippingAddress: {
        values,
      },
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          address,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
      });
  }

  function managePaymentFunctions(values) {
    if (isOnlinePyament) {
      onlinePayment(values);
      console.log("online payment buddy");
    }
    if (!isOnlinePyament) {
      cashPayment(values);
      console.log("Cash payment buddy");
    }
  }
  const shippingAddressForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      managePaymentFunctions(values);
    },

    validationSchema: yup.object().shape({
      details: yup
        .string()
        .min(2, "at least two characters")
        .required("details is required"),
      phone: yup
        .string()
        .required("phone is required")
        .matches(/^01[0125]\d{8}$/, "kindly Enter a Valid Egyptian Number"),
      city: yup
        .string()
        .required("city is required")
        .min(2, "min 2 characters"),
    }),
  });

  return (
    <div>
      <form
        onSubmit={shippingAddressForm.handleSubmit}
        className="max-w-md mx-auto mt-10"
      >
        <div className="relative z-0 w-full mb-3 mt-3 group">
        <label
            htmlFor="details"
            className=" text-left block text-sm font-medium leading-6 text-gray-900"
          >
            Details
          </label>
          <input
            type="text"
            value={shippingAddressForm.values.details}
            name="details"
            onBlur={shippingAddressForm.handleBlur}
            onChange={shippingAddressForm.handleChange}
            id="details"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />

        </div>
        {shippingAddressForm.errors.details &&
        shippingAddressForm.touched.details ? (
          <section className=" items-center w-full  ">
            <div className="w-full bg-red-200 text-red-600 border rounded-lg shadow-sm">
              <div className="flex items-center justify-between mx-auto">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" mr-4 icon icon-tabler icon-tabler-alert-triangle"
                    width=""
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    <polyline points="11 12 12 12 12 16 13 16"></polyline>
                  </svg>
                  <p className="text-sm font-semibold tracking-wide uppercase">
                    <strong>Error:</strong> {shippingAddressForm.errors.details}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        <div className="relative z-0 w-full mb-3 mt-3 group">
        <label
            htmlFor="phone"
            className=" text-left block text-sm font-medium leading-6 text-gray-900"
          >
            Phone
          </label>
          <input
            type="tel"
            value={shippingAddressForm.values.phone}
            name="phone"
            onBlur={shippingAddressForm.handleBlur}
            onChange={shippingAddressForm.handleChange}
            id="phone"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          />

        </div>
        {shippingAddressForm.errors.phone &&
        shippingAddressForm.touched.phone ? (
          <section className=" items-center w-full">
            <div className="w-full bg-red-200 text-red-600 border rounded-lg shadow-sm">
              <div className="flex items-center justify-between mx-auto">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" mr-4 icon icon-tabler icon-tabler-alert-triangle"
                    width=""
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    <polyline points="11 12 12 12 12 16 13 16"></polyline>
                  </svg>
                  <p className="text-sm font-semibold tracking-wide uppercase">
                    <strong>Error:</strong> {shippingAddressForm.errors.phone}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        <div className="relative z-0 w-full mb-3 mt-3 group">
        <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <input
            type="text"
            value={shippingAddressForm.values.city}
            name="city"
            onBlur={shippingAddressForm.handleBlur}
            onChange={shippingAddressForm.handleChange}
            id="city"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
            placeholder=" "
          />

        </div>
        {shippingAddressForm.errors.city && shippingAddressForm.touched.city ? (
          <section className=" items-center w-full ">
            <div className="bg-red-200 w-full text-red-600 border rounded-lg shadow-sm">
              <div className="flex items-center justify-between  mx-auto">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" mr-4 icon icon-tabler icon-tabler-alert-triangle"
                    width=""
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    <polyline points="11 12 12 12 12 16 13 16"></polyline>
                  </svg>
                  <p className="text-sm font-semibold tracking-wide uppercase">
                    <strong>Error:</strong> {shippingAddressForm.errors.city}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        <div className="flex justify-evenly">
          <button
            type="submit"
            className="text-white mt-6 bg-green-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => {
              setIsOnlinePyament(false);
            }}
          >
            Cash Payment
          </button>
          <button
            type="submit"
            className="text-white mt-6 bg-green-500 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => {
              setIsOnlinePyament(true);
            }}
          >
            Online Payment
          </button>
        </div>
      </form>
    </div>
  );
}
