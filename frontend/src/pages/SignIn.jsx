import React, { useState } from "react";

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
function SignIn() {
    const [inputClicked, setInputClicked] = useState({
        userName: false,
        password: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignIn = async () => {
        setLoading(true);
        setErr("");
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/signin`,
                { userName, password },
                { withCredentials: true },
            );
            dispatch(setUserData(result.data));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErr(error.response?.data?.message);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-green-950 to-black flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl flex flex-col justify-center items-center p-8 text-white">
                {/* --- Header --- */}
                <div className="flex gap-2 items-center text-xl font-semibold mb-6">
                    <span>Sign In to </span>
                    <h1 className="bg-gradient-to-r from-lime-400 to-lime-200 text-transparent bg-clip-text font-splash text-5xl">
                        Pixella
                    </h1>
                </div>

                <div className="w-full flex flex-col gap-5">
                    <input
                        type="text"
                        id="userName"
                        placeholder="Username"
                        className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-400 transition-all duration-300"
                        required
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />

                    <div className="relative w-full flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-400 transition-all duration-300"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <div
                            className="absolute right-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <IoIosEyeOff size={24} />
                            ) : (
                                <IoIosEye size={24} />
                            )}
                        </div>
                    </div>

                    <div
                        className="w-fit text-right text-sm text-lime-400 hover:text-lime-300 underline cursor-pointer transition-colors"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </div>
                </div>

                {err && <p className="text-red-500 mt-4 text-center">{err}</p>}

                <button
                    className="w-full h-12 bg-lime-500 hover:bg-lime-600 disabled:bg-lime-800 text-black font-semibold rounded-lg mt-6 transition-all duration-300 flex justify-center items-center hover:scale-105 active:scale-100 shadow-lg shadow-lime-500/20"
                    onClick={handleSignIn}
                    disabled={loading}
                >
                    {loading ? (
                        <ClipLoader size={24} color="black" />
                    ) : (
                        "Sign In"
                    )}
                </button>

                <p
                    className="cursor-pointer text-gray-300 mt-6 text-sm"
                    onClick={() => navigate("/signup")}
                >
                    Don't have an account?{" "}
                    <span className="font-semibold text-lime-400 hover:text-lime-300 underline transition-colors">
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
