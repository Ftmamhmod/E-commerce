import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

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
    <>
      <div className=" container mx-auto  p-5 my-5 grid grid-cols-6 gap-5">
        {data.data.data.map((brand) => {
          return (
            <Link
              to={`/brand/${brand._id}`}
              key={brand._id}
              className=" rounded-2xl p-3 hover:scale-125 bg-white duration-300 shadow-xl"
            >
              <img src={brand.image} alt={brand.name} className="w-full" />
              <h3 className="text-center my-3 font-extrabold">{brand.name}</h3>
            </Link>
          );
        })}
      </div>
    </>
  );
}
