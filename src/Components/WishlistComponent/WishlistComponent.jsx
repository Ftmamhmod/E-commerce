import WishlistContext, {
  wishlistContextObject,
} from "../../context/WishlistContext";
import { useContext, useEffect } from "react";
import Heart from "react-heart";

export default function Wishlist() {
  const { wishlistArray, wishlistArrayId, modifyWishlistItem, getWishlist } =
    useContext(wishlistContextObject);

  return (
    <div>
      {wishlistArray.length != 0 ? (
        <div className="relative overflow-x-auto max-w-screen-xl mx-auto my-6 shadow-lg sm:rounded-lg mt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-200 dark:text-black">
              <tr>
                <th scope="col text-center" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col text-center" className="px-6 py-3">
                  Product
                </th>
                <th scope="col text-center" className="px-6 py-3">
                  Price/Unit
                </th>
                <th scope="col text-center" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistArray?.map((product) => {
                return (
                  <tr
                    key={product?._id}
                    className="   shadow-lg hover:bg-gray-50 dark:hover:bg-gray-50"
                  >
                    <td className=" p-4">
                      <img
                        src={product?.imageCover}
                        className="w-16 max-w-full"
                        alt={product?.title}
                      />
                    </td>
                    <td className=" px-6 py-4 font-semibold text-gray-900 ">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </td>
                    <td className=" px-6 py-4 font-semibold text-gray-900">
                      {product?.price} EGP
                    </td>
                    <td className="px-6 py-6 flex  relative">
                      <Heart
                        className={`size-10`}
                        isActive={wishlistArray.some(
                          (obj) => obj._id == product._id
                        )}
                        onClick={() => {
                          modifyWishlistItem(product._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="min-h-96 flex justify-center items-center">
          <h1>your Wish List is empty</h1>
        </div>
      )}
    </div>
  );
}
