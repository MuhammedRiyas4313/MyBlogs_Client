import React, { useState } from "react";
import { close, logo, menu } from "../assets/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../Redux/userStore.js";
import { DownloadBlog } from "../Api/Services/blog.js";

function Navbar() {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const token = useSelector((state) => state.userLogin.token);
    const dispatch = useDispatch();
    const handleDownload = async () => {
        const response = await DownloadBlog(token);

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([response.data]));
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
    };
    return (
        <nav className="w-full flex py-6 justify-between px-0 md:px-10 items-center navbar">
            <div>
                <h2
                    onClick={() => navigate("/")}
                    className="font-poppins text-white font-semibold xs:text-[48px] text-[35px] xs:leading-[76.8px] leading-[66.8px] w-full"
                >
                    MyBlogs
                </h2>
            </div>
            <div>
                <ul className="list-none sm:flex hidden justify-end items-center flex-1 gap-3">
                    {token && (
                        <>
                            <li
                                onClick={() => navigate("/create-blog")}
                                className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                            >
                                Create post
                            </li>
                            <li
                                onClick={() => handleDownload()}
                                className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                            >
                                Download blog
                            </li>
                            <li
                                onClick={() => {
                                    navigate("/"), dispatch(setLogout());
                                }}
                                className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                            >
                                Logout
                            </li>
                        </>
                    )}
                    {!token && (
                        <>
                            <li
                                onClick={() => navigate("/login")}
                                className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white hover:text-gray-300`}
                            >
                                Login
                            </li>
                            <li
                                onClick={() => navigate("/register")}
                                className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white hover:text-gray-300`}
                            >
                                Register
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle((prev) => !prev)}
                />
                <div
                    className={`${
                        toggle ? "flex" : "hidden"
                    } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                >
                    <ul className="list-none flex justify-end items-center flex-col flex-1">
                        {token && (
                            <>
                                <li
                                    onClick={() => navigate("/create-blog")}
                                    className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                                >
                                    Create post
                                </li>
                                <li
                                    onClick={() => handleDownload()}
                                    className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                                >
                                    Download blog
                                </li>
                                <li
                                    onClick={() => {
                                        navigate("/"), dispatch(setLogout());
                                    }}
                                    className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                                >
                                    Logout
                                </li>
                            </>
                        )}
                        {!token && (
                            <>
                                <li
                                    onClick={() => navigate("/login")}
                                    className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                                >
                                    Login
                                </li>
                                <li
                                    onClick={() => navigate("/register")}
                                    className={`font-poppins font-normal cursor-pointer text-[16px] "mr-10" text-white`}
                                >
                                    Register
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
