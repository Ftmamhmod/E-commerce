import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import Product from "../Product/Product";
import PopularCategories from "./PopularCategories/PopularCategories";
import Landing from "./Landing/Landing";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { wishlistContextObject } from "../../context/WishlistContext";

export default function Home() {
  const { modifyWishlistItem } = useContext(wishlistContextObject);
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  useEffect(() => {}, []);

  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
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
        <div className="container  mx-auto my-5">
          <Landing />
          <div className="px-12 ">
            <PopularCategories />
          </div>
          <div className="flex justify-center items-center min-h-24">
            <div className="  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-10 grid gap-5">
              {data.data.data.map((product) => {
                return <Product product={product} key={product._id} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-96 flex justify-center items-center">
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
      )}
    </div>
  );
}
