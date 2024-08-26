import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function Category() {
    const { id } = useParams();
    function getSpecificCategory() {
        return axios.get(
            `https://ecommerce.routemisr.com/api/v1/categories/${id}`
        );
    }

    const { isError, isLoading, error, data } = useQuery({
        queryKey: ["specificBrand"],
        queryFn: getSpecificCategory,
    });

    if (isError) {
        return (
            <>
                <div className="h-screen flex justify-center items-center">
                    <h1>{error}</h1>
                </div>
            </>
        );
    }

    return (
        <div className="flex justify-center items-center ">
            <div className="w-1/3">
                <img src={data?.data.data.image} className="w-full" alt="" />
            </div>
        </div>
    );
}
