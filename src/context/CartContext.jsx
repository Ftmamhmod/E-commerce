import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./TokenContext";
import toast from "react-hot-toast";

export const cartContext = createContext(CartContextProvider);

export default function CartContextProvider({ children }) {
    const { userToken } = useContext(tokenContext);
    const [allProducts, setAllProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);

    async function getCart() {
        console.log("get cart itself");
        axios
            .get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setNumOfCartItems(res.data.numOfCartItems);
                setAllProducts(res.data.data.products);
                setTotalCartPrice(res.data.data.totalCartPrice);
                console.log("in getcart then", res);
                setCartId(res.data.data._id);

                console.log(allProducts, totalCartPrice, numOfCartItems);
            })
            .catch((err) => {
                if (err.response.data.statusMsg == "fail") {
                    toast("Cart is empty", {
                        position: "top-right",
                    });
                }
            });
    }
    // const notify = () => toast("Here is your toast.");
    async function addProduct(productId, count) {
        const addProductToast = toast.loading("Adding Product", {
            position: "top-right",
        });
        axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: productId,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                toast.success("Product Added Successfully", {
                    position: "top-right",
                    id: addProductToast,
                });

                getCart();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function changeCount(productId, newCount) {
        axios
            .put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    count: newCount,
                },
                { headers: { token: localStorage.getItem("token") } }
            )
            .then((res) => {
                setNumOfCartItems(res.data.numOfCartItems);
                setAllProducts(res.data.data.products);
                setTotalCartPrice(res.data.data.totalCartPrice);
            });
    }

    function removeItem(productId) {
        axios
            .delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                setNumOfCartItems(res.data.numOfCartItems);
                setAllProducts(res.data.data.products);
                setTotalCartPrice(res.data.data.totalCartPrice);
                toast.success("itme Deleted Successfully", {
                    position: "bottom-right",
                });
            });
    }
    return (
        <cartContext.Provider
            value={{
                getCart,
                addProduct,
                setNumOfCartItems,
                setAllProducts,
                setTotalCartPrice,
                allProducts,
                totalCartPrice,
                numOfCartItems,
                changeCount,
                removeItem,
                cartId,
            }}
        >
            {children}
        </cartContext.Provider>
    );
}
