import React from "react";
import freshLogi from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { tokenContext } from "../../context/TokenContext";
import { FaBarsStaggered } from 'react-icons/fa6';


export const Navbar = () => {
  const { userToken, setUserToken } = useContext(tokenContext);
  const navigate = useNavigate();
  function clearToken() {
    setUserToken(null);
    localStorage.setItem("token", "");
    navigate("/signin");
  }
  return (
    <>
      <nav className=" sticky top-0 bg-white text-lg font-bold">
        <div className="flex items-center justify-between  shadow-lg p-10">
          <div>

            <Link
              className=" hidden lg:flex btn btn-primary text-3xl items-center "
              to="/"
            >
              <img src={freshLogi} alt="Fresh Cart logo" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center space-x-4">
              <li className="p-2">
                <NavLink to={""}>Home</NavLink>
              </li>
              <li className="p-2">
                <NavLink to={"/Cart"}>Cart</NavLink>
              </li>
              <li className="p-2 ">
                <NavLink to={"/Products"}>Products</NavLink>
              </li>
              <li className="p-2 hidden lg:flex">
                <NavLink to={"/Categories"}>Categories</NavLink>
              </li>
              <li className="p-2 hidden lg:flex ">
                <NavLink to={"/Brands"}>Brands</NavLink>
              </li>
              <li className="p-2">
                <NavLink to={"/wishlist"}>Wishlist</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4">
            {userToken ? (
              <span onClick={() => clearToken()} className="cursor-pointer">
                Sign out
              </span>
            ) : (
              <>
                <Link to={"register"}>Register</Link>
                <Link to={"signin"}>Sign in</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
