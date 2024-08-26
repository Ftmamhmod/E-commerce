import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

export const wishlistContextObject = createContext();

export default function WishlistContext({ children }) {
    const [wishlistArray, setWishlistArray] = useState([]);
    const [wishlistArrayId, setWishlistArrayId] = useState([]);
    useEffect(() => {
        getWishlist();
    }, []);
    function addToWishlist(id) {
        axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId: id,
                },
                {
                    headers: { token: localStorage.getItem("token") },
                }
            )
            .then((res) => {
                setWishlistArrayId(res.data.data);
                getWishlist();
            });
    }
    function removeFromWishlist(id) {
        axios
            .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => {
                setWishlistArrayId(res.data.data);
                getWishlist();
            });
    }

    function getWishlist() {
        axios
            .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setWishlistArray(res.data.data);
            });
    }

    function modifyWishlistItem(id) {
        if (wishlistArray.some((obj) => obj._id == id)) {
            console.log("removeinmodify");
            return removeFromWishlist(id);
        }
        if (!wishlistArray.some((obj) => obj._id == id)) {
            console.log("addinmodify");
            return addToWishlist(id);
        }
    }

    return (
        <wishlistContextObject.Provider
            value={{
                modifyWishlistItem,
                wishlistArray,
                getWishlist,
                wishlistArrayId,
            }}
        >
            {children}
        </wishlistContextObject.Provider>
    );
}
