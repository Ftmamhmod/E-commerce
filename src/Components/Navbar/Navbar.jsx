import React from "react";
import freshLogi from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { tokenContext } from "../../context/TokenContext";

export const Navbar = () => {
  const { userToken, setUserToken } = useContext(tokenContext);
  const navigate = useNavigate()
  function clearToken() {
      setUserToken(null);
      localStorage.setItem("token", "");
      navigate("/signin")
  }
  return (
    <>
      <nav className=" sticky top-0 bg-white text-lg font-bold">
        <div className="flex items-center justify-between  shadow-lg p-10">
          <div>
            <Link to="/">
              <img src={freshLogi} alt="Fresh Cart logo" />
            </Link>
          </div>
          <div>
            <ul className=" flex items-center space-x-4">
                        <li>
                            <NavLink to={""}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Cart"}>Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Products"}>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Categories"}>Categories</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Brands"}>Brands</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/wishlist"}>Wishlist</NavLink>
                        </li>
            </ul>
          </div>
          <div className="flex space-x-4">
          {userToken ? (
                        <span onClick={() => clearToken()} className="cursor-pointer">Signout</span>
                    ) : (
                        <>
                            <Link to={"register"}>Register</Link>
                            <Link to={"signin"}>Signin</Link>
                        </>
                    )}
          </div>
        </div>
      </nav>
    </>
  );
};
