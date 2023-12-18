import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logo, gif } from "../assets/data";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { setSearch } from "../redux/slices/SearchSlice";

const Navbar = () => {
    
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const mobile = () => {
        setClick(!click);
    };

    const [searchInput, setSearchInput] = useState("");
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };
    useEffect(() => {
        dispatch(setSearch(searchInput));
    }, [searchInput, dispatch]);

    return (
        <div className="p-1 md:p-4 flex items-center justify-between h-10 w-full">
            <div className="flex flex-row items-center gap-2">
                <img
                    src={logo}
                    alt=""
                    height={50}
                    width={50}
                    className="dark:hidden"
                />
                <img
                    src={gif}
                    alt=""
                    height={20}
                    width={20}
                    className="hidden dark:block"
                />
                <span className="text-2xl font-[1000] text-center dark:text-white">
                    HIEN.
                    <span className="font-extrabold text-sm">shoe</span>
                </span>
            </div>
            <ul className="hidden md:flex text-sm  text-black dark:text-white font-semibold md:tracking-wide  flex-col  gap-2 md:flex-row  md:gap-8">
                <li>
                    <nav className="navbar navbar-light bg-light">
                        <form className="form-inline">
                            <input
                                className="form-control mr-sm-2 text-black"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{ marginRight: "20px", paddingLeft: "10px"}}
                                value={searchInput}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </nav>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/explore">Explore</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>

                <li>
                    <Link to="/cart">
                        <div className="relative">
                            <FaShoppingCart className="text-xl " />
                            {cart.length > 0 && (
                                <span
                                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-4 h-4 
                  flex justify-center items-center animate-bounce rounded-full text-white"
                                >
                                    {cart.length}
                                </span>
                            )}
                        </div>
                    </Link>
                </li>
            </ul>
            {/* hidden max-sm:block */}
            <div className="block md:hidden">
                <button onClick={mobile}>
                    {!click && (
                        <GiHamburgerMenu className="text-2xl dark:text-white" />
                    )}
                    {click && <FaTimes className="text-2xl dark:text-white" />}
                    <ul
                        className={`text-sm ${
                            click ? "block" : "hidden"
                        } w-full flex flex-col gap-y-4 absolute top-10 left-0 right-0 text-black dark:text-white font-semibold z-10 backdrop-blur-sm`}
                    >
                        <li className=" rounded-md h-8 ">
                            <Link to="/">Home</Link>
                        </li>
                        <li className=" rounded-md h-8">
                            <Link to="/explore">Explore</Link>
                        </li>
                        <li className=" rounded-md h-8">
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
