import { useContext, useEffect } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
    const {
        allProducts,
        totalCartPrice,
        numOfCartItems,
        getCart,
        changeCount,
        removeItem,
        cartId,
    } = useContext(cartContext);

    useEffect(() => {
        getCart();

        return;
    }, []);
    return (
        <div>
            <div className="relative overflow-x-auto max-w-screen-xl mx-auto my-6  sm:rounded-lg">
                <div className="my-8">
                    <h2 className="text-xl my-2 text-center font-extrabold">
                        Total price = {totalCartPrice}
                    </h2>
                    <h5 className="text-md text-center font-extrabold">
                        Total cart items = {numOfCartItems}
                    </h5>
                    <Link
                        to={"/shippingAddress"}
                        className="py-2 px-12 w-fit bg-green-500 hover:bg-green-300 active:bg-green-200 hover:text-white duration-150 mx-auto block font-bold my-5 rounded-3xl"
                    >
                        Pay
                    </Link>
                </div>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg ">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Price/Unit
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-lg">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts?.map((product) => {
                            return (
                                <tr
                                    key={product._id}
                                    className="shadow-lg"
                                >
                                    <td className="p-4">
                                        <img
                                            src={product.product.imageCover}
                                            className="w-16 max-w-full"
                                            alt={product.product.name}
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        {product.product.title
                                            .split(" ")
                                            .slice(0, 2)
                                            .join(" ")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button
                                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                onClick={() =>
                                                    changeCount(
                                                        product.product._id,
                                                        product.count - 1
                                                    )
                                                }
                                                type="button"
                                            >
                                                <span className="sr-only">
                                                    Quantity button
                                                </span>
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 2"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M1 1h16"
                                                    />
                                                </svg>
                                            </button>
                                            <div>
                                                <input
                                                    type="number"
                                                    id="first_product"
                                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                                    placeholder={product.count}
                                                    onChange={(e) => {
                                                        changeCount(
                                                            product.product._id,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        );
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <button
                                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                                onClick={() =>
                                                    changeCount(
                                                        product.product._id,
                                                        product.count + 1
                                                    )
                                                }
                                            >
                                                <span className="sr-only">
                                                    Quantity button
                                                </span>
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 1v16M1 9h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        {product.price} EGP
                                    </td>
                                    <td className="px-6 py-4 font-semibold">
                                        {product.price * product.count} EGP
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            href="#"
                                            className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline"
                                            onClick={() =>
                                                removeItem(product.product._id)
                                            }
                                        >
                                            <i className=" text-2xl fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
