import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../Api/Services/auth";
import Navbar from "./Navbar";
import styles from "../assets/style";
import Button from "./Button";
import { message } from "antd";
import { validateRegister } from "../utils/validation.js";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const setErrorMessage = (msg) => {
        setErrMsg(msg);
        setTimeout(() => {
            setErrMsg("");
        }, 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validate = validateRegister({ setErrMsg, email, username, password })
        console.log('validation done',validate)
        if(!validate) return;
        try {
            const response = await RegisterAPI({ email, username, password });
            if (response.status === 201) {
                message.success("register success");
                navigate("/login");
            } else {
                setPassword("");
                setUsername("");
                setEmail("");
                setErrorMessage(response.msg);
            }
        } catch (error) {
            message.error(error.response.data.response);
            console.log(error);
        }
    };
    return (
        <>
            <div className="w-full overflow-hidden">
                <div className={`bg-cyan-800 ${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center sm:px-16 px-6 my-auto h-[400px]">
                    <form onSubmit={handleLogin} className="max-w-[400px] mx-auto">
                        <h1 className="text-center font-poppins text-black font-semibold xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full">
                            Register
                        </h1>
                        <input
                            type="text"
                            value={username}
                            placeholder="name"
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                        />
                        <input
                            type="text"
                            value={email}
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                        />
                        {errMsg ? <div className="text-red-600 font-semibold text-sm">{errMsg}</div> : ""}
                        <Button title={"Signup"} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
