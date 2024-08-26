import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";

export default function Brand() {
  const { id } = useParams();
  function getSpecificBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["specificBrand"],
    queryFn: getSpecificBrand,
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
    <div>
      {!isLoading ? (
        <div className="flex justify-center items-center ">
          <div className="w-1/3">
            <img src={data.data.data.image} className="w-full" alt="" />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
